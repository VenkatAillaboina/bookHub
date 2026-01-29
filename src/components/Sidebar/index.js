import './index.css'

const Sidebar = props => {
  const {bookshelvesList, activeShelf, onChangeShelf} = props

  return (
    <div className="sidebar-container">
      <h1 className="sidebar-heading">Bookshelves</h1>
      <ul className="bookshelves-list">
        {bookshelvesList.map(shelf => {
          const isActive = shelf.value === activeShelf
          const shelfClassName = isActive
            ? 'shelf-item active-shelf'
            : 'shelf-item'

          const onClickShelf = () => {
            onChangeShelf(shelf.value)
          }

          return (
            <li key={shelf.id}>
              <button
                type="button"
                className={shelfClassName}
                onClick={onClickShelf}
              >
                {shelf.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
