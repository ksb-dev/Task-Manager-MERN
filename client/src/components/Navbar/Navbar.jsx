/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react'

// react-icons
import { BsSunFill } from 'react-icons/bs'
import { MdOutlineAddTask } from 'react-icons/md'
import { BiSolidMoon } from 'react-icons/bi'

// context
import { useTaskivityContext } from '../../context/context'

// react-router-dom
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = localStorage.getItem('userName')
  const { mode, setMode, rerenderNavBar } = useTaskivityContext()
  const navInnerRef = useRef(null)

  useEffect(() => {}, [rerenderNavBar])

  //Window Scroll Function
  window.onscroll = () => {
    scrollFunction()
  }

  const scrollFunction = () => {
    if (window.scrollY === 0) {
      setTimeout(() => {
        if (navInnerRef.current !== null) {
          navInnerRef.current.style.boxShadow = 'none'
        }
      }, 0)
    } else {
      setTimeout(() => {
        if (navInnerRef.current !== null) {
          navInnerRef.current.style.boxShadow = '0px 15px 10px -15px #999'
        }
      }, 0)
    }
  }

  const toggleMode = () => {
    setMode(!mode)
  }

  return (
    <div className={'nav ' + (mode ? 'lightBg1' : 'darkBg2')}>
      <div className='inner' ref={navInnerRef}>
        <div className='title'>
          <Link to='/'>
            <span>
              <MdOutlineAddTask />
            </span>
            <span>Taskivity</span>
          </Link>
        </div>

        <div className={'options ' + (mode ? 'darkColor' : 'lightColor')}>
          {user ? (
            <Link
              to='/logout'
              className={'option user ' + (mode ? 'darkColor' : 'lightColor')}
            >
              Logout
            </Link>
          ) : (
            <>
              <Link
                to='/login'
                className={'option ' + (mode ? 'darkColor' : 'lightColor')}
              >
                Login
              </Link>
              <Link
                to='/signup'
                className={'option ' + (mode ? 'darkColor' : 'lightColor')}
              >
                Signup
              </Link>
            </>
          )}
          {mode ? (
            <span className='option moon' onClick={() => toggleMode()}>
              <BiSolidMoon />
            </span>
          ) : (
            <span className='option sun' onClick={() => toggleMode()}>
              <BsSunFill />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
