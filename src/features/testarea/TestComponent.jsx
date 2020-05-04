import React from 'react'
import { connect } from 'react-redux'
import {incrementCounter, decrementCounter} from './testActions'

const mapStateToProps = state => ({
  data: state.test.data
})

const mapDispatchToProps = {
  incrementCounter,
  decrementCounter
}

const TestComponent = ({data, incrementCounter, decrementCounter}) => {
  return (
    <div>
      Cunt
      <div>the answer is {data}</div>
      <button onClick={incrementCounter}>increment</button>
      <button onClick={decrementCounter}>decrement</button>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent)
