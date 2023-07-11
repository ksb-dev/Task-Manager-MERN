/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

// context
import { useTaskivityContext } from '../../context/context'

// react-icons
import { BiSearch } from 'react-icons/bi'

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
      <span className='search-icon'>
        <BiSearch />
      </span>
    </div>
  )
}

export default SearchBar
