import { useState, useEffect } from "react";
import Concert from "./Concert";
import useConcertData from "../hooks/useConcertData";
import ClipLoader from "react-spinners/ClipLoader";

function NextConcert() {
  const { upcomingConcerts } = useConcertData();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (upcomingConcerts) {
      // Stop the loader once the data has been fetched (even if there are no concerts)
      setLoading(false);
    }
  }, [upcomingConcerts]);

  if (loading) {
    return (
      <div className="flex justify-center pt-20 min-h-[500px]">
        <ClipLoader loading={true} size={100} />
      </div>
    );
  }

  if (upcomingConcerts.length === 0) {
    return (
      <div className="flex justify-center pt-20 min-h-[425px] bg-gray-200 rounded-xl">
        <h3>Det er ingen kommende konserter</h3>
      </div>
    );
  }

  return (
    <Concert
      next
      id={upcomingConcerts[0].id}
      title={upcomingConcerts[0].title}
      date={upcomingConcerts[0].date}
      time={upcomingConcerts[0].time}
      location={upcomingConcerts[0].location}
      locationLink={upcomingConcerts[0].locationLink}
      description={upcomingConcerts[0].description}
      ticketLink={upcomingConcerts[0].ticketLink}
      imageURL={upcomingConcerts[0].imageURL}
    />
  );
}

export default NextConcert;
