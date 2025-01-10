   // app/qrcode/page.tsx
   "use client";

   import React, { useState } from "react";
   import QRCodeComponent from "../../components/QRCodeComponent";

   export default function QRCodeGenerator() {
     const [inputValue, setInputValue] = useState("https://example.com");
     const [color, setColor] = useState("#4267b2");
     const [backgroundColor, setBackgroundColor] = useState("#e9ebee");

     const qrOptions = {
       dotsOptions: {
         color: color,
         type: "rounded"
       },
       backgroundOptions: {
         color: backgroundColor,
       }
     };

     return (
       <div className="min-h-screen flex flex-col items-center justify-center p-8">
         <h1 className="text-4xl font-bold mb-4">QR Code Generator</h1>
         <div className="flex flex-col items-center gap-4">
           <input
             type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="Enter text or URL"
             className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded"
           />
           <div className="flex gap-4">
             <label>
               Dots Color:
               <input
                 type="color"
                 value={color}
                 onChange={(e) => setColor(e.target.value)}
                 className="ml-2"
               />
             </label>
             <label>
               Background Color:
               <input
                 type="color"
                 value={backgroundColor}
                 onChange={(e) => setBackgroundColor(e.target.value)}
                 className="ml-2"
               />
             </label>
           </div>
           <QRCodeComponent data={inputValue} options={qrOptions} />
         </div>
       </div>
     );
   }