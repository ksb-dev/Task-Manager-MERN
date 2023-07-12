/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// react-icons
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'

const ProgressTag = ({ complete }) => {
  return complete ? (
    <p className='complete'>
      <span className='check'>
        <BsCheckCircleFill />
      </span>
      <span>Complete</span>
    </p>
  ) : (
    <p className='incomplete'>
      <span className='cancel'>
        <MdCancel />
      </span>
      <span>Incomplete</span>
    </p>
  )
}

export default ProgressTag
