import Section from "./Section";

export default function Main(){

    const baseUrl = "http://localhost:5000/";
    return(
        <main>
            <Section 
                title={"Trending Movies"}
                baseUrl={`${baseUrl}trending`}
            />
            <Section 
                title={"Popular Movies"}
                baseUrl={`${baseUrl}popular`}
            />
            <Section 
                title={"Top Rated"}
                baseUrl={`${baseUrl}top_rated`}
            />
            <Section 
                title={"In Theaters"}
                baseUrl={`${baseUrl}now_playing`}
            />
        </main>
    )
}