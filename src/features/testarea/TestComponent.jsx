import React, { useState } from "react";
import { connect } from "react-redux";
import { incrementAsync, decrementAsync } from "./testActions";
import TestPlaceInput from "./TestPlaceInput";
//import MyTest from './MyTest'
import SimpleMap from "./SimpleMap";
import { openModal } from "./../modals/modalActions";
import { Button } from "semantic-ui-react";

const mapStateToProps = (state) => ({
  data: state.test.data,
  loading: state.async.loading,
  buttonName: state.async.elementName,
});

const mapDispatchToProps = {
  incrementAsync,
  decrementAsync,
  openModal,
};

const TestComponent = ({
  data,
  incrementAsync,
  decrementAsync,
  openModal,
  loading,
  buttonName
}) => {
  const [latLng, setLatLng] = useState({ lat: null, lng: null });

  return (
    <div>
      Cunt
      <div>the answer is {data}</div>
      <Button name="increment" loading={buttonName === 'increment' && loading} onClick={e => incrementAsync(e.target.name)}>
        increment
      </Button>
      <Button name="decrement" loading={buttonName === 'decrement' && loading} onClick={e => decrementAsync(e.target.name)}>
        decrement
      </Button>
      <Button
        onClick={() => openModal("TestModal", { data: 42 })}
        color="teal"
        content="Open Modal"
      />
      <br />
      <br />
      <TestPlaceInput placeSelectHandler={setLatLng} />
      {/* <MyTest food={'carrot'}>
        {({animal, alert, event}) => {
          return <>
            <h1>{animal}</h1>
            <button onClick={() => alert('Cunt')}>Ding</button>
            <button onClick={event}>Dong</button>
          </>
        }}
      </MyTest> */}
      <SimpleMap latLng={latLng} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TestComponent);
