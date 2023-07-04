/* eslint-disable react/prop-types */
const Loading = ({ value }) => {
  return (
    <div
      className={
        'loader ' + (value === 'light' ? 'loader-border-2' : 'loader-border-1')
      }
    ></div>
  )
}

export default Loading
