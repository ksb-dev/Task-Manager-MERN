/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from 'react'

// react-router-dom
import { Link } from 'react-router-dom'

// context
import { useTaskivityContext } from '../../context/context'

// services
import {
  getSearchResults,
  getIncompletedSearchResults,
  getCompletedSearchResults
} from '../../services/searchTasks'

// components
import Loading from '../Loading/Loading'

// react-icons
import { BiSearch } from 'react-icons/bi'
import { LiaArrowRightSolid } from 'react-icons/lia'
import { IoMdClose } from 'react-icons/io'

// utils
import { getPriorityColor } from '../../utils/getPriorityColor'

const SearchModal = () => {
  const token = localStorage.getItem('token')

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('all')

  const closeBtnRef = useRef(null)

  const { mode, searchRef, searchModalRef, searchModalInnerRef } =
    useTaskivityContext()

  // Get search results
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

  // Toggle Modal
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
        setProgress('all')
      }

      if (
        closeBtnRef &&
        closeBtnRef.current &&
        closeBtnRef.current.contains(e.target)
      ) {
        searchModalRef.current.style.transform = 'scaleY(0)'
        setQuery('')
        setProgress('all')
      }
    }

    document.body.addEventListener('click', showHideSearchModal)

    return () => document.body.removeEventListener('click', showHideSearchModal)
  }, [])

  // Priority Component
  const Priority = ({ text }) => {
    let active = ''

    if (text === 'all') {
      active = 'active'
    }
    if (text === 'incomplete') {
      active = 'highActive'
    }
    if (text === 'complete') {
      active = 'lowActive'
    }

    return (
      <p
        onClick={() => {
          setQuery('')
          setProgress(text)
        }}
      >
        <span
          className={
            progress === text
              ? active
              : mode
              ? 'darkCheckBorder'
              : 'lightCheckBorder'
          }
        ></span>
        {text.charAt(0).toUpperCase() + text.substring(1)}
      </p>
    )
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
        className={'inner ' + (mode ? 'lightBg2' : 'darkBg1')}
        ref={searchModalInnerRef}
      >
        <p className='close' ref={closeBtnRef}>
          <span>
            <IoMdClose />
          </span>
        </p>
        <div className='options'>
          <Priority text={'all'} />
          <Priority text={'incomplete'} />
          <Priority text={'complete'} />
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

        {loading && handleLoading()}
        {!loading && error !== '' && handleError()}

        {!loading && error === '' && (
          <>
            {query && (
              <div className='length'>
                Search Results
                <p>
                  <span>{searchResults.length}</span>
                </p>
              </div>
            )}
            <div className={'search-results scroll-1 '}>
              {searchResults.length > 0 &&
                searchResults.map(task => (
                  <div
                    key={task._id}
                    className={'result ' + `${getPriorityColor(task.priority)}`}
                  >
                    <span>{task.title}</span>
                    <Link
                      to={`/detail/${task._id}`}
                      className={'icon ' + `${getPriorityColor(task.priority)}`}
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
      </div>
    </div>
  )
}

export default SearchModal
