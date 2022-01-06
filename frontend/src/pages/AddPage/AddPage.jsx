import React from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import AddLeads from "../../components/AddLeads/AddLeads.jsx";

class AddPage extends React.Component {
    state = {
        firstname: "",
        lastname: "",
        email: "",
        notes: "",
        contacted: false,
        modalShow: false,
        errorMessage: ""
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

            modalShow: false,
            errorMessage: ""
        })
    }

    setShowErrorModal = (s) => {
        this.setState({ modalShow: s })
    }

    handleErrorModalShow = () => this.setShowErrorModal(true);

    handleErrorModalClose = () => this.setShowErrorModal(false);

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
            const lead = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                notes: this.state.notes,
                contacted: this.state.contacted,
            }

            let response = await axios.post(API_URL + "add/", lead);
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
                this.handleErrorModalShow();
            } else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                console.log('Error', error);
            }
        }
    }

    render() {
        return (
            <>
                <AddLeads
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    email={this.state.email}
                    notes={this.state.notes}
                    contacted={this.state.contacted}
                    modalShow={this.state.modalShow}
                    errorMessage={this.state.errorMessage}
                    handleSubmit={this.addLeads}
                    handleChange={this.handleChange}
                    handleClose={this.handleErrorModalClose} />
            </>
        );
    }
}
export default AddPage;