// components/home/SkinCard.tsx
"use client";

import { Skin } from '@/types/skin';
import { Download, Heart, Calendar, User, DollarSign, Tag } from 'lucide-react';
import Link from 'next/link';

interface SkinCardProps {
  skin: Skin;
}

export default function SkinCard({ skin }: SkinCardProps) {
  return (
    <Link href={`/skins/${skin.id}`} className="block h-full">
      <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 h-full flex flex-col">
        {/* Image Container - Fixed aspect ratio */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          {/* Thumbnail Image */}
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url(${skin.thumbnailUrl})` }}
          />
          
          {/* Model Badge - Smaller */}
          <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            {skin.model}
          </div>
          
          {/* Price Badge - Smaller */}
          <div className="absolute top-2 right-2">
            {skin.isFree ? (
              <div className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                FREE
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                {skin.price}
              </div>
            )}
          </div>
          
          {/* Download Count - Smaller */}
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Download className="h-3 w-3 text-gray-700" />
            <span className="text-xs font-semibold text-gray-800">
              {skin.downloadCount > 999 ? 
                `${(skin.downloadCount / 1000).toFixed(1)}k` : 
                skin.downloadCount
              }
            </span>
          </div>
          
          {/* Likes - Smaller */}
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <Heart className="h-3 w-3 text-red-500 fill-red-500" />
            <span className="text-xs font-semibold text-gray-800">{skin.likes}</span>
          </div>
        </div>
        
        {/* Content - Flex grow to fill space */}
        <div className="p-3 flex flex-col flex-grow">
          {/* Title and Creator - Compact */}
          <div className="mb-2">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">
              {skin.name}
            </h3>
            <div className="flex items-center gap-1 mt-1">
              <User className="h-3 w-3 text-gray-500" />
              <span className="text-xs text-gray-600 truncate">{skin.creator.name}</span>
            </div>
          </div>
          
          {/* Description - Compact */}
          <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow">
            {skin.description}
          </p>
          
          {/* Date - Smaller */}
          <div className="flex items-center gap-1 text-gray-500 mb-3">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">
              {skin.createdAt.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          </div>
          
          {/* Tags - Compact */}
          <div className="flex flex-wrap gap-1 mt-auto">
            {skin.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs truncate max-w-[80px]"
                title={tag}
              >
                <Tag className="h-2.5 w-2.5 mr-1 flex-shrink-0" />
                <span className="truncate">{tag}</span>
              </span>
            ))}
            {skin.tags.length > 2 && (
              <span className="text-xs text-gray-500 self-center">
                +{skin.tags.length - 2}
              </span>
            )}
          </div>
          
          {/* File Info - Compact */}
          <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span className="truncate mr-1">{skin.fileFormat}</span>
            <span className="font-medium">{skin.fileSize}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}