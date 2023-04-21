import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getPayload } from '../../helpers/auth.js'

const MyBooks = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('/api/books')
        const bookData = response.data
        setBooks(bookData)
        // console.log('BOOKS.ID', books[0].id)
      } catch (error) {
        setError(error)
      }
    }
    getBooks()
  }, [])


  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`/api/auth/users/${getPayload().sub}`)
        const userData = response.data
        console.log('USERDATA', userData)
        
        setUser(userData)
        // console.log('USER.BOOKS_ADDED', user.books_added)
      } catch (error) {
        setError(error)
      }
    }
    getUserData()
  }, [])

  const categories = ['All', 'Read', 'Currently Reading', 'Want to Read']

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  // const getFilteredBooks = () => {
  //   let filteredBooks = []
  //   console.log('TRUE')
  //   if (selectedCategory === 'all') {
  //     filteredBooks = books.filter((book) => {
  //       console.log('filteredBooks', book)

  //       // checking if the id of all the existing books is equal to the id of the book that
  //       // the user has added
  //       return user.books_added.some((addedBookId) => {
  //         console.log('ADDED BOOK', addedBookId)
  //         console.log(addedBookId,book.id)
  //         return addedBookId === book.id
  //       })
  //     })
  //   } else {
  //     filteredBooks = books.filter((book) => book.category === selectedCategory)
  //   }
  //   return filteredBooks
  // }

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
            className={selectedCategory === 'currentlyReading' ? 'active' : ''}
            onClick={() => handleCategoryClick('currentlyReading')}
          > Currently Reading </li>
          <li 
            className={selectedCategory === 'wantToRead' ? 'active' : ''}
            onClick={() => handleCategoryClick('wantToRead')}
          > Want to Read </li>
        </ul>
      </div>
      <div className='books-container'>
        {books && user ? (
          books.map((book) => (
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
