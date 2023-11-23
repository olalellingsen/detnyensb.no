import React from "react";

export interface ConcertProps {
  title: string;
  image?: string;
  date: string;
  time: string;
  location: string;
  tickets?: string;
  description?: string;
}

function Concert({
  title,
  date,
  time,
  location,
  description,
  tickets,
  image,
}: ConcertProps) {
  return (
    <div className="card grid grid-cols-2 gap-4">
      <img src={image} alt="" className="rounded-md" />
      <div>
        <h2>{title}</h2>
        <p>{date}</p>
        <p>{time}</p>
        <p>{location}</p>
        <a className="underline" href={tickets}>
          Billetter
        </a>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Concert;
