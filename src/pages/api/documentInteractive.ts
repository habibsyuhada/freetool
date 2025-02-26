import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { supabase } from '@/lib/supabase';
import { decrypt } from '../../utils/encryption';

// Helper function to safely stringify error objects
const formatError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'Unknown error occurred';
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = session.user.id;

    if (req.method === 'GET') {
      // Get document with its variables
      const { id } = req.query;
      
      if (id) {
        // Decrypt the ID
        let decryptedId;
        try {
          if (typeof id === 'string') {
            decryptedId = decrypt(id);
            if (!decryptedId) {
              return res.status(400).json({ error: 'Invalid document ID' });
            }
          } else {
            return res.status(400).json({ error: 'Document ID is required' });
          }
        } catch (error) {
          console.error('Error decrypting ID:', error);
          return res.status(400).json({ error: 'Invalid document ID format' });
        }

        const documentId = parseInt(decryptedId);

        // Get single document with variables
        const { data: document, error: docError } = await supabase
          .from('documentinteractive')
          .select('*')
          .eq('id', documentId)
          .eq('userId', userId)
          .single();

        if (docError) throw docError;

        // Get variables for this document
        const { data: variables, error: varError } = await supabase
          .from('documentinteractive_variable')
          .select('*')
          .eq('documentId', documentId);

        if (varError) throw varError;

        // Combine document with its variables
        const documentWithVariables = {
          ...document,
          variables: variables || []
        };

        return res.status(200).json([documentWithVariables]);
      } else {
        // Get all documents (without variables for list view)
        const { data, error } = await supabase
          .from('documentinteractive')
          .select('*')
          .eq('userId', userId);

        if (error) throw error;

        return res.status(200).json(data);
      }
    }

    if (req.method === 'POST') {
      const { name, desc, document_html, variables } = req.body;

      // First, create the document
      const { data: document, error: docError } = await supabase
        .from('documentinteractive')
        .insert([{
          name,
          desc,
          document_html,
          userId
        }])
        .select()
        .single();

      if (docError) throw docError;

      // Then, if there are variables, create them
      if (variables && variables.length > 0) {
        const variablesToInsert = variables.map((v: { name: string; value: string }) => ({
          documentId: document.id,
          name: v.name,
          value: v.value
        }));

        const { error: varError } = await supabase
          .from('documentinteractive_variable')
          .insert(variablesToInsert);

        if (varError) throw varError;
      }

      return res.status(201).json(document);
    }

    if (req.method === 'PUT') {
      const { id, name, desc, document_html, variables } = req.body;

      // Decrypt the ID
      let decryptedId;
      try {
        decryptedId = decrypt(id);
        if (!decryptedId) {
          return res.status(400).json({ error: 'Invalid document ID' });
        }
      } catch (error) {
        console.error('Error decrypting ID:', error);
        return res.status(400).json({ error: 'Invalid document ID format' });
      }

      const documentId = parseInt(decryptedId);

      // First, update the document
      const { data: document, error: docError } = await supabase
        .from('documentinteractive')
        .update({
          name,
          desc,
          document_html,
          updatedAt: new Date().toISOString()
        })
        .eq('id', documentId)
        .eq('userId', userId)
        .select()
        .single();

      if (docError) throw docError;

      // Then, handle variables
      if (variables && variables.length > 0) {
        // Delete existing variables
        const { error: deleteError } = await supabase
          .from('documentinteractive_variable')
          .delete()
          .eq('documentId', documentId);

        if (deleteError) throw deleteError;

        // Insert new variables
        const variablesToInsert = variables.map((v: { name: string; value: string }) => ({
          documentId: documentId,
          name: v.name,
          value: v.value
        }));

        const { error: varError } = await supabase
          .from('documentinteractive_variable')
          .insert(variablesToInsert);

        if (varError) throw varError;
      }

      return res.status(200).json(document);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;

      // Decrypt the ID if it exists
      let decryptedId;
      try {
        if (typeof id === 'string') {
          decryptedId = decrypt(id);
          if (!decryptedId) {
            return res.status(400).json({ error: 'Invalid document ID' });
          }
        } else {
          return res.status(400).json({ error: 'Document ID is required' });
        }
      } catch (error) {
        console.error('Error decrypting ID:', error);
        return res.status(400).json({ error: 'Invalid document ID format' });
      }

      const documentId = parseInt(decryptedId);

      // Delete document (variables will be deleted automatically due to CASCADE)
      const { error } = await supabase
        .from('documentinteractive')
        .delete()
        .eq('id', documentId)
        .eq('userId', userId);

      if (error) throw error;

      return res.status(200).json({ message: 'Document deleted successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: formatError(error) });
  }
}