import { NextApiRequest, NextApiResponse } from 'next';  
import { PrismaClient } from '@prisma/client';  
import { decrypt } from '../../utils/encryption';   

const prisma = new PrismaClient();  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method === 'GET') {  
    try {  
      const { id } = req.query;  

      if (id && typeof id === 'string') {  
        try {  
          const decryptedId = decrypt(id);  
          if (!decryptedId) {  
            return res.status(400).json({ error: 'Invalid document ID' });  
          }  

          // Get single document with variables  
          const document = await prisma.documentinteractive.findUnique({  
            where: {  
              id: parseInt(decryptedId),  
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
        // Get all documents  
        const documents = await prisma.documentinteractive.findMany();  
        return res.status(200).json(documents);  
      }  
    } catch (error) {  
      console.error('Error fetching document:', error);  
      return res.status(500).json({ error: 'Internal server error while fetching document' });  
    }  
  } else if (req.method === 'POST') {  
    try {  
      const { name, desc, document_html, userId, variables = [] } = req.body;  

      if (!name || !userId) {  
        return res.status(400).json({ error: 'Name and userId are required' });  
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

      // Create document with variables  
      const document = await prisma.documentinteractive.create({  
        data: {  
          name,  
          desc: desc || '',  
          document_html: document_html || '',  
          userId,  
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
      const { id, name, desc, document_html, userId, variables } = req.body;  

      if (!id || !name || !userId) {  
        return res.status(400).json({ error: 'ID, name, and userId are required' });  
      }  

      try {  
        const decryptedId = decrypt(id);  
        if (!decryptedId) {  
          return res.status(400).json({ error: 'Invalid document ID' });  
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
            userId,  
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