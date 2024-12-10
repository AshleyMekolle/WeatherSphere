import React from 'react'
import { motion } from 'framer-motion'
import '../styles/Loading.css'

export const Loading = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}