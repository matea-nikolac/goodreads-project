import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getToken,  getPayload } from '../../helpers/auth.js'


const SingleBook = () => {

  const { id } = useParams()

  const [books, setBooks] = useState(null)
  const [error, setError] = useState('')

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Add to your books')

  const [user, setUser] = useState('')

  const [ formFields, setFormFields] = useState({
    read: [],
    reading: '',
    wishlist: '',
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
        // console.log(books.book_cover)
      } catch (error) {
        setError(error)
      }
    }
    getBook()
  }, [formFields])

  //updating the user data info
  useEffect(() => {
    
    const updateUser = async () => {
      try {
        const { data } = await axios.put(`/api/auth/users/${getPayload().sub}/`, { [selectedOption]: [id.toString()] })
        console.log('DATA', data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
    }

    updateUser()
    console.log(selectedOption)
  }, [selectedOption], [user])
  

  // getting the logged in user data


  useEffect(() => {
    const getUserData = async () => {
      try {
        console.log(getPayload().sub)
        const { data } = await axios.get(`/api/auth/users/${getPayload().sub}/`)
        setFormFields(data)
        // console.log(formFields)

      } catch (error) {
        setError(error)
  
      }
    }
    getUserData()
  }, [])


  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    // console.log(selectedOption)
    { books && setFormFields({ ...formFields, read: books.id })}

    console.log('FORMDIELDS', formFields)
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
                    <button className="dropdown__menu-item" onClick={() => handleOptionSelect('read')} >
                      Read
                    </button>
                    <button className="dropdown__menu-item" onClick={() => handleOptionSelect('reading')}>
                      Currently reading
                    </button>
                    <button className="dropdown__menu-item" onClick={() => handleOptionSelect('wishlist')}>
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
        <h2>{error.message}</h2>
      }
    </>
  )

}

export default SingleBook