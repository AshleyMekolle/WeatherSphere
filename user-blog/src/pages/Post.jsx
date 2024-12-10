import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from './firebase';
import { User, Edit, Trash2, Upload, Send, Github, LucideUserPen, } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Post.css';
import { Loading } from './loading-page';

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
);

const Footer = () => (
  <footer className="footer">
    <div className='footer-content'>
    <p>&copy; 2023 Weather Blog by Ashley Mekolle. All rights reserved.</p>
    <div className="social-links">
          <a href="https://github.com/AshleyMekolle" rel="Ashkey Mekolle's Github"><Github />  My github </a>
          <a href="https://Ashley" rel="Email"><LucideUserPen /> mekolleashleyam@gmail.com</a>
          
        </div>
        </div>
  </footer>
);

export const Post = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newPost, setNewPost] = useState({
    Location: '',
    Temperature: '',
    Weather_Condition: '',
    Comment: '',
    image: null
  });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!auth.currentUser) {
        setIsLoading(false);
        return;
      }

      try {
        const postsRef = collection(db, 'Weather_blog');
        const q = query(postsRef, where('userid', '==', auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserPosts(posts);
      } catch (error) {
        console.error("Error fetching user posts", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPost(prev => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) {
      alert("Please log in to create a post.");
      return;
    }

    try {
      let imageUrl = '';
      if (newPost.image) {
        const imageRef = ref(storage, `images/${Date.now()}_${newPost.image.name}`);
        await uploadBytes(imageRef, newPost.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const postData = {
        ...newPost,
        userid: auth.currentUser.uid,
        image: imageUrl,
        createdAt: new Date()
      };

      if (editingPost) {
        await updateDoc(doc(db, 'Weather_blog', editingPost.id), postData);
        setUserPosts(prev => prev.map(post => post.id === editingPost.id ? { ...post, ...postData } : post));
        setEditingPost(null);
      } else {
        const docRef = await addDoc(collection(db, 'Weather_blog'), postData);
        setUserPosts(prev => [...prev, { id: docRef.id, ...postData }]);
      }

      setNewPost({ Location: '', Temperature: '', Weather_Condition: '', Comment: '', image: null });
    } catch (error) {
      console.error("Error creating/updating post", error);
      alert("Failed to create/update post. Please try again.");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewPost({
      Location: post.Location,
      Temperature: post.Temperature,
      Weather_Condition: post.Weather_Condition,
      Comment: post.Comment,
      image: post.image
    });
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, 'Weather_blog', postId));
        setUserPosts(prev => prev.filter(post => post.id !== postId));
      } catch (error) {
        console.error("Error deleting post", error);
        alert("Failed to delete post. Please try again.");
      }
    }
  };

  if (isLoading) {
    return <Loading/>;
  }

  if (!auth.currentUser) {
    return <div>Please log in to view and create posts.</div>;
  }

  return (
    <div className='write-page'>
      <Header />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="write-title"
      >
        {editingPost ? 'Edit Your Weather Post' : 'Create a New Weather Post'}
      </motion.h1>
      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          name="Location"
          value={newPost.Location}
          onChange={handleInputChange}
          placeholder="Location"
          required
        />
        <input
          type="number"
          name="Temperature"
          value={newPost.Temperature}
          onChange={handleInputChange}
          placeholder="Temperature"
          required
        />
        <input
          type="text"
          name="Weather_Condition"
          value={newPost.Weather_Condition}
          onChange={handleInputChange}
          placeholder="Weather Condition"
          required
        />
        <textarea
          name="Comment"
          value={newPost.Comment}
          onChange={handleInputChange}
          placeholder="Your weather comment..."
          required
        />
        <div className="image-upload">
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
          <label htmlFor="image">
            <Upload /> Upload Image
          </label>
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send /> {editingPost ? 'Update Post' : 'Create Post'}
        </motion.button>
      </form>

      <div className="user-posts">
        <h2>Your Weather Posts</h2>
        {userPosts.length === 0 ? (
          <p>You haven't created any posts yet. Use the form above to create your first post!</p>
        ) : (
          userPosts.map((post) => (
            <motion.div
              className="user-post"
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>{post.Location}</h3>
              {post.image && (
                <img src={post.image} alt="Weather" className="post-image" />
              )}
              <p>Temperature: {post.Temperature}</p>
              <p>Weather Condition: {post.Weather_Condition}</p>
              <p>{post.Comment}</p>
              <div className="post-actions">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleEdit(post)}
                >
                  <Edit /> Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(post.id)}
                >
                  <Trash2 /> Delete
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};