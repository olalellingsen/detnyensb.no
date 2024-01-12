import SoMe from "./SoMe";

function Contact() {
  const emailAddress = "detnyenorskestorband@gmail.com";
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      {/* contact */}
      <div>
        <h2>Kontakt oss:</h2>
        <a className="underline" href={`mailto:${emailAddress}`}>
          <p>{emailAddress}</p>
        </a>
        <p>+47 97 67 27 64</p>
      </div>
      {/* SoMe */}
      <div>
        <h2>Følg oss:</h2>
        <div className="flex gap-8 py-4">
          <SoMe face={true} size={40} />
          <SoMe insta={true} size={40} />
          <SoMe yt={true} size={40} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
