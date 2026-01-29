import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const BooksCarousel = props => {
  const {books} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {books.map(book => (
        <Link
          to={`/books/${book.id}`}
          key={book.id}
          className="slick-item-link"
        >
          <div className="slick-item">
            <img className="book-image" src={book.coverPic} alt={book.title} />
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">{book.authorName}</p>
          </div>
        </Link>
      ))}
    </Slider>
  )
}

export default BooksCarousel
