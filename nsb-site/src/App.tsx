// App.jsx
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import { RandomColorProvider } from "./RandomColorContext";

import Footer from "./components/Footer";
import Concerts from "./components/Concerts";

function App() {
  return (
    <RandomColorProvider>
      <div className="bg-primaryBg">
        <Navbar />
        <div className="pt-20 px-2 sm:pt-24 sm:p-6 lg:px-24 xl:px-40 2xl:px-72 grid gap-16 sm:gap-24 mb-24">
          <Home id="Home" />
          <About id="About" />
          <Music id="Music" />
          <Concerts id="Concerts" />
        </div>
        <Footer id="Footer" />
      </div>
    </RandomColorProvider>
  );
}

export default App;
