import { FormGroup, Form, Button, Modal } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function AddLeads(props) {
    return (
        <>
            <div>
                <h1>Add leads</h1>
                <Form className="my-5">
                    <FormGroup as={Row} className="mb-5">
                        <Form.Label htmlFor="firstname" column sm={1}>First Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" id="firstname" name="firstname" value={props.firstname} onChange={(event) => props.handleChange(event)} />
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} className="mb-5">
                        <Form.Label htmlFor="lastname" column sm={1}>Last Name</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" id="lastname" name="lastname" value={props.lastname} onChange={(event) => props.handleChange(event)} />
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} className="mb-5">
                        <Form.Label htmlFor="email" column sm={1}>Email</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" id="email" name="email" value={props.email} onChange={(event) => props.handleChange(event)} />
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} className="mb-5">
                        <Form.Label htmlFor="notes" column sm={1}>Notes</Form.Label>
                        <Col sm={10}>
                            <Form.Control as="textarea" rows={3} id="notes" name="notes" value={props.notes} onChange={(event) => props.handleChange(event)} />
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} className="mb-5" controlId="formHorizontalCheck">
                        <Form.Label column sm={1}>Contacted</Form.Label>
                        <Col xs="auto" className="my-1">
                            <Form.Check type="checkbox" name="contacted" onChange={(event) => props.handleChange(event)} />
                        </Col>
                    </FormGroup>
                    <FormGroup as={Row} className="mb-5">
                        <Col sm={{ span: 8, offset: 2 }}>
                            <Button type="submit" onClick={(event) => { props.handleSubmit(event) }} value="Submit">Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>

                <Modal show={props.modalShow} onHide={props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Errors were encountered during operation:<br />{props.errorMessage}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={props.handleClose}>
                            Dismiss
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default AddLeads