/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// react-icons
import { BsCheckCircleFill } from 'react-icons/bs'
import { MdCancel } from 'react-icons/md'

const ProgressTag = ({ complete }) => {
  return complete ? (
    <div className='complete'>
      <p className='check'>
        <span>
          <BsCheckCircleFill />
        </span>
      </p>
      <span>Complete</span>
    </div>
  ) : (
    <div className='incomplete'>
      <p className='cancel'>
        <span>
          <MdCancel />
        </span>
      </p>
      <span>Incomplete</span>
    </div>
  )
}

export default ProgressTag
