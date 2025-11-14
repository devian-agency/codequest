"use client";
export default function imgLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if(src.includes("w=")){
    return `${src}&q=${quality || 100}`;
  }
  else if(src.includes("?")){
    return `${src}&w=${width}&q=${quality || 100}`;
  }
  return `${src}?w=${width}&q=${quality || 100}`;
  
}