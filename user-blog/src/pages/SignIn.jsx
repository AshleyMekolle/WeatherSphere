import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider, githubProvider } from './firebase'
import { Github, Mail } from 'lucide-react'
import '../styles/SignIn.css'
import { Loading } from './loading-page'

export const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const signIn = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      console.log("User created successfully.")
      navigate('/')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signInWithPopup(auth, googleProvider)
      navigate('/')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithGithub = async () => {
    setIsLoading(true)
    try {
      await signInWithPopup(auth, githubProvider)
      navigate("/home")
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    {isLoading && <Loading />}
    <div className="signin-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="signin-image-container"
      >
        <img
          src="../images/LoginImage.png"
          alt="Sign up illustration"
          className="signin-image"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="signin-form-container"
      >
        <div className="signin-form">
          <div className="signin-header">
            <h1 className="signin-title">Create an Account</h1>
            <p className="signin-subtitle">Join us and start sharing your weather experiences</p>
          </div>

          <form onSubmit={signIn} className="signin-form-inputs">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signin-input"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signin-input"
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="signin-button"
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </motion.button>
          </form>

          <div className="social-signin-container">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signInWithGoogle}
              disabled={isLoading}
              className="social-signin-button"
            >
              <Mail className="w-5 h-5" />
              Sign up with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signInWithGithub}
              disabled={isLoading}
              className="social-signin-button"
            >
              <Github className="w-5 h-5" />
              Sign up with Github
            </motion.button>
          </div>

          <p className="login-link-container">
            Already have an account?{" "}
            <Link to="/login" className="login-link">
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
    </>
  )
}