/* eslint-disable react/prop-types */

// moment
import moment from 'moment'

// react-icons
import { SlCalender } from 'react-icons/sl'

const Date = ({ date }) => {
  return (
    <div className='date'>
      <span>
        <SlCalender />
      </span>
      <span>{moment(date).format('Do MMMM, YYYY')}</span>
    </div>
  )
}

export default Date
