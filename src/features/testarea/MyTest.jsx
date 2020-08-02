import React from 'react'


const MyTest = ({food, children}) => {
  console.log('children', children)
  const animal = 'chicken'
  const alert = string => window.alert(`Your alert string is: ${food+string}`)
  const event = e => alert(e.target.innerText)
  return (
    <div>
      {food}
      {children({animal, alert, event})}
    </div>
  )
}

export default MyTest

