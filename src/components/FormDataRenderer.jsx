import React from 'react';
import { Link } from 'react-router-dom';

function FormDataRenderer({ formData }) {
    return (
        <>
            <div className="container">
                <Link to="/new-competition">
                    <button className="btn btn-primary">Neues Turnier erstellen</button>
                </Link>
                <div className='row'>
                    {formData && formData.map((data, index) => (
                        <div className="col-lg-3 col-6 mb-4 " key={index}>
                            <div className="card mx-2 h-100 d-flex flex-column" >
                                <img className="card-img-top" src="/img/cardimg.webp" alt="Card cap" />
                                <div className="card-body">
                                    <div>
                                        <h2> {data.name} Turnier: </h2>
                                        <p><strong>Veranstalter:</strong> {data.organizer}</p>
                                        <p><strong>Ort:</strong> {data.location}</p>
                                        <p><strong>Ausgewähltes Datum:</strong> {data.selectedDate}</p>
                                        <p><strong>Anzahl Mannschaften:</strong> {data.teams}</p>
                                        <p><strong>Modus:</strong> {data.modus}</p>
                                        <p><strong>Anzahl Spielfelder:</strong> {data.fields}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default FormDataRenderer;
