import { useState, useRef, useEffect } from "react";
import useConcertData from "../hooks/useConcertData";
import Concert from "../components/Concert";
import { ClipLoader } from "react-spinners";

function Concerts() {
  const { upcomingConcerts, pastConcerts } = useConcertData();
  const [showPast, setShowPast] = useState(false);
  const pastConcertsRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showPast && pastConcertsRef.current) {
      pastConcertsRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (!showPast) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [showPast]);

  return (
    <section className="mainContent">
      <h1>Kommende konserter</h1>
      <br />

      {loading && (
        <section className="flex justify-center h-screen mt-24">
          <ClipLoader loading={true} size={100} />
        </section>
      )}

      {/* Render upcoming concerts */}
      {upcomingConcerts.length === 1 && (
        <section onLoad={() => setLoading(false)}>
          <Concert {...upcomingConcerts[0]} key={upcomingConcerts[0].id} />
        </section>
      )}

      {upcomingConcerts.length > 1 && (
        <section
          className="grid gap-4 sm:grid-cols-2"
          onLoad={() => setLoading(false)}
        >
          {upcomingConcerts.map((concert) => (
            <Concert {...concert} key={concert.id} />
          ))}
        </section>
      )}

      <br />

      <div className="flex justify-center" ref={pastConcertsRef}>
        <button onClick={() => setShowPast(!showPast)} className="btn1">
          {showPast ? (
            <>Skjul tidligere konserter</>
          ) : (
            <>Vis tidligere konserter</>
          )}
        </button>
      </div>
      <br />
      <section>
        {showPast && (
          <div>
            <h2>Tidligere konserter</h2>
            <br />
            {/* Render past concerts */}
            {pastConcerts.map((concert) => (
              <div
                className="mt-4 flex flex-col md:flex-row gap-2 md:gap-4 border-b border-gray-300"
                key={concert.id}
              >
                <h3 className="basis-1/6">{concert.date.toDate().getDate()}</h3>
                <h3 className="basis-3/6">{concert.title}</h3>
                <h3 className="basis-2/6">{concert.location}</h3>
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
}

export default Concerts;
