import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Container, Title, Input } from '@mantine/core';
import axios from "axios";
import { useSession } from 'next-auth/react';
import 'react-quill-new/dist/quill.snow.css';
import './style.css';
import { encrypt } from '../../utils/encryption';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type DocumentData = {
  id: string;
  name: string;
  desc: string;
  document_html: string;
} | null;

const DocumentEditor = ({ documentData }: { documentData: DocumentData }) => {
  const [editorHtml, setEditorHtml] = useState<string>('');
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (documentData) {
      setDocumentName(documentData.name);
      setDocumentDescription(documentData.desc);
      setEditorHtml(documentData.document_html);
    }
  }, [documentData]);

  const handleSave = async () => {
    if (!session || !session.user) {
      alert('You need to be logged in to save a document.');
      return;
    }
    if (documentName === '') {
      alert('Please enter document name.');
      return;
    }

    const userId = session.user.id;
    const url = "/api/documentInteractive";
    const method = documentData ? 'put' : 'post';
    const encryptedId = encrypt(documentData?.id.toString() || '0');

    try {
      const datasent = { id: method === 'put' ? encryptedId : '0', name: documentName, desc: documentDescription, document_html: editorHtml, userId: userId, };
      await axios[method](url, datasent);

      if (!documentData) {  
        router.push('/interactive-document-generator'); // Redirect ke halaman yang diinginkan  
      }  
      else{
        alert('Document saved successfully!');
      }
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save document. Please try again.');
    }
  };

  return (
    <Container pt="xl">
      <Title order={2} mb="md">Document Editor</Title>
      <Input.Wrapper mb="md" label="Document Name">
        <Input onChange={(e) => setDocumentName(e.target.value)} value={documentName} />
      </Input.Wrapper>
      <Input.Wrapper mb="md" label="Document Description">
        <Input onChange={(e) => setDocumentDescription(e.target.value)} value={documentDescription} />
      </Input.Wrapper>
      <ReactQuill
        value={editorHtml}
        onChange={setEditorHtml}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            [{ color: [] }, { background: [] }],
            ['clean'],
          ],
        }}
        theme="snow"
      />
      <Button onClick={handleSave} mt="md" style={{ marginTop: '20px' }} mx={"xs"}>Save Document</Button>
      <Link href="/interactive-document-generator">
        <Button mt="md" style={{ marginTop: '20px' }} mx={"xs"} color="gray">{documentData ? 'Back' : 'Cancel'}</Button>
      </Link>

    </Container>
  );
};

export default DocumentEditor;