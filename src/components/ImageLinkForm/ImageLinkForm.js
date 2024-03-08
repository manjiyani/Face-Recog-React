import React from "react";
import './ImageLinkForm.css'

const ImageLinkForm = ({onUrlSubmit, onUrlInput}) =>{
    return(
        <div className="tc">
            <p className="f3">This Magic Brain will detect faces in your picture. Give it a try!</p>
            <div className="center">
                <div className="form center pa4 br3 shadow-5">
                    <input onChange={onUrlInput} type="text" className="f4 pa2 w-70 center"></input>
                    <button onClick={onUrlSubmit} className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer">Detect</button>
                </div>
            </div>
            
        </div>
    );
}

export default ImageLinkForm;