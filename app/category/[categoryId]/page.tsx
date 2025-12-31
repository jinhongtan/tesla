// app/category/[categoryId]/page.tsx
import CategoryPage from '@/components/category/CategoryPage';
import { CATEGORIES } from '@/data/mock-skins';

interface CategoryPageProps {
  params: Promise<{ categoryId: string }>;
}

export default async function Page({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  const category = CATEGORIES.find(c => c.id === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return <CategoryPage category={category} />;
}

// Generate static params for each category
export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    categoryId: category.id,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: CategoryPageProps) {
  const { categoryId } = await params;
  const category = CATEGORIES.find(c => c.id === categoryId);
  
  return {
    title: `${category?.name} Tesla Skins | Tesla-Skin`,
    description: category?.description,
  };
}