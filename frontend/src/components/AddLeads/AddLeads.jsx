function AddLeads(props) {
    return (
        <>
            <div>
                <h1>Add leads</h1>
                <form onSubmit={props.addLeads}>
                    <label>First Name</label>
                    <input type="text" name="firstname" value={props.firstname} onChange={(event) => props.handleChange(event)} />
                    <label>Lastname</label>
                    <input type="text" name="lastname" value={props.lastname} onChange={(event) => props.handleChange(event)} />
                    <label>Email</label>
                    <input type="email" name="email" value={props.email} onChange={(event) => props.handleChange(event)} />
                    <label>Notes</label>
                    <textarea type="description" name="notes" value={props.notes} onChange={(event) => props.handleChange(event)} />
                    <label>Contacted</label>
                    <label name="contacted" value={props.contacted} onChange={(event) => props.handleChange(event)}> </label>
                    <input type="checkbox" name="contacted" value={props.contacted} onChange={(event) => props.handleChange(event)} />
                    <input type="submit" value="Submit" />

                </form>
                
            </div>
            

        </>
    );
}
export default AddLeads