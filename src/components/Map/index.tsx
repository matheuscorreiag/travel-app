import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { HiLocationMarker } from 'react-icons/hi';
import ModalPopUp from '../ModalPopUp';

import '../mixin.css';

interface IPointersArray {
  lat: number;
  long: number;
}

const Map = () => {
  const [pointersArray, setPointersArray] = useState<IPointersArray[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -7,
    longitude: -35,
    zoom: 3
  });

  const addMarker = (event: any) => {
    const [long, lat] = event.lngLat;
    const coords = { long, lat };

    setPointersArray([...pointersArray, coords]);
  };
  const popUpFunction = () => {
    console.log('Cheguei na funcao do popup');

    setShowPopUp(true);
  };

  return (
    <div className="mapContainer">
      <ReactMapGL
        onDblClick={(e) => addMarker(e)}
        {...viewport}
        doubleClickZoom={false}
        className="map"
        mapStyle="mapbox://styles/matheuscorreiag/ckuw96fle6ijt17nz9d1cz69r"
        mapboxApiAccessToken="pk.eyJ1IjoibWF0aGV1c2NvcnJlaWFnIiwiYSI6ImNrdXc5NDV2ZTRsNmkybm9mcGw0MmtsbXcifQ.wh8ypwqLopNG5xIt4uW0qA"
        onViewportChange={setViewport}
      >
        {pointersArray
          ? pointersArray.map((item) => {
              return (
                <Marker
                  key={item.lat}
                  latitude={item.lat}
                  longitude={item.long}
                  offsetLeft={-20}
                  offsetTop={-10}
                  onClick={popUpFunction}
                >
                  <HiLocationMarker color="red" size="2rem" />
                </Marker>
              );
            })
          : null}

        <ModalPopUp
          show={showPopUp}
          onHide={() => {
            setShowPopUp(false);
          }}
        />
      </ReactMapGL>
    </div>
  );
};
export default Map;
