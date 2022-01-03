import { Button, Accordion, Container, Navbar, Stack} from "react-bootstrap"

function Home(props) {
    return (
        <>
            <Container>
                <Navbar expand="xxl" bg="primary" variant="light" >
                    <Container>
                        <Navbar.Brand href="/add">Add Leads</Navbar.Brand>
                    </Container>
                </Navbar>
            </Container>
            {props.leads.map(lead => (
                <div>
                    <Stack direction="horizontal" gap={3}>
                    <Accordion>
                        <Accordion.Item eventKey={lead.id}>
                            <Accordion.Header>{lead.firstname}{lead.lastname}</Accordion.Header>
                            <Accordion.Body>
                                Email:{lead.email}<br />
                                Notes:{lead.notes}<br />
                                Contacted:{lead.contacted}<br />
                                <Button type="submit" onClick={() => { props.delete(lead.id) }}>Delete</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    </Stack>
                </div>
            ))}
        </>
    );
} export default Home