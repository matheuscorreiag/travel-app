import React, { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  InputGroup,
  FormControl,
  Card,
  Carousel
} from 'react-bootstrap';
import useLocationStore from '../../stores/location';
import useMarkerStore from '../../stores/markers';
import api from '../../services/api';

import './styles.css';
import '../mixin.css';

interface IModalShow {
  show: boolean;
  onHide: () => any;
}
interface IForm {
  name: string;
  message: string;
  lat: number;
  long: number;
}
const ModalPopUp: React.FC<IModalShow> = (props: IModalShow) => {
  const locations = useLocationStore((state) => state.locations);
  const addMarkers = useMarkerStore((state) => state.addMarker);
  let array = [
    {
      name: 'TEST NAME',
      description: 'TEST DESCRIPTION',
      test: 'a'
    }
  ];

  const [reqBody, setReqbody] = useState<IForm>({} as IForm);

  useEffect(() => {
    setReqbody({ ...reqBody, lat: locations.lat, long: locations.long });
    //eslint-disable-next-line
  }, [locations]);

  const saveMarker = async () => {
    await api.post('/addMarker', reqBody).then((res) => {
      addMarkers(reqBody);
      props.onHide();
    });
  };

  return (
    <>
      <Modal {...props}>
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
                {console.log('cheguei')}
                Fechar
              </Button>
            </Modal.Footer>
          </div>
        </div>
        {array.map((item) => (
          <div className="oldMessages">
            <div className="cardAndImageContainer">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100 slideImage"
                    src="https://wallpapercave.com/wp/wp2537987.jpg"
                    alt=""
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100 slideImage"
                    src="https://wallpapercave.com/wp/wp2537970.jpg"
                    alt=""
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100 slideImage"
                    src="https://f.vividscreen.info/soft/4d73c126a42761d17d5afe181bff39ec/Lions-In-Kruger-National-Park-1920x1200.jpg"
                    alt=""
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default ModalPopUp;
