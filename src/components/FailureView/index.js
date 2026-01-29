import './index.css'

const FailureView = props => {
  const {onRetry} = props

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/du8lwvfjj/image/upload/v1758367344/failure-image_uptjvf.svg"
        alt="failure view"
        className="failure-view-image"
      />
      <p className="failure-description">
        Something went wrong. Please try again.
      </p>
      <button type="button" className="try-again-button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
