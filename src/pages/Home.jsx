import Hero from "./Hero";
import React from "react";

function Home({ onSearch }) {
  return (
    <div>
      <Hero onSearch={onSearch} />
    </div>
  );
}

export default Home;
