import { useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import placeholderImg from "../assets/placeholder.jpg";
import { Link } from "react-router-dom";

interface Member {
  name: string;
  section: string;
  instrument: string;
  img1?: string;
  imageUrl1?: string;
}

const sectionPaths = {
  sax: "Members/Sax/Sax",
  trumpet: "Members/Trumpet/Trumpet",
  trombone: "Members/Trombone/Trombone",
  rhythm: "Members/RhythmSection/RhythmSection",
  conductor: "Members/Conductor/Conductor",
};

function Members() {
  const [saxSection, setSaxSection] = useState<Member[]>([]);
  const [trumpetSection, setTrumpetSection] = useState<Member[]>([]);
  const [tromboneSection, setTromboneSection] = useState<Member[]>([]);
  const [rhythmSection, setRhythmSection] = useState<Member[]>([]);
  const [conductor, setConductor] = useState<Member>();

  const saxRef = useRef<HTMLDivElement>(null);
  const trumpetRef = useRef<HTMLDivElement>(null);
  const tromboneRef = useRef<HTMLDivElement>(null);
  const rhythmRef = useRef<HTMLDivElement>(null);
  const conductorRef = useRef<HTMLDivElement>(null);

  const [showSaxPlaceholder, setShowSaxPlaceholder] = useState(true);
  const [showTrumpetPlaceholder, setShowTrumpetPlaceholder] = useState(true);
  const [showTrombonePlaceholder, setShowTrombonePlaceholder] = useState(true);
  const [showRhythmPlaceholder, setShowRhythmPlaceholder] = useState(true);

  const fetchData = async (
    path: string,
    setSection: (data: Member[]) => void
  ) => {
    try {
      const memberQuery = query(collection(db, path), orderBy("order"));
      const querySnapshot = await getDocs(memberQuery);
      const storage = getStorage();

      const memberData: Member[] = await Promise.all(
        querySnapshot.docs.map(async (doc: DocumentData) => {
          const data = doc.data() as Member;
          const imageUrl1 = data.img1
            ? await getDownloadURL(
                ref(storage, `Portraits/${data.img1}`)
              ).catch(() => "")
            : "";
          return { ...data, imageUrl1 };
        })
      );

      setSection(memberData);
    } catch (error) {
      console.error(
        "Error connecting to Firestore or accessing Storage:",
        error
      );
    }
  };

  useEffect(() => {
    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          switch (entry.target.id) {
            case "sax-section":
              fetchData(sectionPaths.sax, setSaxSection);
              observer.unobserve(entry.target);
              break;
            case "trumpet-section":
              fetchData(sectionPaths.trumpet, setTrumpetSection);
              observer.unobserve(entry.target);
              break;
            case "trombone-section":
              fetchData(sectionPaths.trombone, setTromboneSection);
              observer.unobserve(entry.target);
              break;
            case "rhythm-section":
              fetchData(sectionPaths.rhythm, setRhythmSection);
              observer.unobserve(entry.target);
              break;
            case "conductor-section":
              fetchData(sectionPaths.conductor, (data) =>
                setConductor(data[0])
              );
              observer.unobserve(entry.target);
              break;
            default:
              break;
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "200px",
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (saxRef.current) observer.observe(saxRef.current);
    if (trumpetRef.current) observer.observe(trumpetRef.current);
    if (tromboneRef.current) observer.observe(tromboneRef.current);
    if (rhythmRef.current) observer.observe(rhythmRef.current);
    if (conductorRef.current) observer.observe(conductorRef.current);

    return () => {
      if (saxRef.current) observer.unobserve(saxRef.current);
      if (trumpetRef.current) observer.unobserve(trumpetRef.current);
      if (tromboneRef.current) observer.unobserve(tromboneRef.current);
      if (rhythmRef.current) observer.unobserve(rhythmRef.current);
      if (conductorRef.current) observer.unobserve(conductorRef.current);
    };
  }, []);

  return (
    <div className="mainContent">
      <h1>Musikere</h1>
      <br />

      {/* sax */}
      <section
        id="sax-section"
        ref={saxRef}
        style={{ minHeight: window.innerHeight }}
      >
        <h2>Saxofon</h2>
        {showSaxPlaceholder && (
          <div className="memberSection">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <img src={placeholderImg} className="animate-pulse" />
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-2/3"></div>
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-1/3"></div>
              </div>
            ))}
          </div>
        )}

        <div className="memberSection">
          {saxSection.map((member) => (
            <div
              className={`${
                showSaxPlaceholder ? "opacity-0" : "opacity-100"
              } member transition-opacity ease-in-out duration-1000`}
              key={member.name}
            >
              <Link to={`/members/Sax/${member.name}`}>
                <img
                  className="hover:scale-[1.02] transition-transform"
                  src={member.imageUrl1}
                  alt={member.name}
                  onLoad={() => setShowSaxPlaceholder(false)}
                />
              </Link>
              <p>{member.name}</p>
              <p className="text-black/50">{member.instrument}</p>
            </div>
          ))}
        </div>
      </section>

      {/* trumpet */}
      <section
        id="trumpet-section"
        ref={trumpetRef}
        style={{ minHeight: "400px" }}
      >
        <h2>Trompet</h2>
        {showTrumpetPlaceholder && (
          <div className="memberSection">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <img src={placeholderImg} className="animate-pulse" />
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-2/3"></div>
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-1/3"></div>
              </div>
            ))}
          </div>
        )}
        <div className="memberSection">
          {trumpetSection.map((member) => (
            <div
              className={`${
                showTrumpetPlaceholder ? "opacity-0" : "opacity-100"
              } member transition-opacity ease-in-out duration-1000`}
              key={member.name}
            >
              <Link to={`/members/Trumpet/${member.name}`}>
                <img
                  className="hover:scale-[1.02] transition-transform"
                  src={member.imageUrl1}
                  alt={member.name}
                  onLoad={() => setShowTrumpetPlaceholder(false)}
                />
              </Link>
              <p>{member.name}</p>
              <p className="text-black/50">{member.instrument}</p>
            </div>
          ))}
        </div>
      </section>

      {/* trombone */}
      <section
        id="trombone-section"
        ref={tromboneRef}
        style={{ minHeight: "400px" }}
      >
        <h2>Trombone</h2>
        {showTrombonePlaceholder && (
          <div className="memberSection">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <img src={placeholderImg} className="animate-pulse" />
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-2/3"></div>
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-1/3"></div>
              </div>
            ))}
          </div>
        )}
        <div className="memberSection">
          {tromboneSection.map((member) => (
            <div
              className={`${
                showTrombonePlaceholder ? "opacity-0" : "opacity-100"
              } member transition-opacity ease-in-out duration-1000`}
              key={member.name}
            >
              <Link to={`/members/Trombone/${member.name}`}>
                <img
                  className="hover:scale-[1.02] transition-transform"
                  src={member.imageUrl1}
                  alt={member.name}
                  onLoad={() => setShowTrombonePlaceholder(false)}
                />
              </Link>
              <p>{member.name}</p>
              <p className="text-black/50">{member.instrument}</p>
            </div>
          ))}
        </div>
      </section>

      {/* rhythm section */}
      <section
        id="rhythm-section"
        ref={rhythmRef}
        style={{ minHeight: "400px" }}
      >
        <h2>Kompet</h2>
        {showRhythmPlaceholder && (
          <div className="memberSection">
            {[...Array(4)].map((_, index) => (
              <div key={index}>
                <img src={placeholderImg} className="animate-pulse" />
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-2/3"></div>
                <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-1/3"></div>
              </div>
            ))}
          </div>
        )}
        <div className="memberSection">
          {rhythmSection.map((member) => (
            <div
              className={`${
                showRhythmPlaceholder ? "opacity-0" : "opacity-100"
              } member transition-opacity ease-in-out duration-1000`}
              key={member.name}
            >
              <Link to={`/members/RhythmSection/${member.name}`}>
                <img
                  className="hover:scale-[1.02] transition-transform"
                  src={member.imageUrl1}
                  alt={member.name}
                  onLoad={() => setShowRhythmPlaceholder(false)}
                />
              </Link>
              <p>{member.name}</p>
              <p className="text-black/50">{member.instrument}</p>
            </div>
          ))}
        </div>
      </section>

      {/* conductor */}
      <section id="conductor-section" ref={conductorRef}>
        <h2>Musikalsk leder</h2>
        <div className="memberSection">
          {conductor && (
            <div key={conductor.name} className="member">
              {conductor.imageUrl1 && (
                <Link to={`/members/Conductor/${conductor.name}`}>
                  <img
                    src={conductor.imageUrl1}
                    alt={conductor.name}
                    className="hover:scale-[1.02] transition-transform"
                  />
                </Link>
              )}
              <p>{conductor.name}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Members;
