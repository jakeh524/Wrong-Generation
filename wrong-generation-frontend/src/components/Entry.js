import React from 'react';

const Entry = ({ entry }) => {
    return (
        <div>
            {entry.position}. {entry.song} by {entry.artist}
        </div>
    )
}

export default Entry;