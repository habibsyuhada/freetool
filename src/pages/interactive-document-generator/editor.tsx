import { useEffect, useState } from 'react';  
import CoverLetterEditor from '../../components/quill/CoverLetterEditor';  
import axios from 'axios';  
import { useRouter } from 'next/router'; 

const EditorPage = () => {  
  const router = useRouter();  
  const { id } = router.query;  
  const [documentData, setDocumentData] = useState(null);  

  useEffect(() => {  
    if (id) {  
      const fetchDocument = async () => {  
        try {  
          const response = await axios.get(`/api/documentInteractive?id=${id}`);  
          setDocumentData(response.data);  
        } catch (error) {  
          console.error("Error fetching document:", error);  
        }  
      };  
      fetchDocument();  
    }  
  }, [id]);  

  return (  
    <CoverLetterEditor documentData={documentData} />  
  );  
};  

export default EditorPage;