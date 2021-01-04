import React from 'react';
import Entry from './Entry';

const Entries = ({ chartDate, chartEntries }) => {
    if (chartDate === '') {
        return null;
    }
    return (
        <div>
            <h3>Showing Billboard Chart Data from {chartDate}</h3>
            {chartEntries.map(entry => 
                <Entry key={entry.position} entry={entry} />
            )}
        </div>
    )
}

export default Entries;