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
        contacted: false,
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
            contacted: false
        })
    }
    
    addLeads = async (event) => {
        event.preventDefault();
        try {
            console.log("Sending form data")
            axios.post(API_URL + "add/", this.state);
            this.resetState();
            this.props.history.push('/')

        } catch (err) {
            console.log("Error:", err)
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
                    handleChange={this.handleChange}
                    addLeads={this.addLeads} />
            </>
        );
    }
}
export default AddPage;