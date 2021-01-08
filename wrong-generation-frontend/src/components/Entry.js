import React from 'react';

const positionColStyle = {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    width: '80px'
}

const imageColStyle = {
    paddingTop: '0px',
    paddingBottom: '0px',
}



const Entry = ({ entry }) => {
    if (entry.spotifyUri === null) {
        return (
            <tr>
                <td style={positionColStyle}>{entry.position}</td>
                <td>
                    <img 
                        style={imageColStyle}
                        src={process.env.PUBLIC_URL + '/blank_img.jpg'} 
                        height={72}
                        width={72} 
                        alt={'blank album cover'}
                    />
                </td>
                <td>{entry.song}</td>
                <td>{entry.artist}</td>
            </tr>
        )
    }
    return (
        <tr>
            <td style={positionColStyle}>{entry.position}</td>
            <td>
                <img 
                    style={imageColStyle}
                    src={entry.trackImg.url} 
                    height={72} 
                    width={72} 
                    alt={`album cover for ${entry.song}`}
                />
            </td>
            <td>
                <a target="_blank" rel="noopener noreferrer" href={entry.songUrl.spotify}>{entry.song}</a>
            </td>
            <td>
                <a target="_blank" rel="noopener noreferrer" href={entry.artistUrl.spotify}>{entry.artist}</a>
            </td>
        </tr>
    )
}

export default Entry;