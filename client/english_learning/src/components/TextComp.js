import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Textfield from '@material-ui/core/TextField';
import Speech from './Speech';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
}));


function TextComp(params) {
    const classes = useStyles();
    const [phrase, setPhrase] = useState("Type something or press RANDOM SEARCH button");

    useEffect(()=>{ console.log("updating component");
       });

    function setRandomQuote(){

        const url = "https://gist.githubusercontent.com/joas77/6a20ba5280de9f4a63022a4651f17746/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

        fetch(url, {mode: "cors"})
            .then((response)=>response.json())
            .then((jsonQuotes)=>{
                const quotes = jsonQuotes.quotes;
                const randomIndex = Math.floor(Math.random()*quotes.length+1);
                const quote = quotes[randomIndex].quote;
                setPhrase(quote);
            });

    }

    return (
        <>
        <TextField  
            onChange={(event)=>setPhrase(event.target.value)}
            multiline
            fullWidth
            className={classes.textField}
            variant='outlined'
            value={phrase}/>
        <Button variant="contained" color="primary" onClick={setRandomQuote}>Random Search</Button>
        <Speech expectedText={phrase}/>
        </>
    );
}

export default TextComp;