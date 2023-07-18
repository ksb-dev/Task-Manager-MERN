/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// react-router-dom
import { Link } from 'react-router-dom'

//context
import { useTaskivityContext } from '../../context/context'

const Categories = () => {
  const { mode } = useTaskivityContext()

  const CategoryLink = ({ path, text }) => {
    return window.location.pathname === path ? (
      <Link
        to={path}
        className={
          'option ' + (mode ? 'darkColor darkActive' : 'lightColor lightActive')
        }
      >
        {text}
      </Link>
    ) : (
      <Link
        to={path}
        className={
          'option ' + (mode ? 'lightBg2  darkColor' : 'darkBg1 lightColor')
        }
      >
        {text}
      </Link>
    )
  }

  return (
    <div className={'categories ' + (mode ? 'darkColor' : 'lightColor')}>
      <div className='options'>
        <CategoryLink path={'/'} text={'Tasks'} />

        <CategoryLink path={'/incomplete'} text={'Incomplete'} />

        <CategoryLink path={'/complete'} text={'Complete'} />
      </div>
    </div>
  )
}

export default Categories
