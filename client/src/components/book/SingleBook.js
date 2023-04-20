import axios from 'axios'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { isAuthenticated, getToken, userIsOwner } from '../../helpers/auth.js'
// import DisplayPosts from './DisplayPosts'
// import SpinnerComponent from '../common/Spinner'



const SingleBook = () => {

  const navigate = useNavigate()
  const { id } = useParams()

  const [books, setBooks] = useState(null)
  const [error, setError] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Add to your books')

  const [formFields, setFormFields] = useState({ 
    text: '',
  })


  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setBooks(data)
        console.log('BOOKS', books)
        console.log(books.book_cover)
      } catch (error) {
        setError(error)
      }
    }
    getBook()
  }, [formFields, books])

  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  return (
    <>
      { books ?
        <>
          <div className='containers'>
            <div className = 'cover-and-dropdown-container'>
              <div className='cover-container'>
                <img className='image' src={books.book_cover} alt={books.title} />
              </div>
              <div className="dropdown">
                <button className="dropdown__button" onClick={() => setIsOpen(!isOpen)}>
                  {selectedOption}
                  <i className={`dropdown__icon ${isOpen ? 'open' : ''}`}>&#9662;</i>
                </button>
                {isOpen && (
                  <div className="dropdown__menu">
                    <button className="dropdown__menu-item" onClick={() => handleOptionSelect('Read')}>
                      Read
                    </button>
                    <button className="dropdown__menu-item" onClick={() => handleOptionSelect('Currently reading')}>
                      Currently reading
                    </button>
                    <button className="dropdown__menu-item" onClick={() => handleOptionSelect('Want to read')}>
                    Want to read
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className='info-container'>
              <h2 className ='info-text'>{books.title}</h2>
              <p className ='info-text'>{books.author}</p>
              <p className ='info-text'>Genre: {books.genre}</p>
              <p className ='info-text'>Pages: {books.pages}</p>
              <p className ='info-text'>{books.summary}</p>
            </div>
          </div>
          <div className='review-container'>
            <p>reviews will go here</p>
          </div>
        </>
        :
        <h2>{error}</h2>
      }
    </>
  )

}

export default SingleBook