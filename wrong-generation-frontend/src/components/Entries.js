import React from 'react';
import Entry from './Entry';

const positionHeaderStyle = {
    textAlign: 'center'
}

const titleStyle = {
    fontSize: '24px'
}


const Entries = ({ chartDate, chartEntries }) => {
    if (chartDate === '') {
        return null;
    }
    else {
        return (
            <div>
                <h3 style={titleStyle}>Showing the Top {chartEntries.length} Songs on the Billboard Hot 100 from {chartDate}</h3>
                <table class='tableStyle'>
                    <thead>
                        <tr>
                            <th style={positionHeaderStyle}>Position</th>
                            <th></th>
                            <th>Song</th>
                            <th>Artist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chartEntries.map(entry => 
                            <Entry key={entry.position} entry={entry} />
                        )}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default Entries;