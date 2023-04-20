import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// import SpinnerComponent from './common/Spinner.js'
import { getToken, isAuthenticated } from '../helpers/auth.js'

const BrowseBooks = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    const getBooks = async () => {
      try {
        const response = await axios.get('/api/books')
        const bookData = response.data
        setBooks(bookData)
        console.log(bookData)
      } catch (error) {
        setError(error)
      }
    }
    getBooks()
  }, [])

  const categories = ['self-help', 'novel', 'biography', 'fantasy']
  
  return (
    <div className='browsePage'>
      {books.length > 0 && categories.map(category => {
        return (
          <div className='bookWrapper'key={category}>
            <h2 className='bookCategory'>{category}</h2>
            <div className='categoryDivider'></div>
            <div className='books'>
              {books.filter(book => book.genre === category).map(book => {
                // console.log('book genre + category', book.genre, category)
                return (
                  <Link to={`books/${book.id}`} key={book.id} className='book-card'>
                    <div key={book.id} className='book-card'>
                      <div className='book-cover'>
                        <img className='image' src={book.book_cover} alt={book.title} />
                      </div>
                      <div className='book-info'>
                        {/* <h3>{book.title}</h3>
                        <p>by {book.author}</p>
                        <p>{book.summary}</p> */}
                        {/* <Link to={`/books/${book.id}`} className='btn'>Details</Link> */}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
      {error && <h2>{error}</h2>}
    </div>
  )
}

export default BrowseBooks
