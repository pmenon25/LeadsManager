import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    leads :[{ firstname : "",
    lastname : "",
    email : "",
    notes : "",
    contacted : false}]
   
  }


  render() {
    return (
      <div className="App">
       <h2>New Leads</h2>
         <hr />
         {this.state.leads.map(s => (
           <article key={s.firstname}>
             <div>{s.firstname}</div> <div>{s.lastname}</div>
           </article>
         ))}
         <hr />
         <form>
           <label>
             <span>FirstName</span>
             <input name='firstname'/>
           </label>
           <label>
             <span>LastName</span>
             <input name='lastname'/>
           </label>
           <label>
             <span>Email</span>
             <input name='email' type='email'></input>
           </label>
           <label>
             <span>Notes</span>
             <input name='notes' type='text'/>
           </label>
           <label>
             <span>Contacted</span>
             <select name='contacted'>
               <option value="yes">Yes</option>
               <option value="no">No</option>
             </select>
           </label>
           <button onClick={this.addLead}>ADD LEAD</button>
         </form>
      </div>
    );
  }
}

export default App;
