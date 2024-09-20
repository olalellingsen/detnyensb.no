import { Link } from "react-router-dom";
import { Concert as ConcertType } from "../types";

function Concert({
  next,
  title,
  subtitle,
  date,
  id,
  ticketLink,
  imageURL,
}: ConcertType) {
  return (
    <div
      className={`text-white ${
        next ? "bg-stone-900 rounded-xl md:min-h-[425px]" : "bg-primary"
      }`}
    >
      {next && <h2 className="text-center py-2">Neste konsert:</h2>}

      {imageURL && <img src={imageURL} alt={"Image of " + title} />}

      <div className="p-4 grid gap-4">
        <p>{date.toDate().toLocaleDateString()}</p>

        <h2 className="flex justify-start">{title}</h2>

        {subtitle && <h3>{subtitle}</h3>}

        <div className="flex gap-4">
          {ticketLink && (
            <a href={ticketLink} target="_blank">
              <button className="btn2">Kjøp billetter</button>
            </a>
          )}
          <Link
            to={`/concert/${id}`}
            className="underline my-2 hover:no-underline"
          >
            Les mer
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Concert;
