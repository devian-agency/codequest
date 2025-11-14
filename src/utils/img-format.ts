
export default function formatSrc(src: string, size: number) {
  let sr;
  if(src.includes("?") && src.includes("w=")){
    src.split("?")[1].split("&")
    .forEach((item) => {
      if(item.includes("w=")){
        sr = src.replace(item, `w=${size}`);
      }
    })
    return sr;
    
  }
  else if(src.includes("?")){
    src = src + `&w=${size}`;
    return src;
    
  }
  else{
    src = src + `?w=${size}`;
    return src;
  }
}