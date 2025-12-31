// app/skins/[skinId]/page.tsx
import SkinDetailClient from '@/components/skin/SkinDetailClient';
import { MOCK_SKINS } from '@/data/mock-skins';

interface SkinPageProps {
  params: Promise<{ skinId: string }>;
}

export default async function SkinDetailPage({ params }: SkinPageProps) {
  const { skinId } = await params;
  
  // Find the skin in mock data
  const skin = MOCK_SKINS.find(s => s.id === skinId);
  
  if (!skin) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Skin Not Found</h1>
            <p className="text-gray-600 mb-6">The skin you're looking for doesn't exist or has been removed.</p>
            <a
              href="/"
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Browse All Skins
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Get related skins
  const relatedSkins = MOCK_SKINS
    .filter(s => 
      s.id !== skinId && 
      (s.category === skin.category || s.model === skin.model)
    )
    .slice(0, 4);

  return <SkinDetailClient skin={skin} relatedSkins={relatedSkins} />;
}

// Generate metadata
export async function generateMetadata({ params }: SkinPageProps) {
  const { skinId } = await params;
  const skin = MOCK_SKINS.find(s => s.id === skinId);
  
  return {
    title: `${skin?.name || 'Skin'} | Tesla-Skin`,
    description: skin?.description || 'Premium Tesla skin and wrap',
  };
}