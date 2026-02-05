import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = 'PlayStation.lk | Sri Lanka\'s Premier Gaming Hardware Store',
  description = 'Authentic PlayStation consoles, controllers, games & professional repair services in Sri Lanka. Expert repairs, genuine parts, and premium gaming hardware.',
  keywords = 'PlayStation Sri Lanka, PS5 Sri Lanka, gaming consoles, console repair, DualSense controller, gaming hardware Colombo',
  image = '/assets/social-banner.jpg',
  type = 'website',
  noindex = false,
  nofollow = false,
}) => {
  const location = useLocation();
  const siteUrl = 'https://playstation.lk'; // Update with your actual domain
  const currentUrl = `${siteUrl}${location.pathname}${location.hash}`;
  
  // Construct full title
  const fullTitle = title.includes('PlayStation.lk') ? title : `${title} | PlayStation.lk`;
  
  // Construct absolute image URL
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  // Robots meta
  const robotsContent = noindex || nofollow 
    ? `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`
    : 'index, follow';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="PlayStation.lk" />
      <meta property="og:locale" content="en_LK" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO */}
      <meta name="author" content="PlayStation.lk" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Geo Tags for Sri Lanka */}
      <meta name="geo.region" content="LK-11" />
      <meta name="geo.placename" content="Colombo" />
      <meta name="geo.position" content="6.927079;79.861244" />
      <meta name="ICBM" content="6.927079, 79.861244" />
    </Helmet>
  );
};

export default SEO;
