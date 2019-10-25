import React, {useState} from 'react';
import Speech from './Speech';

function TextComp(params) {
    const [phrase, setPhrase] = useState("I am Julio");
    return (
        <>
        <textarea  rows="4" cols="50" defaultValue={phrase} onChange={(event)=>setPhrase(event.target.value)}/>
        <Speech expectedText={phrase}/>
        </>
    );
}

export default TextComp;