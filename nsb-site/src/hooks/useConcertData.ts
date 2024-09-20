import { useState, useEffect } from "react";
// import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  collection,
  getDocs,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { Concert } from "../types";

// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";

const useConcertData = () => {
  const [concertData, setConcertData] = useState<DocumentData[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<Concert[]>([]);
  const [pastConcerts, setPastConcerts] = useState<Concert[]>([]);

  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [uploadProgress, setUploadProgress] = useState<number>(0);
  // const [imageUrl, setImageUrl] = useState<string>("");

  const fetchConcerts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Concerts"));
      const newConcertData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Concert[];
      setConcertData(newConcertData);
    } catch (error) {
      console.error(
        "Error connecting to Firestore or accessing Storage:",
        error
      );
    }
  };

  useEffect(() => {
    fetchConcerts(); // Fetch concerts initially when the component mounts
  }, []);

  useEffect(() => {
    filterConcertData();
  }, [concertData]); // Update the filtered data whenever concertData changes

  const filterConcertData = () => {
    const today = Timestamp.now().toDate(); // Get today's date

    const upcomingConcerts = concertData
      .filter((concert) => {
        // Ensure each concert has a valid `date` field before proceeding
        if (concert.date && concert.date.toDate) {
          const concertDate = concert.date.toDate();
          return concertDate > today; // Filter for upcoming concerts
        }
        return false;
      })
      .sort((a, b) => {
        const aDate = a.date.toDate(); // Convert `Timestamp` to `Date`
        const bDate = b.date.toDate();
        return aDate.getTime() - bDate.getTime(); // Sort by nearest date first
      })
      .map((concert) => ({
        id: concert.id,
        title: concert.title.toString(),
        date: concert.date, // Keeping the original `Timestamp` for now
        location: concert.location,
        locationLink: concert.locationLink,
        ticketLink: concert.ticketLink,
        spotifyLink: concert.spotify,
        youtubeLink: concert.youtube,
        description: concert.description,
        imageURL: concert.imageURL,
      }));

    const pastConcerts = concertData
      .filter((concert) => {
        // Ensure each concert has a valid `date` field before proceeding
        if (concert.date && concert.date.toDate) {
          const concertDate = concert.date.toDate();
          return concertDate < today; // Filter for past concerts
        }
        return false;
      })
      .sort((a, b) => {
        const aDate = a.date.toDate(); // Convert `Timestamp` to `Date`
        const bDate = b.date.toDate();
        return bDate.getTime() - aDate.getTime(); // Sort by most recent date first
      })
      .map((concert) => ({
        id: concert.id,
        title: concert.title,
        date: concert.date, // Keeping the original `Timestamp` for now
        location: concert.location,
      }));

    setUpcomingConcerts(upcomingConcerts);
    setPastConcerts(pastConcerts);
  };

  // // Handle image selection
  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setImageFile(e.target.files[0]);
  //   }
  // };

  // // Handle image upload
  // const handleUpload = async (e: FormEvent) => {
  //   e.preventDefault();
  //   if (!imageFile) return;

  //   // Create a storage reference
  //   const storage = getStorage();
  //   const storageRef = ref(storage, `Concerts/${imageFile.name}`);
  //   console.log(storageRef);

  //   // Start the upload
  //   const uploadTask = uploadBytesResumable(storageRef, imageFile);

  //   // Monitor the upload progress
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       setUploadProgress(progress);
  //       console.log(`Upload is ${progress}% done`);
  //     },
  //     (error) => {
  //       console.error("Upload failed:", error);
  //     },
  //     async () => {
  //       // Upload completed successfully
  //       const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
  //       setImageUrl(downloadUrl); // Store the image URL in state
  //       console.log("File available at", downloadUrl);
  //     }
  //   );
  // };
  return {
    upcomingConcerts,
    pastConcerts,
    fetchConcerts,
    // handleFileChange,
    // handleUpload,
    // uploadProgress,
    // imageUrl,
    // imageFile,
  };
};

export default useConcertData;
