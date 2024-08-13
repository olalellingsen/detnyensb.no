import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { Instagram, Music } from "lucide-react";
import { ClipLoader } from "react-spinners";

interface Member {
  name: string;
  instrument: string;
  imageUrl1?: string; // To store the actual image URL
  imageUrl2?: string; // To store the actual image URL
  quote?: string;
  born?: string;
  memberSince?: string;
  education?: string;
  otherBands?: string;
  instagram?: string;
  spotify?: string;
  photoBy?: string;
}

const MemberDetails = () => {
  const { section, name } = useParams<{ section: string; name: string }>();
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      if (!section || !name) return;

      try {
        // Construct the path using the section
        const memberQuery = query(
          collection(db, `Members/${section}/${section}`),
          where("name", "==", name)
        );
        const querySnapshot = await getDocs(memberQuery);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data() as Member;

          if (data.name) {
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

            const storage = getStorage();
            const imageUrl1 = await getDownloadURL(
              ref(storage, `Portraits/${img1}`)
            );
            const imageUrl2 = await getDownloadURL(
              ref(storage, `Portraits/${img2}`)
            );
            setMember({ ...data, imageUrl1, imageUrl2 });
          } else {
            setMember(data);
          }
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
      }
    };

    fetchMember();
  }, [section, name]);

  if (!member)
    return (
      <section className="mainContent">
        <div className="w-full flex justify-center py-24">
          <ClipLoader loading={true} size={100} />
        </div>
      </section>
    );

  return (
    <section className="mainContent">
      <Link to="/members" className="text-primary underline hover:no-underline">
        <p>Tilbake til oversikten</p>
      </Link>
      <br />
      <h1 className="md:text-start">{member.name}</h1>
      <h2 className="text-center md:text-start">{member.instrument}</h2>
      <br />
      <div className="block md:grid grid-cols-2 gap-12">
        {member.imageUrl1 && (
          <div>
            <img src={member.imageUrl1} alt={member.name} />

            {member.photoBy ? (
              <p className="font-extralight text-gray-500">
                Foto: {member.photoBy}
              </p>
            ) : (
              <p className="font-extralight text-gray-500">
                Foto: Anders Lillebø
              </p>
            )}
          </div>
        )}

        <section>
          {member.quote && (
            <h2 className="p-8 md:p-0 md:py-8 font-semibold text-primary">
              - {member.quote}
            </h2>
          )}

          <br />

          <div>
            {member.born && (
              <p>
                <b>Født:</b> {member.born}
              </p>
            )}
            {member.memberSince && (
              <p>
                <b>Medlem siden:</b> {member.memberSince}
              </p>
            )}
            {member.education && (
              <p>
                <b>Utdannelse:</b> {member.education}
              </p>
            )}
            {member.otherBands && (
              <p>
                <b>Andre band / prosjekter:</b> {member.otherBands}
              </p>
            )}
          </div>

          <br />

          {member.instagram && (
            <a
              href={`https://www.instagram.com/${member.instagram}`}
              target="blank"
              className="flex gap-1 text-primary my-4 hover:underline w-min"
            >
              <Instagram size={30} strokeWidth={1} className="stroke-primary" />
              <p>{member.instagram}</p>
            </a>
          )}
          {member.spotify && (
            <a
              href={member.spotify}
              target="blank"
              className="hover:underline text-primary flex gap-1 w-max"
            >
              <Music size={30} strokeWidth={1} className="stroke-primary" />
              <p>Spotify</p>
            </a>
          )}
        </section>
        <br />
      </div>
    </section>
  );
};

export default MemberDetails;
