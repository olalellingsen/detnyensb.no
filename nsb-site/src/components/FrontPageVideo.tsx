import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";

function FrontPageVideo() {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storage = getStorage();
        const videoUrl = await getDownloadURL(ref(storage, "Videos/promo.mp4"));
        setVideoUrl(videoUrl);
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
    <div className="h-screen w-full bg-black">
      {videoUrl && (
        <video
          src={videoUrl}
          autoPlay
          muted
          loop
          className="object-cover h-screen w-full"
        />
      )}
    </div>
  );
}

export default FrontPageVideo;
