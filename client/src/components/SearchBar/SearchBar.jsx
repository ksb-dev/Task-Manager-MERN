/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

// context
import { useTaskivityContext } from '../../context/context'

const SearchBar = () => {
  const { mode, searchRef, searchModalRef } = useTaskivityContext()

  const showSearchModal = () => {
    searchModalRef.current.style.transform = 'scaleY(1)'
  }

  return (
    <div
      className={'search-bar ' + (mode ? 'lightBg1' : 'darkBg2')}
      onClick={showSearchModal}
      ref={searchRef}
    >
      Search
    </div>
  )
}

export default SearchBar
