import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [error, setError] = useState('')

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const updatedFormFields = { ...formFields, email: formFields.email.toLowerCase() }
      console.log(updatedFormFields)
      await axios.post('/api/auth/register/', updatedFormFields)
      navigate('/login')
    } catch (error) {
      setError(error.message)
    }
  }

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value })
  }

  return (
    <div className='register-container'>
      <div className='register-border'>
        <form action = "" onSubmit={handleSubmit}>
          <h1 className='title'>Register</h1>
          <label htmlFor="username"></label>
          <input type="text" name="username" placeholder='username' onChange={handleChange} value={formFields.username} />
          <label htmlFor="email"></label>
          <input type="text" name="email" placeholder='email' onChange={handleChange} value={formFields.email} />
          <label htmlFor="password"></label>
          <input type="text" name="password" placeholder='password' onChange={handleChange} value={formFields.password} />
          <label htmlFor="password_confirmation"></label>
          <input type="text" name="password_confirmation" placeholder='confirm password' onChange={handleChange} value={formFields.password_confirmation} />
          <button className='register-button'>Register</button>
          {error && <p className='text-center'>{error} </p>}
        </form>
      </div>
    </div>
  )
}
export default Register