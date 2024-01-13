// App.jsx
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";

import Footer from "./components/Footer";
import Concerts from "./components/Concerts";

function App() {
  return (
    <div className="bg-primaryBg">
      <Navbar />
      <div className="pt-24 px-2 sm:pt-24 sm:p-6 lg:px-24 xl:px-40 2xl:px-72 grid gap-24 mb-24">
        <Home id="home" />
        {/* <About id="about" /> */}
        {/* <Music id="music" /> */}
        {/* <Concerts id="concerts" /> */}
      </div>
      <Footer id="footer" />
    </div>
  );
}

export default App;
