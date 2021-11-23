import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Card,
  Carousel
} from 'react-bootstrap';
import { v4 as uuid } from 'uuid';
import useLocationStore from '../../stores/location';
import api from '../../services/api';

import './styles.css';
import '../mixin.css';
import { addMarker } from '../../stores/fetchActions/marker';
import { IForm } from '../../interfaces';
import useMarkersStore from '../../stores/markers';
import Alert from '../Alert';

interface IModalShow {
  show: boolean;
  onHide: () => any;
  activelocation: {
    lat: number;
    long: number;
  };
}

const ModalPopUp: React.FC<IModalShow> = (props: IModalShow) => {
  const locations = useLocationStore((state) => state.locations);
  const [activeCards, setActiveCards] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const addMarkerStore = useMarkersStore((state) => state.addMarker);

  const [reqBody, setReqbody] = useState<IForm>({} as IForm);

  useEffect(() => {
    setReqbody({ ...reqBody, lat: locations.lat, long: locations.long });
    savedCards();
    //eslint-disable-next-line
  }, [locations]);

  const saveMarker = async () => {
    await addMarker(reqBody).then((res: any) => {
      console.log(res);
      if (res.data.status === 200) {
        addMarkerStore({ lat: reqBody.lat, long: reqBody.long });
        setReqbody({
          ...reqBody,
          lat: null,
          long: null,
          message: null,
          name: null
        });
        props.onHide();
      } else {
        setShowAlert(true);
      }
    });
  };
  const savedCards = async () => {
    await api
      .get(
        `/getLocationByCoords?lat=${props.activelocation.lat}&long=${props.activelocation.long}`
      )
      .then((res) => {
        setActiveCards(res.data as any);
        return res.data;
      })
      .catch((err) => {
        setShowAlert(true);
      });
  };

  console.log('showAlert: ', showAlert);
  return (
    <>
      <Modal {...props}>
        {showAlert && (
          <Alert showalert={showAlert} hidealert={() => setShowAlert(false)} />
        )}
        <div className="formContainer">
          <div className="formAlign">
            <Modal.Header closeButton>
              <Modal.Title>
                Adicione um comentário/imagem a sua localização
              </Modal.Title>
            </Modal.Header>
            <div>
              <label>Nome</label>
            </div>
            <div className="smallInputGroupContainer">
              <InputGroup
                size="sm"
                className="smallInputGroup mb-3"
                onChange={(e: any) =>
                  setReqbody({ ...reqBody, name: e.target.value })
                }
              >
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </InputGroup>
            </div>
            <div className="inputGroupContainer">
              <InputGroup
                className="inputGroup"
                onChange={(e: any) =>
                  setReqbody({ ...reqBody, message: e.target.value })
                }
              >
                <FormControl as="textarea" aria-label="With textarea" />
              </InputGroup>
            </div>
            <Modal.Footer>
              <Button variant="success" onClick={saveMarker}>
                Enviar
              </Button>
              <Button variant="secondary" onClick={props.onHide}>
                Fechar
              </Button>
            </Modal.Footer>
          </div>
        </div>
        {activeCards.length > 0 &&
          activeCards.map((card) => (
            <div className="oldMessages" key={uuid()}>
              <div className="cardAndImageContainer">
                <Card.Body>
                  <Card.Title>{card.name} </Card.Title>
                  <Card.Text>{card.message} </Card.Text>
                </Card.Body>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100 slideImage"
                      src="https://wallpapercave.com/wp/wp2537987.jpg"
                      alt=""
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
          ))}
      </Modal>
      )
    </>
  );
};

export default ModalPopUp;
