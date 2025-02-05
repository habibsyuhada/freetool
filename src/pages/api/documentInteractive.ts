import { NextApiRequest, NextApiResponse } from 'next';  
import { PrismaClient } from '@prisma/client';  
import { decrypt } from '../../utils/encryption';   

const prisma = new PrismaClient();  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method === 'GET') {  
    const id = typeof req.query.id === 'string' ? req.query.id : Array.isArray(req.query.id) ? req.query.id[0] : String(req.query.id);  
    console.log('ID from query:', id); // Log untuk memeriksa nilai ID  

    if (id !== 'undefined' && id) {  
      try {  
        console.log('Fetching document by ID', id);  
        const document = await prisma.documentinteractive.findUnique({  
          where: { id: Number(decrypt(id)) },  
        });  

        if (document) {  
          res.status(200).json({  
            ...document,  
            name: document.name ? decodeURIComponent(document.name) : null,  
            desc: document.desc ? decodeURIComponent(document.desc) : null,  
            document_html: document.document_html ? decodeURIComponent(document.document_html) : null,  
          });  
        } else {  
          res.status(404).end();  
        }  
      } catch (error) {  
        console.error('Decryption error:', error); // Log kesalahan dekripsi  
        res.status(500).json({ error: 'Failed to decrypt ID' });  
      }  
    } else {  
      console.log('Fetching all documents');  
      const documents = await prisma.documentinteractive.findMany();  
      res.status(200).json(  
        documents.map((document: any) => ({  
          ...document,  
          name: document.name ? decodeURIComponent(document.name) : null,  
          desc: document.desc ? decodeURIComponent(document.desc) : null,  
          document_html: document.document_html ? decodeURIComponent(document.document_html) : null,  
        })),  
      );  
    }  
  } else if (req.method === 'POST') {  
    const { name, desc, document_html, userId } = req.body;  

    const newDocument = await prisma.documentinteractive.create({  
      data: {  
        name: encodeURIComponent(name),  
        desc: desc ? encodeURIComponent(desc) : null,  
        document_html: document_html ? encodeURIComponent(document_html) : null,  
        userId: userId,  
      },  
    });  
    res.status(201).json(newDocument);  
  } else if (req.method === 'PUT') {  
    const { id, name, desc, document_html } = req.body;  

    if (!id) {  
      return res.status(400).json({ error: 'ID is required for update' }); // Validasi ID untuk PUT  
    }  
    console.log('Updating document by ID', id);
    try {  
      const updatedDocument = await prisma.documentinteractive.update({  
        where: { id: Number(decrypt(id)) },  
        data: {  
          name: encodeURIComponent(name),  
          desc: desc ? encodeURIComponent(desc) : null,  
          document_html: document_html ? encodeURIComponent(document_html) : null,  
        },  
      });  
      res.status(200).json(updatedDocument);  
    } catch (error) {  
      console.error('Decryption error:', error); // Log kesalahan dekripsi  
      res.status(500).json({ error: 'Failed to decrypt ID' });  
    }  
  } else if (req.method === 'DELETE') {  
    const { id } = req.body;  

    if (!id) {  
      return res.status(400).json({ error: 'ID is required for deletion' }); // Validasi ID untuk DELETE  
    }  

    await prisma.documentinteractive.delete({  
      where: { id },  
    });  
    res.status(204).end();  
  } else {  
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);  
    res.status(405).end(`Method ${req.method} Not Allowed`);  
  }  
}