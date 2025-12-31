// components/skin/SkinDetailClient.tsx
"use client";

import { useState } from 'react';
import { Skin } from '@/types/skin';
import ThreeDViewer from './ThreeDViewer';
import { 
  Download, Heart, Share2, ShoppingCart, 
  ChevronLeft, Star, Calendar, User, 
  CheckCircle, Tag, File, Layers, 
  Clock, Eye, DollarSign, Truck,
  Shield, RefreshCw, Palette, Car
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
  const [selectedTab, setSelectedTab] = useState<'details' | 'previews' | 'compatibility'>('details');
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

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`${skin.name} added to cart!`);
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
      <header className="sticky top-16 z-40 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="text-sm font-medium">Back to Browse</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-lg font-bold text-gray-900 truncate max-w-md">
                  {skin.name}
                </h1>
                <p className="text-xs text-gray-600">Tesla {skin.model} • {skin.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-lg transition-colors ${
                  isLiked
                    ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                title={isLiked ? "Unlike" : "Like"}
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                title="Share"
              >
                <Share2 className="h-5 w-5" />
              </button>
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

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center gap-2 mb-1">
                  <Download className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-600">Downloads</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {downloadCount.toLocaleString()}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-gray-600">Likes</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{skin.likes}</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-gray-600">Rating</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">4.8</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border">
                <div className="flex items-center gap-2 mb-1">
                  <Eye className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-600">Views</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.floor(downloadCount * 1.5).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Tab Headers */}
              <div className="flex border-b">
                <button
                  onClick={() => setSelectedTab('details')}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                    selectedTab === 'details'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Layers className="h-4 w-4 inline mr-2" />
                  Details & Features
                </button>
                <button
                  onClick={() => setSelectedTab('previews')}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                    selectedTab === 'previews'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Palette className="h-4 w-4 inline mr-2" />
                  More Previews
                </button>
                <button
                  onClick={() => setSelectedTab('compatibility')}
                  className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                    selectedTab === 'compatibility'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Car className="h-4 w-4 inline mr-2" />
                  Compatibility
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {selectedTab === 'details' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Skin Details</h3>
                    <p className="text-gray-600">{skin.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">File Information</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <File className="h-4 w-4" />
                            <span>Format: {skin.fileFormat}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            <span>Size: {skin.fileSize}</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Tag className="h-4 w-4" />
                            <span>Style: {skin.style}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">Requirements</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Photoshop CC 2021+</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>GPU: 4GB VRAM recommended</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>For personal & commercial use</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'previews' && (
                  <div className="grid grid-cols-2 gap-4">
                    {['front', 'side', 'back', 'top'].map((view) => (
                      <div key={view} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${skin.thumbnailUrl})` }}
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                          {view.toUpperCase()} VIEW
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'compatibility' && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700">Compatible With:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'].map((model) => (
                        <div
                          key={model}
                          className={`p-3 rounded-lg border ${
                            model === skin.model
                              ? 'bg-blue-50 border-blue-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {model === skin.model ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                            )}
                            <span className="font-medium">Tesla {model}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-4">
                      This skin template works with all Tesla {skin.model} variants from 2018-2024.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Purchase & Creator Info */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <div className="bg-white rounded-2xl shadow-lg border p-6 sticky top-32">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {skin.isFree ? 'Free Download' : `$${skin.price}`}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {skin.isFree ? 'Completely free!' : 'One-time payment'}
                  </p>
                </div>
                {skin.isFree ? (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">
                    FREE
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    PREMIUM
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>High-resolution 4K textures</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Layered PSD/AI files included</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Commercial license included</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Lifetime updates</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 support</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isDownloading ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-5 w-5" />
                      {skin.isFree ? 'Download Now' : 'Buy & Download'}
                    </>
                  )}
                </button>

                {!skin.isFree && (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </button>
                )}

                <div className="text-center pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    <Shield className="h-3 w-3 inline mr-1" />
                    Secure payment • 30-day money-back guarantee
                  </p>
                </div>
              </div>
            </div>

            {/* Creator Info */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Created By</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {skin.creator.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{skin.creator.name}</h4>
                  <p className="text-sm text-gray-600">Verified Designer</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="text-sm">
                      <div className="font-semibold">4.9</div>
                      <div className="text-gray-500">Rating</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold">245</div>
                      <div className="text-gray-500">Skins</div>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold">12K</div>
                      <div className="text-gray-500">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-medium transition-colors">
                View Profile
              </button>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {skin.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Upload Date</span>
                  <span className="text-sm font-medium">
                    {skin.createdAt.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Last Updated</span>
                  <span className="text-sm font-medium">2 weeks ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">File Version</span>
                  <span className="text-sm font-medium">2.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Software</span>
                  <span className="text-sm font-medium">Photoshop, Illustrator</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Skins */}
        {relatedSkins.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">You Might Also Like</h2>
              <Link
                href={`/category/${skin.category}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View more in {skin.category} →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedSkins.map((relatedSkin) => (
                <SkinCard key={relatedSkin.id} skin={relatedSkin} />
              ))}
            </div>
          </section>
        )}

        {/* Reviews & Comments */}
        <section className="mt-16 bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews (24)</h2>
          {/* Reviews component would go here */}
          <div className="text-center py-8">
            <Star className="h-12 w-12 text-yellow-400 mx-auto mb-3" />
            <p className="text-gray-600">No reviews yet. Be the first to review this skin!</p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
              Write a Review
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}