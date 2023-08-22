import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchTable from './MatchTable';
import TeamTable from './TeamTable';

function SingleTournament({ formData }) {
    const { id } = useParams();
    const selectedTournament = formData[id];
    const [isExpanded, setIsExpanded] = useState(false);
    const [teamNames, setTeamNames] = useState([]);
    const [matchDuration, setMatchDuration] = useState('');
    const [matches, setMatches] = useState([]);

    const defaultTeamNames = [];
    for (let index = 1; index <= selectedTournament.teams; index++) {
        defaultTeamNames.push(`Team ${index}`);
    }

    const updatedTeamNames = [...defaultTeamNames];

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleTeamNameChange = (index, newName) => {
        const updatedTeamNames = [...teamNames];
        updatedTeamNames[index] = newName;
        setTeamNames(updatedTeamNames);
    };

    const handleSubmit = () => {
        setIsExpanded(false);
        teamNames.forEach((name, index) => {
            updatedTeamNames[index] = name || defaultTeamNames[index];
        });
    };

    // Funktion zum Mischen des Arrays (Fisher-Yates-Algorithmus)
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };


    const handleCreateRound = () => {
        if (defaultTeamNames.length % 2 !== 0) defaultTeamNames.push('Spielfrei');
        let shuffledTeams = shuffleArray(defaultTeamNames);
        const newSchedule = [];
        let schedule = [];
        for (let i = 0; i < shuffledTeams.length - 1; i++) {
            for (let j = 0; j < shuffledTeams.length / 2; j++) {
                const team1 = shuffledTeams[j];
                const team2 = shuffledTeams[shuffledTeams.length - j - 1];
                schedule.push({ team1, team2, results: ['', ''] });
            }
            newSchedule.push(schedule);
            schedule = [];
            shuffledTeams.unshift(shuffledTeams.shift(), shuffledTeams.pop());
        }
        setMatches(newSchedule);
        console.log(matches)
    };




    return (
        <div className="container">
            <div className="card mb-3 mt-5 glass-white shadow-lg">
                <div className="card-body">
                    <h5 className="card-title">{selectedTournament.name} Turnier</h5>
                    <p className="card-text"><strong>Veranstalter:</strong> {selectedTournament.organizer}</p>
                    <p className="card-text"><strong>Ort:</strong> {selectedTournament.location}</p>
                    <p className="card-text"><strong>Ausgewähltes Datum:</strong> {selectedTournament.selectedDate}</p>
                    <p className="card-text"><strong>Anzahl Mannschaften:</strong> {selectedTournament.teams}</p>
                    <p className="card-text"><strong>Modus:</strong> {selectedTournament.modus}</p>
                    <p className="card-text"><strong>Anzahl Spielfelder:</strong> {selectedTournament.fields}</p>
                    <button className="btn btn-primary mt-2" onClick={handleExpandClick}>
                        Einstellungen
                    </button>
                    {isExpanded && (
                        <div className="mt-3">
                            {defaultTeamNames.map((teamName, index) => (
                                <div key={index} className="form-group row">
                                    <label htmlFor={`teamName${index}`} className="col-sm-3 col-form-label">
                                        Mannschaft {index + 1}
                                    </label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`teamName${index}`}
                                            value={teamNames[index] || teamName}
                                            onChange={(e) => handleTeamNameChange(index, e.target.value)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="form-group row">
                                <label htmlFor="matchDuration" className="col-sm-3 col-form-label">
                                    Spieldauer (in Minuten)
                                </label>
                                <div className="col-sm-9">
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="matchDuration"
                                        value={matchDuration}
                                        onChange={(e) => setMatchDuration(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <button className="btn btn-success" onClick={handleSubmit}>
                                    Speichern
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {matches.length > 0 && matches.map((match, roundIndex) => (<MatchTable key={roundIndex} index={roundIndex + 1} matches={match} setMatches={(updatedMatches) => {
                const updatedSchedule = [...matches];
                updatedSchedule[roundIndex] = updatedMatches;
                setMatches(updatedSchedule);
            }} />))}
            <button className="btn btn-primary mb-5" type="button" onClick={handleCreateRound}>
                Spielrunde erstellen
            </button>
            <div className="container mb-5">
                <TeamTable matches={matches} /> 
            </div>
        </div>
    );
}

export default SingleTournament;
