import React, { useState } from 'react';
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
const ModalPopUp: React.FC<IModalShow> = (props: IModalShow) => {
  const locations = useLocationStore((state) => state.locations);
  const addMarkers = useMarkerStore((state) => state.addMarker);

  // eslint-disable-next-line
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const saveMarker = async () => {
    await api.post('/addLocation', locations).then((res) => {
      addMarkers(locations);
      props.onHide();
    });
  };

  return (
    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>
          Adicione um comentário/imagem a sua localização
        </Modal.Title>
      </Modal.Header>
      <div className="inputGroupContainer">
        <InputGroup className="inputGroup">
          <FormControl as="textarea" aria-label="With textarea" />
        </InputGroup>
      </div>
      <Modal.Footer>
        <Button variant="success" onClick={saveMarker}>
          Enviar
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopUp;
