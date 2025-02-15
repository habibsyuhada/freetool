import { NextApiRequest, NextApiResponse } from 'next';  
import { PrismaClient } from '@prisma/client';  
import { decrypt } from '../../utils/encryption';   
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

const prisma = new PrismaClient();  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  // Check authentication for all requests
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {  
    try {  
      const { id } = req.query;  

      if (id && typeof id === 'string') {  
        try {  
          const decryptedId = decrypt(id);  
          if (!decryptedId) {  
            return res.status(400).json({ error: 'Invalid document ID' });  
          }  

          // Get single document with variables and check ownership
          const document = await prisma.documentinteractive.findFirst({  
            where: {  
              id: parseInt(decryptedId),
              userId: session.user.id
            },  
            include: {  
              variables: {  
                select: {  
                  id: true,  
                  name: true,  
                  value: true  
                }  
              }  
            },  
          });  

          if (!document) {  
            return res.status(404).json({ error: 'Document not found' });  
          }  

          return res.status(200).json(document);  
        } catch (decryptError) {  
          console.error('Error decrypting ID:', decryptError);  
          return res.status(400).json({ error: 'Invalid document ID format' });  
        }  
      } else {  
        // Get all documents for the authenticated user
        const documents = await prisma.documentinteractive.findMany({
          where: {
            userId: session.user.id
          }
        });  
        return res.status(200).json(documents);  
      }  
    } catch (error) {  
      console.error('Error fetching document:', error);  
      return res.status(500).json({ error: 'Internal server error while fetching document' });  
    }  
  } else if (req.method === 'POST') {  
    try {  
      const { name, desc, document_html, variables = [] } = req.body;  

      if (!name) {  
        return res.status(400).json({ error: 'Name is required' });  
      }  

      // Add default margin variables if not present
      const defaultMargins = [
        { name: 'margin_top', value: '20' },
        { name: 'margin_right', value: '20' },
        { name: 'margin_bottom', value: '20' },
        { name: 'margin_left', value: '20' }
      ];

      const existingMarginNames = variables.map((v: { name: string; value: string }) => v.name);
      const missingMargins = defaultMargins.filter(
        margin => !existingMarginNames.includes(margin.name)
      );

      // Separate margin variables and other variables
      const marginVariables = [
        ...missingMargins,
        ...variables.filter((v: { name: string; value: string }) => v.name.startsWith('margin_'))
      ];
      const otherVariables = variables.filter((v: { name: string; value: string }) => !v.name.startsWith('margin_'));

      // Combine with margins first
      const allVariables = [...marginVariables, ...otherVariables];

      // Create document with variables using session user id
      const document = await prisma.documentinteractive.create({  
        data: {  
          name,  
          desc: desc || '',  
          document_html: document_html || '',  
          userId: session.user.id,  // Use session user id
          variables: {  
            create: allVariables.map((v: { name: string; value: string }) => ({  
              name: v.name,  
              value: v.value || '',  
            }))
          }  
        },  
        include: {  
          variables: true,  
        },  
      });  

      return res.status(201).json(document);  
    } catch (error) {  
      console.error('Error creating document:', error);  
      return res.status(500).json({ error: 'Internal server error while creating document' });  
    }  
  } else if (req.method === 'PUT') {  
    try {  
      const { id, name, desc, document_html, variables } = req.body;  

      if (!id || !name) {  
        return res.status(400).json({ error: 'ID and name are required' });  
      }  

      try {  
        const decryptedId = decrypt(id);  
        if (!decryptedId) {  
          return res.status(400).json({ error: 'Invalid document ID' });  
        }  

        // First check if document exists and belongs to user
        const existingDoc = await prisma.documentinteractive.findFirst({
          where: {
            id: parseInt(decryptedId),
            userId: session.user.id
          }
        });

        if (!existingDoc) {
          return res.status(404).json({ error: 'Document not found or access denied' });
        }

        // Update document and replace all variables  
        const document = await prisma.documentinteractive.update({  
          where: {  
            id: parseInt(decryptedId),  
          },  
          data: {  
            name,  
            desc: desc || '',  
            document_html: document_html || '',  
            variables: {  
              deleteMany: {},  
              create: variables?.map((v: { name: string; value: string }) => ({  
                name: v.name,  
                value: v.value || '',  
              })) || []  
            }  
          },  
          include: {  
            variables: true,  
          },  
        });  

        return res.status(200).json(document);  
      } catch (decryptError) {  
        console.error('Error decrypting ID:', decryptError);  
        return res.status(400).json({ error: 'Invalid document ID format' });  
      }  
    } catch (error) {  
      console.error('Error updating document:', error);  
      return res.status(500).json({ error: 'Internal server error while updating document' });  
    }  
  } else if (req.method === 'DELETE') {  
    try {  
      const { id } = req.body;  

      if (!id) {  
        return res.status(400).json({ error: 'Document ID is required' });  
      }  

      try {  
        const decryptedId = decrypt(id);  
        if (!decryptedId) {  
          return res.status(400).json({ error: 'Invalid document ID' });  
        }  

        // Delete document (variables will be deleted automatically due to cascade)  
        await prisma.documentinteractive.delete({  
          where: {  
            id: parseInt(decryptedId),  
          },  
        });  

        return res.status(200).json({ message: 'Document deleted successfully' });  
      } catch (decryptError) {  
        console.error('Error decrypting ID:', decryptError);  
        return res.status(400).json({ error: 'Invalid document ID format' });  
      }  
    } catch (error) {  
      console.error('Error deleting document:', error);  
      return res.status(500).json({ error: 'Internal server error while deleting document' });  
    }  
  } else {  
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);  
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });  
  }  
}