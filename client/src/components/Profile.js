import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken, isAuthenticated, getPayload } from '../helpers/auth.js'

const Profile = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')

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
        </div>
      </div>
    </div>
  )
}

export default Profile
