import React, { useState } from 'react';
import { Alert as AlertBS, Button } from 'react-bootstrap';
import './styles.css';

interface IAlert {
  showalert: boolean;
  hidealert: () => any;
}

const Alert = (props: IAlert) => {
  return (
    <div className="alert-container" {...props}>
      <AlertBS show={props.showalert} variant="danger" className="alert">
        <h2 className="alertText">Missing Params</h2>
        <h2 className="close alertText " onClick={props.hidealert}>
          X
        </h2>
      </AlertBS>
    </div>
  );
};

export default Alert;
