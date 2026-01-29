import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import Sidebar from '../Sidebar'
import BookItem from '../BookItem'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    booksList: [],
    activeShelf: 'ALL',
    searchText: '',
    activeShelfLabel: 'All',
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {activeShelf, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${activeShelf}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.books.map(book => ({
        id: book.id,
        title: book.title,
        readStatus: book.read_status,
        rating: book.rating,
        authorName: book.author_name,
        coverPic: book.cover_pic,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeShelf = shelfValue => {
    const shelf = bookshelvesList.find(each => each.value === shelfValue)
    this.setState(
      {activeShelf: shelfValue, activeShelfLabel: shelf.label},
      this.getBooks,
    )
  }

  onChangeSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  onSearch = () => {
    this.getBooks()
  }

  renderLoadingView = () => <LoadingView />

  renderFailureView = () => <FailureView onRetry={this.getBooks} />

  renderNoResultsView = () => {
    const {searchText} = this.state
    return (
      <div className="no-results-view">
        <img
          src="https://res.cloudinary.com/du8lwvfjj/image/upload/v1758383294/not-result_usbnmo.svg"
          alt="no books"
          className="no books"
        />
        <p className="no-results-text">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {booksList} = this.state
    if (booksList.length === 0) {
      return this.renderNoResultsView()
    }
    return (
      <ul className="books-list">
        {booksList.map(book => (
          <BookItem key={book.id} bookDetails={book} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeShelf, searchText, activeShelfLabel} = this.state
    return (
      <>
        <Header />
        <div className="bookshelves-container">
          <div className="bookshelves-content">
            <Sidebar
              bookshelvesList={bookshelvesList}
              activeShelf={activeShelf}
              onChangeShelf={this.onChangeShelf}
            />
            <div className="main-content">
              <div className="header-search-container">
                <h1 className="main-heading">{activeShelfLabel} Books</h1>
                <div className="search-container">
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search"
                    value={searchText}
                    onChange={this.onChangeSearchInput}
                  />
                  <button
                    type="button"
                    className="search-button"
                    onClick={this.onSearch}
                    testid="searchButton"
                  >
                    <BsSearch className="search-icon" />
                  </button>
                </div>
              </div>
              {this.renderApiStatusView()}
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Bookshelves
