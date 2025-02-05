import { useState, useEffect } from "react";
import { Group, Button, Container, Alert } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconPlus, IconTrash, IconEdit, IconEye } from "@tabler/icons-react";
import Link from "next/link";
import axios from "axios";
import 'mantine-datatable/styles.css';
import { encrypt } from '../../utils/encryption';
import Layout from "@/components/layout/Layout";

const HomePage = () => {
  type DocumentData = { id: number; name: string; desc: string; };

  const columns = [
    {
      accessor: 'name',
      title: 'Document Name',
    },
    {
      accessor: 'desc',
      title: 'Document Description',
    },
    {
      accessor: 'Action',
      width: '0%',
      render: (dataDocument: DocumentData) => (
        <Group gap={4} wrap="nowrap">
          <Link href={`/interactive-document-generator/editor?id=${encrypt(dataDocument.id)}`}>
            <Button variant="outline" color="blue" size="xs">
              <IconEdit size={16} />&nbsp; Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            color="red"
            size="xs"
            onClick={() => handleDelete(dataDocument.id)}
          >
            <IconTrash size={16} />&nbsp; Delete
          </Button>
          <Link href={`/interactive-document-generator/${encrypt(dataDocument.id)}`}>
            <Button variant="outline" color="cyan" size="xs">
              <IconEye size={16} />&nbsp; View
            </Button>
          </Link>
        </Group>
      ),
    },
  ];

  const [dataDocument, setDataDocument] = useState<DocumentData[]>([]);
  const [error, setError] = useState<string | null>(null); // State untuk menyimpan pesan kesalahan  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/documentInteractive`);
        setDataDocument(response.data as DocumentData[]);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch documents.");
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this document?")) {
      try {
        // Mengirim ID dalam body permintaan DELETE  
        await axios.delete(`/api/documentInteractive`, { data: { id: encrypt(id) } });
        setDataDocument((prev) => prev.filter((doc) => doc.id !== id)); // Perbarui state setelah penghapusan  
        alert("Document deleted successfully!");
      } catch (error) {
        console.error("Error deleting document:", error);
        alert("Failed to delete document. Please try again.");
      }
    }
  };

  return (
    <Layout
      title="Interactive Document Generator"
      description="Create engaging and interactive documents effortlessly with our Interactive Document Generator. Enhance your presentations and reports with dynamic content and user-friendly features."
      keywords="interactive document generator, document creation, presentations, reports, dynamic content, online document tools"
    >
      <Container pt="xl">
        <Link href="/interactive-document-generator/editor">
          <Button variant="filled"><IconPlus stroke={4} />&nbsp;Add New Document</Button>
        </Link>
        {error && <Alert color="red">{error}</Alert>} {/* Tampilkan pesan kesalahan jika ada */}
        <DataTable
          mt="xl"
          columns={columns}
          records={dataDocument}
          noRecordsText="No records found"
        />
      </Container>
    </Layout>
  );
};

export default HomePage;