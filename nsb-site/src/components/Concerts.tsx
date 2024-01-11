import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore"; // Import DocumentData
import { db } from "../firebase";
import Concert, { ConcertProps } from "./Concert";
import { set } from "firebase/database";

interface Props {
  nextOnly?: boolean;
  past?: boolean;
  upcoming?: boolean;
  id: string;
}

function Concerts({ nextOnly, past, upcoming, id }: Props) {
  const [concertData, setConcertData] = useState<DocumentData[]>([]);
  const [upcomingConcerts, setUpcomingConcerts] = useState<ConcertProps[]>([]);
  const [pastConcerts, setPastConcerts] = useState<ConcertProps[]>([]);
  const [uniqueConcertIds, setUniqueConcertIds] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Concerts"));
        const newConcertData = querySnapshot.docs.map((doc) =>
          doc.data()
        ) as DocumentData[];
        setConcertData(newConcertData);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, [id]); // Add 'id' as a dependency to refetch data when 'id' changes

  useEffect(() => {
    filterConcertData();
  }, [concertData]); // Update the filtered data whenever concertData changes

  function filterConcertData() {
    const today = new Date();
    const upcomingConcerts = concertData
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate > today;
      })
      .map((concert) => ({
        title: concert.title.toString(),
        date: concert.date.toDate().toLocaleDateString(),
        time: concert.date.toDate().toLocaleTimeString().slice(0, -3),
        location: concert.location,
        locationLink: concert.locationLink,
        ticketLink: concert.ticketLink,
        description: concert.description,
      }));

    const pastConcerts = concertData
      .filter((concert) => {
        const concertDate = new Date(concert.date.toDate());
        return concertDate < today;
      })
      .map((concert) => ({
        title: concert.title,
        date: concert.date.toDate().toLocaleDateString("no-NO"),
        location: concert.location,
      }));

    // Use Set to keep track of unique concert IDs
    const newUniqueConcertIds = new Set([
      ...concertData.map((concert) => concert.id),
    ]);

    // Check for new data to avoid duplicates
    setUpcomingConcerts(upcomingConcerts);
    setPastConcerts(pastConcerts);
    setUniqueConcertIds(newUniqueConcertIds);
  }

  return (
    <div>
      {/* Render components using concertData */}
      {nextOnly && (
        <div>
          <Concert
            title={upcomingConcerts[0]?.title}
            date={upcomingConcerts[0]?.date}
            time={upcomingConcerts[0]?.time}
            location={upcomingConcerts[0]?.location}
            locationLink={upcomingConcerts[0]?.locationLink}
            description={upcomingConcerts[0]?.description}
            ticketLink={upcomingConcerts[0]?.ticketLink}
          />
        </div>
      )}
      {upcoming && (
        <div>
          <h1>Kommende konserter</h1>
          <div className="grid gap-4 sm:grid-cols-2 mt-2">
            {upcomingConcerts.map((concert) => (
              <Concert {...concert} />
            ))}
          </div>
        </div>
      )}
      {past && (
        <div className="pt-8">
          <h1>Tidligere konserter</h1>
          <ul className="pt-2">
            {pastConcerts.map((concert) => (
              <li>
                <div className="flex gap-8">
                  <p>{concert.title}</p>
                  <p>{concert.location}</p>
                  <p>{concert.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Render other necessary components */}
    </div>
  );
}

export default Concerts;