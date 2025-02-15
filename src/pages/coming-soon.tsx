import { Container, Title, Text, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function ComingSoon() {
  return (
    <Layout 
      title="Coming Soon | New FreeTool Features"
      description="Exciting new features are coming to FreeTool! Stay tuned for additional free online tools and enhanced capabilities to help streamline your workflow. Join our growing collection of free professional tools."
      keywords="upcoming features, free tools, new online tools, free utilities, professional tools, web applications"
    >
      <Container 
        style={{ 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '2rem'
        }}
      >
        <Title
          order={1}
          style={{
            fontSize: '3rem',
            background: 'linear-gradient(45deg, #228BE6 0%, #40C057 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}
        >
          Coming Soon
        </Title>
        
        <Text size="xl" mb={30} c="dimmed" maw={600}>
          We&apos;re working hard to bring you something amazing. 
          Stay tuned for updates!
        </Text>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: '#228BE6', to: '#40C057', deg: 45 }}
            leftSection={<IconArrowLeft size={20} />}
          >
            Back to Home
          </Button>
        </Link>
      </Container>
    </Layout>
  );
} 