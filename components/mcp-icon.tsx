"use client";

import { useState } from "react";
import Image from "next/image";

// Brand colors for known MCPs
const brandColors: Record<string, { bg: string; text: string }> = {
  'Postman': { bg: 'bg-orange-500', text: 'text-white' },
  'Midday': { bg: 'bg-purple-600', text: 'text-white' },
  'Agent Evals by Galileo': { bg: 'bg-red-500', text: 'text-white' },
  'Endgame': { bg: 'bg-emerald-600', text: 'text-white' },
  'Ashra MCP Server': { bg: 'bg-yellow-500', text: 'text-black' },
  'Compresto MCP': { bg: 'bg-blue-600', text: 'text-white' },
  'Caiyun Weather': { bg: 'bg-cyan-500', text: 'text-white' },
  'Encore': { bg: 'bg-indigo-600', text: 'text-white' },
  'urlDNA': { bg: 'bg-teal-500', text: 'text-white' },
  'Pearl': { bg: 'bg-pink-500', text: 'text-white' },
  'AWS API MCP Server': { bg: 'bg-amber-500', text: 'text-black' },
  'AWS Knowledge MCP': { bg: 'bg-amber-600', text: 'text-black' },
};

// Generate a consistent color based on the name
function getColorFromName(name: string): { bg: string; text: string } {
  if (brandColors[name]) {
    return brandColors[name];
  }
  
  // Generate a hash from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // List of nice background colors
  const colors = [
    { bg: 'bg-red-500', text: 'text-white' },
    { bg: 'bg-orange-500', text: 'text-white' },
    { bg: 'bg-amber-500', text: 'text-black' },
    { bg: 'bg-yellow-500', text: 'text-black' },
    { bg: 'bg-lime-500', text: 'text-black' },
    { bg: 'bg-green-500', text: 'text-white' },
    { bg: 'bg-emerald-500', text: 'text-white' },
    { bg: 'bg-teal-500', text: 'text-white' },
    { bg: 'bg-cyan-500', text: 'text-white' },
    { bg: 'bg-sky-500', text: 'text-white' },
    { bg: 'bg-blue-500', text: 'text-white' },
    { bg: 'bg-indigo-500', text: 'text-white' },
    { bg: 'bg-violet-500', text: 'text-white' },
    { bg: 'bg-purple-500', text: 'text-white' },
    { bg: 'bg-fuchsia-500', text: 'text-white' },
    { bg: 'bg-pink-500', text: 'text-white' },
    { bg: 'bg-rose-500', text: 'text-white' },
  ];
  
  return colors[Math.abs(hash) % colors.length];
}

interface MCPIconProps {
  name: string;
  iconUrl?: string | null;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 w-10 text-lg',
  md: 'h-12 w-12 text-xl',
  lg: 'h-16 w-16 text-2xl',
};

const imageSizes = {
  sm: 40,
  md: 48,
  lg: 64,
};

export function MCPIcon({ name, iconUrl, size = 'md', className = '' }: MCPIconProps) {
  const [imageError, setImageError] = useState(false);
  const { bg, text } = getColorFromName(name);
  const sizeClass = sizeClasses[size];
  const imageSize = imageSizes[size];

  // Get the first letter or first two letters for the fallback
  const getInitials = (name: string) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return words[0][0].toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  if (iconUrl && !imageError) {
    return (
      <div className={`shrink-0 rounded-lg overflow-hidden ${sizeClass} ${className}`}>
        <Image
          src={iconUrl}
          alt={name}
          width={imageSize}
          height={imageSize}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  return (
    <div 
      className={`shrink-0 rounded-lg flex items-center justify-center font-bold ${sizeClass} ${bg} ${text} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
