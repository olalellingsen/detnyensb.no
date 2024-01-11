// App.jsx
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Concerts from "./components/Concerts";

function App() {
  return (
    <>
      <Navbar />
      <div className="pt-24 px-2 sm:pt-24 sm:p-6 md:px-10 lg:px-24 xl:px-48 2xl:px-72 grid gap-12">
        <Home id="home" />
        <Music id="music" />
        <About id="about" />
        <Concerts id="concerts" upcoming={true} past={true} />
        <Contact id="contact" />
      </div>
      <Footer />
    </>
  );
}

export default App;
