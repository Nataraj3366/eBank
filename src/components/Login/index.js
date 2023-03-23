import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', errorMsg: '', loginError: false}

  getLoginResponse = async e => {
    e.preventDefault()

    const {userId, pin} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const userDetails = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const responseData = await response.json()
      console.log(responseData)

      Cookies.set('jwt_token', responseData.jwt_token, {expires: 30})
      this.setState({loginError: false, userId: '', pin: ''})
      const {history} = this.props
      history.replace('/')
    } else {
      const responseData = await response.json()
      console.log(responseData)
      this.setState({errorMsg: responseData.error_msg, loginError: true})
    }
  }

  storeUserId = e => {
    this.setState({userId: e.target.value})
  }

  storeUserPin = e => {
    this.setState({pin: e.target.value})
  }

  render() {
    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    const {userId, pin, loginError, errorMsg} = this.state
    return (
      <div className="login-page-main-container">
        <div className="banner-form-containers-container">
          <div className="banner-container">
            <img
              alt="website login"
              className="banner-image"
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
            />
          </div>
          <form onSubmit={this.getLoginResponse} className="login-form">
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="form-label-input-container">
              <label htmlFor="userInput" className="input-label">
                User ID
              </label>
              <input
                onChange={this.storeUserId}
                value={userId}
                className="form-input"
                id="userInput"
                type="text"
                placeholder="Enter User ID"
              />
            </div>
            <div className="form-label-input-container">
              <label htmlFor="userPin" className="input-label">
                PIN
              </label>
              <input
                onChange={this.storeUserPin}
                value={pin}
                className="form-input"
                id="userPin"
                type="password"
                placeholder="Enter User PIN"
              />
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {loginError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
