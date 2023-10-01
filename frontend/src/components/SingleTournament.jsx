import React, {  useState, } from 'react';
import { useParams } from 'react-router-dom';
import MatchTable from './MatchTable';
import TeamTable from './TeamTable';
import Timer from './Timer';
import _ from 'lodash';

function SingleTournament({ formData }) {
    const { id } = useParams();
    const selectedTournament = formData[id];
    const [isExpanded, setIsExpanded] = useState(true);

    const [matchDuration, setMatchDuration] = useState({ minutes: 15, seconds: 0 });
    const [matches, setMatches] = useState([]);

    const defaultTeamNames = [];
    for (let index = 1; index <= selectedTournament.teams; index++) {
        defaultTeamNames.push(`Team ${index}`);
    }
    const [teamNames, setTeamNames] = useState(defaultTeamNames);
    const updatedTeamNames = [...defaultTeamNames];

    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    const handleTeamNameChange = (index, newName) => {
        const updatedTeamNames = [...teamNames];
        updatedTeamNames[index] = newName;
        setTeamNames(updatedTeamNames);
    };

    const handleMatchDurationChange = (event) => {
        const { name, value } = event.target;
        setMatchDuration((prevState) => ({
            ...prevState,
            [name]: parseInt(value),
        }));
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
        if (teamNames.length % 2 !== 0) teamNames.push('Spielfrei');
        let shuffledTeams = shuffleArray(teamNames);
        const newSchedule = [];
        let schedule = [];
        for (let i = 0; i < shuffledTeams.length - 1; i++) {
            for (let j = 0; j < shuffledTeams.length / 2; j++) {
                const team1 = i % 2 === 0 ? shuffledTeams[j] : shuffledTeams[shuffledTeams.length - j - 1];
                const team2 = i % 2 === 0 ? shuffledTeams[shuffledTeams.length - j - 1] : shuffledTeams[j];
                schedule.push({ team1, team2, results: ['', ''] });
            }
            schedule.sort((a) => {
                if (a.team1 === 'Spielfrei' || a.team2 === 'Spielfrei') return -1;
                return 1;
            });
            newSchedule.push(schedule.reverse());
            schedule = [];
            shuffledTeams.unshift(shuffledTeams.shift(), shuffledTeams.pop());
        }
        setMatches(newSchedule);
        setIsExpanded(false);
    };


    return (
        <div className="container">
            <div className="card mb-5 mt-5 glass-white shadow-lg text-center">
                <div className="card-body">
                    <h2 className="card-title"><strong>{_.capitalize(selectedTournament.name)} Turnier</strong></h2>
                    <h3 className="card-text mt-4"><strong>Veranstalter:</strong> {selectedTournament.organizer}</h3>
                    <div className="row text-center display-flex justify-content-center mt-4 gap-3">
                        <h3 className="card-text mr-3"><strong>Ort:</strong> {selectedTournament.location}</h3>
                        <h3 className="card-text"><strong>Datum:</strong> {selectedTournament.selectedDate}</h3>
                    </div>
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
                                    Spieldauer
                                </label>
                                <div className="col-sm-9" >
                                    <div className='form-control'>
                                        Minuten
                                        <input id='matchDuration' className='w-15 text-center ml-3 mr-3' type="number" name="minutes" min='0' value={matchDuration.minutes} onChange={handleMatchDurationChange} /> :
                                        <input className='w-15 text-center ml-3 mr-3' type="number" name="seconds" min="0" value={matchDuration.seconds} onChange={handleMatchDurationChange} /> Sekunden
                                    </div>
                                </div>

                            </div>
                            <div className=''>
                                <button className="btn btn-success" onClick={handleSubmit}>
                                    Speichern
                                </button>
                                <button className="btn btn-primary ml-3" type="button" onClick={handleCreateRound}>
                                    Spielrunden erstellen
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Timer minutes={matchDuration.minutes} seconds={matchDuration.seconds} />
            {matches.length > 0 && matches.map((match, roundIndex) => (<MatchTable key={roundIndex} index={roundIndex + 1} matches={match} setMatches={(updatedMatches) => {
                const updatedSchedule = [...matches];
                updatedSchedule[roundIndex] = updatedMatches;
                setMatches(updatedSchedule);
            }} />))}

            <div className="container mb-5">
                <TeamTable matches={matches} discipline={selectedTournament.name} />
            </div>
        </div>
    );
}

export default SingleTournament;
