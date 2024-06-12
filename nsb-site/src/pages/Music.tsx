import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface Media {
  url: string;
  isLoaded: boolean;
  order: number;
}

function Music() {
  const [albums, setAlbums] = useState<Media[]>([]);
  const [singles, setSingles] = useState<Media[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumQuery = await getDocs(collection(db, "Albums"));
        const singleQuery = await getDocs(collection(db, "Singles"));

        const albumData = albumQuery.docs.map((doc) => ({
          url: doc.data().url,
          order: doc.data().order,
          isLoaded: false,
        })) as Media[];

        const singleData = singleQuery.docs.map((doc) => ({
          url: doc.data().url,
          order: doc.data().order,
          isLoaded: false,
        })) as Media[];

        setAlbums(albumData.sort((a, b) => b.order - a.order));
        setSingles(singleData.sort((a, b) => b.order - a.order));
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  const handleLoad = (setFunc: Function, index: number) => {
    setFunc((prev: Media[]) => {
      const newMedia = [...prev];
      newMedia[index].isLoaded = true;
      return newMedia;
    });
  };

  return (
    <div className="grid gap-2 mainContent">
      <h1 className="border-b">Utgivelser</h1>
      <br />
      {/* Albums */}
      <h2>Album</h2>
      <div className="grid gap-2 md:grid-cols-2">
        {/* Placeholder for loading animation */}
        {albums.length === 0 && (
          <>
            <iframe
              className="album animate-pulse bg-gray-300 rounded-lg"
              height="380"
            ></iframe>
            <iframe
              className="album animate-pulse bg-gray-300 rounded-lg"
              height="380"
            ></iframe>
          </>
        )}

        {albums.map((album, index) => (
          <iframe
            src={album.url}
            key={album.order}
            className={`album transition-opacity duration-500 ease-in-out ${
              album.isLoaded ? "opacity-100" : "opacity-0"
            }`}
            width="100%"
            height="380"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            onLoad={() => handleLoad(setAlbums, index)}
          ></iframe>
        ))}
      </div>
      <br />
      {/* Singles */}
      <h2>Singler</h2>
      <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for loading animation */}
        {singles.length === 0 && (
          <>
            <iframe
              className="single animate-pulse bg-gray-300 rounded-lg"
              height="152"
            ></iframe>
            <iframe
              className="single animate-pulse bg-gray-300 rounded-lg"
              height="152"
            ></iframe>
            <iframe
              className="single animate-pulse bg-gray-300 rounded-lg"
              height="152"
            ></iframe>
          </>
        )}

        {/* Display singles */}
        {singles.map((single, index) => (
          <iframe
            src={single.url}
            key={single.order}
            height="152"
            className={`single transition-opacity duration-500 ease-in-out ${
              single.isLoaded ? "opacity-100" : "opacity-0"
            }`}
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            onLoad={() => handleLoad(setSingles, index)}
          ></iframe>
        ))}
      </div>
    </div>
  );
}

export default Music;
