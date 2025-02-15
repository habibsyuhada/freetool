import { useEffect, useState } from 'react';
import CoverLetterEditor from '../../components/quill/CoverLetterEditor';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';

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
    <Layout
      title="Create Document | FreeTool Interactive Document Generator"
      description="Create and edit interactive documents for free with FreeTool's Document Generator. Design professional documents, letters, and reports with our user-friendly editor featuring rich text formatting and instant preview."
      keywords="free document generator, online document editor, interactive document creator, free document tools, professional document maker, rich text editor"
    >
      <CoverLetterEditor documentData={documentData} />
    </Layout>
  );
};

export default EditorPage;