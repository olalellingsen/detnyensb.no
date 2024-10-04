import React, { useState } from "react";
import useNewsData from "../hooks/useNewsData";
import { NewsItem } from "../types";

function EditNews() {
  const { newsData, addNewsItem, deleteNewsItem, updateNewsItem } =
    useNewsData();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [selectedNewsItem, setSelectedNewsItem] = useState<
    NewsItem | undefined
  >();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newsItem = { title, text } as NewsItem;
    addNewsItem(newsItem);
    resetForm();
  }

  function resetForm() {
    setTitle("");
    setText("");
  }

  function updateNews(newsItem: NewsItem) {
    const updatedNewsItem = { ...newsItem, title, text };
    updateNewsItem(updatedNewsItem);
    resetForm();
    setIsEditing(false);
  }

  return (
    <section>
      {isEditing ? <h3>Rediger nyhet</h3> : <h3>Legg til nyhet</h3>}
      <form className="grid gap-2 py-2" onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          placeholder="Tittel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="text"
          rows={6}
          placeholder="Tekst"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {isEditing ? (
          <div className="flex gap-2">
            <button
              className="btn1"
              onClick={() => updateNews(selectedNewsItem as NewsItem)}
            >
              Lagre
            </button>
            <button
              className="btn1"
              onClick={() => {
                resetForm();
                setIsEditing(false);
              }}
            >
              Avbryt
            </button>
          </div>
        ) : (
          <button className="btn1" type="submit">
            Legg til
          </button>
        )}
      </form>

      <br />

      <ul className="grid md:grid-cols-2 gap-4 w-full">
        {newsData.map((newsItem, index) => (
          <div
            key={index}
            className="bg-primary dark:bg-primaryDark rounded-lg shadow-xl text-white h-full p-4 relative"
          >
            {/* <img src="" alt="" /> */}
            <h2 className="py-2">{newsItem.title}</h2>
            <p className="font-extralight">{newsItem.text}</p>
            <br />
            <br />
            <div className="absolute bottom-2 right-2 space-x-2">
              {!isEditing && (
                <>
                  <button
                    className="btn2"
                    onClick={() => {
                      setIsEditing(true);
                      setSelectedNewsItem(newsItem);
                      setTitle(newsItem.title);
                      setText(newsItem.text);
                    }}
                  >
                    Rediger
                  </button>
                  <button
                    className="btn2"
                    onClick={() => deleteNewsItem(newsItem)}
                  >
                    Slett
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
}

export default EditNews;
