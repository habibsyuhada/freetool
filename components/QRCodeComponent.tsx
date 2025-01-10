// components/QRCodeComponent.tsx
import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const QRCodeComponent = ({ data, options }) => {
  const qrCodeRef = useRef(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 300,
      height: 300,
      data: data,
      ...options
    });

    qrCode.append(qrCodeRef.current);
  }, [data, options]);

  return <div ref={qrCodeRef} />;
};

export default QRCodeComponent;