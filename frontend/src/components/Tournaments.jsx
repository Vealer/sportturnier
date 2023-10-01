import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';

function Tournaments({ formData, onDeleteTournament }) {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const humanReadableDate = (date) => {
        const data = new Date(date).toLocaleDateString('de-DE',{
        day: 'numeric',
        month: 'long',
        year: 'numeric'})
        return data;
    };

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
    <div className='row row-cols-1 row-cols-md-3 mt-5'>
        {formData && formData.reverse().map((data, index) => (
            <div className="col col-lg-4 col-md-6 mb-4" key={index}>
                <div className="card mx-2 h-100 d-flex flex-column" onMouseEnter={() => handleHover(index)} onMouseLeave={handleLeave}>
                    {hoveredIndex === index && (
                        <div className="position-absolute" style={{ top: '5px', right: '5px' }}>
                            <button className="btn btn-danger btn-sm" onClick={(event) => handleDelete(event, index)}>X</button>
                        </div>
                    )}
                    <img className="card-img-top" src={`/assets/images/${data.name + '.jpg'}`} alt="Card cap" />
                    <div className="card-body content ">
                        <Link to={`/tournament/${index}`}>
                            <div className='text-decoration-none '>
                                <h2 style={{color: 'darkblue'}}> {_.capitalize(data.name)} Turnier </h2>
                                <p ><strong style={{color: 'darkblue'}}>Veranstalter:</strong> {data.organizer}</p>
                                <p><strong style={{color: 'darkblue'}}>Ort:</strong> {data.location}</p>
                                <p><strong style={{color: 'darkblue'}}>Datum:</strong> {humanReadableDate(data.selectedDate)}</p>
                                <p><strong style={{color: 'darkblue'}}>Anzahl Mannschaften:</strong> {data.teams}</p>
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
