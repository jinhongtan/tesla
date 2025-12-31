// types/skin.ts
export type TeslaModel = 'Model 3' | 'Model Y' | 'Model S' | 'Model X' | 'Cybertruck';

export interface Skin {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  model: TeslaModel;
  category: string;
  style: string;
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  downloadCount: number;
  likes: number;
  createdAt: Date;
  tags: string[];
  price?: number;
  isFree: boolean;
  fileSize: string;
  fileFormat: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  featuredSkins: Skin[];
}