import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import Login from "../components/Login";
import { motion } from 'framer-motion';
import React from 'react'

function Home() {

  return (
    <div>
      <Popular />
      <Veggie />
    </div>
  )
}

export default Home