// react-router-dom
import { Link } from 'react-router-dom'

//context
import { useTaskivityContext } from '../../context/context'

const Categories = () => {
  const { mode } = useTaskivityContext()

  return (
    <div className={'categories ' + (mode ? 'darkColor' : 'lightColor')}>
      <div className='options'>
        {window.location.pathname === '/' ? (
          <Link
            to='/'
            className={mode ? 'darkColor darkActive' : 'lightColor lightActive'}
          >
            Tasks
          </Link>
        ) : (
          <Link to='/' className={mode ? 'darkColor' : 'lightColor'}>
            Tasks
          </Link>
        )}

        {window.location.pathname === '/incomplete' ? (
          <Link
            to='/incomplete'
            className={mode ? 'darkColor darkActive' : 'lightColor lightActive'}
          >
            Incomplete
          </Link>
        ) : (
          <Link to='/incomplete' className={mode ? 'darkColor' : 'lightColor'}>
            Incomplete
          </Link>
        )}

        {window.location.pathname === '/complete' ? (
          <Link
            to='/complete'
            className={mode ? 'darkColor darkActive' : 'lightColor lightActive'}
          >
            Complete
          </Link>
        ) : (
          <Link to='/complete' className={mode ? 'darkColor' : 'lightColor'}>
            Complete
          </Link>
        )}
      </div>
    </div>
  )
}

export default Categories
