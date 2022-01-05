import { Form, Button, FormGroup, Modal } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

class EditLead extends React.Component {

    state = {
        firstname: this.props.lead.firstname,
        lastname: this.props.lead.lastname,
        email: this.props.lead.email,
        notes: this.props.lead.notes,
        contacted: this.props.lead.contacted,
        showEditModal: false
    }

    toggle = () => {
        this.setState(oldState => ({
            showEditModal: !oldState.showEditModal
        }));
    }

    onEditChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    editLeads = async (event) => {
        event.preventDefault()
        try {
            axios.put(API_URL + this.state.id + "/update/", this.state);
            this.props.resetState();
        } catch (err) {
            console.log("Error: ", err)
        }
    }

    render() {

        let button = <Button variant="light"><FontAwesomeIcon onClick={this.toggle} icon={faEdit} size="sm" color='rgb(24, 23, 23)'/></Button>;

        return (
            <>
                {button}
                <Modal show={this.state.showEditModal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Lead</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>   
                    <Form onSubmit={this.editLeads}>
                        <FormGroup as={Row}>
                            <Col>
                            <Form.Label column sm={5}>First Name</Form.Label>
                            </Col>
                            
                            <Col sm={10}>
                                <Form.Control type="text" name="firstname" value={this.state.firstname} onChange={(event) => this.onEditChange(event)} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                                <Form.Label column sm={5}>Last Name</Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control type="text" name="lastname" value={this.state.lastname} onChange={(event) => this.onEditChange(event)} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                                <Form.Label column sm={5}>Email</Form.Label>
                            </Col>
                            <Col sm={10}>
                                <Form.Control type="email" name="email" value={this.state.email} onChange={(event) => this.onEditChange(event)} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                            <Form.Label column sm={1}>Notes</Form.Label>
                            </Col>
                            <Col sm={15}>
                                <Form.Control as="textarea" rows={3} name="notes" value={this.state.notes} onChange={(event) => this.state.onEditChange(event)} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col>
                            <Form.Label column sm={1}>Contacted</Form.Label>
                            </Col>
                            <Col sm={9} className="my-2">
                                <Form.Check type="checkbox" name="contacted" checked={this.state.contacted} onChange={(event) => this.state.onEditChange(event)} />
                            </Col>
                        </FormGroup>
                        <FormGroup as={Row}>
                            <Col sm={{ span: 2, offset: 5 }}>
                                <Button type="submit" value="Update">Update</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
export default EditLead