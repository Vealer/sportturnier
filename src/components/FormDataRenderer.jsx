import React from 'react';

function FormDataRenderer({ formData }) {
    return (
        <div className="formData">
            <h2> {formData.name} Turnier: </h2>
            <p><strong>Veranstalter:</strong> {formData.organizer}</p>
            <p><strong>Ort:</strong> {formData.location}</p>
            <p><strong>Ausgewähltes Datum:</strong> {formData.selectedDate}</p>
            <p><strong>Anzahl Mannschaften:</strong> {formData.teams}</p>
            <p><strong>Modus:</strong> {formData.modus}</p>
            <p><strong>Anzahl Spielfelder:</strong> {formData.fields}</p>
        </div>
    );
}

export default FormDataRenderer;
