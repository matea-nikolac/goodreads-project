import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { setToken } from '../../helpers/auth.js'

const Login = () => {

  const navigate = useNavigate()

  const [error, setError] = useState('')

  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const updatedFormFields = { ...formFields, email: formFields.email.toLowerCase() }
      const response = await axios.post('/api/auth/login/', updatedFormFields)
      response && console.log(response.data)
      setToken(response.data.token)
      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value })
    setError('')
  }

  return (
    <div className='login-container'>
      <div className='login-border'>
        <form action = "" onSubmit={handleSubmit}>
          <h1 className='title'>Login</h1>
          <label htmlFor="email"></label>
          <input type="text" name="email" placeholder='email' onChange={handleChange} value={formFields.email} />
          <label htmlFor="password"></label>
          <input type="password" name="password" placeholder='password' onChange={handleChange} value={formFields.password} />
          <button className='login-button'>Login</button>
          {error &&  <p className='text-center'>{error} </p>}
        </form>
      </div>
    </div>
  )
}
export default Login