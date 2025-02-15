import { LoadingOverlay as MantineLoadingOverlay } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle route change loading
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Handle axios request loading
  useEffect(() => {
    // Add request interceptor
    const requestInterceptor = axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    });

    // Add response interceptor
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    // Clean up interceptors
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        pointerEvents: loading ? 'auto' : 'none'
      }}>
        <MantineLoadingOverlay 
          visible={loading}
          overlayProps={{ 
            blur: 2,
            backgroundOpacity: 0.5
          }}
          loaderProps={{ 
            size: 'xl', 
            color: 'blue', 
            variant: 'bars' 
          }}
        />
      </div>
      {children}
    </div>
  );
}; 