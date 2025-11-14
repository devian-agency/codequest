"use client";
import { ImageProps } from "next/image";
import { useState} from "react";
import formatSrc from "./img-format";

import Image from "next/image";
import imgLoader from "./imgLoader";
interface ImageWrapperProps extends ImageProps {
  
    srcSet?: string;
}

export default function ImageWrapper(props: ImageWrapperProps) {
  const [imgSrc, setImgSrc] = useState(props.src);

  return (
    <Image
      {...props}
      src={formatSrc(imgSrc as string, props.width as number) || imgSrc}
      width={props.width || 1080}
      height={props.height || 720}
      
      loader={imgLoader}
      onError={() => setImgSrc("/assets/images/og-image.webp")}
    />
  );
}