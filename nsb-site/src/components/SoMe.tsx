import React from "react";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Youtube } from "lucide-react";

interface Props {
  face?: boolean;
  insta?: boolean;
  yt?: boolean;
}

function SoMe({ face, insta, yt }: Props) {
  return (
    <div>
      {face && (
        <div>
          <a href="https://www.facebook.com/DetNyeNorskeStorband">
            <Facebook size={60} className="soMeIcon" />
          </a>
        </div>
      )}
      {insta && (
        <div>
          <a href="https://www.instagram.com/detnyensb/">
            <Instagram size={60} className="soMeIcon" />
          </a>
        </div>
      )}
      {yt && (
        <div>
          <a href="https://youtube.com/@detnyenorskestorband9703?si=_wFiGCcNUFfGuNI0">
            <Youtube size={60} className="soMeIcon" />
          </a>
        </div>
      )}
    </div>
  );
}

export default SoMe;
