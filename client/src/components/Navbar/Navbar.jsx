/* eslint-disable react/prop-types */
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

  window.onscroll = () => {
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

  const NavLink = ({ path, text }) => {
    return (
      <Link
        to={path}
        className={'option ' + (mode ? 'darkColor' : 'lightColor')}
      >
        {text}
      </Link>
    )
  }

  const NavIcon = ({ name }) => {
    return (
      <span className={`option ${name}-icon`} onClick={() => toggleMode()}>
        {name === 'moon' ? <BiSolidMoon /> : <BsSunFill />}
      </span>
    )
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
            <NavLink path={'/logout'} text={'Logout'} />
          ) : (
            <>
              <NavLink path={'/login'} text={'Login'} />
              <NavLink path={'/signup'} text={'Signup'} />
            </>
          )}

          {mode ? <NavIcon name={'moon'} /> : <NavIcon name={'sun'} />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
