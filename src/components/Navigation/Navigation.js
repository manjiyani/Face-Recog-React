import React from "react";

const Navigation = ({onRouteChange}) => {
    return(
        <nav className="tr">
            <p onClick={() => {onRouteChange("signin")}} className="pa3 black f3 pointer underline">Sign Out</p>
        </nav>
    );
}

export default Navigation;