import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sco-smb.com'
  
  // Set specific dates for different content types for better SEO signals
  const homepageDate = new Date('2025-11-23')
  const featureDate = new Date('2025-11-20')
  const docsDate = new Date('2025-11-15')
  const legalDate = new Date('2025-01-01')
  
  return [
    // === HIGH PRIORITY PAGES (0.9-1.0) - Key conversion & money pages ===
    {
      url: baseUrl,
      lastModified: homepageDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/trial`,
      lastModified: homepageDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: homepageDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: featureDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    
    // === MEDIUM PRIORITY (0.7-0.85) - Important pages ===
    {
      url: `${baseUrl}/pricing`,
      lastModified: featureDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: docsDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/amp`,
      lastModified: homepageDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: featureDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    
    // === DOCUMENTATION PAGES (0.6-0.7) ===
    {
      url: `${baseUrl}/docs/installation`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/docs/installation/windows`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/docs/installation/macos`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/docs/features`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    {
      url: `${baseUrl}/docs/troubleshooting`,
      lastModified: docsDate,
      changeFrequency: 'monthly',
      priority: 0.65,
    },
    
    // === INFORMATIONAL PAGES (0.5-0.6) ===
    {
      url: `${baseUrl}/about`,
      lastModified: featureDate,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/security`,
      lastModified: featureDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portal`,
      lastModified: featureDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    
    // === LEGAL PAGES (0.2-0.3) ===
    {
      url: `${baseUrl}/privacy`,
      lastModified: legalDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: legalDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}