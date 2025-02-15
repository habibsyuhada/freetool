import { useEffect, useState } from 'react';
import { Container, Title, Text, Loader, Alert, Button } from '@mantine/core';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from "@/components/layout/Layout";

const DocumentView = () => {
	const router = useRouter();
	const { id } = router.query; // Ambil ID dari URL  
	const [documentData, setDocumentData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDocument = async () => {
			if (id) {
				try {
					const response = await axios.get(`/api/documentInteractive?id=${id}`);
					setDocumentData(response.data);
					console.log("Fetched document data:", response.data); // Debugging  
				} catch (error) {
					console.error("Error fetching document:", error);
					setError(null); // Reset to null to match type
					setError("Failed to fetch document" as any); // Type assertion to allow string
				} finally {
					setLoading(false);
				}
			}
		};

		fetchDocument();
	}, [id]);
	const copyToClipboard = () => {
		if (!documentData) return;
		const textToCopy = (documentData as any).document_html.replace(/<[^>]+>/g, ''); // Menghapus tag HTML  
		navigator.clipboard.writeText(textToCopy)
			.then(() => {
				alert("Text copied to clipboard!");
			})
			.catch((err) => {
				console.error("Failed to copy text: ", err);
			});
	};

	const handleDownloadPdf = async () => {
		if (documentData) {
			const htmlData = encodeURIComponent((documentData as any).document_html);
			const response = await axios.post('/api/generate-pdf', { htmlData }, { responseType: 'blob' });

			// Log untuk memeriksa status respons dan ukuran data  
			console.log(`Response Status: ${response.status}`);
			console.log(`Response Data Size: ${response.data.size} bytes`);

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${(documentData as any).name}.pdf`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		}
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
		<Layout
			title={`${(documentData as any)?.name || 'Document'} | Interactive Document Viewer`}
			description={`View, download as PDF, or copy text from "${(documentData as any)?.name || 'your document'}". ${(documentData as any)?.desc || 'Access your interactive document with our user-friendly document viewer.'}`}
			keywords="document viewer, PDF download, interactive document, document sharing, text copy, document management"
		>
			<Container mt={30}>
				<Title order={2}>{(documentData as any)?.name}</Title>
				<Text>{(documentData as any)?.desc}</Text>
				<div id="document-content" dangerouslySetInnerHTML={{ __html: (documentData as any)?.document_html ?? '' }} /> {/* Tampilkan konten HTML */}
				<Button mt="md" onClick={handleDownloadPdf} color="green">Download PDF</Button>
				<Button mt="md" onClick={copyToClipboard} color="blue">Copy Text</Button>
			</Container>
		</Layout>
	);
};

export default DocumentView;