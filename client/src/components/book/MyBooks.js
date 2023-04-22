import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getPayload } from '../../helpers/auth.js'

const MyBooks = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredBooks, setFilteredBooks] = useState([])
  const [allBookIds, setAllBookIds] = useState([])

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

  const categories = ['all', 'read', 'reading', 'wishlist']

  //!update the selected category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  
  //! 
  useEffect(() => {
    const filterAllUserIds = () => {
      console.log('USER', user)
  
      const bookIds = []
  
      if (user.read) {
        user.read.forEach((id) => {
          bookIds.push(id)
        })
      }
  
      if (user.reading) {
        user.reading.forEach((id) => {
          bookIds.push(id)
        })
      }
  
      if (user.wishlist) {
        user.wishlist.forEach((id) => {
          bookIds.push(id)
        })
      }
      console.log('BOOK IDS', bookIds)
      setAllBookIds(bookIds)
      return bookIds
    }

    const filterAllUserBooks = () => {
      let filtered = []
      if (selectedCategory === 'all') {
        filtered = books.filter((book) => allBookIds.includes(book.id))
      } else {
        filtered = books.filter((book) => user[selectedCategory].includes(book.id))
      }

      setFilteredBooks(filtered)
    }

    if (books.length > 0 && user) {
      filterAllUserIds()
      filterAllUserBooks()
    }
  
  }, [selectedCategory, books, user])


  // set all books as the default display once the page is opened
  useEffect(()=> {
    if (selectedCategory === 'all') {
      let filtered = []
      filtered = books.filter((book) => allBookIds.includes(book.id))
      setFilteredBooks(filtered)
    }
  }, [books, user, allBookIds])


  return (
    <div className='my-books-container'>
      <div className='select-category-container'>
        <ul>
          <li 
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => handleCategoryClick('all')}
          > All </li>
          <li 
            className={selectedCategory === 'read' ? 'active' : ''}
            onClick={() => handleCategoryClick('read')}
          > Read </li>
          <li 
            className={selectedCategory === 'reading' ? 'active' : ''}
            onClick={() => handleCategoryClick('reading')}
          > Currently Reading </li>
          <li 
            className={selectedCategory === 'wishlist' ? 'active' : ''}
            onClick={() => handleCategoryClick('wishlist')}
          > Want to Read </li>
        </ul>
      </div>
      <div className='books-container'> 
        {filteredBooks && user ? (
          filteredBooks.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} className='book-card'>
              <div key={book.id} className='book-card'>
                <div className='book-cover'>
                  <img className='image' src={book.book_cover} alt={book.title} />
                </div>
              </div>
            </Link>
          ))
        )
          :
          <p>{error.message}</p>

        }
      </div>
    </div>
  )
}

export default MyBooks
