import React from 'react';

function TeamTable({ matches }) {
    // Erstellen eines Objekts, um die Statistiken für jedes Team zu speichern
    const teamStats = {};

    // Durchlaufen der Matches, um Teamstatistiken zu aktualisieren
    matches.forEach(round => {
        round.forEach(match => {
            if (match.results[0] !== '' && match.results[1] !== '') {
                const winnerIndex = match.results[0] > match.results[1] ? 0 : match.results[0] < match.results[1] ? 1 : 2;

                // Team 1
                const team1 = match.team1;
                if (!teamStats[team1]) {
                    teamStats[team1] = { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
                }
                teamStats[team1].goalsFor += parseInt(match.results[0]);
                teamStats[team1].goalsAgainst += parseInt(match.results[1]);
                if (winnerIndex === 0) {
                    teamStats[team1].wins += 1;
                    teamStats[team1].points += 3;
                } else if (winnerIndex === 2) {
                    teamStats[team1].draws += 1;
                    teamStats[team1].points += 1;
                } else {
                    teamStats[team1].losses += 1;
                }

                // Team 2
                const team2 = match.team2;
                if (!teamStats[team2]) {
                    teamStats[team2] = { wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 };
                }
                teamStats[team2].goalsFor += parseInt(match.results[1]);
                teamStats[team2].goalsAgainst += parseInt(match.results[0]);
                if (winnerIndex === 1) {
                    teamStats[team2].wins += 1;
                    teamStats[team2].points += 3;
                } else if (winnerIndex === 2) {
                    teamStats[team2].draws += 1;
                    teamStats[team2].points += 1;
                } else {
                    teamStats[team2].losses += 1;
                }
            }
        });
    });

    // Sortieren der Teams nach Punkten und Tordifferenz
    const sortedTeams = Object.keys(teamStats).sort((a, b) => {
        if (teamStats[b].points !== teamStats[a].points) {
            return teamStats[b].points - teamStats[a].points;
        }
        return (teamStats[b].goalsFor - teamStats[b].goalsAgainst) - (teamStats[a].goalsFor - teamStats[a].goalsAgainst);
    });

    return (
        <div className="team-table table-sm table-striped table-hover table-responsive glass-green p-3 mb-5">
            <h4>Tabelle</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Team</th>
                        <th>S/U/N</th>
                        <th>Bilanz</th>
                        <th>Punkte</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTeams.map((team, index) => (
                        <tr key={team}>
                            <td>{index + 1}</td>
                            <td>{team}</td>
                            <td>{teamStats[team].wins} / {teamStats[team].draws} / {teamStats[team].losses}</td>
                            <td>{teamStats[team].goalsFor} : {teamStats[team].goalsAgainst}</td>
                            <td><strong>{teamStats[team].points}</strong></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamTable;
