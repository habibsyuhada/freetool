import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Button, Container, Title, Input, Group, ActionIcon, Text, Box } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
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
  variables?: Array<{ name: string; value: string; }>;
} | null;

type Variable = {
  name: string;
  value: string;
};

const DocumentEditor = ({ documentData }: { documentData: DocumentData }) => {
  const [editorHtml, setEditorHtml] = useState<string>('');
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');
  const [variables, setVariables] = useState<Variable[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (documentData) {
      setDocumentName(documentData.name);
      setDocumentDescription(documentData.desc);
      setEditorHtml(documentData.document_html);
      if (documentData.variables) {
        setVariables(documentData.variables);
      } else {
        // Set default margin variables for new documents
        setVariables([
          { name: 'margin_top', value: '20' },
          { name: 'margin_right', value: '20' },
          { name: 'margin_bottom', value: '20' },
          { name: 'margin_left', value: '20' }
        ]);
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

    const userId = session.user.id;
    const url = "/api/documentInteractive";
    const method = documentData ? 'put' : 'post';
    const encryptedId = encrypt(documentData?.id.toString() || '0');

    try {
      const datasent = {
        id: method === 'put' ? encryptedId : '0',
        name: documentName,
        desc: documentDescription,
        document_html: editorHtml,
        userId: userId,
        variables: allVariables,
      };
      await axios[method](url, datasent);

      if (!documentData) {
        router.push('/interactive-document-generator');
      } else {
        alert('Document saved successfully!');
      }
    } catch (error) {
      console.error('Error saving document:', error);
      alert('Failed to save document. Please try again.');
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