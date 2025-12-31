// components/category/Breadcrumb.tsx
"use client";

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  category: {
    id: string;
    name: string;
  };
}

export default function Breadcrumb({ category }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm">
      <Link
        href="/"
        className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Home className="h-4 w-4" />
        Home
      </Link>
      <ChevronRight className="h-4 w-4 text-gray-400" />
      <Link
        href="/"
        className="text-gray-600 hover:text-gray-900 transition-colors"
      >
        Categories
      </Link>
      <ChevronRight className="h-4 w-4 text-gray-400" />
      <span className="font-medium text-gray-900">{category.name}</span>
    </nav>
  );
}