import React from 'react';

function MatchTable({ matches, index }) {
    return (
        <div>
            <h3>{index}. Runde</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Feld</th>
                        <th>Teams</th>
                        <th>Spielstand</th>
                    </tr>
                </thead>
                <tbody>
                    {matches.map((match, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{match.team1} : {match.team2}</td>
                            <td><input type="number"  /> : <input type="number"  /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchTable;
