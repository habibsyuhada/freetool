import { useSession } from 'next-auth/react';  
import { sign } from 'jsonwebtoken';  

const LinkHabitown = () => {  
  const { data: session } = useSession();  

  const handleRedirectToB = () => {  
    if (session) {  
      const secret = process.env.NEXT_PUBLIC_ENCRYPT_SECRET;
      if (!secret) {
        console.error('Encryption secret is not set');
        return;
      }

      // Buat token JWT  
      const token = sign(  
        { id: session.user.id, email: session.user.email },  
        secret,  
        { expiresIn: '1h' }  
      );  

      // Redirect ke aplikasi B dengan token  
      window.location.href = `https://app-b.com/auth?token=${token}`;  
    } else {  
      // Jika tidak ada sesi, redirect ke halaman login aplikasi A  
      window.location.href = 'https://app-a.com/login';  
    }  
  };  

  return (  
    <div>  
      <button onClick={handleRedirectToB}>Go to Application B</button>  
    </div>  
  );  
};  

export { LinkHabitown };  
