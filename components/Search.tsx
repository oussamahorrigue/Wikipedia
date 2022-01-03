import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Item,Header,Button,Input} from '../styles/styles'

const Search =()=>{

    const [term , setTerm] = useState('program')
    const [results , setresult]= useState([])

    useEffect(()=>{
        const response = async ()=>{
            const donnees= await axios.get("https://en.wikipedia.org/w/api.php",
            {
                params:{
                    action:'query',
                    list:'search',
                    origin:'*',
                    format:'json',
                    srsearch:term
                }
            }
            )
            setresult(donnees.data.query.search)
            console.log(results)
        }

    if ((term) && !(results.length)){

        response();;
    }  
    else{

        const TimeroutId=setTimeout(()=>{
            if (term){
                response();
            }
        },500)
        return ()=>{
            clearTimeout(TimeroutId)
        }

    }  
    },[term])
    const renderedItems= results.map((result)=>{
        return (
            <Item key={result.pageid} >
                <div >
                    <Button href={`https://en.wikipedia.org?curid=${result.pageid}`}>Go</Button>

                </div>
                <div >
                    <Header>
                        {result.title}
                    </Header>

                    <span dangerouslySetInnerHTML= {{__html:result.snippet}}></span>
                </div>
            </Item>
        );
    })
    return (
    <div >
        <div >
            <label>Enter Search Term</label>
            <Input  onChange = {e=>setTerm(e.target.value)}/>
            
        </div>
        <div>{renderedItems}</div>
    </div>
    );
}

export default Search;

