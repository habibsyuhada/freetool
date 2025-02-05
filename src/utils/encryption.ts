import crypto from 'crypto';  

const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPT_SECRET; // Kunci 32 byte dalam format hexadecimal  
const ALGORITHM = 'aes-256-cbc';  
const IV_LENGTH = 16; // Panjang IV untuk AES  

// Fungsi untuk mengenkripsi  
export const encrypt = (text: string | number): string => {  
  // Validasi input  
  if (typeof text === 'number') {  
    text = text.toString();  
  }  

  if (typeof text !== 'string') {  
    throw new Error('Input must be a string');  
  }  

  if (!SECRET_KEY) {  
    throw new Error('SECRET_KEY is not defined');  
  }  

  const iv = crypto.randomBytes(IV_LENGTH);  
  const key = Buffer.from(SECRET_KEY, 'hex');  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);  

  let encrypted = cipher.update(text, 'utf8', 'hex');  
  encrypted += cipher.final('hex');  

  return iv.toString('hex') + ':' + encrypted; // Mengembalikan IV dan teks terenkripsi  
};  

// Fungsi untuk mendekripsi  
export const decrypt = (encryptedText: string): string => {  
  if (!SECRET_KEY) {  
    throw new Error('SECRET_KEY is not defined');  
  }  

  const parts = encryptedText.split(':');  
  const iv = Buffer.from(parts.shift()!, 'hex'); // Gunakan non-null assertion (!) karena kita yakin ada nilai  
  const key = Buffer.from(SECRET_KEY, 'hex');  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);  
  
  let decrypted = decipher.update(parts.join(':'), 'hex', 'utf8');  
  decrypted += decipher.final('utf8');  
  
  return decrypted;  
};