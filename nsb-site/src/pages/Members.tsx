import { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import LazyImage from "../components/LazyImage";

interface Member {
  name: string;
  section: string;
  instrument: string;
  img1?: string;
  img2?: string;
  imageUrl1?: string;
  imageUrl2?: string;
  sectionOrder: number;
}

function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [trumpetSection, setTrumpetSection] = useState<Member[]>([]);
  const [tromboneSection, setTromboneSection] = useState<Member[]>([]);
  const [saxSection, setSaxSection] = useState<Member[]>([]);
  const [rhythmSection, setRhythmSection] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Members"));
        const storage = getStorage();

        const memberData: Member[] = await Promise.all(
          querySnapshot.docs.map(async (doc: DocumentData) => {
            const data = doc.data() as Member;

            const imageUrl1 = data.img1
              ? await getDownloadURL(
                  ref(storage, `Portraits/${data.img1}`)
                ).catch(() => "")
              : "";
            // const imageUrl2 = data.img2
            //   ? await getDownloadURL(
            //       ref(storage, `Portraits/${data.img2}`)
            //     ).catch(() => "")
            //   : "";

            return { ...data, imageUrl1 };
          })
        );

        setMembers(memberData);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sortMembers = () => {
      const trumpet = members
        .filter((member) => member.section === "Trompet")
        .sort((a, b) => a.sectionOrder - b.sectionOrder);
      setTrumpetSection(trumpet);

      const trombone = members
        .filter((member) => member.section === "Trombone")
        .sort((a, b) => a.sectionOrder - b.sectionOrder);
      setTromboneSection(trombone);

      const sax = members
        .filter((member) => member.section === "Sax")
        .sort((a, b) => a.sectionOrder - b.sectionOrder);
      setSaxSection(sax);

      const rhythm = members
        .filter((member) => member.section === "Komp")
        .sort((a, b) => a.sectionOrder - b.sectionOrder);
      setRhythmSection(rhythm);
    };

    sortMembers();
  }, [members]);

  return (
    <div className="mainContent">
      <h1 className="border-b">Musikere</h1>
      <br />
      <h2>Saxofon</h2>
      <div className="memberSection">
        {saxSection.map((member) => (
          <div className="member" key={member.name}>
            {member.imageUrl1 && (
              <LazyImage src={member.imageUrl1} alt={member.name} />
            )}
            <p>{member.name}</p>
            <p className="text-black/50">{member.instrument}</p>
          </div>
        ))}
      </div>

      <h2>Trompet</h2>
      <div className="memberSection">
        {trumpetSection.map((member) => (
          <div key={member.name} className="member">
            {member.imageUrl1 && (
              <LazyImage
                key={member.name}
                src={member.imageUrl1}
                alt={member.name}
              />
            )}
            <p>{member.name}</p>
            <p className="text-black/50">{member.instrument}</p>
          </div>
        ))}
      </div>

      <h2>Trombone</h2>
      <div className="memberSection">
        {tromboneSection.map((member) => (
          <div key={member.name} className="member">
            {member.imageUrl1 && (
              <LazyImage src={member.imageUrl1} alt={member.name} />
            )}
            <p>{member.name}</p>
            <p className="text-black/50">{member.instrument}</p>
          </div>
        ))}
      </div>

      <h2>Kompet</h2>
      <div className="memberSection">
        {rhythmSection.map((member) => (
          <div key={member.name} className="member">
            {member.imageUrl1 && (
              <LazyImage src={member.imageUrl1} alt={member.name} />
            )}
            <p>{member.name}</p>
            <p className="text-black/50">{member.instrument}</p>
          </div>
        ))}
      </div>
      <h2>Musikalsk leder</h2>
      <div className="memberSection">
        {members
          .filter((member) => member.section === "Musikalsk leder")
          .map((member) => (
            <div key={member.name} className="member">
              {member.imageUrl1 && (
                <LazyImage src={member.imageUrl1} alt={member.name} />
              )}
              <p>{member.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Members;
