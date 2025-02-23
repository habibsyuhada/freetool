// types/next-auth.d.ts  
import 'next-auth';  
import { DefaultSession } from 'next-auth';  

declare module 'next-auth' {  
  interface User {  
    id: string; // Pastikan id ada di sini  
    token?: string; // Tambahkan properti token  
    name?: string | null;
  }  

  interface Session extends DefaultSession {  
    user: User; // Gunakan User yang telah didefinisikan  
  }  

  interface JWT {  
    id?: string;  
    token?: string; // Tambahkan properti token  
    name?: string | null;
  }  
}