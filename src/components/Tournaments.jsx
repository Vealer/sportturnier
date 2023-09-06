import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

function Tournaments({ formData, onDeleteTournament }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleHover = (index) => {
        setHoveredIndex(index);
    };

    const handleLeave = () => {
        setHoveredIndex(null);
    };

    const handleDelete = (event, index) => {
        event.stopPropagation();
        onDeleteTournament(index);
    };

    return (
        <>
            <div className="container">
                <div className='row row-cols-1 row-cols-md-2 mt-5'>
                    {formData && formData.reverse().map((data, index) => (
                        <div className="col col-lg-3 col-md-6 mb-4" key={index}>

                            <div className="card mx-2 h-100 d-flex flex-column" onMouseEnter={() => handleHover(index)} onMouseLeave={handleLeave}>
                                {hoveredIndex === index && (
                                    <div className="position-absolute" style={{ top: '5px', right: '5px' }}>
                                        <button className="btn btn-danger btn-sm" onClick={(event) => handleDelete(event, index)}>X</button>
                                    </div>
                                )}
                                <img className="card-img-top" src={`/img/${data.name + '.jpg'}`} alt="Card cap" />
                                <div className="card-body">
                                    <Link to={`/tournament/${index}`} className="text-decoration-none">

                                        <div>
                                            <h2> {_.capitalize(data.name)} Turnier </h2>
                                            <p><strong>Veranstalter:</strong> {data.organizer}</p>
                                            <p><strong>Ort:</strong> {data.location}</p>
                                            <p><strong>Ausgewähltes Datum:</strong> {data.selectedDate}</p>
                                            <p><strong>Anzahl Mannschaften:</strong> {data.teams}</p>
                                            <p><strong>Modus:</strong> {data.modus}</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Tournaments;
