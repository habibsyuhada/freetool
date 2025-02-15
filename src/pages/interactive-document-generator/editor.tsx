import { useEffect, useState } from 'react';
import CoverLetterEditor from '../../components/quill/CoverLetterEditor';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import Layout from '../../components/layout/Layout';
import { useSession } from 'next-auth/react';

const EditorPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [documentData, setDocumentData] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (id && status === "authenticated") {
      const fetchDocument = async () => {
        try {
          const response = await axios.get(`/api/documentInteractive?id=${id}`);
          setDocumentData(response.data);
        } catch (error) {
          console.error("Error fetching document:", error);
          if ((error as AxiosError)?.response?.status === 404) {
            router.push('/interactive-document-generator');
          }
        }
      };
      fetchDocument();
    }
  }, [id, status, router]);

  // If loading or not authenticated, show nothing
  if (status === "loading" || !session) {
    return null;
  }

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