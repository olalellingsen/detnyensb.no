import { useInView } from "react-intersection-observer";

function LazyImage({ src, alt }: { src: string; alt: string }) {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
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
