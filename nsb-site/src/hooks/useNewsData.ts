import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { NewsItem } from "../types";

const useNewsData = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchNewsData = async () => {
      const snapshot = await getDocs(collection(db, "News"));
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as NewsItem[];
      setNewsData(data);
    };

    fetchNewsData();
  }, []);

  const getNewsItem = (id: string) => {
    return newsData.find((newsItem) => newsItem.id === id);
  };

  const addNewsItem = async (newsItem: NewsItem) => {
    const docRef = await addDoc(collection(db, "News"), newsItem);
    setNewsData([...newsData, { ...newsItem, id: docRef.id }]);
  };

  const deleteNewsItem = async (newsItem: NewsItem) => {
    const newsDocRef = doc(db, "News", newsItem.id);
    await deleteDoc(newsDocRef);
    setNewsData(newsData.filter((item) => item.id !== newsItem.id));
  };

  const updateNewsItem = async (newsItem: NewsItem) => {
    const newsDocRef = doc(db, "News", newsItem.id);
    await updateDoc(newsDocRef, { ...newsItem, id: newsItem.id });
    setNewsData(
      newsData.map((item) => (item.id === newsItem.id ? newsItem : item))
    );
  };

  return { newsData, addNewsItem, deleteNewsItem, updateNewsItem, getNewsItem };
};

export default useNewsData;
