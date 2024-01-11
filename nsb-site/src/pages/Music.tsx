import React from "react";

function Music({ id }: { id: string }) {
  return (
    <div id={id} className="h-full">
      <h1>Musikk</h1>
    </div>
  );
}

export default Music;
