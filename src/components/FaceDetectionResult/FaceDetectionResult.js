import React from "react";
import './FaceDetectionResult.css';

const FaceDetectionResult = ({ImgSrc, boundingBox}) => {
    return(
        <div className="pa2 center">
            <div className="absolute">
                <div className="bounding-box" style={{top: boundingBox.top_row, bottom: boundingBox.bottom_row, left: boundingBox.left_col, right: boundingBox.right_col}}></div>
                <img id='face_detection_out' style={{width: '500px', height: 'auto'}} alt="" src = {ImgSrc} />
            </div>
        </div>
    );
}

export default FaceDetectionResult;