// components/skin/SkinDetailClient.tsx
"use client";

import { useState } from 'react';
import { Skin } from '@/types/skin';
import ThreeDViewer from './ThreeDViewer';
import {
  Download, Heart, Share2,
  ChevronLeft, Star, Eye, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import SkinCard from '@/components/home/SkinCard';

interface SkinDetailClientProps {
  skin: Skin;
  relatedSkins: Skin[];
}

export default function SkinDetailClient({ skin, relatedSkins }: SkinDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [downloadCount, setDownloadCount] = useState(skin.downloadCount);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDownloadCount(prev => prev + 1);
    setIsDownloading(false);

    // Show success message
    alert('Download started! Check your downloads folder.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: skin.name,
        text: skin.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="top-12 z-40 bg-white border-b">
        <div className="container mx-auto px-2 sm:px-4 py-2">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {skin.name}
              </h1>
              <p className="text-sm text-gray-500">Tesla {skin.model}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - 3D Viewer & Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* 3D Viewer */}
            <div className="rounded-2xl overflow-hidden">
              <ThreeDViewer 
                skinImageUrl={skin.imageUrl}
                carModel={skin.model}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                  isLiked
                    ? 'bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-100'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50 transition-all"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm border p-6 max-w-2xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">About this skin</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{skin.description}</p>

              {/* Creator Info */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {skin.creator.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created by</p>
                  <h4 className="font-semibold text-gray-900">{skin.creator.name}</h4>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">File Format</span>
                  <span className="font-medium text-gray-900">{skin.fileFormat}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">File Size</span>
                  <span className="font-medium text-gray-900">{skin.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900">{skin.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Style</span>
                  <span className="font-medium text-gray-900">{skin.style}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6 pt-6 border-t text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  <span>{downloadCount.toLocaleString()} downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>4.8 rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{Math.floor(downloadCount * 1.5).toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Purchase & Creator Info */}
          <div className="space-y-6">
            {/* Download Card */}
            <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
              {/* Square Image */}
              <div className="aspect-square w-full relative bg-gray-100">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${skin.imageUrl})` }}
                />
              </div>

              {/* Download Section */}
              <div className="p-6">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-bold transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      Download
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Skins */}
        {relatedSkins.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Similar Skins</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedSkins.map((relatedSkin) => (
                <SkinCard key={relatedSkin.id} skin={relatedSkin} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}