import React, { useEffect, useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';
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

  // eslint-disable-next-line
  const [show, setShow] = useState(false);
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
    <Modal {...props}>
      <div className="formContainer">
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
    </Modal>
  );
};

export default ModalPopUp;
