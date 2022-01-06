import React from 'react';
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, FormGroup, Form } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { API_URL } from "../../constants";

class LeadDetails extends React.Component {

    state = {
        id: this.props.lead.id,
        firstname: this.props.lead.firstname,
        lastname: this.props.lead.lastname,
        email: this.props.lead.email,
        notes: this.props.lead.notes,
        contacted: this.props.lead.contacted,
        showDetailModal: false
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps != this.props) {
            // Force a re-render of this component when the parent changes its props
            this.resetState();
        }
    }

    resetState() {
        this.setState({
            id: this.props.lead.id,
            firstname: this.props.lead.firstname,
            lastname: this.props.lead.lastname,
            email: this.props.lead.email,
            notes: this.props.lead.notes,
            contacted: this.props.lead.contacted,
            showDetailModal: false
        });
    }

    toggle = () => {
        this.setState(oldState => ({
            showDetailModal: !oldState.showDetailModal
        }));
    }

    render() {
        let button = <Button variant="light"><FontAwesomeIcon onClick={this.toggle} icon={faInfoCircle} size="sm" color='rgb(24, 23, 23)' /></Button>;

        return (
            <>
                {button}
                <Modal show={this.state.showDetailModal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title >Lead Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGroup as={Row}>
                            <Col>
                                <Form.Label column sm={5}>First Name</Form.Label>
                            </Col>

                            <Col sm={10}>
                                <Form.Control type="text" name="firstname" value={this.state.firstname} disabled />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                                <Form.Label column sm={1}>Last Name</Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control type="text" name="lastname" value={this.state.lastname} disabled />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                                <Form.Label column sm={1}>Email</Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control type="email" name="email" value={this.state.email} disabled />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                                <Form.Label column sm={1}>Notes</Form.Label>
                            </Col>
                            <Col sm={15}>
                                <Form.Control as="textarea" rows={2} name="notes" value={this.state.notes} disabled />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                                <Form.Label column sm={1}>Contacted</Form.Label>
                            </Col>
                            <Col sm={9.5}>
                                <Form.Control type="text" name="contacted" value={this.state.contacted ? "Yes" : "No"} disabled />
                            </Col>
                        </FormGroup>
                    </Modal.Body>
                </Modal>

            </>
        );

    }
}
export default LeadDetails