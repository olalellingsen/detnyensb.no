import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

interface NewsItem {
  title: string;
  text: string;
}

function News() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch text data from Firestore
        const querySnapshot = await getDocs(collection(db, "News"));
        const data: NewsItem[] = querySnapshot.docs.map(
          (doc) => doc.data() as NewsItem
        );
        setNewsData(data);
      } catch (error) {
        console.error(
          "Error connecting to Firestore or accessing Storage:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      {newsData.map((newsItem, index) => (
        <div key={index}>
          <h2>{newsItem.title}</h2>
          <p>{newsItem.text}</p>
        </div>
      ))}
    </div>
  );
}

export default News;
