import React, { useState } from 'react';
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

import './styles.css';
import '../mixin.css';

interface IModalShow {
  show: boolean;
  onHide: () => any;
}

const ModalPopUp: React.FC<IModalShow> = (props: IModalShow) => {
  const [show, setShow] = useState<IModalShow>({
    show: props.show,
    onHide: props.onHide
  });

  const handleClose = () => setShow(props.onHide);

  return (
    <>
      <Modal {...props} show={props.show} onHide={handleClose}>
        {console.log(show)}
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
          <Button variant="success">Enviar</Button>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPopUp;
