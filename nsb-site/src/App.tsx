import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import Footer from "./pages/Footer";
import Concerts from "./pages/Concerts";
import NewsAndConcert from "./components/NewsAndConcert";
import Members from "./pages/Members";

function App() {
  return (
    <div className="bg-primaryBg">
      <Navbar />
      <Home id="home" />
      <div className="mainContent">
        <NewsAndConcert />
        <About id="about" />
        <Members id="members" />
        <Music id="music" />
        <Concerts id="concerts" />
      </div>
      <Footer id="footer" />
    </div>
  );
}

export default App;
