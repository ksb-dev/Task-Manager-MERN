/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// react-router-dom
import { Link } from 'react-router-dom'

const PrimaryBtn = ({ path, icon, text, value = 'link', fn = () => {} }) => {
  return value === 'link' ? (
    <Link to={path} className='primary-btn'>
      <span id='icon-1'>{icon}</span>
      {text}
    </Link>
  ) : (
    // <button to={path} className='primary-btn' onSubmit={fn}>
    //   <span>{icon}</span>
    //   {text}
    // </button>
    <button className='primary-btn' onClick={fn}>
      <span>{icon}</span>
      {text}
    </button>
  )
}

export default PrimaryBtn
