import { useParams } from "react-router-dom";
import useNewsData from "../hooks/useNewsData";
import { ClipLoader } from "react-spinners";

function NewsDetails() {
  const { id } = useParams();
  const { getNewsItem } = useNewsData();
  const newsItem = getNewsItem(id + "");

  if (!newsItem) {
    return (
      <section className="mainContent">
        <div className="w-full flex justify-center py-24">
          <ClipLoader loading={true} size={100} color="#1c4e50" />
        </div>
      </section>
    );
  }

  return (
    <section className="mainContent">
      <h1>{newsItem?.title}</h1>
      <p>{newsItem?.text}</p>
    </section>
  );
}

export default NewsDetails;
