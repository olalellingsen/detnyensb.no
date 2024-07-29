import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { db } from "../firebase";
import { Instagram } from "lucide-react";

interface Member {
  name: string;
  instrument: string;
  img1?: string;
  imageUrl1?: string; // To store the actual image URL
  quote?: string;
  born?: string;
  memberSince?: string;
  education?: string;
  otherBands?: string;
  instagram?: string;
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

          if (data.img1) {
            const storage = getStorage();
            const imageUrl1 = await getDownloadURL(
              ref(storage, `Portraits/${data.img1}`)
            );
            setMember({ ...data, imageUrl1 });
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

  if (!member) return <div className="mainContent">Loading...</div>;

  return (
    <div className="mainContent">
      <h1 className="md:text-start">{member.name}</h1>
      <h2 className="text-center md:text-start">{member.instrument}</h2>
      <br />
      <div className="block md:grid grid-cols-2 gap-12">
        {member.imageUrl1 && (
          <div>
            <img src={member.imageUrl1} alt={member.name} />
            <p className="font-extralight text-gray-500">
              Foto: Anders Lillebø
            </p>
          </div>
        )}

        <div>
          {member.quote && (
            <p className="p-8 md:p-0 md:py-8 font-semibold text-primary">
              - {member.quote}
            </p>
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

          {member.instagram && (
            <a
              href={`https://www.instagram.com/${member.instagram}`}
              target="blank"
              className="hover:underline text-primary flex gap-1 mt-8 w-max"
            >
              <Instagram size={24} strokeWidth={1.5} />
              {member.instagram}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
