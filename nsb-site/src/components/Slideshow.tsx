import { useEffect, useState } from "react";
import { listAll, getDownloadURL, ref, getStorage } from "firebase/storage";
import LazyImage from "./LazyImage";

interface Image {
  id: string;
  url: string;
}

function Slideshow() {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = getStorage();
        const slideshowRef = ref(storage, "Slideshow");
        const listResults = await listAll(slideshowRef);

        const imageData: Image[] = await Promise.all(
          listResults.items.map(async (itemRef) => {
            const imageUrl = await getDownloadURL(itemRef).catch(() => "");
            return { id: itemRef.name, url: imageUrl };
          })
        );

        setImages(imageData);
      } catch (error) {
        console.error("Error connecting to Firebase Storage:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="grid gap-2 sm:grid-cols-2 py-2">
      {images.map((image) => (
        <LazyImage
          key={image.id}
          src={image.url}
          alt={`Slideshow image ${image.id}`}
          triggerOnce={false}
        />
      ))}
    </section>
  );
}

export default Slideshow;
