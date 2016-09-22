'use strict';

const React          = require('react');
const ReactBootstrap = require('react-bootstrap');
const Modal          = ReactBootstrap.Modal;


const AboutModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.close} aria-labelledby="cmodal-title-sm">
            <Modal.Header closeButton>
                <Modal.Title id="cmodal-title-sm">About Sylk</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Copyright &copy; <a href="http://ag-projects.com" target="_blank" rel="noopener noreferrer">AG Projects</a></p>
                <p>Powered by <a href="http://sylkserver.com" target="_blank">SylkServer</a></p>
            </Modal.Body>
        </Modal>
    );
}

AboutModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    close: React.PropTypes.func.isRequired
};


module.exports = AboutModal;
