import React from "react"
import { useOutletContext } from "react-router-dom";

export default function Cast(){
    const [cast,setCast] = React.useState(null);
    const [loading,setLoading] = React.useState(true);
    const [error,setError] = React.useState(null);
    const {movieData} = useOutletContext();
    const url = "http://localhost:5000/";


    React.useEffect(()=>{
        async function fetchCast(){
            try{
                const res = await fetch(`${url}movie/${movieData.id}/cast`);
                if(!res.ok){
                    throw new Error("Failed to fetch")
                }
                const data = await res.json();
                console.log(data.cast);
                setCast(data.cast);
                setLoading(false);
            }
            catch(err){
                setError(err.message);
            }
        }
        fetchCast();
    },[movieData])

    if(loading){
        return(
            <p>Loading...</p>
        )
    }

    if(error){
        return(
            <p>{error}</p>
        )
    }

    return(
        <div className="cast-section">
            {
                cast.map( actor =>
                    <div className="cast-container" key={actor.id}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            
                        />
                        <div className="name-character">
                            <h3>Name: {actor.name}</h3>
                            <h3>Character: {actor.character}</h3>
                        </div>
                    </div>
                )
            }
        </div>
    )
}