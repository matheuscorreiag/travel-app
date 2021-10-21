import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { HiLocationMarker } from 'react-icons/hi';

import ModalPopUp from '../ModalPopUp';

import '../mixin.css';
import useLocationStore from '../../stores/location';
import useMarkerStore from '../../stores/markers';

const Map = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const addLocation = useLocationStore((state) => state.addLocation);
  const markers = useMarkerStore((state) => state.markers);

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -7,
    longitude: -35,
    zoom: 3
  });

  const popUpFunction = async (e: any) => {
    const [long, lat] = e.lngLat;
    const location = { long, lat };

    setShowPopUp(true);
    addLocation(location);
  };

  return (
    <div className="mapContainer">
      <ReactMapGL
        onDblClick={(e) => popUpFunction(e)}
        {...viewport}
        doubleClickZoom={false}
        className="map"
        mapStyle="mapbox://styles/matheuscorreiag/ckuw96fle6ijt17nz9d1cz69r"
        mapboxApiAccessToken="pk.eyJ1IjoibWF0aGV1c2NvcnJlaWFnIiwiYSI6ImNrdXc5NDV2ZTRsNmkybm9mcGw0MmtsbXcifQ.wh8ypwqLopNG5xIt4uW0qA"
        onViewportChange={setViewport}
      >
        <ModalPopUp
          show={showPopUp}
          onHide={() => {
            setShowPopUp(false);
          }}
        />

        {markers[0] &&
          markers.map((marker) => (
            <Marker
              key={marker.lat}
              latitude={marker.lat}
              longitude={marker.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <HiLocationMarker color="red" size="2.5rem" />
            </Marker>
          ))}
      </ReactMapGL>
    </div>
  );
};
export default Map;
