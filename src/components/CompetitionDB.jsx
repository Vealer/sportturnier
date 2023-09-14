import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function CompetitionDB({onFormSubmit}) {
    const navigate = useNavigate();
    const [formDataSet, setFormDataSet] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [name, setName] = useState('Volleyball');
    const [location, setLocation] = useState('');
    const [teams, setTeams] = useState('2');

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        return `${year}-${month}-${day}`;
    };

    useState(() => {
        setSelectedDate(getCurrentDate());
    }, []);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = {
    //         selectedDate,
    //         organizer,
    //         name,
    //         location,
    //         teams,
    //     };
    //     navigate('/tournaments');
    //     setFormDataSet([...formDataSet, formData]);
    //     onFormSubmit(formData);
    //     resetForm();
    // };

    // const resetForm = () =>{


    return (
        <div className="container d-flex justify-content-center mt-5 ">
            <form className='glass-green' method='POST' action='/addTournament'>
                <div className="form-row">
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" name='organizer'  placeholder="Veranstalter"  required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <input type="text" className="form-control" name='location'  placeholder="Ort"  required />
                    </div>
                    <div className="col-md-12 mb-3">
                        <select className="custom-select mr-sm-2" name='sport'  required>
                            <option defaultValue="volleyball">Volleyball</option>
                            <option value="fussball">Fussball</option>
                            <option value="tischtennis">Tischtennis</option>
                            <option value="kicker">Kicker</option>
                            <option value="dart">Dart</option>
                            <option value="gruppenspiel">Gruppenspiel</option>
                            <option value="schach">Schach</option>
                            <option value="sonstige">Sonstiges</option>
                        </select>
                    </div>

                    <div className="col-md-12 mb-3">
                        <input type="date" className="form-control" name="tdate" value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col col-md-6">
                        <label className="col-form-label">Anzahl Mannschaften</label>
                    </div>
                    <div className="col col-auto">
                        <select className="custom-select mr-sm-2" name='amount' required>
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
                <button className="btn btn-primary col-md-12 mb-3" value="Send" type="submit">Erstellen!</button>
            </form>
        </div>
    )
}

export default CompetitionDB;