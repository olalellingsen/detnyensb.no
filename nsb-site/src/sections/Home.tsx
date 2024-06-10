import homeImage from "../assets/images/home.jpg";

function Home({ id }: { id: string }) {
  return (
    <div className="h-full" id={id}>
      <img src={homeImage} alt="" className="object-cover h-screen w-full" />
    </div>
  );
}

export default Home;
