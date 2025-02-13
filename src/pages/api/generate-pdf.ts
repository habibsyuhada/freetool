// pages/api/generate-pdf.ts  
import { NextApiRequest, NextApiResponse } from 'next';  
import puppeteer from 'puppeteer';  
import fs from 'fs'; // Pastikan fs diimpor jika Anda ingin menyimpan file  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method === 'POST') {  
    const { htmlData } = req.body;  

    // Pastikan data HTML ada  
    if (!htmlData) {  
      return res.status(400).json({ error: 'HTML data is required' });  
    }  

    // Decode HTML data  
    const decodedHtml = decodeURIComponent(htmlData);  

    const completeHtml = `  
    <html>  
      <head>  
        <style>  
          body {  
            font-family: 'Helvetica', 'Arial', sans-serif;  
          }  
        </style>  
      </head>  
      <body>  
        ${decodedHtml} <!-- Menyisipkan HTML yang diterima di sini -->  
      </body>  
    </html>`;  

    try {   
      const browser = await puppeteer.launch({ headless: true });  
      const page = await browser.newPage();  

      // Set content to the decoded HTML  
      await page.setContent(completeHtml, { waitUntil: 'domcontentloaded' });  

      // Generate PDF  
      console.log("Generating PDF...");  
      const pdfBuffer = await page.pdf({  
        format: 'A4',  
        printBackground: true,  
      });  

      await browser.close();  

      // Set response headers for PDF download  
      res.setHeader('Content-Type', 'application/pdf');  
      res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');  
      res.send(Buffer.from(pdfBuffer)); // Menggunakan Buffer.from()  
      res.end(); // Menandakan bahwa respons telah selesai  
    } catch (error) {  
      console.error("Error generating PDF:", error);  
      res.status(500).json({ error: 'Failed to generate PDF' });  
    }  
  } else {  
    res.setHeader('Allow', ['POST']);  
    res.status(405).end(`Method ${req.method} Not Allowed`);  
  }  
}