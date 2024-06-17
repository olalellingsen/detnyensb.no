import Slideshow from "../components/Slideshow";

function Media() {
  return (
    <div className="mainContent">
      <h1 className="border-b">Media</h1>
      <br />
      <iframe
        src="https://www.youtube.com/embed/DC63I9B3K9g?autoplay=1&mute=1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="w-full aspect-video"
      ></iframe>
      <br />
      <iframe
        src="https://www.youtube.com/embed/nVf1SoZnbXQ?si=zU4QhniewRXajKhA&amp;controls=0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        className="w-full aspect-video"
      ></iframe>

      <br />
      <Slideshow />
    </div>
  );
}

export default Media;
