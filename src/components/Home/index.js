import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Home extends Component {
  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  render() {
    if (Cookies.get('jwt_token') === undefined) {
      return <Redirect to="/ebank/login" />
    }
    return (
      <div className="home-page-main-container">
        <nav className="nav-bar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <button onClick={this.logout} className="logout-button" type="button">
            Logout
          </button>
        </nav>
        <div className="home-page-bottom-container">
          <h1 className="home-main-heading">
            Your Flexibility, Our Excellence
          </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            className="visa-card-image"
            alt="digital card"
          />
        </div>
      </div>
    )
  }
}

export default Home
