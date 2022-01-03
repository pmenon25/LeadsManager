import axios from "axios";
import React from "react";
import Home from "../../components/Home/Home.jsx";
import { API_URL } from "../../constants";

class HomePage extends React.Component {
    state = {
        leads: []
    }

    async componentDidMount() {
        try {
            let fetchResponse = await fetch(API_URL);
            console.log(fetchResponse)
            let leads = await fetchResponse.json();
            this.setState({
                leads: leads
            })
        } catch (err) {
            console.log("Error:", err)
        }
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
    delete_lead = (id) => {
        axios.delete(API_URL + id+"/delete/").then(() => {
            this.resetState();
        });
}
    render() {
        return (
            <>
                <Home leads={this.state.leads} 
                delete= {this.delete_lead}/>


            </>
        );
    }
}
export default HomePage;