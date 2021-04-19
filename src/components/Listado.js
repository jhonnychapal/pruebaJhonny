import React, { Fragment, useState } from 'react';
import Dato from './Dato';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';

const Listado = () => {

    const [datos, setDatos] = useState([]);

    const [fecha1, setFecha1] = useState({
        fecha1: new Date()
    });

    const [fecha2, setFecha2] = useState({
        fecha2: new Date()
    });

    const [filtro1, setFiltro1] = useState(0);
    const [filtro2, setFiltro2] = useState(0);


    const onChange1 = fecha1 => {
        setFecha1({fecha1: fecha1});
        const filtro1 = new Date().getTime(fecha1);
        setFiltro1(filtro1);
    }

    const onChange2 = fecha2 => {
        setFecha2({fecha2: fecha2});
        const filtro2 = new Date().getTime(fecha2);
        setFiltro2(filtro2);
    }

    const consumirServicio = async() => {
        const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";
        const respuesta = await axios.get(url);
        const resultado = respuesta.data.features
        setDatos(resultado);
    }

    return (
        <Fragment>
            
            <div className="row enlace">
                <label>Fecha inicial: </label>
                <DatePicker selected={fecha1.fecha1} onChange={onChange1}/>
                <label>Fecha final: </label>
                <DatePicker selected={fecha2.fecha2} onChange={onChange2}/>
                <button className="btn btn-danger ml-2 mt-2" onClick={()=>{consumirServicio();}}>Filtrar</button>
            </div>
            {(datos.length > 0)
                ?
                    <div className="centrar">
                        <table className="table table-striped p-4 container">
                            <thead className="bg-primary table-dark text-center">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Status</th>
                                <th scope="col">Type</th>
                                <th scope="col">Mag</th>
                                <th scope="col">Place</th>
                                <th scope="col">LocalTime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {datos.length === 0
                                ? "Ho hay datos"
                                : datos.map((dato) => (
                                    <Dato key={dato.id} id={dato.id} dato={dato} />
                                    ))}
                            </tbody>
                        </table>
                    </div>
                : null
            }
        </Fragment>
    );
}
 
export default Listado;