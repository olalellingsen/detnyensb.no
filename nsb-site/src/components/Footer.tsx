import Contact from "./Contact";

function Footer({ id }: { id: string }) {
  return (
    <div id={id} className="bg-primary text-white p-6 grid gap-4 sm:px-12 sm:pt-16">
      <Contact />
      {/* footer */}
      <div className="py-4">
        <h2 className="lg:text-center">Våre samarbeidspartnere:</h2>
        <div className="underline font-extralight grid lg:flex justify-between">
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
      <p className="text-center">© 2023 Det Nye Norske Storband</p>
    </div>
  );
}

export default Footer;
