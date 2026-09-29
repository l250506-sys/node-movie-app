import { FiSearch } from "react-icons/fi";
import { useNavigate,useSearchParams,Link } from "react-router-dom";
import React from "react";

export default function SearchPage(){
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const name = searchParams.get("movie");
    const [results,setResults] = React.useState(null);
    const [advanced,setAdvanced] = React.useState(false);
    const [url,setUrl] = React.useState(`http://localhost:5000/search/${name}`);

    function makeUrl(formData){
        setAdvanced((adv) => !adv);
        const startDate = formData.get("from-year");
        const endDate = formData.get("end-year");

        const rating = formData.get("rating");

        const genre = formData.get("genre");

        const sorting = formData.get("sort");

        const newParams = new URLSearchParams(searchParams);

        if(startDate){
            newParams.delete("start-year");
            newParams.set("start-year",startDate);
        }

        if(endDate){
            newParams.delete("end-year");
            newParams.set("end-year",endDate);
        }

        if(rating){
            newParams.delete("rating");
            newParams.set("rating",rating)
        }

        if(genre){
            newParams.delete("genre");
            newParams.set("genre",genre);
        }

        if(sorting){
            newParams.delete("sort");
            newParams.set("sort",sorting);
        }

        navigate(`?${newParams.toString()}`);
        setUrl(`http://localhost:5000/search/${name}?${newParams.toString()}`);
    }

    function submit(formData){
        const movieName = formData.get("box");
        navigate(`?movie=${encodeURIComponent(movieName)}`);
    }

    React.useEffect(()=>{
        if(!name){
            return
        }

        fetch(url)
            .then(res => res.json())
            .then(data => setResults(data))

    },[url])

    React.useEffect(()=>{
        if(name){
            setUrl(`http://localhost:5000/search/${name}`);
        }
    },[name])

    function advancedClicked(){
        setAdvanced(advanced => !advanced)
    }

    return (
        <main className={`search-main ${results?"searched":""}`}>
            <form action={submit} className="search-form">
                <fieldset>
                    <label htmlFor="search-input">Search Movies</label>
                    <div className="searches">
                        <div className="input-button">
                            <input type="text" required placeholder="For example, Avengers" name="box"/>
                            <button> <FiSearch size={20} className="icon"/></button>
                        </div>
                        <button className={`advanced-search ${results? "show":"hide"}`} onClick ={advancedClicked} type="button">Advanced Search</button>
                    </div>
                </fieldset>
            </form>
            {
                 advanced?
                 <form className="advanced-box" action={makeUrl}>
                    <fieldset className="advanced-field">
                        <legend>Release Date</legend>
                        <div>
                            <label htmlFor="start-year">Start year<input type="number" name="from-year" id="start-year" min="1900" /></label>
                            <label htmlFor="end-year">End year <input type="number" name="end-year" id="end-year" max="2026" /></label>
                        </div>
                    </fieldset>
                    <fieldset className="advanced-field">
                        <legend>Rating</legend>
                        <select name="rating" id="">
                            <option value="" >0+</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                            <option value="5">5+</option>
                            <option value="6">6+</option>
                            <option value="7">7+</option>
                            <option value="8">8+</option>
                            <option value="9">9+</option>
                        </select>
                    </fieldset>
                    <fieldset className="advanced-field">
                        <legend>Genre</legend>
                        <select name="genre">
                            <option value="">Any Genre</option>
                            <option value="28">Action</option>
                            <option value="35">Comedy</option>
                            <option value="18">Drama</option>
                            <option value="27">Horror</option>
                            <option value="878">Sci-Fi</option>
                            <option value="10749">Romance</option>
                        </select>
                    </fieldset>
                    <fieldset className="advanced-field">
                        <legend>Sort By</legend>
                        <select name="sort" id="">
                            <option value="" >Sort</option>
                            <option value="Popularity">Sort By Popularity</option>
                            <option value="Newest">Sort By Release Date</option>
                            <option value="Rating">Sort By Rating</option>
                        </select>
                    </fieldset>
                    <button>Submit</button>
                </form>:null
            }
            {
                results?
                <>
                <div className="movie-results">
                    {results.map( result =>
                        <Link to={`../${result.id}`} className="no-change" key={result.id}>
                            <div className="single-movie">
                                <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={result.original_title} />
                                <h2>{result.title}</h2>
                            </div>
                        </Link>
                    )}
                </div>
                
                </>
                
                : <></>
            }
        </main>
    )
}