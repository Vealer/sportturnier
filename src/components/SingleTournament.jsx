import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import MatchTable from './MatchTable';

function SingleTournament({ formData }) {
    const { id } = useParams();
    const selectedTournament = formData[id];
    const [isExpanded, setIsExpanded] = useState(false);
    const [teamNames, setTeamNames] = useState([]);
    const [matchDuration, setMatchDuration] = useState('');
    const [matches, setMatches] = useState([]);

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

        const updatedTeamNames = [...defaultTeamNames];
        teamNames.forEach((name, index) => {
            updatedTeamNames[index] = name || defaultTeamNames[index];
        });

        // Spielplan erstellen
        const shuffledTeams = shuffleArray(updatedTeamNames);

        const schedule = [];

        for (let i = 0; i < shuffledTeams.length; i += 2) {
            const team1 = shuffledTeams[i];
            const team2 = shuffledTeams[i + 1] || 'Spielfrei';
            schedule.push({ team1, team2 });
        }
        const newSchedule = matches.length > 0 ? [...matches] : [];
        newSchedule.push(schedule);
        setMatches(newSchedule);
        console.log(matches);
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


    const defaultTeamNames = [];
    for (let index = 1; index <= selectedTournament.teams; index++) {
        defaultTeamNames.push(`Team ${index}`);
    }

    return (
        <div className="container">
            <div className="card mb-3">
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
                            <button className="btn btn-success" onClick={handleSubmit}>
                                Speichern
                            </button>
                        </div>
                    )}

                </div>
            </div>
            {matches.length > 0 && matches.map((match, index) => (<MatchTable key={index} index={index+1} matches={match} />))}
        </div>
    );
}

export default SingleTournament;
