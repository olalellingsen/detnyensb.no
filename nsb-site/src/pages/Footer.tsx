import Contact from "../components/Contact";

function Footer({ id }: { id: string }) {
  return (
    <div
      id={id}
      className="bg-primary text-white p-6 grid gap-4 sm:px-12 sm:pt-16"
    >
      <Contact />
      {/* footer */}
      <div className="py-4">
        <h3>Våre samarbeidspartnere:</h3>
        <div className="py-2 font-extralight grid">
          <a href="https://www.homeworkspace.no/" target="_blank">
            Home Workspace
          </a>

          <a href="https://sparebankstiftelsen.no/" target="_blank">
            Sparebankstiftelsen
          </a>

          <a href="https://ostnorsk.jazzinorge.no/" target="_blank">
            Østnorsk Jazzsenter
          </a>

          <a href="https://jazzforum.jazzinorge.no/" target="_blank">
            Norsk Jazzforum
          </a>

          <a href="https://www.kulturdirektoratet.no/" target="_blank">
            Kulturdirektoratet
          </a>

          <a
            href="https://www.oslo.kommune.no/etater-foretak-og-ombud/kulturetaten/#gref"
            target="_blank"
          >
            Oslo Kommune
          </a>
        </div>
      </div>
      <p className="text-center">© 2024 Det Nye Norske Storband</p>
    </div>
  );
}

export default Footer;
