import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getPayload } from '../../helpers/auth.js'
import SpinnerComponent from '../common/SpinnerComponent.js'

const MyBooks = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredBooks, setFilteredBooks] = useState([])
  const [allBookIds, setAllBookIds] = useState([])

  const location = useLocation()
  const navigate = useNavigate()

  //!  fetch book data from the server
  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('/api/books/')
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
        const response = await axios.get(`/api/auth/users/${getPayload().sub}/`)
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
    const newUrl = `/my-books?category=${category}`
    window.location.href = newUrl
    // navigate(`/my-books?category=${category}`)
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


  //! set all books as the default display once the page is opened
  useEffect(()=> {
    if (selectedCategory === 'all') {
      let filtered = []
      filtered = books.filter((book) => allBookIds.includes(book.id))
      setFilteredBooks(filtered)
    }
  }, [books, user, allBookIds])

  //! set all books as the default display once the page is opened, or open the category query if there is one
  useEffect(()=> {
    const category = new URLSearchParams(location.search).get('category') || 'all'
    setSelectedCategory(category)
  }, [location.search])


  return (
    <div className='my-books-container'>
      <div className='select-category-container'>
        <ul>
          <Link className='category-query' to={`/my-books?category=${selectedCategory}`}>
            <li 
              className={selectedCategory === 'all' ? 'active' : ''}
              onClick={() => handleCategoryClick('all')}
            > All </li>
          </Link>
          <Link className='category-query' to={`/my-books?category=${selectedCategory}`}>
            <li 
              className={selectedCategory === 'read' ? 'active' : ''}
              onClick={() => handleCategoryClick('read')}
            > Read </li>
          </Link>
          <Link className='category-query' to={`/my-books?category=${selectedCategory}`}>
            <li 
              className={selectedCategory === 'reading' ? 'active' : ''}
              onClick={() => handleCategoryClick('reading')}
            > Currently Reading </li>
          </Link>
          <Link className='category-query' to={`/my-books?category=${selectedCategory}`}>
            <li 
              className={selectedCategory === 'wishlist' ? 'active' : ''}
              onClick={() => handleCategoryClick('wishlist')}
            > Want to Read </li>
          </Link>
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
          error ?
            <h2>{error.message}</h2>
            :
            <SpinnerComponent/>

        }
      </div>
    </div>
  )
}

export default MyBooks
