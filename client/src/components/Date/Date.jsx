/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// moment
import moment from 'moment'

// react-icons
import { SlCalender } from 'react-icons/sl'
import { BsCalendarDate } from 'react-icons/bs'

// images
import DateIcon from '../../images/icons8-calendar-30.png'

const Date = ({ date }) => {
  return (
    <div className='date'>
      <span>
        <BsCalendarDate />
      </span>
      {/* <img src={DateIcon} alt='' /> */}
      <span>{moment(date).format('Do MMMM, YYYY')}</span>
    </div>
  )
}

export default Date
