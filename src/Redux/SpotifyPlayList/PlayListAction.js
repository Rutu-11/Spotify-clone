import React from 'react'

function PlayListAction(singer) {
    return(dispatch)=>{
        const options = {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "f0d9fa046cmsh6df55b1f1af7fe2p15efc9jsn9790aeeb6432",
              "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            },
          };
        fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${singer}`, options)
            .then((response) =>{
                return (response.json())
            })
            .then((response) => {
              // console.log("ress", response.data)
              return dispatch(getSongData(response.data));
              
            })
            .catch((e)=>{
              console.log(e.message);
            })
        }
}
 const getSongData=(payload)=>{
        return{
            type:"GET_SONGE_DATA",
            payload:payload
        }
    }
    
export default PlayListAction
