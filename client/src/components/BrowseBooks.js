import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getToken, isAuthenticated } from '../helpers/auth.js'
import SpinnerComponent from './common/SpinnerComponent.js'

const BrowseBooks = () => {

  const [books, setBooks] = useState([])
  const [error, setError] = useState('')
  const [user, setUser] = useState('')

  useEffect(() => {
    const getBooks = async () => {
      try {
        // setTimeout(async () => {
        const response = await axios.get('/api/books/')
        const bookData = response.data
        setBooks(bookData)
        console.log(bookData)
        // }, 50000)
      } catch (error) {
        setError(error)
      }
    }
    getBooks()
  }, [])

  const categories = ['non-fiction', 'novel', 'biography', 'fantasy', 'science']
  
  return (
    <>
      {books.length > 0 ? (
        <div className='browse-page'>
          {books.length > 0 && categories.map(category => {
            return (
              <div className='book-wrapper'key={category}>
                <h2 className='book-category'>{category}</h2>
                <div className='category-divider'></div>
                <div className='books'>
                  {books.filter(book => book.genre === category).map(book => {
                    return (
                      <Link to={`books/${book.id}`} key={book.id} className='book-card'>
                        <div key={book.id} className='book-card'>
                          <div className='book-cover'>
                            <img className='image' src={book.book_cover} alt={book.title} />
                          </div>
                          <div className='book-info'>
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
      ) : (
        error ?
          <h2>{error.message}</h2>
          :
          <SpinnerComponent/>
      )}
    </>
  )
}

export default BrowseBooks
