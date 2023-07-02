import { useTaskivityContext } from '../../context/context'

const SearchBar = () => {
  const { mode } = useTaskivityContext()

  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search here...'
        className={mode ? 'lightBg1' : 'darkBg2'}
      />
    </div>
  )
}

export default SearchBar
