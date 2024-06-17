import { useInView } from "react-intersection-observer";

interface LazyImageProps {
  src: string;
  alt: string;
  triggerOnce: boolean;
  threshold?: number;
}

function LazyImage({ src, alt, triggerOnce, threshold }: LazyImageProps) {
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
          inView ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in-out`}
      />
    </div>
  );
}

export default LazyImage;
