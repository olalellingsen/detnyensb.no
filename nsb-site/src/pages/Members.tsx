import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import MemberCard from "../components/MemberCard";
import MemberPlaceholder from "../components/MemberPlaceholder";

interface Member {
  name: string;
  section: string;
  instrument: string;
  imageUrl1?: string;
  imageUrl2?: string;
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

          let img1 = data.name.split(" ")[0].toLowerCase() + "1.jpg";
          let img2 = data.name.split(" ")[0].toLowerCase() + "2.jpg";

          if (
            img1.includes("å") ||
            img1.includes("ø") ||
            img1.includes("æ") ||
            img2.includes("å") ||
            img2.includes("ø") ||
            img2.includes("æ")
          ) {
            img1 = img1.replace("å", "a");
            img1 = img1.replace("ø", "o");
            img1 = img1.replace("æ", "ae");
            img2 = img2.replace("å", "a");
            img2 = img2.replace("ø", "o");
            img2 = img2.replace("æ", "ae");
          }

          const imageUrl1 = await getDownloadURL(
            ref(storage, `Portraits/${img1}`)
          );
          const imageUrl2 = await getDownloadURL(
            ref(storage, `Portraits/${img2}`)
          );

          return { ...data, imageUrl1, imageUrl2 };
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
    const fetchAllSectionsSequentially = async () => {
      const sections = [
        {
          path: sectionPaths.sax,
          setSection: setSaxSection,
        },
        {
          path: sectionPaths.trumpet,
          setSection: setTrumpetSection,
        },
        {
          path: sectionPaths.trombone,
          setSection: setTromboneSection,
        },
        {
          path: sectionPaths.rhythm,
          setSection: setRhythmSection,
        },
        {
          path: sectionPaths.conductor,
          setSection: (data: Member[]) => setConductor(data[0]),
        },
      ];

      for (const section of sections) {
        await fetchData(section.path, section.setSection);
      }
    };

    fetchAllSectionsSequentially();
  }, []);

  return (
    <div className="mainContent">
      <h1>Musikere</h1>
      <br />

      {/* sax */}
      <section id="sax-section">
        <h2>Saxofon</h2>

        {saxSection.length < 5 && <MemberPlaceholder _number={5} />}

        <div className="memberSection">
          {saxSection.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              section="Sax"
              instrument={member.instrument}
              imageUrl1={member.imageUrl1}
            />
          ))}
        </div>
      </section>

      {/* trumpet */}
      <section id="trumpet-section">
        <h2>Trompet</h2>
        <div className="memberSection">
          {trumpetSection.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              section="Trumpet"
              instrument={member.instrument}
              imageUrl1={member.imageUrl1}
            />
          ))}
        </div>
      </section>

      {/* trombone */}
      <section id="trombone-section">
        <h2>Trombone</h2>
        <div className="memberSection">
          {tromboneSection.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              section="Trombone"
              instrument={member.instrument}
              imageUrl1={member.imageUrl1}
            />
          ))}
        </div>
      </section>

      {/* rhythm section */}
      <section id="rhythm-section">
        <h2>Kompet</h2>
        <div className="memberSection">
          {rhythmSection.map((member) => (
            <MemberCard
              key={member.name}
              name={member.name}
              section="RhythmSection"
              instrument={member.instrument}
              imageUrl1={member.imageUrl1}
            />
          ))}
        </div>
      </section>

      {/* conductor */}
      <section id="conductor-section">
        <h2>Musikalsk leder</h2>
        <div className="memberSection">
          {conductor && (
            <MemberCard
              key={conductor.name}
              name={conductor.name}
              section="Conductor"
              imageUrl1={conductor.imageUrl1}
            />
          )}
        </div>
      </section>
    </div>
  );
}

export default Members;
