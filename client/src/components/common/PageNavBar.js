import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, handleLogout } from '../../helpers/auth.js'


const showThis = true

const PageNavbar = () => {
  const navigate = useNavigate()

  const handleToggle = () => {
    const navLinks = document.getElementById('nav-links')
    navLinks.classList.toggle('show')
  }

  const hideNavLinks = () => {
    const navLinks = document.getElementById('nav-links')
    navLinks.classList.remove('show')
  }

  const handleLogoutClick = () => {
    handleLogout(navigate)
    hideNavLinks()
  }

  return (
    <nav>
      <div className='nav-container'>
        <Link to='/' className='nav-logo' onClick={hideNavLinks}> GoodReads </Link> 
        <div className='nav-toggle' onClick={handleToggle}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className='nav-links' id='nav-links'>
          <li>
            <Link to='/' className='nav-link' onClick={hideNavLinks}> Browse </Link>
          </li>

          { isAuthenticated() ? 
            <>
              <li>
                <Link to='/profile' className='nav-link' onClick={hideNavLinks}> Profile </Link>
              </li>
              <li>
                <Link to='/my-books' className='nav-link' onClick={hideNavLinks}> My Books </Link>
              </li>
              <li>
                <span className="nav-link" onClick={handleLogoutClick} style={{ cursor: 'pointer' }} >Logout</span>
              </li>
            </>
            :
            <>
              <li>
                <Link to='/login' className='nav-link' onClick={hideNavLinks}> Login </Link>
              </li>
              <li>
                <Link to='/register' className='nav-link' onClick={hideNavLinks}> Register </Link>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}
export default PageNavbar