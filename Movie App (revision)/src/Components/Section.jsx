import React from "react";
import {Link} from "react-router-dom";


export default function Section({title,baseUrl}){
    const [movieData,setMovieData] = React.useState(null);
    const [loading,setLoading] = React.useState(true);
    const [error,setError] = React.useState(null);



    React.useEffect(()=>{
        async function fetchMovies(){
            try{
                const res = await fetch(`${baseUrl}`);
                if(!res.ok){
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                setMovieData(data.results);
                setLoading(false);
            }catch(err){
                setError(err.message);
            }
        }
        fetchMovies();
    },[baseUrl]);

    if(loading){
        return (
            <>
                <h2>{title}</h2>
                <p>Loading....</p>
            </>
            
        )
    }

    if(error){
        return (
            <p>Error: {error}</p>
        )
    }

    return (
        <section className="movie-section">
            <h2>{title}</h2>
            <div className="movie-box">
                {
                    movieData.map(movie=>
                        <div key ={movie.id} className="movie-box">
                            <div className="movie-info">
                                <Link to={`${movie.id}`}>
                                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                                    alt={movie.title} />
                                </Link>
                                <Link to={`${movie.id}`}>
                                    <h3>{movie.title}</h3>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
        
}