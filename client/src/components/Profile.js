import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken, isAuthenticated, getPayload } from '../helpers/auth.js'

const Profile = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')
  const [readingChallenge, setReadingChallenge] = useState('')

  //!  fetch book data from the server
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('/api/books')
        const bookData = response.data
        setBooks(bookData)   
      } catch (error) {
        setError(error)
      }
    }
    getBooks()
  }, [])

  //! fetch user data from the server
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`/api/auth/users/${getPayload().sub}`)
        const userData = response.data
        console.log('USERDATA', userData)
        
        setUser(userData)
      } catch (error) {
        setError(error)
      }
    }
    getUserData()
  }, [])


  return (
    <div className='profile-container'>
      <div className='top-container'>
        <div className='profile-photo'>
          <img className='image' 
            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' 
            style={{ width: '100px', height: '100px' }}
          />
        </div>
        <div className='username'>
          <p> username </p>
        </div>
      </div>
      <div className='user-bookselves-container'>
        {user && <h4>{`${user.username}'s`}   Bookshelves</h4>}
        <ul>
          { user && (
            <>
              <li><Link to="/my-books?category=all">All ({user.read.length + user.reading.length + user.wishlist.length })</Link></li>
              <li><Link to="/my-books?category=read">Read ({user.read.length})</Link></li>
              <li><Link to="/my-books?category=reading">Currently Reading ({user.reading.length}) </Link></li>
              <li><Link to="/my-books?category=wishlist">Want to Read ({user.wishlist.length}) </Link></li>
            </>
          )}
        </ul>
      </div>
      <div className='reading-challenge'>
        <div>
          <h4> Reading Challenge</h4>
          <div className='bar-text-update'>
            <div className='progress-container'>
              <progress className = 'progress-bar' value="50" max="100"></progress>
            </div>
            <div className='read-quantity'>
              <p>You read 10 out of 20 books. </p>
            </div>
            <div>
              <button className='update-goal-button'>Update Goal</button>
            </div>
          </div>
        </div>
      </div>
      <div className='recent-updates'>
        <h4>Recent Updates</h4>
        <p> Recent updates will go here </p>
      </div>
    </div>

  )
}

export default Profile
