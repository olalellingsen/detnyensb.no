import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import Concerts from "./pages/Concerts";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-24 h-screen">
        <Home />
        <About />
        <Music />
        <Concerts />
        <Contact />
      </div>
    </>
  );
}

export default App;
