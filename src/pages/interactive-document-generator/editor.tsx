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
      title="Interactive Document Generator"
      description="Create engaging and interactive documents effortlessly with our Interactive Document Generator. Enhance your presentations and reports with dynamic content and user-friendly features."
      keywords="interactive document generator, document creation, presentations, reports, dynamic content, online document tools"
    >
      <CoverLetterEditor documentData={documentData} />
    </Layout>
  );
};

export default EditorPage;