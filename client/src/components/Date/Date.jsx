/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// moment
import moment from 'moment'

// react-icons
import { BsCalendarDate } from 'react-icons/bs'

// context
import { useTaskivityContext } from '../../context/context'

const Date = ({ date }) => {
  const { mode } = useTaskivityContext()

  return (
    <div className={'date ' + (mode ? 'lightBg1' : 'darkBg2')}>
      <span>
        <BsCalendarDate />
      </span>
      {/* <img src={DateIcon} alt='' /> */}
      <span>{moment(date).format('Do MMMM, YYYY')}</span>
    </div>
  )
}

export default Date
