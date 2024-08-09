import { useState } from "react";
import useConcertData from "../hooks/useConcertData"; // Adjust the import path if needed
import Concert from "../components/Concert";

function Concerts() {
  const { upcomingConcerts, pastConcerts } = useConcertData();
  const [showPast, setShowPast] = useState(false);

  return (
    <section className="mainContent">
      <h1>Kommende konserter</h1>
      <br />
      {/* placeholders */}
      {upcomingConcerts.length === 0 && (
        <div className="grid gap-4">
          <div className="bg-gray-300 animate-pulse rounded-lg h-96"></div>
          <div className="bg-gray-300 animate-pulse rounded-lg h-96"></div>
          <div className="bg-gray-300 animate-pulse rounded-lg h-96"></div>
          <div className="bg-gray-300 animate-pulse rounded-lg h-96"></div>
        </div>
      )}

      {/* Render upcoming concerts */}
      <div className="grid gap-4">
        {upcomingConcerts.map((concert) => (
          <Concert {...concert} key={concert.id} />
        ))}
      </div>

      <br />

      <div className="flex justify-center">
        <button onClick={() => setShowPast(!showPast)} className="btn1">
          {showPast ? (
            <>Skjul tidligere konserter</>
          ) : (
            <>Vis tidligere konserter</>
          )}
        </button>
      </div>
      <br />
      <div>
        {showPast && (
          <div>
            <h2>Tidligere konserter</h2>
            <br />
            {/* Render past concerts */}
            {pastConcerts.map((concert) => (
              <div className="mt-4 flex flex-col md:flex-row gap-2 md:gap-4 border-b border-gray-300">
                <h3 className="basis-1/6">{concert.date}</h3>
                <h3 className="basis-3/6">{concert.title}</h3>
                <h3 className="basis-2/6">{concert.location}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Concerts;
