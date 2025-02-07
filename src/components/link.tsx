import { useSession } from 'next-auth/react';  
import { sign } from 'jsonwebtoken';  

const linkHabitown = () => {  
  const { data: session } = useSession();  

  const handleRedirectToB = () => {  
    if (session) {  
      // Buat token JWT  
      const token = sign(  
        { id: session.user.id, email: session.user.email },  
        process.env.NEXT_PUBLIC_ENCRYPT_SECRET,  
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

export {linkHabitown};  
