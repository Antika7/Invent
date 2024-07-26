import React from 'react';
import './Result.css'
const Result = ({ data }) => {
    return (
        <div className="result">
            <h2>Analyzed Result</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default Result;
