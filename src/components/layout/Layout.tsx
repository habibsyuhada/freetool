import Head from 'next/head'
// import { useEffect } from 'react'

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
}

export default function Layout({ 
  children, 
  title, 
  description,
  keywords,
  ogImage = 'https://freetool.dev/og-image.jpg', // default OG image
  ogUrl = 'https://freetool.dev' // default URL
}: LayoutProps) {
  const pageTitle = title ? `${title} | FreeTool` : 'FreeTool - Online Tools';

  // useEffect(() => {
  //   if (window.dataLayer) {
  //     window.dataLayer.push({
  //       'page.keywords': keywords,
  //       'page.title': title,
  //       'page.description': description
  //     });
  //   }
  // }, [keywords, title, description]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        
        {/* Primary Meta Tags */}
        <meta name="title" content={pageTitle} />
        <meta name="description" content={description || "Free online tools to help with your daily tasks"} />
        {keywords && <meta name="keywords" content={keywords} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={ogUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage} />
        
        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={ogUrl} />
      </Head>
      {children}
    </>
  )
} 