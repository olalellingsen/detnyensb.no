import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function EditBio() {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBio = async () => {
      const docRef = doc(db, "About", "Bio");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBio(docSnap.data().Text || "");
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    fetchBio();
  }, [db]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      const docRef = doc(db, "About", "Bio");
      await updateDoc(docRef, {
        Text: bio,
      });
      alert("Bio updated successfully.");
    } else {
      alert("You need to be signed in to update the bio.");
    }
  };

  return (
    <section>
      <h2>Bio</h2>
      {loading && <p>Loading...</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={10}
          className="min-h-[400px]"
        />
        <button type="submit" className="btn1">
          Lagre
        </button>
      </form>
    </section>
  );
}

export default EditBio;
