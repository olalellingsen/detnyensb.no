import { Link } from "react-router-dom";
import useNewsData from "../hooks/useNewsData";

function NewsCards() {
  const { newsData } = useNewsData();

  return (
    <div className="relative p-4">
      <h1 className="text-primary">Aktuelt</h1>
      <br />
      <div className="flex overflow-x-scroll lg:flex-wrap gap-4 lg:px-8">
        {newsData.map((newsItem, index) => (
          <Link to={`/news/${newsItem.id}`} key={index}>
            <div className="bg-primary dark:bg-primaryDark rounded-lg shadow-xl text-white hover:bg-primary/90 transition-all p-4 h-full w-[260px] xs:w-[320px] sm:w-[400px]">
              {/* <img src="" alt="" /> */}
              <h2 className="py-2">{newsItem.title}</h2>
              <p className="font-extralight">{newsItem.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default NewsCards;
