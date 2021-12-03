import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import ReactMapGL, { Marker } from 'react-map-gl';
import { GiPositionMarker } from 'react-icons/gi';
import ModalPopUp from '../ModalPopUp';

import '../mixin.css';
import useLocationStore from '../../stores/location';
import { getAllMarkers } from '../../stores/fetchActions/marker';
import { IMarker } from '../../interfaces';
import useMarkersStore from '../../stores/markers';

const Map = () => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [activeLocation, setActiveLocation] = useState({
    lat: null,
    long: null
  });
  const savedMarkers = useMarkersStore((state) => state.markers);
  const addMarker = useMarkersStore((state) => state.addMarker);

  const addLocation = useLocationStore((state) => state.addLocation);

  const fetchAPI = () => {
    if (savedMarkers.length === 0) {
      getAllMarkers().then((res: any) => {
        const data = res.data;

        data.forEach((marker: IMarker) => {
          addMarker({ lat: marker.lat, long: marker.long });
        });
      });
    }
  };

  useEffect(() => {
    fetchAPI();
    // eslint-disable-next-line
  }, [savedMarkers]);

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
    setActiveLocation(location);

    setShowPopUp(true);
    addLocation(location);
  };

  const openSavedCards = async (lat: number, long: number) => {
    setActiveLocation({ lat, long });
    addLocation({ lat, long });
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
          activelocation={activeLocation}
        />
        {savedMarkers[0] &&
          savedMarkers.map((marker) => (
            <Marker
              key={uuid()}
              latitude={marker.lat}
              longitude={marker.long}
              offsetLeft={-20}
              offsetTop={-10}
              onClick={() => openSavedCards(marker.lat, marker.long)}
            >
              <GiPositionMarker color="red" size="2.2rem" />
            </Marker>
          ))}
      </ReactMapGL>
    </div>
  );
};
export default Map;
