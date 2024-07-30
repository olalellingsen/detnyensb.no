import { useState } from "react";
import { useInView } from "react-intersection-observer";

interface LazyImageProps {
  src?: string;
  alt: string;
  triggerOnce: boolean;
  threshold?: number;
}

function LazyImage({ src, alt, triggerOnce, threshold }: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);

  const { ref, inView } = useInView({
    threshold: threshold || 0,
    triggerOnce: triggerOnce,
  });

  return (
    <div ref={ref}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${
          inView && loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in-out`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default LazyImage;
