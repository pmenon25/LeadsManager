import React from 'react';
import { Button, Table } from "react-bootstrap"
import { format } from "date-fns"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditLead from "../EditLead/EditLead";
import LeadDetails from "../LeadDetails/LeadDetails.jsx";

function Home(props) {

    const truncateString = (input) => {
        const ELLIPSIS = "...";
        const DISPLAY_LENGTH = 20 - ELLIPSIS.length;
        let truncated = "";

        if (input.length > DISPLAY_LENGTH) {
            return truncated = truncated.concat(input.slice(0, DISPLAY_LENGTH) + ELLIPSIS);
        } else {
            return input;
        }
    }

    const formatDateString = (inputDate) => {
        return format(new Date(inputDate), 'MM/dd/yyyy')
    }

    return (
        <>
            <Table className="mt-5">
                <thead >
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Contacted?</th>
                        <th>Created On</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.leads.map(lead => (
                        <tr key={lead.id}>
                            <td>{truncateString(lead.firstname)}</td>
                            <td>{truncateString(lead.lastname)}</td>
                            <td>{truncateString(lead.email)}</td>
                            <td>{lead.contacted ? "Yes" : "No"}</td>
                            <td>{formatDateString(lead.created)}</td>
                            <td><LeadDetails lead={lead}></LeadDetails></td>
                            <td><EditLead lead={lead} resetState={props.resetState}></EditLead></td>
                            <td><Button variant="light" type="submit" onClick={() => { props.delete(lead.id) }}><FontAwesomeIcon icon={faTrashAlt} size="sm" color='rgb(24, 23, 23)' /></Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
} export default Home