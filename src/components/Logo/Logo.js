import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import Brain from './brain.png';

const Logo = () => {
    return(
        <div className="flex ph5">
            <Tilt>
            <div className="Tilt br2 shadow-2" style={{ height: '150px', width: '150px' }}>
                <img alt="Logo" src={Brain} style={{paddingTop: '25px', paddingLeft: '25px'}}/>
            </div>
            </Tilt>
        </div>
    );
}

export default Logo;