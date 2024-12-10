import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, updateDoc, doc, arrayUnion, arrayRemove, query, orderBy, getDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from "./firebase"
import { motion } from 'framer-motion'
import { ThumbsUp, MessageCircle, User } from 'lucide-react'
import '../styles/Home.css'
import { Loading } from './loading-page'

const Header = () => (
  <header className="header">
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/post">Post</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/weather">Weather</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
    <div className="user-icon">
      <User />
      <span>{auth.currentUser?.email?.charAt(0).toUpperCase() || 'G'}</span>
    </div>
  </header>
)

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2023 Weather Blog. All rights reserved.</p>
  </footer>
)

export const Home = () => {
  const [blogPosts, setBlogPosts] = useState([])
  const [commentInputs, setCommentInputs] = useState({});
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Weather_blog'))
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setBlogPosts(posts)
      } catch (error) {
        console.error("Error fetching blog posts", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchBlogPosts()
  }, [])

  const handleLike = async (postId) => {
    if (!auth.currentUser) {
      alert("Please sign in to like posts.")
      return
    }

    const postRef = doc(db, 'Weather_blog', postId)
    const userId = auth.currentUser.uid
    const post = blogPosts.find(post => post.id === postId)
    
    try {
      if (post.likes && post.likes.includes(userId)) {
        await updateDoc(postRef, {
          likes: arrayRemove(userId)
        })
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(userId)
        })
      }
      
      // Update local state
      setBlogPosts(blogPosts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes ? (post.likes.includes(userId) ? post.likes.filter(id => id !== userId) : [...post.likes, userId]) : [userId] }
          : post
      ))
    } catch (error) {
      console.error("Error updating like", error)
      alert("Failed to update like. Please try again.")
    }
  }

  const handleComment = async (postId) => {
    if (!auth.currentUser) {
      alert("Please sign in to comment.")
      return
    }

    const commentText = commentInputs[postId];
    if (!commentText || commentText.trim() === '') {
      alert("Please enter a comment.");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      const username = userDoc.data()?.username || auth.currentUser.email.split('@')[0] || 'Anonymous';

      const postRef = doc(db, "Weather_blog", postId);
      await updateDoc(postRef, {
        comments: arrayUnion({
          userId: auth.currentUser.uid,
          username: username,
          text: commentText.trim(),
          createdAt: serverTimestamp()
        })
      });

      // Update local state
      setBlogPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                comments: [...(post.comments || []), {
                  userId: auth.currentUser.uid,
                  username: username,
                  text: commentText.trim(),
                  createdAt: new Date() // Use a JavaScript Date object for immediate display
                }]
              }
            : post
        )
      );

      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error("Error adding comment: ", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='home'>
      <Header />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="home-title"
      >
        Welcome to the Weather Blog
      </motion.h1>
      <div className="posts">
        {blogPosts.map((post, index) => (
          <motion.div
            className="post"
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
                <h2 className="post-title">Weather in {post.Location}</h2>
              </Link>
              {post.image && (
                <motion.img
                  src={post.image}
                  alt="Weather"
                  className="post-image"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              <p className="post-info">Temperature: {post.Temperature}</p>
              <p className="post-info">Weather Condition: {post.Weather_Condition}</p>
              <motion.p
                className="post-comment"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {post.Comment}
              </motion.p>
              <div className="post-actions">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleLike(post.id)}
                  className={`like-button ${post.likes && post.likes.includes(auth.currentUser?.uid) ? 'liked' : ''}`}
                >
                  <ThumbsUp /> {post.likes ? post.likes.length : 0}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="comment-button"
                >
                  <MessageCircle /> {post.comments ? post.comments.length : 0}
                </motion.button>
              </div>
              <div className="comment-section">
                {post.comments && post.comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <strong>{comment.username}: </strong>
                    {comment.text}
                  </div>
                ))}
                <div className="new-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleComment(post.id)}
                  >
                    Post
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  )
}