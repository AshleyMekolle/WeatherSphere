import React from 'react'
import { motion } from 'framer-motion'
import { Cloud, Sun, Wind, Users2Icon } from 'lucide-react'
import '../styles/About.css'

export const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  }

  return (
    <motion.div 
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants} className="about-title">About Us</motion.h1>
      
      <motion.div variants={itemVariants} className="about-content">
        <p>Welcome to WeatherSphere!</p>
        <p>Your ultimate companion for accurate and reliable weather updates, designed to keep you informed and prepared.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="mission">
        <h2>Our Mission</h2>
        <p>At WeatherSphere, we believe that weather information should be accessible, accurate, and easy to understand. Our goal is to help you plan your day with confidence, whether you're heading to work, planning a trip, or just curious about the weather in your area.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="offerings">
        <h2>What We Offer</h2>
        <ul>
          <motion.li variants={itemVariants}><Cloud /> Real-Time Updates: Get the latest weather forecasts updated in real time.</motion.li>
          <motion.li variants={itemVariants}><Sun /> Global Coverage: Check weather conditions for your location or anywhere around the world.</motion.li>
          <motion.li variants={itemVariants}><Wind /> Detailed Insights: From temperature and humidity to wind speed and precipitation, we've got all the details you need.</motion.li>
          <motion.li variants={itemVariants}><Users2Icon /> Social Interaction: Where you can post and view posts on weather insights with other users, as well as like and comment on posts.</motion.li>
        </ul>
      </motion.div>

      <motion.div variants={itemVariants} className="why-choose-us">
        <h2>Why Choose WeatherWise?</h2>
        <p>With advanced technology and a focus on user satisfaction, our app provides accurate and reliable weather data, helping you stay ahead of any weather surprises. We're committed to delivering the best experience, one forecast at a time.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="vision">
        <h2>Our Vision</h2>
        <p>We aim to be your go-to weather app by combining innovation with usability. Whether it's sunny, rainy, or stormy, WeatherWise ensures you're always prepared.</p>
      </motion.div>

      <motion.div variants={itemVariants} className="thank-you">
        <p>Thank you for choosing WeatherSphere! Together, let's make every day a little more predictable.</p>
      </motion.div>
    </motion.div>
  )
}