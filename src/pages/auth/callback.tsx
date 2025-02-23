import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import Layout from '@/components/layout/Layout';
import { Container, Title, Text } from '@mantine/core';

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the access_token from the URL fragment
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');

        if (type === 'signup' && accessToken) {
          // Show success notification
          notifications.show({
            title: 'Email Verified',
            message: 'Your email has been verified successfully. You can now log in.',
            color: 'green',
            icon: <IconCheck size={16} />,
            autoClose: 5000,
          });

          // Redirect to login page after a short delay
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        }
      } catch (error) {
        console.error('Error handling email confirmation:', error);
        notifications.show({
          title: 'Error',
          message: 'Failed to verify email. Please try again.',
          color: 'red',
          autoClose: 5000,
        });
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    }

    handleEmailConfirmation()
  }, [router])

  return (
    <Layout
      title="Email Verification | FreeTool"
      description="Verify your email address to complete your FreeTool account registration."
      keywords="email verification, account verification, signup completion"
    >
      <Container size={420} style={{ 
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Title order={2} mb="md">Verifying Your Email</Title>
        <Text size="lg" c="dimmed">
          Please wait while we verify your email address...
        </Text>
      </Container>
    </Layout>
  )
} 