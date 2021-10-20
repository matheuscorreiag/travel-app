import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { HiLocationMarker } from 'react-icons/hi';

import ModalPopUp from '../ModalPopUp';

import '../mixin.css';
import useLocationStore from '../../stores/location';

const Map = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -7,
    longitude: -35,
    zoom: 3
  });

  const addLocation = useLocationStore((state) => state.addLocation);
  const locations = useLocationStore((state) => state.locations);

  const popUpFunction = async (e: any) => {
    const [long, lat] = e.lngLat;
    const location = { long, lat };

    addLocation(location);
    setShowPopUp(true);
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
        {locations && (
          <Marker
            key={locations.lat}
            latitude={locations.lat}
            longitude={locations.long}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <HiLocationMarker color="red" size="5rem" />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};
export default Map;
