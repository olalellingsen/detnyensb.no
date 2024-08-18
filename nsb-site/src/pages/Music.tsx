import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ClipLoader } from "react-spinners";

interface Media {
  url: string;
  isLoaded: boolean;
  order: number;
}

function Music() {
  const [albums, setAlbums] = useState<Media[]>([]);
  const [singles, setSingles] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="grid gap-2 mainContent">
      <h1>Utgivelser</h1>

      {loading && (
        <section className="flex justify-center h-screen mt-24">
          <ClipLoader loading={true} size={100} />
        </section>
      )}
      <br />
      {/* Albums */}
      <h2>Album</h2>
      <section className="grid gap-2 md:grid-cols-2">
        {albums.map((album) => (
          <iframe
            src={album.url}
            key={album.order}
            width="100%"
            height="380"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            onLoad={() => setLoading(false)}
          ></iframe>
        ))}
      </section>
      <br />
      {/* Singles */}
      <h2>Singler</h2>
      <section className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
        {singles.map((single) => (
          <iframe
            src={single.url}
            key={single.order}
            height="152"
            className="w-full"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        ))}
      </section>
    </section>
  );
}

export default Music;
