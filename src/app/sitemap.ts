
import { MetadataRoute } from 'next';
import { PRODUCTS, CATEGORIES, CITIES, BUYING_GUIDES, EDITOR_INITIAL, COUNTRIES } from '@/lib/mock-data';

/**
 * Institutional Sitemap Generator
 * Automates discovery for thousands of artifacts across 5 jurisdictions.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amarise-maison-avenue.com';
  const countryCodes = Object.keys(COUNTRIES);

  const routes: MetadataRoute.Sitemap = [];

  countryCodes.forEach((code) => {
    // 1. Core Pages
    routes.push({
      url: `${baseUrl}/${code}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // 2. Programmatic Category Pages
    CATEGORIES.forEach((cat) => {
      routes.push({
        url: `${baseUrl}/${code}/category/${cat.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      });
    });

    // 3. High-Authority City Pages
    CITIES.forEach((city) => {
      routes.push({
        url: `${baseUrl}/${code}/city/${city.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      });
    });

    // 4. Intelligence Guides
    BUYING_GUIDES.forEach((guide) => {
      routes.push({
        url: `${baseUrl}/${code}/buying-guide/${guide.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    });

    // 5. Editorial Content
    EDITOR_INITIAL.forEach((ed) => {
      routes.push({
        url: `${baseUrl}/${code}/journal/${ed.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });

    // 6. Artifact Registry (High Volume)
    PRODUCTS.slice(0, 5000).forEach((prod) => {
      routes.push({
        url: `${baseUrl}/${code}/product/${prod.id}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.5,
      });
    });
  });

  return routes;
}
