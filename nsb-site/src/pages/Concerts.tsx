import { useState } from "react";
import useConcertData from "../hooks/useConcertData"; // Adjust the import path if needed
import Concert from "../components/Concert";

interface Props {
  nextOnly?: boolean;
}

function Concerts({ nextOnly }: Props) {
  const { upcomingConcerts, pastConcerts } = useConcertData();
  const [showPast, setShowPast] = useState(false);

  return (
    <>
      {/* for the home page */}
      {nextOnly && upcomingConcerts.length > 0 && (
        <Concert
          id={upcomingConcerts[0].id} // Pass id here
          title={upcomingConcerts[0].title}
          date={upcomingConcerts[0].date}
          time={upcomingConcerts[0].time}
          location={upcomingConcerts[0].location}
          locationLink={upcomingConcerts[0].locationLink}
          description={upcomingConcerts[0].description}
          ticketLink={upcomingConcerts[0].ticketLink}
          image={upcomingConcerts[0].image}
        />
      )}

      {/* for the concerts page */}
      {!nextOnly && (
        <div className="mainContent">
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
              <ul>
                {/* Render past concerts */}
                {pastConcerts.map((concert) => (
                  <li key={concert.id}>
                    <div className="flex py-1">
                      <p>
                        {concert.date} - {concert.title} - {concert.location}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Concerts;
