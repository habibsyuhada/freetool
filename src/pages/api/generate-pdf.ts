// pages/api/generate-pdf.ts  
import { NextApiRequest, NextApiResponse } from 'next';  
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method === 'POST') {  
    const { htmlData, margins } = req.body;  

    // Pastikan data HTML ada  
    if (!htmlData) {  
      return res.status(400).json({ error: 'HTML data is required' });  
    }  

    // Set default margins jika tidak ada
    const defaultMargins = {
      margin_top: '20',
      margin_right: '20',
      margin_bottom: '20',
      margin_left: '20'
    };

    // Gabungkan default margins dengan margins yang diterima
    const finalMargins = { ...defaultMargins, ...margins };

    // Decode HTML data  
    const decodedHtml = decodeURIComponent(htmlData);  

    const completeHtml = `  
    <html>  
      <head>  
        <style>  
          body {  
            font-family: 'Helvetica', 'Arial', sans-serif;
            padding: 0;
            margin: 0;
          }
          
          /* Quill editor alignment styles */
          .ql-align-center {
            text-align: center;
          }
          .ql-align-right {
            text-align: right;
          }
          .ql-align-justify {
            text-align: justify;
          }
          
          /* Quill editor list styles */
          .ql-editor ul {
            padding-left: 1.5em;
            list-style-type: disc;
          }
          .ql-editor ol {
            padding-left: 1.5em;
            list-style-type: decimal;
          }
          
          /* Quill editor text styles */
          .ql-editor strong {
            font-weight: bold;
          }
          .ql-editor em {
            font-style: italic;
          }
          .ql-editor u {
            text-decoration: underline;
          }
          
          /* Quill editor heading styles */
          .ql-editor h1 {
            font-size: 2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
          }
          .ql-editor h2 {
            font-size: 1.5em;
            margin-top: 0.83em;
            margin-bottom: 0.83em;
          }
        </style>  
      </head>  
      <body>  
        ${decodedHtml}
      </body>  
    </html>`;  

    try {   
      const chromiumPack = "https://my-domain/chromium-v121.0.0-pack.tar";
      const browser = await puppeteer.launch({ 
        headless: true,
        executablePath: await chromium.executablePath(chromiumPack),
        args: chromium.args
      });  
      const page = await browser.newPage();  

      // Set content to the decoded HTML  
      await page.setContent(completeHtml, { waitUntil: 'domcontentloaded' });  

      // Generate PDF with margins  
      console.log("Generating PDF...");  
      const pdfBuffer = await page.pdf({  
        format: 'A4',  
        printBackground: true,
        margin: {
          top: `${finalMargins.margin_top}mm`,
          right: `${finalMargins.margin_right}mm`,
          bottom: `${finalMargins.margin_bottom}mm`,
          left: `${finalMargins.margin_left}mm`
        }
      });  

      await browser.close();  

      // Set response headers for PDF download  
      res.setHeader('Content-Type', 'application/pdf');  
      res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');  
      res.send(Buffer.from(pdfBuffer));
      res.end();
    } catch (error) {  
      console.error("Error generating PDF:", error);  
      res.status(500).json({ error: 'Failed to generate PDF' });  
    }  
  } else {  
    res.setHeader('Allow', ['POST']);  
    res.status(405).end(`Method ${req.method} Not Allowed`);  
  }  
}