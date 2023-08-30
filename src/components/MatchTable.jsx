import React from 'react';

function MatchTable({ matches, index, setMatches }) {

    const handleResultChange = (matchIndex, teamIndex, result) => {
        const updatedMatches = [...matches];
        updatedMatches[matchIndex].results[teamIndex] = result;
        setMatches(updatedMatches);
    };


    return (
        <div className="glass-dark p-2 text-light shadow p-3 mb-5  ">
            <h3>{index}. Runde</h3>
            <table className="table ">
                <tbody>
                    {matches.map((match, matchIndex) => (
                        <tr key={matchIndex + 1}>
                            <td><strong>{matchIndex + 1}</strong></td>
                            {match.team2 !== 'Spielfrei' && match.team1 !== 'Spielfrei' && <td><strong>{match.team1} <input className='w-15 text-center' type="number" min="0" value={match.results[0]}
                                onChange={(e) => handleResultChange(matchIndex, 0, e.target.value)} /> : <input className='w-15 text-center' type="number" min="0" value={match.results[1]}
                                    onChange={(e) => handleResultChange(matchIndex, 1, e.target.value)} /> {match.team2}</strong></td>}
                            {(match.team2 === 'Spielfrei' || match.team1 === 'Spielfrei') && <td><strong>{match.team1 === 'Spielfrei' ? match.team2 : match.team1} hat Spielfrei! </strong></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MatchTable;




