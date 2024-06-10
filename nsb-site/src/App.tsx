// App.jsx
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import About from "./sections/About";
import Music from "./sections/Music";
import { RandomColorProvider } from "./RandomColorContext";

import Footer from "./sections/Footer";
import Concerts from "./sections/Concerts";
import NewsAndConcert from "./components/NewsAndConcert";

function App() {
  return (
    <RandomColorProvider>
      <div className="bg-primaryBg">
        <Navbar />
        <Home id="home" />
        <div className="mainContent">
          <NewsAndConcert />
          <About id="about" />
          <Music id="music" />
          <Concerts id="concerts" />
        </div>
        <Footer id="footer" />
      </div>
    </RandomColorProvider>
  );
}

export default App;
