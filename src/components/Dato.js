import React from 'react';
import moment from 'moment';

const Dato = ({dato, id}) => {
    const { status, type, mag, place, time } = dato.properties;
    
    let localTime = new Date(time);
    localTime = moment(localTime).format('YYYY-MM-DD h:mm');

    return (
        <tr className="resultado">
            <td>{id}</td>
            <td>{status}</td>
            <td>{type}</td> 
            <td>{mag}</td>
            <td>{place}</td>
            <td>{localTime}</td>
        </tr>
    );
}
 
export default Dato;