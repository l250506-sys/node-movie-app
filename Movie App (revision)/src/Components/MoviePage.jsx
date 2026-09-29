import { useParams, Outlet,NavLink} from "react-router-dom"
import React from "react";

export default function MoviePage(){
    const {id} = useParams();
    const [movieData,setMovieData] = React.useState(null);
    const [loading,setLoading] = React.useState(true);
    const [error,setError] = React.useState(null);
    const url = "http://localhost:5000/";

    React.useEffect(()=>{
        
        async function fetchMovie(){
            try{
                const temp = await fetch(`${url}movie/${id}`);
                if(!temp.ok){
                    throw new Error("Failed to fetch data");
                }
                const res = await temp.json();
                console.log(res);
                setMovieData(res);
                setLoading(false);
            }
            catch(err){
                setError(err.message);
            }

        }
        fetchMovie();
    },[id])

    if(loading){
        return(
            <p>Loading....</p>
        )
    }

    if(error){
        return(
            <p>{error}</p>
        )
    }

    return(
        <main className="movie-page">
            <h2>{movieData.title}</h2>
            <div className="movie-card">
                <img 
                    src={`https://image.tmdb.org/t/p/w400${movieData.poster_path}`} 
                    alt={movieData.title} 
                    />
                <div className="movie-options">
                    <ul className="option-headings">
                        <li><NavLink to="" className={({isActive}) => isActive? "option-active":"" } end>Overview</NavLink></li>
                        <li><NavLink to="cast" className={({isActive}) => isActive? "option-active":""}>Cast</NavLink></li>
                        <li><NavLink to="similar-movies" className={({isActive}) => isActive? "option-active":""}>Similar Movies</NavLink></li>
                    </ul>
                    <div className="movie-info">
                        <Outlet context={{movieData}}/>
                    </div>
                </div>
            </div>
        </main>
    )
}