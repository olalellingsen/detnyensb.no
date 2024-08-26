import { useEffect, useState } from "react";
import Slideshow from "../components/Slideshow";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Media() {
  const [youtubeVideos, setYoutubeVideos] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = await getDocs(collection(db, "Media"));
        const data = query.docs
          .sort((a, b) => a.data().order - b.data().order)
          .map((doc) => doc.data().youtubeLink);
        setYoutubeVideos(data);
      } catch (error) {}
    };
    fetchData();
  }, [youtubeVideos]);

  return (
    <section className="mainContent">
      <h1>Media</h1>

      {youtubeVideos && (
        <section>
          {youtubeVideos.map((video) => (
            <iframe
              src={video}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="w-full aspect-video py-2"
            ></iframe>
          ))}
        </section>
      )}
      <br />
      <section>
        <Slideshow />
      </section>
    </section>
  );
}

export default Media;
