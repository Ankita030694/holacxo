import { MetadataRoute } from 'next';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.holacxo.com';

  // Static routes
  const routes = [
    '',
    '/blog',
    '/contact',
    '/thank-you',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic blog routes
  try {
    const blogsCollection = collection(db, "blogs");
    const q = query(blogsCollection, orderBy("created", "desc"));
    const querySnapshot = await getDocs(q);
    
    const blogRoutes = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            url: `${baseUrl}/blog/${data.slug}`,
            lastModified: data.updated?.toDate() || data.created?.toDate() || new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        };
    });

    return [...routes, ...blogRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return routes;
  }
}
