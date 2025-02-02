import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { pageview } from '@/lib/gtm'

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

// Window interface is already extended in gtm.ts

export default function Layout({
  children,
  title,
  description,
  keywords,
  ogImage = 'https://freetool.click/og-image.jpg',
  ogUrl = 'https://freetool.click'
}: LayoutProps) {
  const router = useRouter()
  const pageTitle = title ? `${title} | FreeTool` : 'FreeTool - Online Tools';
  const pageDescription = description || "Free online tools to help with your daily tasks";

  useEffect(() => {
    // Track page views
    const handleRouteChange = (url: string) => {
      pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  useEffect(() => {
    // Push page data to GTM dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'page_metadata',
        page: {
          title: pageTitle,
          description: pageDescription,
          keywords: keywords || '',
          url: ogUrl,
          image: ogImage
        }
      });
    }
  }, [pageTitle, pageDescription, keywords, ogUrl, ogImage]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>

        {/* Primary Meta Tags */}
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        {keywords && <meta name="keywords" content={keywords} />}

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={ogUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={ogImage} />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={ogUrl} />
      </Head>
      {children}
    </>
  );
}