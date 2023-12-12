import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import Calendar from "./pages/Calendar";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-24 p-3 sm:pt-24 sm:p-6 ">
        <Home />
        {/* <About />
        <Music />
        <Calendar />
        <Contact /> */}
      </div>
      <Footer />
    </>
  );
}

export default App;
