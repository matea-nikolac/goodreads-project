import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken, isAuthenticated, getPayload } from '../helpers/auth.js'
import SpinnerComponent from './common/SpinnerComponent.js'


const Profile = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')
  const [readingChallenge, setReadingChallenge] = useState('')

  // fetch book data from the server
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('/api/books/')
        const bookData = response.data
        setBooks(bookData)   
        console.log('book', bookData)
      } catch (error) {
        setError(error)
      }
    }
    getBooks()
  }, [])

  // fetch user data from the server
  useEffect(() => {
    const getUserData = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get(`/api/auth/users/${getPayload().sub}/`)
        const userData = response.data
        console.log('USERDATA', userData)
        
        setUser(userData)
        console.log('user', user)
        // }, 50000)
      } catch (error) {
        setError(error)
      }
    }
    getUserData()
  }, [])

  // Generate recent updates

  const generateRecentUpdates = (category, statusText) => {
    if (user && user[category].length > 0 ){
      return (
        user[category].map((bookId) => {
          const book = books.find((b) => b.id === bookId)
          if (book) {
            return (
              <div className='recent-update-container' key={book.id}>
                <div className='status-text'>
                  <p>{`${user.username} ${statusText}`}</p>
                </div>
                <div className='bottom-container'>
                  <div className='image-container'>
                    <Link to={`/books/${book.id}`} key={book.id} className='book-card'>
                      <img className='image' src={book.book_cover} alt={book.title} />
                    </Link>
                  </div>
                  <div className='title-author-container'>
                    <h5>
                      <Link to={`/books/${book.id}`} key={book.id} className='book-card'>
                        {book.title}
                      </Link>
                    </h5>
                    <p>by {book.author} </p>
                  </div>
                </div>
              </div>
            )
          }
        })
      )
    }
  }

  // CAN DELETE:

  const [updatedReadingGoal, setUpdatedReadingGoal] = useState('')
  const [showUpdateInput, setShowUpdateInput] = useState(false)

  const handleReadingGoalUpdate = async () => {
    try {
      const { data } = await axios.put(`/api/auth/users/${getPayload().sub}/`, { reading_goal: updatedReadingGoal })
      // console.log('data', data)
      setShowUpdateInput(false)
      setUser(prevUser => ({ ...prevUser, reading_goal: data.reading_goal }))
    } catch (error) {
      setError(error)
    }
  }

  const handleReadingGoalChange = (event) => {
    setUpdatedReadingGoal(event.target.value)
    setError('')
  }


  return (
    <>
      {user ? (
        <div className='profile-container'>
          <div className='top-container'>
            <div className='profile-photo'>
              <img className='image' 
                src={user.profile_image}
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <div className='username'>
              <p> {user.username} </p>
            </div>
          </div>
          <div className='user-bookselves-container'>
            {user && <h4>{`${user.username}'s`} Bookshelves</h4>}
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
          {user.reading_goal > 0 && <div className='reading-challenge'>
            <div className='reading-challenge'>
              <div>
                <h4>Reading Challenge</h4>
                <div className='bar-text-update'>
                  <div className='progress-container'>
                    <progress className='progress-bar' value={user.read.length} max={user.reading_goal}></progress>
                  </div>
                  <div className='read-quantity'>
                    <p>You read {user.read.length} out of {user.reading_goal} books.</p>
                  </div>
                  {showUpdateInput ? (
                    <div className='goal-update-button-input'>
                      <input className='update-goal-input' type='number' value={updatedReadingGoal} onChange={handleReadingGoalChange} placeholder='Enter new goal' />
                      <button className='update-goal-button' onClick={handleReadingGoalUpdate}>Update Goal</button>
                    </div>
                  ) : (
                    <button className='update-goal-button' onClick={() => setShowUpdateInput(true)}>Update Goal</button>
                  )}
                </div>
              </div>
            </div>
          </div>
          }

          <div className='recent-updates'>
            <h4>Recent Updates</h4>
            {generateRecentUpdates('read', 'has read')}
            {generateRecentUpdates('reading', 'is currently reading')}
            {generateRecentUpdates('wishlist', 'wants to read')}
          </div>
        </div>
      ) : (
        error ?
          <h2>{error.message}</h2>
          :
          <SpinnerComponent/>
      )}
    </>

  )
}

export default Profile
