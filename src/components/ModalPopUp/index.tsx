import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import './styles.css';

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
          <Modal.Title> Você está em</Modal.Title>
        </Modal.Header>
        <Modal.Body>João Pessoa!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalPopUp;
