import React from "react";
import EditLead from "../../components/EditLead/EditLead.jsx";
import { API_URL } from "../../constants";
import axios from "axios";

class EditPage extends React.Component {
    state = {
        id:"",
        firstname: "",
        lastname: "",
        email: "",
        notes: "",
        contacted: false,
    }

    async componentDidMount(){
        let fetchResponse = await fetch(API_URL+ this.props.match.params.id+'/');
        let serverResponse = await fetchResponse.json();
        this.setState({
            id:serverResponse.id,
            firstname:serverResponse.firstname,
            lastname:serverResponse.lastname,
            email:serverResponse.email,
            notes:serverResponse.notes,
            contacted:serverResponse.contacted
        })
    }

    onEditChange = (event) => {
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

    editLeads = async (event) => {
        event.preventDefault()

        try {
            axios.put(API_URL + this.state.id+"/update/", this.state);
            this.resetState();
            this.props.history.push('/')
        } catch (err) {
            console.log("Error:", err)
        }
    }

    render() {
        return (
            <>
                <EditLead firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    email={this.state.email}
                    notes={this.state.notes}
                    contacted={this.state.contacted}
                    onEditChange={this.onEditChange}
                    editLeads={this.editLeads} />
            </>
        );
    }
}
export default EditPage;