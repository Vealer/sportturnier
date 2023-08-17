import React from 'react';

function MatchTable({ matches, index }) {
    return (
        <div className="glass-dark p-2 text-light shadow p-3 mb-5  ">
            <h3>{index}. Runde</h3>
            <table className="table ">
                {/* <thead>
                    <tr>
                        <th>Feld</th>
                        <th>Teams</th>

                    </tr>
                </thead> */}
                <tbody>
                    {matches.map((match, index) => (
                        <tr key={index}>
                            <td><strong>{index + 1}</strong></td>
                           {match.team2 !== 'Spielfrei' && <td><strong>{match.team1} <input className='w-15' type="number" min="0" /> : <input className='w-15' type="number" min="0" /> {match.team2}</strong></td> } 
                           {match.team2 === 'Spielfrei' && <td><strong>{match.team1} hat Spielfrei! </strong></td> }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchTable;
