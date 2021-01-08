import React from 'react';

const linkStyle = {
    marginLeft: '4px',
    marginRight: '20px',
}

const Footer = () => {
    return(
        <footer class='footer'>
            Created by
            <a style={linkStyle} target="_blank" rel="noopener noreferrer" href='https://jakeaherron.com/'>Jake Herron</a>
            Project Code on
            <a style={linkStyle} target="_blank" rel="noopener noreferrer" href='https://github.com/jakeh524/Wrong-Generation'>Github</a>
        </footer>
    )
}

export default Footer;