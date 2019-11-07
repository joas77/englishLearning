import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import  MicIcon from '@material-ui/icons/Mic';
import * as cleanTextUtils from 'clean-text-utils';


function Speech({expectedText}) {
    const [listenedText, setText] = useState("Expecting audio...");
    const [listening, setListen] = useState(false);
    const [diagnostic, setDiagnostic] = useState("");
    const toggleListen =()=>{
        console.log(!listening?"DEBUG_MSG: listening":"DEBUG_MSG: not listening");
        setListen(!listening);
        // if (listening) {
        //     console.log("DEBUG_MSG: listening");
        // } else {
        //     console.log("DEBUG_MSG: NOT listening");
        // }
        
    };

    function listen(expectedText) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
        const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

        var phrase = "hola";

        var grammar = '#JSGF V1.0; grammar phrase; public <phrase> = ' + phrase + ';';
        var recognition = new SpeechRecognition();
        var speechRecognitionList = new SpeechGrammarList();
        speechRecognitionList.addFromString(grammar, 1);
        //recognition.grammars = speechRecognitionList;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        
        toggleListen();
        //listening? recognition.start(): recognition.stop();
        console.log("DEBUG_MESSAGE: listening:" + listening);
        console.log("DEBUG_MESSAGE: expected text = " + expectedText);
        
        recognition.start();
        
        recognition.onresult = function (event) {
            // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
            // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
            // It has a getter so it can be accessed like an array
            // The first [0] returns the SpeechRecognitionResult at position 0.
            // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
            // These also have getters so they can be accessed like arrays.
            // The second [0] returns the SpeechRecognitionAlternative at position 0.
            // We then return the transcript property of the SpeechRecognitionAlternative object 
            console.log("DEBUG_MSG: results:");
            console.log(event.results);
            //let speechResult = event.results[0][0].transcript.toLowerCase();
            let speechResult = event.results[0][0].transcript;
            console.log("DEBUG_MSG: received text = " + speechResult);
            console.log("DEBUG_MsSG: expected text = " + expectedText);
            console.log("balfklsdfgklds");
            let cleanText = cleanTextUtils.strip.punctuation(expectedText);
            
            console.log("DEBUG_MSG: cleaned text = "+ cleanText);


            if (expectedText.toLowerCase() === speechResult.toLowerCase()) {
                setDiagnostic("Great! I heard the correct phrase")
            } else {
                setDiagnostic("sorry I didn't understand, keep practicing");
            }

            console.log('Confidence: ' + event.results[0][0].confidence);
            setText(speechResult);
        }

        recognition.onspeechend = function() {
            console.log("DEBUG_MSG: stopping recognition");
            recognition.stop();
            toggleListen();
          }
    };

    //listen(expectedText);
    console.log("DEBUG_MESAGE listening = ", listening);
        
    return (
        <section>
            <IconButton
                onClick ={()=>listen(expectedText)}
                color={listening?'secondary':'primary'}
                size='medium'
            >
                <MicIcon fontSize='large'/>
            </IconButton>
            <p>Text received:</p>
            <p>{listenedText}</p>
            <p>{diagnostic}</p>
        </section>
    );
}

export default Speech;