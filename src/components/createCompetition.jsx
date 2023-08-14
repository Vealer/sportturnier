import React, { useState } from 'react';


function Competition() {

    const [selectedDate, setSelectedDate] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [teams, setTeams] = useState('2');
    const [fields, setFields] = useState('2');
    const [modus, setModus] = useState('1');

    // Funktion, um das aktuelle Datum im richtigen Format zu erhalten
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Füge eine führende Null hinzu, wenn Monat/Tag einstellig ist
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }

        return `${year}-${month}-${day}`;
    };

    // Initialisiere das ausgewählte Datum mit dem aktuellen Datum
    useState(() => {
        setSelectedDate(getCurrentDate());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hier können Sie die Werte in einer Datenbank speichern oder anderweitig verarbeiten
        const formData = {
            selectedDate,
            organizer,
            name,
            location,
            teams,
            fields,
            modus
        };

        console.log(formData); // Beispiel: Konsolenausgabe der Formulardaten
    };

    return (
        <div className="createForm">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" id="validationDefault01" placeholder="Veranstalter" onChange={(e) => setOrganizer(e.target.value)} required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" id="validationDefault02" placeholder="Turniername" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" id="validationDefault03" placeholder="Ort" onChange={(e) => setLocation(e.target.value)} required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="date" className="form-control" id="validationDefault04" value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col col-md-6">
                        <label className="col-form-label">Anzahl Mannschaften</label>
                    </div>
                    <div className="col col-auto">
                        <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" onChange={(e) => setTeams(e.target.value)} required>
                            <option defaultValue="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col col-md-6">
                        <label className="col-form-label">Modus</label>
                    </div>
                    <div className="col col-auto col-md-6 text-right">
                        <select className="custom-select mr-sm-2" id="modi" onChange={(e) => setModus(e.target.value)} required>
                            <option  defaultValue="1">Jeder-gegen-jeden</option>
                            <option value="2">Schweizer-System</option>
                            <option value="3">Turnier</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col col-md-6">
                        <label className="col-form-label">Anzahl Spielfelder</label>
                    </div>
                    <div className="col col-auto">
                        <select className="custom-select mr-sm-2" id="felder" onChange={(e) => setFields(e.target.value)} required>
                            <option defaultValue="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary col-md-12 mb-3" type="submit">Erstellen!</button>
            </form>
        </div>
    )
}

export default Competition;