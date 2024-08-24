import { useState, FormEvent } from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import useConcertData from "../hooks/useConcertData";
import Concert from "../components/Concert";
import { db } from "../firebase";
import { Concert as ConcertType } from "../types";

function EditConcerts() {
  const {
    upcomingConcerts,
    fetchConcerts,
    handleFileChange,
    handleUpload,
    uploadProgress,
    imageUrl,
    imageFile,
  } = useConcertData();

  const [loading, setLoading] = useState(true);

  // State for the form inputs, typed according to the Concert interface
  const [title, setTitle] = useState<string>("");
  const [concertDate, setConcertDate] = useState<string>("");
  const [concertTime, setConcertTime] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [locationLink, setLocationLink] = useState<string>("");
  const [ticketLink, setTicketLink] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false); // New state to track editing mode
  const [editingConcertId, setEditingConcertId] = useState<string | null>(null); // Holds ID of the concert being edited

  // Reset form inputs
  const resetForm = () => {
    setTitle("");
    setConcertDate("");
    setLocation("");
    setLocationLink("");
    setTicketLink("");
    setSpotifyLink("");
    setYoutubeLink("");
    setDescription("");
    setIsEditing(false);
    setEditingConcertId(null);
  };

  // Function to handle adding/updating a concert in Firestore

  const handleConcertSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Create a JavaScript Date object
    const dateTime = new Date(concertDate + "T" + concertTime);

    // Convert to Firestore Timestamp
    const concertTimestamp = Timestamp.fromDate(dateTime);

    const concertData: Omit<ConcertType, "id"> = {
      title,
      date: concertTimestamp, // Store the timestamp in Firestore format
      time: concertTime, // Optional: If you want to store time separately
      location,
      locationLink,
      ticketLink,
      description,
      // image: imageFile?.name,
      spotify: spotifyLink,
      youtube: youtubeLink,
    };

    try {
      if (isEditing && editingConcertId) {
        // Update the existing concert
        const concertRef = doc(db, "Concerts", editingConcertId);
        await updateDoc(concertRef, concertData);
        alert("Concert updated successfully!");
      } else {
        // Add a new concert
        await addDoc(collection(db, "Concerts"), concertData);
        alert("Concert added successfully!");
      }
      resetForm(); // Clear the form
      fetchConcerts(); // Fetch the updated concert data
    } catch (error) {
      console.error("Error submitting concert:", error);
      alert("Failed to submit concert. Please try again.");
    }
  };

  // Function to prepopulate the form with the selected concert details for editing
  const editConcert = (concert: ConcertType) => {
    setIsEditing(true);
    setTitle(concert.title);
    setConcertDate("");
    setLocation(concert.location);
    setLocationLink(concert.locationLink || "");
    setTicketLink(concert.ticketLink || "");
    setSpotifyLink(concert.spotify || "");
    setYoutubeLink(concert.youtube || "");
    setDescription(concert.description || "");
    setEditingConcertId(concert.id || null);
  };

  // Function to delete a concert from Firestore
  const deleteConcert = async (id: string) => {
    try {
      await deleteDoc(doc(db, "Concerts", id));
      fetchConcerts(); // Fetch the updated concert data
      alert("Concert deleted successfully!");
    } catch (error) {
      console.error("Error deleting concert:", error);
      alert("Failed to delete concert. Please try again.");
    }
  };

  return (
    <section>
      <div>
        <h3>{isEditing ? "Rediger konsert" : "Legg til konsert"}</h3>
        <form className="grid gap-2 py-2" onSubmit={handleConcertSubmit}>
          <input
            type="text"
            placeholder="Tittel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="date"
            id="concertDate"
            name="concertDate"
            value={concertDate}
            onChange={(e) => setConcertDate(e.target.value)}
            required
          />
          <input
            type="time"
            id="concertTime"
            name="concertTime"
            value={concertTime}
            onChange={(e) => setConcertTime(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Sted"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Link til Google Maps"
            value={locationLink}
            onChange={(e) => setLocationLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link til billetter"
            value={ticketLink}
            onChange={(e) => setTicketLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link til Spotify"
            value={spotifyLink}
            onChange={(e) => setSpotifyLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link til YouTube"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
          />
          <textarea
            placeholder="Beskrivelse"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-72"
          />
          {/* <div className="bg-white p-4 rounded-lg">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button className="btn1" onClick={handleUpload}>
              Last opp
            </button>

            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
          </div> */}

          <div className="flex flex-wrap gap-2">
            <button className="btn1" type="submit">
              {isEditing ? "Oppdater konsert" : "Legg til konsert"}
            </button>

            {isEditing && (
              <button
                className="btn1 bg-red-400"
                type="button"
                onClick={resetForm}
              >
                Avbryt redigering
              </button>
            )}
          </div>
        </form>
      </div>

      <br />

      <h3>Kommende konserter</h3>
      {loading && <p>Loading...</p>}
      {/* Render upcoming concerts */}
      {upcomingConcerts.length > 0 && (
        <section
          onLoad={() => setLoading(false)}
          className="grid sm:grid-cols-2 gap-4"
        >
          {upcomingConcerts.map((concert) => (
            <div key={concert.id}>
              <Concert {...concert} />
              <div className="flex flex-wrap p-2 gap-2 bg-primary pl-4">
                <button
                  className="btn1 bg-yellow-500 hover:bg-yellow-700"
                  onClick={() => editConcert(concert)}
                >
                  Rediger
                </button>
                <button
                  className="btn1 bg-red-500 hover:bg-red-700"
                  onClick={() => deleteConcert(concert.id!)}
                >
                  Slett konsert
                </button>
              </div>
            </div>
          ))}
        </section>
      )}
    </section>
  );
}

export default EditConcerts;
