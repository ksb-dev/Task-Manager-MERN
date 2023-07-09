/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

// context
import { useTaskivityContext } from '../../context/context'

const SearchModal = () => {
  const { mode, searchRef, searchModalRef, searchModalInnerRef } =
    useTaskivityContext()

  useEffect(() => {
    const showHideSearchModal = e => {
      if (
        searchRef &&
        searchRef.current &&
        searchRef.current.contains(e.target)
      ) {
        return
      }

      if (
        searchModalRef &&
        searchModalRef.current &&
        searchModalRef.current.contains(e.target) &&
        searchModalInnerRef &&
        searchModalInnerRef.current &&
        !searchModalInnerRef.current.contains(e.target)
      ) {
        searchModalRef.current.style.transform = 'scaleY(0)'
      }
    }

    document.body.addEventListener('click', showHideSearchModal)

    return () => document.body.removeEventListener('click', showHideSearchModal)
  }, [])

  return (
    <div
      className={
        'search-modal ' +
        (mode ? 'lightAlpha darkColor' : 'darkAlpha lightColor')
      }
      ref={searchModalRef}
    >
      <div
        className={'search-modal-inner ' + (mode ? 'lightBg2' : 'darkBg1')}
        ref={searchModalInnerRef}
      >
        <input type='text' />
        <div className='search-results'>Results</div>
      </div>
    </div>
  )
}

export default SearchModal
