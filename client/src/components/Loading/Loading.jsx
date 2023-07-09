/* eslint-disable react/prop-types */
const Loading = ({ value }) => {
  return (
    <span
      className={
        'loader ' + (value === 'light' ? 'loader-border-2' : 'loader-border-1')
      }
    ></span>
  )
}

export default Loading
