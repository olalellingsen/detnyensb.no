import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import { ArrowDown, ArrowRight } from "lucide-react";

function Music({ id }: { id: string }) {
  const [albums, setAlbums] = useState<string[]>([]);
  const [singles, setSingles] = useState<string[]>([]);
  const [showSingles, setShowSingles] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumQuery = await getDocs(collection(db, "Albums"));
        const singleQuery = await getDocs(collection(db, "Singles"));

        const albumData = albumQuery.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];

        const singleData = singleQuery.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];

        setSingles(singleData.map((doc) => doc.url));
        setAlbums(albumData.map((doc) => doc.url));
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, [id]); // Add 'id' as a dependency to refetch data when 'id' changes

  return (
    <div id={id} className="h-full grid gap-2">
      <h1>Musikk</h1>

      {/* Albums */}
      <h2>Album</h2>
      <div className="grid gap-2 md:grid-cols-2 sm:gap-4">
        {albums.map((album) => (
          <iframe
            src={album}
            className="album"
            width="100%"
            height="380"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        ))}
      </div>
      <br />
      {/* Singles */}
      <button onClick={() => setShowSingles(!showSingles)} className="flex">
        {showSingles ? (
          <>
            <h2 className="underline">Singler</h2>
            <ArrowDown height={35} />
          </>
        ) : (
          <>
            <h2 className="flex underline hover:mr-1">Vis singler</h2>
            <ArrowRight height={35} />
          </>
        )}
      </button>

      <div
        className={`gap-2 md:grid-cols-2 md:gap-4 ${
          showSingles ? "grid" : "hidden"
        }`}
      >
        {singles.map((single) => (
          <iframe
            src={single}
            className="single"
            height="80"
            allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="eager"
          ></iframe>
        ))}
      </div>
    </div>
  );
}

export default Music;
