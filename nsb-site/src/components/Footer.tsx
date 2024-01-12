import Contact from "./Contact";

function Footer({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="bg-primary text-white p-8 grid gap-4 md:grid-cols-2"
    >
      <Contact />
      {/* footer */}
      <div>
        <h2>Våre samarbeidspartnere:</h2>
        <div className="underline font-extralight grid xl:grid-cols-3">
          <p>
            <a href="https://www.homeworkspace.no/">Home Workspace</a>
          </p>
          <p>
            <a href="https://sparebankstiftelsen.no/">Sparebankstiftelsen</a>
          </p>
          <p>
            <a href="https://ostnorsk.jazzinorge.no/">Østnorsk Jazzsenter</a>
          </p>
          <p>
            <a href="https://jazzforum.jazzinorge.no/">Norsk Jazzforum</a>
          </p>
          <p>
            <a href="https://www.kulturdirektoratet.no/">Kulturdirektoratet</a>
          </p>
          <p>
            <a href="https://www.oslo.kommune.no/etater-foretak-og-ombud/kulturetaten/#gref">
              Oslo Kommune
            </a>
          </p>
        </div>
      </div>
      <p className="sm:col-span-2 text-center">
        © 2023 Det Nye Norske Storband
      </p>
    </div>
  );
}

export default Footer;
