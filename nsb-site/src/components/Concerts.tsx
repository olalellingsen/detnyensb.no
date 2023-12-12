import React, { useEffect, useState } from "react";
import Concert, { ConcertProps } from "./Concert";
import concerts from "/public/concerts.json";

function Concerts({ nextConcertOnly }: { nextConcertOnly?: boolean }) {
  let displayedConcerts: ConcertProps[] = [];

  if (nextConcertOnly) {
    const nextConcert = concerts[0]; // Get the first concert
    if (nextConcert) {
      displayedConcerts = [nextConcert]; // Display only the first concert
    }
  } else {
    displayedConcerts = concerts; // Display all concerts
  }

  return (
    <div className="grid gap-2">
      <div>
        {displayedConcerts.map((concert: ConcertProps) => (
          <Concert
            key={concert.title}
            title={concert.title}
            date={concert.date}
            time={concert.time}
            location={concert.location}
            ticketLink={concert.ticketLink}
            locationLink={concert.locationLink}
            description={concert.description}
            image={concert.image}
          />
        ))}
      </div>
    </div>
  );
}

export default Concerts;
