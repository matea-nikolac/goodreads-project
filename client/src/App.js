import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Browse from './components/Browse'
import Profile from './components/Profile'
import PageNavbar from './components/common/PageNavBar'
import SingleBook from './components/book/SingleBook'
import MyBooks from './components/book/MyBooks'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const App = () => {
  return (
    <div className='main-container'>
      <BrowserRouter>
        <PageNavbar/>
        <Routes>
          <Route path='/' element={<Browse />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/books/:id' element={<SingleBook />} />
          <Route path='/my-books' element={<MyBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App