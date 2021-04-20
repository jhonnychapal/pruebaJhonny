import React, { Fragment, useState } from 'react';
import Dato from './Dato';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import Swal from 'sweetalert2'

const Listado = () => {

    const [datos, setDatos] = useState([]);

    const [fecha1, setFecha1] = useState({
        fecha1: new Date()
    });

    const [fecha2, setFecha2] = useState({
        fecha2: new Date()
    });

    const [filtro1, setFiltro1] = useState(new Date().getTime());
    const [filtro2, setFiltro2] = useState(new Date().getTime());

    const onChange1 = fecha1 => {
        setFecha1({fecha1: fecha1});
        const filtro = fecha1.getTime(fecha1);
        setFiltro1(filtro);
    }

    const onChange2 = fecha2 => {
        setFecha2({fecha2: fecha2});
        const filtro = fecha2.getTime(fecha2);
        setFiltro2(filtro);
    }

    const consumirServicio = async(filtro1, filtro2) => {

        if(filtro1 > filtro2){
            Swal.fire('Error!', 'La fecha final no puede ser menor a la fecha inicial', 'error');
            return;
        }
        
        const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";
        const respuesta = await axios.get(url);
        const resultado = respuesta.data.features.filter(dato => {
            return (dato.properties.time >= filtro1 && dato.properties.time <= filtro2)
        })
        setDatos(resultado);
    }

    return (
        <Fragment>
            <div className="row centrar mt-3">
                <label className="mt-2 mr-2">Fecha inicial: </label>
                <DatePicker selected={fecha1.fecha1} onChange={onChange1}/>
                <label className="m-2">Fecha final: </label>
                <DatePicker selected={fecha2.fecha2} onChange={onChange2}/>
                <button 
                    className="btn btn-danger ml-2" 
                    onClick={()=>{consumirServicio(filtro1, filtro2);}}
                >Filtrar</button>
            </div>

            <p>Cantidad de resutados: {datos.length}</p>
            
            {(datos.length >= 0)
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
                                {datos.length > 0
                                ? datos.map((dato) => (
                                    <Dato key={dato.id} id={dato.id} dato={dato} />
                                    ))
                                : null }
                            </tbody>
                        </table>
                    </div>
                : null
            }
        </Fragment>
    );
}
 
export default Listado;