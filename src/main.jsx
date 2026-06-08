import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App.jsx';
import './index.css';

// vite-react-ssg owns both the build-time prerender and the client hydration,
// and wraps the app with its own Router + HelmetProvider. SEO tags are provided
// per route via the <Seo> component (which uses vite-react-ssg's <Head>).
export const createRoot = ViteReactSSG({ routes });
