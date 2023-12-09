import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function VerticalModalPopup({props, data}) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          reSSSePes
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Popup</h4>
        <p>
          {data}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VerticalModalPopup;