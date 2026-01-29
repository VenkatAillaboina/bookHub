import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="password">
          Password*
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="input-container">
        <label className="input-label" htmlFor="username">
          Username*
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <div className="login-image-container-lg">
          <img
            src="https://res.cloudinary.com/du8lwvfjj/image/upload/v1757870655/login_rlzcvl.jpg"
            className="login-image-lg"
            alt="website login"
          />
        </div>
        <div className="login-form-container">
          <img
            src="https://res.cloudinary.com/du8lwvfjj/image/upload/v1757870654/logo_m4c2om.svg"
            className="login-website-logo"
            alt="login website logo"
          />
          <img
            src="https://res.cloudinary.com/du8lwvfjj/image/upload/v1757870655/login_rlzcvl.jpg"
            className="login-image-sm"
            alt="website login"
          />
          <form className="login-form" onSubmit={this.submitForm}>
            {this.renderUsernameField()}
            {this.renderPasswordField()}
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
