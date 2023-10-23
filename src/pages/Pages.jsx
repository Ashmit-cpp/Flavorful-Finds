import React from "react";
import Home from "./Home";
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import Favourite from "./Favourite";
import { Route, Routes } from "react-router-dom";
import Favbutton from "../components/Favbutton";

function Pages() {
  return (
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<Searched />} />
        <Route path="/recipe/:name" element={<Recipe />} />
        <Route path="/Favourite" element={<Favourite />} />
      </Routes> 
  );

} 
export default Pages