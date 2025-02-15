// pages/api/generate-pdf.ts  
import { NextApiRequest, NextApiResponse } from 'next';  
import puppeteer from 'puppeteer';  

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  if (req.method !== 'POST') {  
    return res.status(405).json({ message: 'Method not allowed' });  
  }  

  try {  
    const { htmlData, margins } = req.body;  
    const decodedHtml = decodeURIComponent(htmlData);  

    // Set default margins if not provided  
    const defaultMargins = {  
      top: '20',  
      right: '20',  
      bottom: '20',  
      left: '20'  
    };  

    const pdfMargins = {  
      top: `${margins?.margin_top || defaultMargins.top}mm`,  
      right: `${margins?.margin_right || defaultMargins.right}mm`,  
      bottom: `${margins?.margin_bottom || defaultMargins.bottom}mm`,  
      left: `${margins?.margin_left || defaultMargins.left}mm`,  
    };  

    const browser = await puppeteer.launch({  
      headless: true,  
      args: ['--no-sandbox']  
    });  

    const page = await browser.newPage();  
    await page.setContent(decodedHtml, { waitUntil: 'networkidle0' });  

    const pdf = await page.pdf({  
      format: 'A4',  
      margin: pdfMargins,  
      printBackground: true  
    });  

    await browser.close();  

    res.setHeader('Content-Type', 'application/pdf');  
    res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');  
    res.send(pdf);  
  } catch (error) {  
    console.error('Error generating PDF:', error);  
    res.status(500).json({ message: 'Error generating PDF' });  
  }  
}