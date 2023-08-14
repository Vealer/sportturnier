import React, { useState } from 'react';


function Competition({onFormSubmit}) {

    const [selectedDate, setSelectedDate] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [teams, setTeams] = useState('2');
    const [fields, setFields] = useState('1');
    const [modus, setModus] = useState('Jeder-gegen-jeden');

    // Funktion, um das aktuelle Datum im richtigen Format zu erhalten
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        return `${year}-${month}-${day}`;
    };

    // Initialisiere das ausgewählte Datum mit dem aktuellen Datum
    useState(() => {
        setSelectedDate(getCurrentDate());
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            selectedDate,
            organizer,
            name,
            location,
            teams,
            fields,
            modus
        };
        onFormSubmit(formData);
        resetForm();
    };

    const resetForm = () =>{
        setOrganizer('');
        setTeams('2');
        setLocation('');
        setSelectedDate(getCurrentDate());
        setName('');
        setModus('Jeder-gegen-jeden');
        setFields('1');
    }

    return (
        <div className="createForm">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" id="validationDefault01" value={organizer} placeholder="Veranstalter" onChange={(e) => setOrganizer(e.target.value)} required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" id="validationDefault02" value={name} placeholder="Turniername" onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" id="validationDefault03" value={location} placeholder="Ort" onChange={(e) => setLocation(e.target.value)} required />
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
                        <select className="custom-select mr-sm-2" value={teams} onChange={(e) => setTeams(e.target.value)} required>
                            <option defaultValue={teams}>2</option>
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
                        <select className="custom-select mr-sm-2" value={modus} onChange={(e) => setModus(e.target.value)} required>
                            <option  defaultValue={modus}>Jeder-gegen-jeden</option>
                            <option value="Schweizer-System">Schweizer-System</option>
                            <option value="Turnier">Turnier</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col col-md-6">
                        <label className="col-form-label">Anzahl Spielfelder</label>
                    </div>
                    <div className="col col-auto">
                        <select className="custom-select mr-sm-2" value={fields} onChange={(e) => setFields(e.target.value)} required>
                            <option defaultValue={fields}>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                </div>
                <button className="btn btn-primary col-md-12 mb-3" type="submit">Erstellen!</button>
            </form>
        </div>
    )
}

export default Competition;