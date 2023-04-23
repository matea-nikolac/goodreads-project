import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getToken,  getPayload, isAuthenticated } from '../../helpers/auth.js'


const SingleBook = () => {

  const { id } = useParams()
  const navigate = useNavigate()

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

  const [reviewFields, setReviewFields] = useState({
    text: '',
    owner: '',
    book: '',
    // owner: 'millie',
  })

  const [reviewEditFields, setReviewEditFields] = useState({
    text: '',
    // owner: '',
    // book: '',
    // owner: 'millie',
  })

  const [allReviews, setAllReviews] = useState(null)
  const [bookReviews, setBookReviews] = useState(null)

  const [editReview, setEditReview] = useState(null)


  //! BOOK DATA AND BOOK-USER LINKING AFTER THE USER ADDS A BOOK THE THEIR BOOKS
  // get the book data
  useEffect(() => {
    const getBook = async () => {
      try {
        const { data } = await axios.get(`/api/books/${id}/`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        setBooks(data)
        // console.log('Books', data)
        // console.log(books.book_cover)
      } catch (error) {
        setError(error)
      }
    }
    getBook()
  }, [])

  // update the user data info with the corresponding book (read, reading, wishlist)
  useEffect(() => {
    
    const updateUser = async () => {
      try {
        const { data } = await axios.put(`/api/auth/users/${getPayload().sub}/`, { [selectedOption]: [id.toString()] })
        // console.log('data', data)
      } catch (error) {
        setError(error)
      }
    }

    updateUser()
  }, [selectedOption], [user])
  
  // handle the user's click on the book category button (read, reading, wishlist)
  const handleOptionSelect = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
    // console.log(selectedOption)
    { books && setFormFields({ ...formFields, read: books.id })}

    // console.log('FORMDIELDS', formFields)
  }

  //! REVIEWS LOGIC

  // get the user data
  useEffect(() => {
    const getUserData = async () => {
      try {

        const { data } = await axios.get(`/api/auth/users/${getPayload().sub}/`)
        
        // console.log('formFiels', data)
        setFormFields(data)
        
        // console.log(formFields)
      } catch (error) {
        setError(error)
      }
    }
    getUserData()
  }, [])

  // GET a review from the server
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('/api/reviews/')
        const review = response.data
        // console.log('allReviews', review)
        setAllReviews(review)
      } catch (error) {
        setError(error)
      }
    }
    getUserData()
  }, [])

  // DELETE a review on the server
  const handleDelete = async (reviewId) => {
    try {
      const { data } = await axios.delete(`/api/reviews/${reviewId}/`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      
      // update the reviews state by removing the deleted review
      // setReviews(reviews.filter(review => review.id !== reviewId))
      // window.location.reload()
      setBookReviews(bookReviews.filter(review => review.id !== reviewId))
    } catch (error) {
      setError(error)
    }
  }

  // POST a review to the server

  const handleSubmit = async (e) => {
    // e.preventDefault()
    if (books.id){
      try {
        const owner =  getPayload().sub

        const reviewData = {
          text: reviewFields.text,
          owner: owner,
          book: books.id,
        }

        // console.log('REVIEWDATA', reviewData)

        const { data } = await axios.post('/api/reviews/', reviewData, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })

        setBookReviews([...bookReviews, data])

        setReviewFields({
          text: '',
          owner: '',
          book: '',
        })

      } catch (err) {
        setError(err)
      }
    }
  }

  // PUT a review on the server
  const handleEditSubmit = async (e) => {
    try {

      const owner =  getPayload().sub

      const reviewEditData = {
        text: reviewEditFields.text,
        // owner: getPayload().sub,
        owner: owner,
        // book: books.id,
      }

      const { data } = await axios.put(`/api/reviews/${editReview.id}/`, reviewEditData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })


      // console.log('EDIT REVIEW', editReview)

      setBookReviews(bookReviews.map((review) => review.id === data.id ? { ...data, owner: review.owner } : review))
      setEditReview(null)

    } catch (error) {
      setError(error)
    }
  }

  // Find all the reviews for a specific book
  useEffect(()=> {

    if (allReviews) {
      const filteredReviewIds = []

      allReviews.forEach(review => {
        if (review.book.id === books.id) {
          filteredReviewIds.push(review.id)
        }
      })
      let filteredReviews = []
      filteredReviews = allReviews.filter(review => filteredReviewIds.includes(review.id))
      // console.log('bookReviews', filteredReviews)
      setBookReviews(filteredReviews)

    }
  }, [allReviews])

  // update the review with each new character that is typed in
  const handleChange = (e) => {
    setReviewFields({ ...reviewFields, [e.target.name]: e.target.value })
    console.log('REVIEW FIELDS', reviewFields)
  }

  //* Edit a review
  // save the original review text
  const handleEditClick = (review) => {
    console.log('handle edit click, REVIEW -->', review)
    setEditReview(review)
    setReviewEditFields({ text: review.text  })
  }

  // update the edited review with each new character that is typed in
  const handleEditChange = (e) => {
    setReviewEditFields({ ...reviewEditFields, [e.target.name]: e.target.value })
    console.log('e.target.name', e.target.name)
    console.log('e.target.value', e.target.value)
    console.log('REVIEW EDIT FIELDS', reviewEditFields)
  }
  
  // check the reviewEditFields
  useEffect(() => {
    console.log('REVIEW EDIT FIELDS', reviewEditFields)
  }, [reviewEditFields])
  


  return (
    <main>
      {books ?
        <>
          <div className='containers'>
            <div className='cover-and-dropdown-container'>
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
              <h2 className='info-text'>{books.title}</h2>
              <p className='info-text'>{books.author}</p>
              <p className='info-text'>Genre: {books.genre}</p>
              <p className='info-text'>Pages: {books.pages}</p>
              <p className='info-text'>{books.summary}</p>
            </div>
          </div>
  
          <div className='review-container'>
            <h3>Reviews</h3>
            { isAuthenticated() ?
              <div className='add-review'>
                <form onSubmit={handleSubmit}>
                  <input type="text" name="text" placeholder={`Leave a review for ${books.title}`} onChange={handleChange} value={reviewFields.text} />
                </form>

              </div>
              :
              <p className='log-in-to-comment'>Please log in to leave a comment</p>
            }
            {bookReviews && bookReviews.length > 0 ?
              <>
                {bookReviews.slice().reverse().map(review => {
                  return (
                    <div key={review.id} className='review'>
                      <div className='left-review-container'>
                        <div className='single-review-username'>
                          <div className='image-div'>
                            <img className='image' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' />
                          </div>
                          <span className='username-span'>{review.owner.username}</span>
                        </div>
                        <div className='review-margin'>
                          {editReview && editReview.id === review.id ?
                            <textarea className='review-input' type="text" name="text" onChange={handleEditChange} value={reviewEditFields.text} />
                            :
                            <p className='review-text'>{review.text}</p>
                          }
                        </div>
                      </div>
                      <div className='right-review-container'>
                        {getPayload().sub === review.owner.id &&
                        <div className='delete-button-container'>
                          <button className='delete-button' onClick={() => handleDelete(review.id)}>Delete</button>
                        </div>
                        }
                        {
                          <div className='edit-button-container'>
                            {getPayload().sub === review.owner.id && 
                              (editReview && editReview.id === review.id ?
                                <button className = 'edit-button' onClick={() => handleEditSubmit()}>Save</button>
                                :
                                <button className = 'edit-button' onClick={() => handleEditClick(review)}>Edit</button>
                              )
                            }
                          </div>
                        }
                      </div>
                    </div>
                  )
                })}
              </>
              :
              <>
                {isAuthenticated() ?
                  <p>Be the first to review!</p>
                  :
                  <p>Please login to leave a review</p>
                }

              </>
            }
          </div>
        </>
        :
        <h2>{error.message}</h2>
      }
    </main>

  )
  

}

export default SingleBook