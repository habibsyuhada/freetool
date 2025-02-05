import { useState, useEffect } from "react";  
import { Group, Button, Container } from '@mantine/core';  
import { DataTable } from 'mantine-datatable';  
import { IconPlus } from "@tabler/icons-react";  
import Link from "next/link";  
import axios from "axios";  
import 'mantine-datatable/styles.css';  
import { encrypt } from '../../utils/encryption'; 

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
            <Button variant="light" color="blue" size="xs">  
              Edit  
            </Button>  
          </Link>  
        </Group>  
      ),  
    },  
  ];  

  const [dataDocument, setDataDocument] = useState<DocumentData[]>([]);

  useEffect(() => {  
    const fetchData = async () => {  
      try {  
        const response = await axios.get(`/api/documentInteractive`);
        setDataDocument(response.data as DocumentData[]);  
      } catch (error) {  
        console.error("Error fetching data:", error);  
      }  
    };  

    fetchData();  
  }, []);  

  return (  
    <Container pt="xl">  
      <Link href="/interactive-document-generator/editor">  
        <Button variant="filled"><IconPlus stroke={4} />&nbsp;Add New Document</Button>  
      </Link>  
      <DataTable  
        mt="xl"  
        columns={columns}  
        records={dataDocument}  
        noRecordsText="No records found"  
      />  
    </Container>  
  );  
};  

export default HomePage;