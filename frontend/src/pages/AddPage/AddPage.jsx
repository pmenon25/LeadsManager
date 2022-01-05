import React from "react";
import AddLeads from "../../components/AddLeads/AddLeads.jsx";
import { API_URL } from "../../constants";
import axios from "axios";

class AddPage extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        notes: "",
        // contacted: false,
        show: false,
        errorMessage: "",
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    resetState = () => {
        this.setState({
            firstname: "",
            lastname: "",
            email: "",
            notes: "",
            contacted: false,
            show: false,
            errorMessage: "",
        })
    }

    setShow = (showState) => {
        this.setState({ show: showState })
    }

    handleShow = () => this.setShow(true);

    handleClose = () => this.setShow(false);

    addLineBreaks = string =>
        string.split('\n').map((text, index) => (
            <React.Fragment key={`${text}-${index}`}>
                {text}
                <br />
            </React.Fragment>
        ));

    addLeads = async (event) => {
        event.preventDefault();

        try {
            let response = await axios.post(API_URL + "add/", this.state);
            this.resetState();
            this.props.history.push('/')
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                let errorMessage = "The following fields have invalid data:\n";

                for (const property in error.response.data) {
                    errorMessage = errorMessage.concat(`${property}: ${error.response.data[property]}\n`);
                }

                this.setState({ errorMessage: this.addLineBreaks(errorMessage) })
                this.handleShow();
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        }
    }

    render() {
        return (
            <>
                <AddLeads firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    email={this.state.email}
                    notes={this.state.notes}
                    contacted={this.state.contacted}
                    show={this.state.show}
                    errorMessage={this.state.errorMessage}
                    handleChange={this.handleChange}
                    addLeads={this.addLeads}
                    handleClose={this.handleClose} />
            </>
        );
    }
}
export default AddPage;