/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

// react-icons
import { TbProgressX, TbProgressCheck } from 'react-icons/tb'

const ProgressTag = ({ complete }) => {
  return complete ? (
    <div className='complete-tag'>
      <span className='check-icon'>
        <TbProgressCheck />
      </span>
    </div>
  ) : (
    <div className='incomplete-tag'>
      <span className='cancel-icon'>
        <TbProgressX />
      </span>
    </div>
  )
}

export default ProgressTag
