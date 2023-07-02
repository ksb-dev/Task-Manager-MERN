/* eslint-disable no-unused-vars */
import { useRef } from 'react'

// react-icons
import { BsSun, BsMoonStars } from 'react-icons/bs'
import { VscTasklist } from 'react-icons/vsc'

// context
import { useTaskivityContext } from '../../context/context'

const Navbar = () => {
  const { mode, setMode } = useTaskivityContext()
  const navInnerRef = useRef(null)

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
          navInnerRef.current.style.boxShadow = '0px 15px 10px -15px #555'
        }
      }, 0)
    }
    //prevScrollpos = currentScrollpos
  }

  const toggleMode = () => {
    setMode(!mode)
  }

  return (
    <div className={'nav ' + (mode ? 'lightBg1' : 'darkBg2')}>
      <div className='inner' ref={navInnerRef}>
        <div className='title'>
          <p>
            <span>
              <VscTasklist />
            </span>
            <span>Taskivity</span>
          </p>
        </div>
        <div className={'options ' + (mode ? 'darkColor' : 'lightColor')}>
          <span className='option'>Login</span>
          <span className='option'>Signup</span>
          {mode ? (
            <span className='option moon' onClick={() => toggleMode()}>
              <BsMoonStars />
            </span>
          ) : (
            <span className='option sun' onClick={() => toggleMode()}>
              <BsSun />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar