import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Container, Title, Input, Group, ActionIcon, Text, Box } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import axios from "axios";
import { useSession } from 'next-auth/react';
import 'react-quill-new/dist/quill.snow.css';
import { encrypt } from '../../utils/encryption';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

type DocumentData = {
  id: string | number;
  name: string;
  desc: string;
  document_html: string;
  variables?: Array<{ name: string; value: string; }>;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
} | Array<{
  id: string | number;
  name: string;
  desc: string;
  document_html: string;
  variables?: Array<{ name: string; value: string; }>;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}> | null;

type Variable = {
  name: string;
  value: string;
};

const DocumentEditor = ({ documentData }: { documentData: DocumentData }) => {
  const [editorHtml, setEditorHtml] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('');
  const [documentDescription, setDocumentDescription] = useState<string>('');
  const [variables, setVariables] = useState<Variable[]>([
    { name: 'margin_top', value: '20' },
    { name: 'margin_right', value: '20' },
    { name: 'margin_bottom', value: '20' },
    { name: 'margin_left', value: '20' }
  ]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (documentData) {
      // Handle array data
      const doc = Array.isArray(documentData) ? documentData[0] : documentData;
      
      if (doc) {
        // Set document name and description
        setDocumentName(doc.name || '');
        setDocumentDescription(doc.desc || '');
        setEditorHtml(doc.document_html || '');

        // Handle variables
        if (doc.variables && doc.variables.length > 0) {
          // Pastikan semua margin variables ada
          const marginVariables = ['margin_top', 'margin_right', 'margin_bottom', 'margin_left'];
          const existingMargins = doc.variables.filter(v => v.name.startsWith('margin_'));
          const missingMargins = marginVariables
            .filter(margin => !existingMargins.find(v => v.name === margin))
            .map(margin => ({ name: margin, value: '20' }));

          // Gabungkan margin yang ada dengan yang default
          const allVariables = [
            ...existingMargins,
            ...missingMargins,
            ...doc.variables.filter(v => !v.name.startsWith('margin_'))
          ];

          setVariables(allVariables);
        }
      }
    }
  }, [documentData]);

  const handleAddVariable = () => {
    setVariables([...variables, { name: '', value: '' }]);
  };

  const handleRemoveVariable = (index: number) => {
    const variable = variables[index];
    // Prevent removal of margin variables
    if (variable.name.startsWith('margin_')) {
      alert('Margin variables cannot be removed');
      return;
    }
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
  };

  const handleVariableChange = (index: number, field: 'name' | 'value', value: string) => {
    const newVariables = [...variables];
    const variable = newVariables[index];
    
    // Prevent changing margin variable names
    if (field === 'name' && variable.name.startsWith('margin_')) {
      alert('Margin variable names cannot be changed');
      return;
    }
    
    newVariables[index][field] = value;
    setVariables(newVariables);
  };

  const insertVariable = (variableName: string) => {
    const variable = `{{${variableName}}}`;
    const editor = (document.querySelector('.ql-editor') as HTMLElement);
    if (editor) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const textNode = document.createTextNode(variable);
        range.insertNode(textNode);
      } else {
        editor.innerHTML += variable;
      }
    }
  };

  const handleSave = async () => {
    if (!session || !session.user) {
      alert('You need to be logged in to save a document.');
      return;
    }
    if (documentName === '') {
      alert('Please enter document name.');
      return;
    }

    // Ensure all margin variables exist
    const defaultMargins = [
      { name: 'margin_top', value: '20' },
      { name: 'margin_right', value: '20' },
      { name: 'margin_bottom', value: '20' },
      { name: 'margin_left', value: '20' }
    ];

    const existingMarginNames = variables.filter(v => v.name.startsWith('margin_')).map(v => v.name);
    const missingMargins = defaultMargins.filter(
      margin => !existingMarginNames.includes(margin.name)
    );

    // Add any missing margin variables
    const allVariables = [...variables, ...missingMargins];

    const url = "/api/documentInteractive";
    const method = documentData ? 'put' : 'post';
    const doc = Array.isArray(documentData) ? documentData[0] : documentData;
    const encryptedId = doc?.id ? encrypt(doc.id.toString()) : undefined;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    };

    try {
      let requestData;
      if (method === 'put') {
        requestData = {
          id: encryptedId,
          name: documentName,
          desc: documentDescription,
          document_html: editorHtml,
          variables: allVariables,
        };
      } else {
        requestData = {
          name: documentName,
          desc: documentDescription,
          document_html: editorHtml,
          variables: allVariables,
        };
      }

      const response = await axios[method](url, requestData, config);

      if (response.status === 200 || response.status === 201) {
        if (!documentData) {
          router.push('/interactive-document-generator');
        } else {
          alert('Document saved successfully!');
        }
      }
    } catch (error: any) {
      console.error('Error saving document:', error.response?.data || error);
      const errorMessage = error.response?.data?.error || 'Failed to save document. Please try again.';
      alert(errorMessage);
    }
  };

  // Sort variables to show margins first
  const sortedVariables = [
    ...variables.filter(v => v.name.startsWith('margin_')),
    ...variables.filter(v => !v.name.startsWith('margin_'))
  ];

  return (
    <Container pt="xl">
      <Title order={2} mb="md">Document Editor</Title>
      <Input.Wrapper mb="md" label="Document Name">
        <Input onChange={(e) => setDocumentName(e.target.value)} value={documentName} />
      </Input.Wrapper>
      <Input.Wrapper mb="md" label="Document Description">
        <Input onChange={(e) => setDocumentDescription(e.target.value)} value={documentDescription} />
      </Input.Wrapper>

      <Box mb="md">
        <Group style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <Text style={{ fontWeight: 500 }}>Variables</Text>
          <Button size="xs" onClick={handleAddVariable}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <IconPlus size={14} />
              <span>Add Variable</span>
            </div>
          </Button>
        </Group>
        {sortedVariables.map((variable, index) => (
          <Group key={index} style={{ marginBottom: '0.5rem' }}>
            <Input
              placeholder="Variable name"
              value={variable.name}
              onChange={(e) => handleVariableChange(index, 'name', e.target.value)}
              style={{ flex: 1 }}
              disabled={variable.name.startsWith('margin_')}
            />
            <Input
              placeholder="Default value"
              value={variable.value}
              onChange={(e) => handleVariableChange(index, 'value', e.target.value)}
              style={{ flex: 1 }}
              type={variable.name.startsWith('margin_') ? 'number' : 'text'}
              min={variable.name.startsWith('margin_') ? "0" : undefined}
              max={variable.name.startsWith('margin_') ? "100" : undefined}
            />
            <Button size="xs" onClick={() => insertVariable(variable.name)}>Insert</Button>
            <ActionIcon 
              color="red" 
              onClick={() => handleRemoveVariable(index)}
              disabled={variable.name.startsWith('margin_')}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        ))}
      </Box>

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