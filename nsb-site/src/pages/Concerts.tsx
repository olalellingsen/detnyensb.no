import React, { useEffect, useState } from "react";
import Concert, { ConcertProps } from "../components/Concert";
import concerts from "/public/concerts.json";

function Concerts() {
  return (
    <div className="grid gap-2">
      <h2>Kommende konserter</h2>
      {concerts.map((concert: ConcertProps) => (
        <Concert
          key={concert.title}
          title={concert.title}
          date={concert.date}
          time={concert.time}
          location={concert.location}
          tickets={concert.tickets}
          description={concert.description}
          image={concert.image}
        />
      ))}
    </div>
  );
}

export default Concerts;
