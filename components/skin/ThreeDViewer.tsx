// components/skin/ThreeDViewer.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  RotateCw, RotateCcw, ZoomIn, ZoomOut, 
  Maximize, Minimize, RefreshCw, Eye 
} from 'lucide-react';

interface ThreeDViewerProps {
  skinImageUrl: string;
  carModel: string;
}

export default function ThreeDViewer({ skinImageUrl, carModel }: ThreeDViewerProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentView, setCurrentView] = useState<'front' | 'side' | 'back' | 'top'>('side');
  const containerRef = useRef<HTMLDivElement>(null);

  // Predefined camera angles
  const views = {
    front: { x: 0, y: 0 },
    side: { x: 90, y: 0 },
    back: { x: 180, y: 0 },
    top: { x: 0, y: 90 },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setRotation(prev => ({
      x: prev.x + deltaX * 0.5,
      y: Math.max(-90, Math.min(90, prev.y + deltaY * 0.5)),
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const resetView = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'
      }`}
    >
      {/* 3D Viewer Container */}
      <div 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {/* Car Model with Skin */}
        <div 
          className="absolute inset-0 flex items-center justify-center transition-transform duration-200"
          style={{
            transform: `perspective(1000px) rotateY(${rotation.x}deg) rotateX(${rotation.y}deg) scale(${zoom})`,
          }}
        >
          {/* Car Wireframe/Model */}
          <div className="relative w-96 h-96">
            {/* Car Body */}
            <div className="absolute inset-0">
              <div 
                className="w-full h-full bg-cover bg-center rounded-xl shadow-2xl"
                style={{ 
                  backgroundImage: `url(${skinImageUrl})`,
                  boxShadow: '0 0 60px rgba(0, 150, 255, 0.3)',
                }}
              />
            </div>
            
            {/* Gloss Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent pointer-events-none" />
            
            {/* Reflection Highlights */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-white/15 to-transparent rounded-full blur-xl pointer-events-none" />
          </div>
        </div>

        {/* Instructions Overlay */}
        {!isDragging && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
            🖱️ Drag to rotate • Scroll to zoom
          </div>
        )}

        {/* Car Model Badge */}
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
          Tesla {carModel}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          onClick={resetView}
          className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors group"
          title="Reset View"
        >
          <RefreshCw className="h-5 w-5 group-hover:rotate-180 transition-transform" />
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="p-3 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="h-5 w-5" />
          ) : (
            <Maximize className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoom(prev => Math.max(0.5, prev - 0.2))}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
      </div>

      {/* Quick View Buttons */}
      <div className="absolute left-4 bottom-4 flex gap-2">
        {Object.entries(views).map(([key, angles]) => (
          <button
            key={key}
            onClick={() => {
              setRotation(angles);
              setCurrentView(key as any);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              currentView === key
                ? 'bg-blue-600 text-white'
                : 'bg-black/50 text-white/80 hover:bg-black/70'
            } backdrop-blur-sm`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Rotation Controls */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-2">
        <button
          onClick={() => setRotation(prev => ({ ...prev, x: prev.x - 15 }))}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors"
          title="Rotate Left"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
        <button
          onClick={() => setRotation(prev => ({ ...prev, x: prev.x + 15 }))}
          className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg backdrop-blur-sm transition-colors"
          title="Rotate Right"
        >
          <RotateCw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}