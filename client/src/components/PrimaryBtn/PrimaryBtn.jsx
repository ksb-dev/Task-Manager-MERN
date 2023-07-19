/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// react-router-dom
import { Link } from 'react-router-dom'

// components
import Loading from '../Loading/Loading'

const PrimaryBtn = ({
  path,
  icon,
  text,
  value = 'link',
  fn = () => {},
  isLoading
}) => {
  return value === 'link' ? (
    <Link to={path} className='primary-btn'>
      <span id='icon-1'>{icon}</span>
      <span>{text}</span>
    </Link>
  ) : isLoading ? (
    <button className='primary-btn' onClick={fn}>
      <Loading value={'light'} />
    </button>
  ) : (
    <button className='primary-btn' onClick={fn}>
      <span>{icon}</span>
      <span>{text}</span>
    </button>
  )
}

export default PrimaryBtn
