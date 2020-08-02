import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from 'semantic-ui-react';
import googleApiKey from '../../google-api-key'

const AnyReactComponent = () => <Icon name='marker' size='big' color='green'/>;

const SimpleMap = ({latLng: {lat, lng}}) => {

  

  if(!lat || !lng) return <></>
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleApiKey }}
        center={{lat, lng}}
        defaultZoom={10}
      >
        <AnyReactComponent
          lat={lat}
          lng={lng}
        />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;