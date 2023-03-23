import './index.css'

const NotFound = () => (
  <div className="not-found-main-container">
    <img
      className="not-found-image"
      src="https://assets.ccbp.in/frontend/react-js/ebank-not-found-img.png"
      alt="not found"
    />
    <h2 className="page-not-found-heading">Page Not Found</h2>
    <p className="page-not-found-text">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
