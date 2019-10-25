import React, {useState} from 'react';
import Speech from './Speech';

function WikiEntry(props) {
    const [data, setData] = useState("hello wiki");

    const setUrl = (url, params)=> {
        let urlOrm = url + "?origin=*";
        Object.keys(params).forEach(function (key) { urlOrm += "&" + key + "=" + params[key]; });
        return urlOrm; 
    };

    const clicRandomFind = () => {
        
        const  wikiUrl = "https://en.wikipedia.org/w/api.php";

        const params = {
            action: "query",
            format: "json",
            list: "random",
            rnlimit: "1",
            rnnamespace: "0"
        };

        let url = setUrl(wikiUrl, params);
        console.log("DEBUG_MSG: searching...")
        fetch(url)
            .then(response => response.json())
            .then(dataJson => {
                console.log(dataJson.query.random[0]);
                //setData(dataJson.query.random[0].title);
                return dataJson.query.random[0].id;
            })
            .then(id => {
                const params = {
                    action: "parse",
                    pageid: id,
                    format: "json",
                    prop: "wikitext|text",
                    section: 0
                };
                return fetch(setUrl(wikiUrl, params));
            })
            .then(response => response.json())
            .then(dataJson => {
                setData(dataJson.parse.text["*"]);
            })
            .catch(error => console.error("DEBUG_MSG: " + error));
    };

    return (
        <section className="randomSearchForm-container">
            <section>
                <img src="https://image.ibb.co/e6vOFQ/wikipedia.png" alt="Wikipedia Logo"></img>
                <button onClick={clicRandomFind}>Get Random wiki </button>
            </section>
            <section dangerouslySetInnerHTML={{__html:data}}>
                
                    {/*data*/}
            </section>
            <section>
                <Speech phrase={data}></Speech>
            </section>
        </section>

    );
}

export default WikiEntry;