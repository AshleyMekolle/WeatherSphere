import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, AlertCircle } from 'lucide-react'
import '../styles/NotFound.css'

export const NotFound = () => {
  return (
    <div className="not-found">
      <motion.div 
        className="error-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="error-icon"
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <AlertCircle size={64} />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          404
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Link to="/" className="home-link">
            <motion.button
              className="home-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home size={20} />
              Back to Home
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}