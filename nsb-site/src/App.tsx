import { Route, BrowserRouter, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Members from "./pages/Members";
import Music from "./pages/Music";
import Concerts from "./pages/Concerts";
import ScrollToTop from "./components/ScrollToTop";
import Media from "./pages/Media";
import ConcertDetails from "./pages/ConcertDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bg-primaryBg">
        <ScrollToTop />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/about" Component={About} />
          <Route path="/members" Component={Members} />
          <Route path="/media" Component={Media} />
          <Route path="/music" Component={Music} />
          <Route path="/concerts" Component={Concerts} />
          <Route path="/concert/:id" Component={ConcertDetails} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
