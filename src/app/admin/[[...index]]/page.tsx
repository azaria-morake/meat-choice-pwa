import { Studio } from './Studio';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Sanity Studio',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function StudioPage() {
  return <Studio />;
}
