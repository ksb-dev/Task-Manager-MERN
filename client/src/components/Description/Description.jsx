/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'

const Description = ({
  show,
  setShow,
  descRef,
  getClass,
  description,
  getDescription,
  priority,
  downBtnRef
}) => {
  useEffect(() => {
    const hideOtherDescription = e => {
      if (
        downBtnRef &&
        downBtnRef.current &&
        !downBtnRef.current.contains(e.target) &&
        descRef &&
        descRef.current &&
        !descRef.current.contains(e.target)
      ) {
        hideDescription()
      }
    }
    document.body.addEventListener('click', hideOtherDescription)

    return () => {
      document.body.removeEventListener('click', hideOtherDescription)
    }
  }, [descRef, downBtnRef])

  const hideDescription = () => {
    //console.log('hide')
    setShow(true)
    descRef.current.style.display = 'none'
    downBtnRef.current.style.transform = 'rotate(0deg)'
  }

  return (
    <p className={'description ' + getClass(priority)} ref={descRef}>
      {getDescription(description).map((el, i) => (
        <span key={i}>{el}</span>
      ))}
    </p>
  )
}

export default Description
