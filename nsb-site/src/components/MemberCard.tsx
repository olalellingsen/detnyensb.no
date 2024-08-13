import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

interface MemberCardProps {
  name: string;
  section: string;
  instrument?: string;
  imageUrl1?: string;
  imageUrl2?: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  name,
  section,
  instrument,
  imageUrl1,
}) => {
  return (
    <div className="member sm:hover:scale-[1.02] transition-all ease-in-out">
      <Link to={`/members/${section}/${name}`}>
        <LazyImage src={imageUrl1} alt={name} triggerOnce />
      </Link>
      <p>{name}</p>
      <p className="text-black/50">{instrument}</p>
    </div>
  );
};

export default MemberCard;
