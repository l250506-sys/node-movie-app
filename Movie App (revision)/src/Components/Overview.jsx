import { useOutletContext } from "react-router-dom"

export default function Overview(){
    const {movieData} = useOutletContext();

    return(
        <div className="overview">
            <p>
                <span className="bold-info">Title: </span>{movieData.title}
            </p>
            <p>
                <span className="bold-info">Description: </span>{movieData.overview}
            </p>
            <p>
                <span className="bold-info">Release date: </span>{movieData.release_date}
            </p>
            <p>
                <span className="bold-info">Rating: </span>{movieData.vote_average}
            </p>
            <p>
                <span className="bold-info">Runtime: </span>{movieData.runtime} minutes
            </p>
            
        </div>
    )
}