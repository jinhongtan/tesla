// data/mock-skins.ts
import { Skin, TeslaModel, Category } from '@/types/skin';

// Now TeslaModel is imported, not declared locally
export const ALL_MODELS: TeslaModel[] = ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'];

export const CATEGORIES: Category[] = [
  {
    id: 'matte',
    name: 'Matte',
    description: 'Sleek matte finish wraps for a modern look',
    icon: '✨',
    count: 156,
    featuredSkins: []
  },
  {
    id: 'chrome',
    name: 'Chrome',
    description: 'High-gloss chrome finishes that stand out',
    icon: '⚡',
    count: 89,
    featuredSkins: []
  },
  {
    id: 'carbon-fiber',
    name: 'Carbon Fiber',
    description: 'Realistic carbon fiber textures',
    icon: '🔗',
    count: 112,
    featuredSkins: []
  },
  {
    id: 'gradient',
    name: 'Gradient',
    description: 'Smooth color transitions and fades',
    icon: '🌈',
    count: 78,
    featuredSkins: []
  },
  {
    id: 'color',
    name: 'Solid Colors',
    description: 'Classic solid color wraps',
    icon: '🎨',
    count: 234,
    featuredSkins: []
  },
  {
    id: 'custom',
    name: 'Custom Themes',
    description: 'Unique artistic designs and themes',
    icon: '🎭',
    count: 67,
    featuredSkins: []
  },
];

export const MOCK_SKINS: Skin[] = [
  {
    id: '1',
    name: 'Midnight Black Matte',
    description: 'Deep matte black finish for a stealthy look',
    imageUrl: 'https://images.unsplash.com/photo-1620385018749-3c2c02d1b8fc?w=800&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1620385018749-3c2c02d1b8fc?w=400&auto=format&fit=crop',
    model: 'Model 3',
    category: 'matte',
    style: 'Matte Black',
    creator: {
      id: 'user1',
      name: 'WrapMaster Pro',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=WrapMaster'
    },
    downloadCount: 1245,
    likes: 289,
    createdAt: new Date('2024-01-15'),
    tags: ['matte', 'black', 'modern', 'stealth'],
    isFree: false,
    price: 24.99,
    fileSize: '85 MB',
    fileFormat: 'PSD + PNG'
  },
  {
    id: '2',
    name: 'Cyber Chrome Silver',
    description: 'Futuristic chrome silver with cyberpunk vibes',
    imageUrl: 'https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?w=800&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?w=400&auto=format&fit=crop',
    model: 'Cybertruck',
    category: 'chrome',
    style: 'Chrome Silver',
    creator: {
      id: 'user2',
      name: 'CyberDesigns',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CyberDesigns'
    },
    downloadCount: 2890,
    likes: 567,
    createdAt: new Date('2024-02-20'),
    tags: ['chrome', 'futuristic', 'silver', 'cyberpunk'],
    isFree: true,
    fileSize: '120 MB',
    fileFormat: 'AI + PNG'
  },
  {
    id: '3',
    name: 'Carbon Fiber Racing',
    description: 'Authentic carbon fiber texture with racing stripes',
    imageUrl: 'https://images.unsplash.com/photo-1621330396173-12c8e5a9348a?w=800&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1621330396173-12c8e5a9348a?w=400&auto=format&fit=crop',
    model: 'Model Y',
    category: 'carbon-fiber',
    style: 'Carbon Fiber',
    creator: {
      id: 'user3',
      name: 'RaceWrap Co',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RaceWrap'
    },
    downloadCount: 1876,
    likes: 432,
    createdAt: new Date('2024-03-10'),
    tags: ['carbon', 'racing', 'performance', 'texture'],
    isFree: false,
    price: 29.99,
    fileSize: '95 MB',
    fileFormat: 'PSD + SVG'
  },
  {
    id: '4',
    name: 'Ocean Blue Gradient',
    description: 'Deep ocean blue to turquoise gradient',
    imageUrl: 'https://images.unsplash.com/photo-1586184484493-46fdc5c0f4c8?w=800&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586184484493-46fdc5c0f4c8?w=400&auto=format&fit=crop',
    model: 'Model S',
    category: 'gradient',
    style: 'Blue Gradient',
    creator: {
      id: 'user4',
      name: 'ColorFlow Studio',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ColorFlow'
    },
    downloadCount: 932,
    likes: 198,
    createdAt: new Date('2024-01-28'),
    tags: ['gradient', 'blue', 'ocean', 'water'],
    isFree: true,
    fileSize: '110 MB',
    fileFormat: 'PNG + JPG'
  },
  {
    id: '5',
    name: 'Neon Cyberpunk',
    description: 'Vibrant neon colors with cyberpunk aesthetics',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?w=800&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba5338fe2?w=400&auto=format&fit=crop',
    model: 'Model 3',
    category: 'custom',
    style: 'Neon Theme',
    creator: {
      id: 'user5',
      name: 'NeonWraps',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NeonWraps'
    },
    downloadCount: 3210,
    likes: 745,
    createdAt: new Date('2024-02-05'),
    tags: ['neon', 'cyberpunk', 'vibrant', 'night'],
    isFree: false,
    price: 34.99,
    fileSize: '150 MB',
    fileFormat: 'PSD + AI + PNG'
  },
  {
    id: '6',
    name: 'Classic Pearl White',
    description: 'Elegant pearl white finish',
    imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&auto=format&fit=crop',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&auto=format&fit=crop',
    model: 'Model X',
    category: 'color',
    style: 'Pearl White',
    creator: {
      id: 'user6',
      name: 'ClassicWraps',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ClassicWraps'
    },
    downloadCount: 1543,
    likes: 321,
    createdAt: new Date('2024-03-01'),
    tags: ['white', 'pearl', 'classic', 'elegant'],
    isFree: true,
    fileSize: '75 MB',
    fileFormat: 'PNG'
  },
  // Add more skins as needed
];

// Populate categories with featured skins
CATEGORIES.forEach(category => {
  category.featuredSkins = MOCK_SKINS
    .filter(skin => skin.category === category.id)
    .slice(0, 6);
});