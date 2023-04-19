import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Browse from './components/Browse.js'
import Profile from './components/Profile.js'
import PageNavbar from './components/common/PageNavBar.js'
import SingleBook from './components/book/SingleBook.js'
import MyBooks from './components/book/MyBooks.js'
import Login from './components/auth/Login.js'
import Register from './components/auth/Register.js'

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