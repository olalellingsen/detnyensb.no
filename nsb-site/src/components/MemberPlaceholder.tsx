import placeholder from "../assets/placeholder.jpg";

interface MemberPlaceholderProps {
  _number: number;
}

function MemberPlaceholder({ _number }: MemberPlaceholderProps) {
  return (
    <div className="memberSection">
      {[...Array(_number)].map((_, index) => (
        <div key={index} className="member">
          <img src={placeholder} className="animate-pulse" />
          <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-2/3"></div>
          <div className="h-4 my-2 bg-gray-300 animate-pulse rounded mx-auto w-1/3"></div>
        </div>
      ))}
    </div>
  );
}

export default MemberPlaceholder;
