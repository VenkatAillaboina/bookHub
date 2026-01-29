import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import BooksCarousel from '../BooksCarousel'
import FailureView from '../FailureView'
import LoadingView from '../LoadingView'

import './index.css'

const apiConstraints = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    topRatedBooks: [],
    apiStatus: apiConstraints.initial,
  }

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: apiConstraints.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(book => ({
        id: book.id,
        authorName: book.author_name,
        coverPic: book.cover_pic,
        title: book.title,
      }))
      this.setState({
        topRatedBooks: updatedData,
        apiStatus: apiConstraints.success,
      })
    } else {
      this.setState({apiStatus: apiConstraints.failure})
    }
  }

  renderSuccessView = () => {
    const {topRatedBooks} = this.state
    return <BooksCarousel books={topRatedBooks} />
  }

  renderFailureView = () => <FailureView onRetry={this.getTopRatedBooks} />

  renderLoadingView = () => <LoadingView />

  renderTopRatedBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstraints.success:
        return this.renderSuccessView()
      case apiConstraints.failure:
        return this.renderFailureView()
      case apiConstraints.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="find-books-link">
              <button type="button" className="find-books-btn-mobile">
                Find Books
              </button>
            </Link>
            <div className="top-rated-books-container">
              <div className="top-rated-header">
                <h2 className="top-rated-heading">Top Rated Books</h2>
                <Link to="/shelf" className="find-books-link">
                  <button type="button" className="find-books-btn-desktop">
                    Find Books
                  </button>
                </Link>
              </div>
              <div className="slick-container">
                {this.renderTopRatedBooks()}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
