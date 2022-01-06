import axios from "axios";
import React from "react";
import Home from "../../components/Home/Home.jsx";
import { API_URL } from "../../constants";

class HomePage extends React.Component {
    state = {
        leads: []
    }

    getAllLeads = () => {
        axios.get(API_URL).then(res => this.setState({ leads: res.data }));
    }

    resetState = () => {
        this.getAllLeads();
    }

    async componentDidMount() {
        try {
            this.resetState();
        } catch (err) {
            console.log("Error:", err)
        }
    }

    deleteLead = async (id) => {
        try {
           await axios.delete(API_URL + id + "/delete/")
            this.resetState();
        } catch (err) {
            console.log("Error:", err)
        }
    }

    render() {
        return (
            <>
                <Home
                    leads={this.state.leads}
                    delete={this.deleteLead}
                    resetState={this.resetState} />

            </>
        );
    }
}

export default HomePage;