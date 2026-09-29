const TOKEN = process.env.TMDB_API_TOKEN || "YOUR_TMDB_BEARER_TOKEN";
const BASE_URL = "https://api.themoviedb.org/3";


export default async function fetchData(endpoint){
    try{
        const data = await fetch(`${BASE_URL}/${endpoint}`,{
            method:"GET",
            headers:{
                accept:"application/json",
                Authorization: `Bearer ${TOKEN}`
            }
        });

        if(!data.ok){
            throw new Error("Failed to fetch");
        }
        const res = await data.json();
        
        return res;
    }catch(err){
        console.log(err);
        throw err;
    }
}