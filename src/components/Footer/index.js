import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-content">
      <div className="social-icons-container">
        <FaGoogle className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
        <FaYoutube className="social-icon" />
      </div>
      <p className="contact-us">Contact Us</p>
    </div>
  </div>
)

export default Footer
