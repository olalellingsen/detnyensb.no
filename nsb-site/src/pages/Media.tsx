import Slideshow from "../components/Slideshow";

function Media() {
  return (
    <section className="mainContent">
      <h1>Media</h1>

      <section>
        <iframe
          src="https://www.youtube.com/embed/DC63I9B3K9g?autoplay=1&mute=1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          className="w-full aspect-video py-2"
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/nVf1SoZnbXQ?si=zU4QhniewRXajKhA&amp;controls=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full aspect-video py-2"
        ></iframe>
      </section>
      <br />
      <section>
        <Slideshow />
      </section>
    </section>
  );
}

export default Media;
