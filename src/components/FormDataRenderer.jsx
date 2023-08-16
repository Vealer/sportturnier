import React from 'react';
import { Link } from 'react-router-dom';

function FormDataRenderer({ formData }) {

    const imageSelector = (img) => {

        if (/[Tt]isch/.test(img)) return "tabletennis.webp";
        if (/[Ff]u[ßs]/.test(img)) return "soccer.jpg";
        if (/[Vv]olley/.test(img)) return "volleyball.jpg";
        if (/[Ss]chach/.test(img)) return "chess.jpg";
        return "cardimg.webp";
    }

    return (
        <>
            <div className="container">
                {/* <Link to="/new-competition">
                    <button className="btn btn-primary">Neues Turnier erstellen</button>
                </Link> */}
                <div className='row row-cols-1 row-cols-md-2 mt-5'>
                    {formData && formData.map((data, index) => (
                        <div className="col col-lg-3 col-md-6 mb-4" key={index}>
                            <Link to={`/tournament/${index}`} className="text-decoration-none">
                                <div className="card mx-2 h-100 d-flex flex-column" >
                                    <img className="card-img-top" src={`/img/${imageSelector(data.name)}`} alt="Card cap" />
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
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </>
    );
}

export default FormDataRenderer;
