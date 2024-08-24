import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ChevronDown, ChevronRight } from "lucide-react";

export interface Media {
  id: string; // Add an ID to the media for updates and deletes
  url: string;
  order: number;
  isLoaded: boolean;
  title: string;
}

function EditMusic() {
  const [albums, setAlbums] = useState<Media[]>([]);
  const [singles, setSingles] = useState<Media[]>([]);
  const [newAlbumUrl, setNewAlbumUrl] = useState("");
  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumOrder, setNewAlbumOrder] = useState<number>(0);
  const [newSingleUrl, setNewSingleUrl] = useState("");
  const [newSingleOrder, setNewSingleOrder] = useState<number>(0);
  const [newSingleTitle, setNewSingleTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const albumQuery = await getDocs(collection(db, "Albums"));
      const singleQuery = await getDocs(collection(db, "Singles"));

      const albumData = albumQuery.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
        order: doc.data().order,
        title: doc.data().title,
        isLoaded: false,
      })) as Media[];

      const singleData = singleQuery.docs.map((doc) => ({
        id: doc.id,
        url: doc.data().url,
        order: doc.data().order,
        title: doc.data().title,
        isLoaded: false,
      })) as Media[];

      setAlbums(albumData.sort((a, b) => b.order - a.order));
      setSingles(singleData.sort((a, b) => b.order - a.order));
    };

    fetchData();
  }, []);

  // Add new album to Firestore
  const addAlbum = async () => {
    await addDoc(collection(db, "Albums"), {
      url: newAlbumUrl,
      title: newAlbumTitle,
      order: newAlbumOrder,
    });
    setNewAlbumUrl("");
    setNewAlbumOrder(0);
    alert("Album added successfully!");
  };

  // Oppdater existing album
  const updateAlbum = async (
    id: string,
    updatedUrl: string,
    updatedOrder: number,
    updatedTitle: string
  ) => {
    const albumDocRef = doc(db, "Albums", id);
    await updateDoc(albumDocRef, {
      url: updatedUrl,
      order: updatedOrder,
      title: updatedTitle,
    });
    alert("Album updated successfully!");
  };

  // Slett album
  const deleteAlbum = async (id: string) => {
    const albumDocRef = doc(db, "Albums", id);
    await deleteDoc(albumDocRef);
    alert("Album deleted successfully!");
  };

  // Similar functions for singles: addSingle, updateSingle, deleteSingle
  const addSingle = async () => {
    await addDoc(collection(db, "Singles"), {
      url: newSingleUrl,
      order: newSingleOrder,
      title: newSingleTitle,
    });
    setNewSingleUrl("");
    setNewSingleOrder(0);
    alert("Single added successfully!");
  };

  const updateSingle = async (
    id: string,
    updatedUrl: string,
    updatedOrder: number,
    updatedTitle: string
  ) => {
    const singleDocRef = doc(db, "Singles", id);
    await updateDoc(singleDocRef, {
      url: updatedUrl,
      order: updatedOrder,
      title: updatedTitle,
    });
    alert("Single updated successfully!");
  };

  const deleteSingle = async (id: string) => {
    const singleDocRef = doc(db, "Singles", id);
    await deleteDoc(singleDocRef);
    alert("Single deleted successfully!");
  };

  const [editAlbums, setEditAlbums] = useState(false);
  const [editSingles, setEditSingles] = useState(false);
  const [showAddAlbum, setShowAddAlbum] = useState(false);
  const [showAddSingle, setShowAddSingle] = useState(false);

  return (
    <section className="grid gap-2">
      <h2>Utgivelser</h2>

      <button
        className="flex hover:underline"
        onClick={() => {
          setShowAddAlbum((prev) => !prev);
          setEditAlbums(false);
          setEditSingles(false);
          setShowAddSingle(false);
        }}
      >
        <h3>Legg til album</h3>
        {showAddAlbum ? <ChevronDown size={30} /> : <ChevronRight size={30} />}
      </button>
      {showAddAlbum && (
        <form
          className="grid gap-2 border-b border-black py-4 my-2"
          onSubmit={(e) => {
            e.preventDefault();
            addAlbum();
          }}
        >
          <input
            type="text"
            placeholder="Tittel"
            value={newAlbumTitle}
            onChange={(e) => setNewAlbumTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Spotify URL"
            value={newAlbumUrl}
            onChange={(e) => setNewAlbumUrl(e.target.value)}
            required
          />

          <div className="flex gap-2">
            <p className="py-2">Album nr:</p>
            <input
              type="number"
              value={newAlbumOrder}
              onChange={(e) => setNewAlbumOrder(Number(e.target.value))}
              required
              className="w-12"
            />
          </div>
          <button className="btn1" type="submit">
            Legg til album
          </button>
        </form>
      )}

      <button
        className="flex hover:underline"
        onClick={() => {
          setShowAddSingle(false);
          setEditSingles(false);
          setShowAddAlbum(false);
          setEditAlbums((prev) => !prev);
        }}
      >
        <h3>Endre album</h3>
        {editAlbums ? <ChevronDown size={30} /> : <ChevronRight size={30} />}
      </button>
      {editAlbums && (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              <form
                className="grid border-b border-black py-4 my-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateAlbum(album.id, album.url, album.order, album.title);
                }}
              >
                <p>Navn</p>
                <input
                  type="text"
                  onChange={(e) =>
                    setAlbums((prev) =>
                      prev.map((a) =>
                        a.id === album.id ? { ...a, title: e.target.value } : a
                      )
                    )
                  }
                  value={album.title}
                />
                <br />
                <p>Spotify link</p>
                <input
                  type="text"
                  value={album.url}
                  onChange={(e) =>
                    setAlbums((prev) =>
                      prev.map((a) =>
                        a.id === album.id ? { ...a, url: e.target.value } : a
                      )
                    )
                  }
                />
                <br />
                <div className="flex gap-2">
                  <p className="py-2">Album nr:</p>
                  <input
                    className="w-12"
                    type="number"
                    value={album.order}
                    onChange={(e) =>
                      setAlbums((prev) =>
                        prev.map((a) =>
                          a.id === album.id
                            ? { ...a, order: Number(e.target.value) }
                            : a
                        )
                      )
                    }
                  />
                </div>
                <br />
                <div className="flex gap-2">
                  <button className="btn1" type="submit">
                    Oppdater
                  </button>
                  <button
                    className="btn1"
                    type="button"
                    onClick={() => deleteAlbum(album.id)}
                  >
                    Slett
                  </button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      )}

      <button
        className="flex hover:underline"
        onClick={() => {
          setShowAddSingle((prev) => !prev);
          setEditAlbums(false);
          setEditSingles(false);
          setShowAddAlbum(false);
        }}
      >
        <h3>Legg til singel</h3>
        {showAddSingle ? <ChevronDown size={30} /> : <ChevronRight size={30} />}
      </button>

      {showAddSingle && (
        <form
          className="grid gap-2 border-b border-black py-4 my-2"
          onSubmit={(e) => {
            e.preventDefault();
            addSingle();
          }}
        >
          <input
            type="text"
            placeholder="Tittel"
            value={newSingleTitle}
            onChange={(e) => setNewSingleTitle(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Spotify URL"
            value={newSingleUrl}
            onChange={(e) => setNewSingleUrl(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <p className="py-2">Singel nr:</p>
            <input
              className="w-12"
              type="number"
              placeholder="Order"
              value={newSingleOrder}
              onChange={(e) => setNewSingleOrder(Number(e.target.value))}
              required
            />
          </div>

          <button className="btn1" type="submit">
            Legg til singel
          </button>
        </form>
      )}

      <button
        className="flex hover:underline"
        onClick={() => {
          setShowAddAlbum(false);
          setEditAlbums(false);
          setShowAddSingle(false);
          setEditSingles((prev) => !prev);
        }}
      >
        <h3>Endre singler</h3>
        {editSingles ? <ChevronDown size={30} /> : <ChevronRight size={30} />}
      </button>
      {editSingles && (
        <ul>
          {singles.map((single) => (
            <li key={single.id}>
              <form
                className="grid border-b border-black py-4 my-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateSingle(
                    single.id,
                    single.url,
                    single.order,
                    single.title
                  );
                }}
              >
                <p>Navn</p>
                <input
                  type="text"
                  onChange={(e) =>
                    setSingles((prev) =>
                      prev.map((s) =>
                        s.id === single.id ? { ...s, title: e.target.value } : s
                      )
                    )
                  }
                  value={single.title}
                />
                <br />
                <p>Spotify link</p>
                <input
                  type="text"
                  value={single.url}
                  onChange={(e) =>
                    setSingles((prev) =>
                      prev.map((s) =>
                        s.id === single.id ? { ...s, url: e.target.value } : s
                      )
                    )
                  }
                />
                <br />
                <div className="flex gap-2">
                  <p className="py-2">Singel nr:</p>
                  <input
                    className="w-12"
                    type="number"
                    value={single.order}
                    onChange={(e) =>
                      setSingles((prev) =>
                        prev.map((s) =>
                          s.id === single.id
                            ? { ...s, order: Number(e.target.value) }
                            : s
                        )
                      )
                    }
                  />
                </div>
                <br />
                <div className="flex gap-2">
                  <button className="btn1" type="submit">
                    Oppdater
                  </button>
                  <button
                    className="btn1"
                    type="button"
                    onClick={() => deleteSingle(single.id)}
                  >
                    Slett
                  </button>
                </div>
              </form>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EditMusic;
