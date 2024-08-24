import Contact from "./Contact";

function Footer() {
  return (
    <footer className="bg-primary text-white p-6 grid gap-4 sm:px-12 sm:pt-16">
      <Contact />
      <br />
      <h3>
        <a
          className="underline hover:no-underline"
          target="_blank"
          href="https://secure.officevisual.net/su/38079648418011?fbclid=IwAR2TDgzvcBkLk3m97aMXHIB9KYPDqfBYLPowXZnVI5RWgwogiPNc1OQ71Bc_aem_ATGPg5jUaEbZ47ia99mtFawLaKthQAfDHvnejy5Hini085kYOKgVv5wdA_hhtkmhoUk"
        >
          <button className="btn2">Nyhetsbrev</button>
        </a>
      </h3>

      <div className="py-4">
        <h3>Våre samarbeidspartnere:</h3>
        <div className="py-2 font-extralight grid w-max">
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
    </footer>
  );
}

export default Footer;
