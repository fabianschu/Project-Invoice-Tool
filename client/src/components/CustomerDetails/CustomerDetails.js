import React, {useState, useEffect} from 'react';
const { ipcRenderer } = window.require('electron');

const CustomerDetails = (props) => {

    const [firm, setFirm] = useState(props.customerDetails.firm);
    const [street, setStreet] = useState(props.customerDetails.street);
    const [zip, setZip] = useState(props.customerDetails.zip);
    const [city, setCity] = useState(props.customerDetails.city);
    const [lastName, setLastName] = useState(props.customerDetails.lastName);
    const [firstName, setFirstName] = useState(props.customerDetails.firstName);
    const [country, setCountry] = useState(props.customerDetails.country);
    const [id, setId] = useState(props.customerDetails.id);

    const handleChange = (event) => {
        //handling of inputs
        if(event.type === 'change') {
            switch(event.target.name) {
                case 'firm':
                    setFirm(event.target.value);
                    break;
                case 'street':
                    setStreet(event.target.value);
                    break;
                case 'zip':
                    setZip(event.target.value);
                    break;
                case 'city':
                    setCity(event.target.value);
                    break; 
                case 'lastName':
                    setLastName(event.target.value);
                    break;
                case 'firstName':
                    setFirstName(event.target.value);
                    break;
                case 'country':
                    setCountry(event.target.value);
                    break; 
            }
        }
        
        //if event type is blur, the main process is asked to update the db, it will then query the db again and send the result to the ipcRenderer (but not the event emitter)
        if(event.type === 'blur') {
            ipcRenderer.send('update', [`UPDATE customers SET ${event.target.name} = ? WHERE id = ?`, [event.target.value, Number(event.target.id)]]);
        }

        //
    }
    
    useEffect(() => {
        if(id !== props.customerDetails.id) {
            setFirm(props.customerDetails.firm);
            setStreet(props.customerDetails.street);
            setZip(props.customerDetails.zip);
            setCity(props.customerDetails.city);
            setLastName(props.customerDetails.lastName);
            setFirstName(props.customerDetails.firstName);
            setCountry(props.customerDetails.country);
            setId(props.customerDetails.id);
        }
    })
    
    return (
        <>
            {props.selectedCustomer &&
            <>
                <table className=''>
                    <tbody>
                        <tr>
                            <th>Firm</th>
                            <td><input type="text" value={firm} onChange={handleChange} name='firm' onBlur={handleChange} id={id}/></td>
                        </tr>
                        <tr>
                            <th>Street</th>
                            <td><input type="text" value={street} onChange={handleChange} name='street' onBlur={props.handleChange} id={id}/></td>
                        </tr>
                        <tr>
                            <th>Zip Code</th>
                            <td><input type="text" value={zip} onChange={handleChange} name='zip' onBlur={props.handleChange} id={id}/></td>
                        </tr>
                        <tr>
                            <th>City</th>
                            <td><input type="text" value={city} onChange={handleChange} name='city' onBlur={props.handleChange} id={id}/></td>
                        </tr>
                        <tr>
                            <th>Country</th>
                            <td><input type="text" value={country} onChange={handleChange} name='country' onBlur={props.handleChange} id={id}/></td>
                        </tr>
                        <tr>
                            <th>Surname</th>
                            <td><input type="text" value={firstName} onChange={handleChange} name='firstName' onBlur={props.handleChange} id={id}/></td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td><input type="text" value={lastName} onChange={handleChange} name='lastName' onBlur={props.handleChange} id={id}/></td>
                        </tr>
                    </tbody>
                </table>
            </>
            }
        </>
    )
}

export default CustomerDetails;