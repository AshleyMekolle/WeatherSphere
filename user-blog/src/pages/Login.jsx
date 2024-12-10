import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth, googleProvider, githubProvider } from './firebase'
import { Github, Mail } from 'lucide-react'
import '../styles/login.css'
import { Loading } from './loading-page'

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const logIn = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/write')
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
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="login-image-container"
      >
        <img
          src="../images/LoginImage.png"
          alt="Login illustration"
          className="login-image"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="login-form-container"
      >
        <div className="login-form">
          <div className="login-header">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to access your account</p>
          </div>

          <form onSubmit={logIn} className="login-form-inputs">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </form>

          <div className="social-login-container">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signInWithGoogle}
              disabled={isLoading}
              className="social-login-button"
            >
              <Mail className="w-5 h-5" />
              Sign in with Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={signInWithGithub}
              disabled={isLoading}
              className="social-login-button"
            >
              <Github className="w-5 h-5" />
              Sign in with Github
            </motion.button>
          </div>

          <p className="signup-link-container">
            Don't have an account?{" "}
            <Link to="/signin" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
      </>
  )
}