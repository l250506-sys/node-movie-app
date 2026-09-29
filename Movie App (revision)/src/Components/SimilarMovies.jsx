import React from "react";
import { useOutletContext, Link} from "react-router-dom";

export default function SimilarMovies(){
    const url = "http://localhost:5000/";
    const [similar,setSimilar] = React.useState(null);
    const [loading,setLoading] = React.useState(true);
    const [error,setError] = React.useState(null);

    const {movieData} = useOutletContext();
    const id = movieData.id;

    React.useEffect(()=>{
        async function fetchSimilar(){
            try{
                const data = await fetch(`${url}movie/${id}/similar-movies`);
                if(!data.ok){
                    throw new Error("Failed to fetch");
                }
                const res = await data.json();

                console.log(res);
                setSimilar(res);
                setLoading(false);
            }
            catch(err){
                setError(err.message);
            }
        }
        fetchSimilar();
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

    return (
        <div className="cast-section">
            {
                similar.results.map(result =>
                    <div className="cast-container similar-container">
                        <Link to={`../../${result.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                                alt={result.title}
                                
                            />
                        </Link>
                        <div className="name-character">
                            <h3><Link className="similar-name">{result.title}</Link></h3>
                        </div>
                    </div>
                )
            }
        </div>
    )
}