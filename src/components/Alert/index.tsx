import { Alert as AlertBS } from 'react-bootstrap';
import './styles.css';

interface IAlert {
  showalert: boolean;
  hidealert: () => any;
}

const Alert = (props: IAlert) => {
  return (
    <div className="alert-container">
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
