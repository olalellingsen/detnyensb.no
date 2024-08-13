import { useState, useEffect } from "react";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";

function MembersCollage() {
  const [images, setImages] = useState<string[]>([]);
  const [displayImages, setDisplayImages] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, "Portraits");

      // List all files in the folder
      const result = await listAll(storageRef);

      // Get URLs for each image
      const urlPromises: Promise<string>[] = result.items.map((imageRef) =>
        getDownloadURL(imageRef)
      );

      // Resolve all URLs
      const urls: string[] = await Promise.all(urlPromises);
      setImages(urls);

      // Initially set 4 random images
      setDisplayImages(selectRandomImages(urls, 16));
    } catch (error) {
      console.error("Error fetching images from Storage:", error);
    }
  };

  // Function to select n random images
  const selectRandomImages = (images: string[], count: number): string[] => {
    const shuffled = [...images].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setDisplayImages(selectRandomImages(images, 16));
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [images]);

  return (
    <section className="justify-center">
      <div className="grid grid-cols-4 md:grid-cols-8">
        {displayImages.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Member ${index}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ))}
      </div>
      <br />
      <div className="flex justify-center">
        <Link to="/members">
          <button className="btn1">Vis alle musikere</button>
        </Link>
      </div>
    </section>
  );
}

export default MembersCollage;
