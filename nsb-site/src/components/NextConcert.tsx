import Concert from "./Concert";
import useConcertData from "../hooks/useConcertData";
import ClipLoader from "react-spinners/ClipLoader";

function NextConcert() {
  const { upcomingConcerts } = useConcertData();

  if (upcomingConcerts.length === 0) {
    return (
      <div className="flex justify-center pt-20 min-h-[500px]">
        <ClipLoader loading={true} size={100} />
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
      image={upcomingConcerts[0].image}
    />
  );
}

export default NextConcert;
