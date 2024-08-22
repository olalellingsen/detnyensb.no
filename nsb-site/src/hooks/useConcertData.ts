import { useState, useEffect } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase";
import { Concert } from "../types";

const useConcertData = () => {
  const [concertData, setConcertData] = useState<DocumentData[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<Concert[]>([]);
  const [pastConcerts, setPastConcerts] = useState<Concert[]>([]);

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
    const today = new Date();

    const upcomingConcerts = concertData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return aDate.getTime() - bDate.getTime(); // Sort by nearest date
      })
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate > today;
      })
      .map((concert) => ({
        id: concert.id,
        title: concert.title.toString(),
        date: concert.date.toDate().toLocaleDateString(),
        time: concert.date.toDate().toLocaleTimeString().slice(0, -3),
        location: concert.location,
        locationLink: concert.locationLink,
        ticketLink: concert.ticketLink,
        description: concert.description,
        image: concert.image,
      }));

    const pastConcerts = concertData
      .sort((a, b) => {
        const aDate = new Date(a.date.toDate());
        const bDate = new Date(b.date.toDate());
        return bDate.getTime() - aDate.getTime(); // Sort in most recent order
      })
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate < today;
      })
      .map((concert) => ({
        id: concert.id,
        title: concert.title,
        date: concert.date.toDate().toLocaleDateString(),
        location: concert.location,
      }));

    setUpcomingConcerts(upcomingConcerts);
    setPastConcerts(pastConcerts);
  };

  return {
    upcomingConcerts,
    pastConcerts,
    fetchConcerts,
  };
};

export default useConcertData;
