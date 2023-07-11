/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'

// react-router-dom
import { Link } from 'react-router-dom'

// context
import { useTaskivityContext } from '../../context/context'

// hooks
import { useSearchAll } from '../../hooks/useSearch'

// components
import Loading from '../Loading/Loading'

// react-icons
import { BiSearch } from 'react-icons/bi'
import { LiaArrowRightSolid } from 'react-icons/lia'

const SearchModal = () => {
  const token = localStorage.getItem('token')

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('all')

  const { mode, searchRef, searchModalRef, searchModalInnerRef } =
    useTaskivityContext()

  const {
    getSearchResults,
    getIncompletedSearchResults,
    getCompletedSearchResults
  } = useSearchAll()

  useEffect(() => {
    if (query !== '') {
      if (progress === 'all') {
        getSearchResults(query, token, setSearchResults, setLoading, setError)
      }
      if (progress === 'incomplete') {
        getIncompletedSearchResults(
          query,
          token,
          setSearchResults,
          setLoading,
          setError
        )
      }
      if (progress === 'complete') {
        getCompletedSearchResults(
          query,
          token,
          setSearchResults,
          setLoading,
          setError
        )
      }
    } else {
      setSearchResults([])
    }
  }, [query])

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
        setQuery('')
      }
    }

    document.body.addEventListener('click', showHideSearchModal)

    return () => document.body.removeEventListener('click', showHideSearchModal)
  }, [])

  const getPriorityColor = priority => {
    if (priority === 'low') {
      return 'lowPriority'
    }
    if (priority === 'medium') {
      return 'mediumPriority'
    }
    if (priority === 'high') {
      return 'highPriority'
    }
  }

  const handleLoading = () => {
    return (
      <div className='search-loading'>
        <Loading value={'blue'} />
      </div>
    )
  }

  const handleError = () => {
    return (
      <div className='search-error'>
        <span>Failed to search</span>
      </div>
    )
  }

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
        <div className='search-options'>
          <p
            onClick={() => {
              setQuery('')
              setProgress('all')
            }}
          >
            <span
              className={
                progress === 'all'
                  ? 'active'
                  : mode
                  ? 'darkCheckBorder'
                  : 'lightCheckBorder'
              }
            ></span>
            All
          </p>
          <p
            onClick={() => {
              setQuery('')
              setProgress('incomplete')
            }}
          >
            <span
              className={
                progress === 'incomplete'
                  ? 'highActive'
                  : mode
                  ? 'darkCheckBorder'
                  : 'lightCheckBorder'
              }
            ></span>
            Incomplete
          </p>
          <p
            onClick={() => {
              setQuery('')
              setProgress('complete')
            }}
          >
            <span
              className={
                progress === 'complete'
                  ? 'lowActive'
                  : mode
                  ? 'darkCheckBorder'
                  : 'lightCheckBorder'
              }
            ></span>
            Complete
          </p>
        </div>

        <div className='input'>
          <input
            type='text'
            placeholder='Enter title'
            value={query}
            onChange={e => setQuery(e.target.value)}
            className={mode ? 'lightBg1' : 'darkBg2'}
          />
          <span className='search-icon'>
            <BiSearch />
          </span>
        </div>

        {searchResults?.length > 0 && (
          <>
            {loading && handleLoading()}
            {!loading && error !== '' && handleError()}

            {!loading && error === '' && (
              <>
                <div className='length'>
                  Search Results
                  <p>
                    <span>{searchResults.length}</span>
                  </p>
                </div>
                <div className={'search-results scroll-1 '}>
                  {searchResults.map(task => (
                    <div
                      key={task._id}
                      className={
                        'result ' + `${getPriorityColor(task.priority)}`
                      }
                    >
                      <span>{task.title}</span>
                      <Link
                        to={`/detail/${task._id}`}
                        className={
                          'icon ' + `${getPriorityColor(task.priority)}`
                        }
                      >
                        <span>
                          <LiaArrowRightSolid />
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchModal
