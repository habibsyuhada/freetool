import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from '@/components/layout/Layout';
import { Container, Text, Loader, Center, Alert } from '@mantine/core';

export default function TaskManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const getTokenAndRedirect = async () => {
      if (session?.user) {
        try {
          setError(null);
          // Get token from our API
          const response = await axios.post('/api/auth/token');
          const { token } = response.data;

          if (!token) {
            throw new Error('No token received from server');
          }

          // Redirect to task management app with token
          const taskAppUrl = process.env.NEXT_PUBLIC_TASK_APP_URL;
          if (!taskAppUrl) {
            throw new Error('Task management app URL is not configured');
          }

          window.location.href = `${taskAppUrl}/auth?token=${token}`;
        } catch (error) {
          console.error('Error getting token:', error);
          if (axios.isAxiosError(error) && error.response) {
            setError(error.response.data.error || 'Failed to get authentication token');
          } else {
            setError('An unexpected error occurred');
          }
        }
      }
    };

    if (status === "authenticated") {
      getTokenAndRedirect();
    }
  }, [session, status, router]);

  if (status === "loading" || status === "authenticated") {
    return (
      <Layout
        title="Task Management | FreeTool"
        description="Redirecting to Task Management System"
      >
        <Container>
          <Center style={{ height: '60vh' }}>
            <div style={{ textAlign: 'center' }}>
              {error ? (
                <Alert title="Error" color="red" mb="xl">
                  {error}
                </Alert>
              ) : (
                <>
                  <Loader size="xl" />
                  <Text mt="md">Redirecting to Task Management System...</Text>
                </>
              )}
            </div>
          </Center>
        </Container>
      </Layout>
    );
  }

  return null;
} 