import { useEffect, useState } from 'react';
import { Container, Title, Text, Loader, Alert, Button, Modal } from '@mantine/core';
import { useRouter } from 'next/router';
import axios, { AxiosError } from 'axios';
import Layout from "@/components/layout/Layout";
import VariableEditor from '@/components/quill/VariableEditor';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type DocumentData = {
	id: string;
	name: string;
	desc: string;
	document_html: string;
	variables?: Array<{ name: string; value: string; }>;
};

const DocumentView = () => {
	const router = useRouter();
	const { id } = router.query;
	const [documentData, setDocumentData] = useState<DocumentData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showVariableEditor, setShowVariableEditor] = useState(false);
	const [currentHtml, setCurrentHtml] = useState('');
	const [variableValues, setVariableValues] = useState<Record<string, string>>({});
	const { data: session, status } = useSession();

	// Fungsi untuk mengganti variabel dengan nilainya
	const replaceVariablesWithValues = (text: string, variables: Array<{ name: string; value: string }>, values: Record<string, string>) => {
		let result = text;
		variables.forEach(variable => {
			const regex = new RegExp(`{{${variable.name}}}`, 'g');
			const currentValue = values[variable.name] || variable.value;
			result = result.replace(regex, currentValue);
		});
		return result;
	};

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
			return;
		}

		const fetchDocument = async () => {
			if (id && status === "authenticated") {
				try {
					const response = await axios.get(`/api/documentInteractive?id=${id}`);
					setDocumentData(response.data);

					// Initialize variable values
					if (response.data.variables) {
						const initialValues: Record<string, string> = {};
						response.data.variables.forEach((variable: { name: string; value: string }) => {
							initialValues[variable.name] = variable.value;
						});
						setVariableValues(initialValues);

						// Replace variables in HTML with their values
						const htmlWithValues = replaceVariablesWithValues(
							response.data.document_html,
							response.data.variables,
							initialValues
						);
						setCurrentHtml(htmlWithValues);
					} else {
						setCurrentHtml(response.data.document_html);
					}
				} catch (error) {
					console.error("Error fetching document:", error);
					if ((error as AxiosError)?.response?.status === 404) {
						setError("Document not found");
						router.push('/interactive-document-generator');
					} else {
						setError("Failed to fetch document");
					}
				} finally {
					setLoading(false);
				}
			}
		};

		fetchDocument();
	}, [id, status, router]);

	const handleVariableSave = (newValues: Record<string, string>) => {
		setVariableValues(newValues);
		if (documentData && documentData.variables) {
			// Update the displayed HTML with new variable values
			const newHtml = replaceVariablesWithValues(
				documentData.document_html,
				documentData.variables,
				newValues
			);
			setCurrentHtml(newHtml);
		}
		setShowVariableEditor(false);
	};

	const copyToClipboard = () => {
		if (!documentData || !documentData.variables) return;

		try {
			// Replace variables with their values
			const textWithVariables = replaceVariablesWithValues(
				documentData.document_html,
				documentData.variables,
				variableValues
			);

			// Remove HTML tags and copy
			const cleanText = textWithVariables.replace(/<[^>]+>/g, '').trim();

			// Create temporary textarea
			const textarea = document.createElement('textarea');
			textarea.value = cleanText;
			textarea.style.position = 'fixed';
			textarea.style.opacity = '0';
			document.body.appendChild(textarea);

			// Select and copy
			textarea.select();
			document.execCommand('copy');

			// Cleanup
			document.body.removeChild(textarea);

			alert("Text copied to clipboard!");
		} catch (err) {
			console.error("Failed to copy text:", err);
			alert("Failed to copy text. Please try again.");
		}
	};

	const handleDownloadPdf = async () => {
		if (documentData) {
			const htmlData = encodeURIComponent(currentHtml);

			// Menggunakan documentData.variables untuk mendapatkan nama margin dan variableValues untuk nilai terbaru
			const margins = documentData.variables?.reduce((acc, v) => {
				if (v.name.startsWith('margin_')) {
					// Mengambil nilai dari variableValues yang terbaru
					acc[v.name] = variableValues[v.name] || v.value;
				}
				return acc;
			}, {} as Record<string, string>);

			const response = await axios.post('/api/generate-pdf',
				{
					htmlData,
					margins
				},
				{
					responseType: 'blob'
				}
			);

			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', `${documentData.name}.pdf`);
			document.body.appendChild(link);
			link.click();
			link.remove();
		}
	};

	// If loading or not authenticated, show nothing
	if (status === "loading" || !session) {
		return null;
	}

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
			title={`${documentData?.name || 'Document'} | Interactive Document Viewer`}
			description={`View, download as PDF, or copy text from "${documentData?.name || 'your document'}". ${documentData?.desc || 'Access your interactive document with our user-friendly document viewer.'}`}
			keywords="document viewer, PDF download, interactive document, document sharing, text copy, document management"
		>
			<Container mt={30}>
				<Title order={2}>{documentData?.name}</Title>
				<Text>{documentData?.desc}</Text>

				{documentData?.variables && documentData.variables.length > 0 && (
					<Button mt="md" onClick={() => setShowVariableEditor(true)} color="blue">
						Edit Variables
					</Button>
				)}

				<style>
					{`
						.ql-editor {
							font-family: 'Helvetica', 'Arial', sans-serif;
						}
						
						/* Quill editor alignment styles */
						.ql-align-center {
							text-align: center;
						}
						.ql-align-right {
							text-align: right;
						}
						.ql-align-justify {
							text-align: justify;
						}
						
						/* Quill editor list styles */
						.ql-editor ul {
							padding-left: 1.5em;
							list-style-type: disc;
						}
						.ql-editor ol {
							padding-left: 1.5em;
							list-style-type: decimal;
						}
						
						/* Quill editor text styles */
						.ql-editor strong {
							font-weight: bold;
						}
						.ql-editor em {
							font-style: italic;
						}
						.ql-editor u {
							text-decoration: underline;
						}
						
						/* Quill editor heading styles */
						.ql-editor h1 {
							font-size: 2em;
							margin-top: 0.67em;
							margin-bottom: 0.67em;
						}
						.ql-editor h2 {
							font-size: 1.5em;
							margin-top: 0.83em;
							margin-bottom: 0.83em;
						}
					`}
				</style>

				<div id="document-content" className="ql-editor" dangerouslySetInnerHTML={{ __html: currentHtml }} />

				<Button mt="md" onClick={handleDownloadPdf} color="green">Download PDF</Button>
				<Button mt="md" onClick={copyToClipboard} color="blue" ml="xs">Copy Text</Button>
				<Link href="/interactive-document-generator">
					<Button mt="md" style={{ marginTop: '20px' }} mx={"xs"} color="gray">{documentData ? 'Back' : 'Cancel'}</Button>
				</Link>

				{/* Variable Editor Modal */}
				<Modal
					opened={showVariableEditor}
					onClose={() => setShowVariableEditor(false)}
					title="Edit Document Variables"
					size="lg"
					centered
					styles={{
						inner: {
							paddingTop: 0,
						},
						body: {
							paddingTop: 0,
							maxHeight: 'calc(100vh - 200px)', // Memberikan ruang untuk header
							overflowY: 'auto' // Memungkinkan scroll jika konten terlalu panjang
						},
						root: {
							zIndex: 1001
						},
						content: {
							marginTop: '60px' // Memberikan jarak dari header
						}
					}}
				>
					{documentData?.variables && (
						<VariableEditor
							variables={[
								...documentData.variables.filter(v => v.name.startsWith('margin_')),
								...documentData.variables.filter(v => !v.name.startsWith('margin_'))
							]}
							initialValues={variableValues}
							onSave={handleVariableSave}
							onCancel={() => setShowVariableEditor(false)}
						/>
					)}
				</Modal>
			</Container>
		</Layout>
	);
};

export default DocumentView;