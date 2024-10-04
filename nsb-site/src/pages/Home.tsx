import { useEffect, useState } from "react";
import homeImage from "../assets/images/home.jpg";
// import NewsCards from "../components/NewsCards";
import { Link } from "react-router-dom";
import NextConcert from "../components/NextConcert";
import { X } from "lucide-react";

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(true);
    }, 2000);
  }, []);

  return (
    <>
      <img
        src={homeImage}
        alt="Home"
        className="object-cover h-screen w-full"
      />

      {/* popup for nyhetsbrev */}
      <aside
        className={`font-extralight ${
          showPopup ? "opacity-100" : "right-0 opacity-0"
        } transition-all duration-1000 absolute right-0 bottom-0 sm:w-72 m-2 xs:m-6 rounded-xl p-4 text-white bg-primary dark:bg-primaryDark shadow-xl`}
      >
        <X
          className="absolute top-0 right-0 m-1 cursor-pointer hover:scale-110"
          size={30}
          strokeWidth={1}
          onClick={() => setShowPopup(false)}
        />
        <p className="mr-5 sm:mr-0">
          Alle som er registrert i vårt nyhetsbrev vil bli oppdatert om våre
          konserter, samt motta mulighet for forhåndsbestilling av billetter og
          rabatterte billetter!
        </p>

        <div className="flex justify-center sm:justify-start mt-2">
          <a
            href="https://secure.officevisual.net/su/38079648418011?fbclid=IwAR2TDgzvcBkLk3m97aMXHIB9KYPDqfBYLPowXZnVI5RWgwogiPNc1OQ71Bc_aem_ATGPg5jUaEbZ47ia99mtFawLaKthQAfDHvnejy5Hini085kYOKgVv5wdA_hhtkmhoUk"
            target="blank"
          >
            <button className="btn2">Meld deg på her</button>
          </a>
        </div>
      </aside>

      <section>
        <div className="pt-8 px-2 lg:w-4/5 xl:w-[1000px] mx-auto pb-8 grid gap-8 md:grid-cols-2">
          <div>
            <NextConcert />

            <div className="flex justify-center py-4">
              <Link to="/concerts">
                <button className="btn1">Se alle konserter</button>
              </Link>
            </div>
          </div>

          <div>
            <iframe
              src="https://open.spotify.com/embed/artist/07RkGtZNwFOTFyVFEw4cMY?utm_source=generator&theme=0"
              width="100%"
              height={425}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            ></iframe>

            <div className="flex justify-center py-4">
              <Link to="/music">
                <button className="btn1">Se alle utgivelser</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="bg-primary/20 pb-8">
        <NewsCards />
      </section> */}
    </>
  );
}

export default Home;
