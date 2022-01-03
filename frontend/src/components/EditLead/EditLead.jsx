import { Form, Button } from "react-bootstrap"
function EditLead(props) {
    return (
        <>
            <div>
                <h1>Add leads</h1>
                <Form onSubmit={props.editLeads}>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstname" value={props.firstname} onChange={(event) => props.onEditChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Lastname</Form.Label>
                    <Form.Control type="text" name="lastname" value={props.lastname} onChange={(event) => props.onEditChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={props.email} onChange={(event) => props.onEditChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={3}  type="description" name="notes" value={props.notes} onChange={(event) => props.onEditChange(event)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Contacted" name="contacted" value={props.contacted} onChange={(event) => props.onEditChange(event)}  />
                    </Form.Group>
                    <Button variant="primary" type="submit" value="Submit"></Button>
                   
                </Form>
            </div>

        </>
    );
}
export default EditLead