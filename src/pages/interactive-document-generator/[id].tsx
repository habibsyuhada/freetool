import { useEffect, useState } from 'react';  
import { Container, Title, Text, Loader, Alert, Button } from '@mantine/core';  
import { useRouter } from 'next/router';  
import axios from 'axios';  
import { PDFDownloadLink, Document, Page, View, StyleSheet } from '@react-pdf/renderer';  
import { Parser } from 'html-to-react';  

// Gaya untuk PDF  
const styles = StyleSheet.create({  
  page: {  
    flexDirection: 'column',  
    padding: 30,  
  },  
  section: {  
    margin: 10,  
    padding: 10,  
    flexGrow: 1,  
  },  
  textCenter: {  
    textAlign: 'center',  
  },  
  textJustify: {  
    textAlign: 'justify',  
  },  
});  

// Komponen untuk mengonversi HTML menjadi komponen React  
const HtmlToPdf = ({ html }) => {  
  const htmlToReactParser = new Parser();  
  return htmlToReactParser.parse(html);  
};  

// Komponen PDF  
const MyDocument = ({ htmlContent }) => (  
  <Document>  
    <Page size="A4" style={styles.page}>  
      <View style={styles.section}>  
        <HtmlToPdf html={htmlContent} />  
      </View>  
    </Page>  
  </Document>  
);  

const DocumentView = () => {  
  const router = useRouter();  
  const { id } = router.query; // Ambil ID dari URL  
  const [documentData, setDocumentData] = useState<any>(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {  
    const fetchDocument = async () => {  
      if (id) {  
        try {  
          const response = await axios.get(`/api/documentInteractive?id=${id}`);  
          setDocumentData(response.data);  
          console.log("Fetched document data:", response.data); // Debugging  
        } catch (error) {  
          console.error("Error fetching document:", error);  
          setError("Failed to fetch document.");  
        } finally {  
          setLoading(false);  
        }  
      }  
    };  

    fetchDocument();  
  }, [id]);  

  const copyToClipboard = () => {  
    const textToCopy = documentData.document_html.replace(/<[^>]+>/g, ''); // Menghapus tag HTML  
    navigator.clipboard.writeText(textToCopy)  
      .then(() => {  
        alert("Text copied to clipboard!");  
      })  
      .catch((err) => {  
        console.error("Failed to copy text: ", err);  
      });  
  };  

  if (loading) {  
    return (  
      <Container>  
        <Loader />  
      </Container>  
    );  
  }  

  if (error) {  
    return (  
      <Container>  
        <Alert color="red">{error}</Alert>  
      </Container>  
    );  
  }  

  return (  
    <Container mt={30}>  
      <Title order={2}>{documentData.name}</Title>  
      <Text>{documentData.desc}</Text>  
      <div id="document-content" dangerouslySetInnerHTML={{ __html: documentData.document_html }} /> {/* Tampilkan konten HTML */}  
      <PDFDownloadLink document={<MyDocument htmlContent={documentData.document_html} />} fileName={`${documentData.name}.pdf`}>  
        {({ blob, url, loading, error }) =>  
          loading ? 'Loading document...' : 'Download PDF'  
        }  
      </PDFDownloadLink>  
      <Button mt="md" onClick={copyToClipboard} color="blue">Copy Text</Button>  
    </Container>  
  );  
};  

export default DocumentView;