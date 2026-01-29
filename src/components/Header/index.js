import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'

import './index.css'

class Header extends Component {
  state = {
    isMenuOpen: false,
  }

  toggleMenu = () => {
    this.setState(prevState => ({isMenuOpen: !prevState.isMenuOpen}))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isMenuOpen} = this.state
    const {match} = this.props
    const {path} = match

    const homeClassName = path === '/' ? 'nav-link active' : 'nav-link'
    const shelfClassName = path === '/shelf' ? 'nav-link active' : 'nav-link'

    return (
      <>
        <nav className="header-container">
          <div className="header-content">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/du8lwvfjj/image/upload/v1757870654/logo_m4c2om.svg"
                alt="website logo"
                className="header-logo"
              />
            </Link>
            <ul className="nav-items-desktop">
              <li>
                <Link to="/" className={homeClassName}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shelf" className={shelfClassName}>
                  Bookshelves
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-button-desktop"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="hamburger-menu-button"
              onClick={this.toggleMenu}
            >
              <GiHamburgerMenu size={25} />
            </button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="mobile-menu">
            <ul className="nav-items-mobile">
              <li>
                <Link
                  to="/"
                  className={homeClassName}
                  onClick={this.toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shelf"
                  className={shelfClassName}
                  onClick={this.toggleMenu}
                >
                  Bookshelves
                </Link>
              </li>
            </ul>
            <button
              type="button"
              className="logout-button-mobile"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="close-menu-button"
              onClick={this.toggleMenu}
            >
              <AiFillCloseCircle size={25} />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)
