import http from "http";
import fetchData from "./Utils/FetchData.js";
import sendData from "./Utils/sendData.js";

const PORT = 5000;


const server = http.createServer(async(req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");


  if (req.url === "/trending" && req.method === "GET") {
    const data = await fetchData("trending/movie/day");
    sendData(res,200,"application/json",data);
    return;
  }

  if(req.url === "/popular" && req.method === "GET"){
    const data = await fetchData("movie/popular");
    sendData(res,200,"application/json",data);
    return;
  }

  if(req.url =="/top_rated" && req.method == "GET"){
    const data =await fetchData("movie/top_rated");
    sendData(res,200,"application/json",data);
    return;
  }

  if(req.url === "/now_playing" && req.method === "GET"){
    const data = await fetchData("movie/now_playing");
    sendData(res,200,"application/json",data);
    return;
  }

  if(req.url.startsWith("/movie/") && req.method === "GET"){
    const movieId = req.url.split("/")[2];
    if(req.url.includes("cast")){
      const data = await fetchData(`movie/${movieId}/credits`);
      sendData(res,200,"application/json",data);
      return;
    }
    if(req.url.includes("similar-movies")){
      const data = await fetchData(`movie/${movieId}/similar`);
      sendData(res,200,"application/json",data);
      return;
    }
    const data = await fetchData(`movie/${movieId}`);
    sendData(res,200,"application/json",data);
    return;
  }

  if(req.url.startsWith("/search")){
    const fullUrl = `http://localhost:5000${req.url}`;
    const urlObj = new URL(fullUrl);

    const movieName = urlObj.pathname.split("/")[2];

    const params = urlObj.searchParams;
    const rating = params.get("rating");
    const genre = params.get("genre");
    const startYear = params.get("start-year");
    const endYear = params.get("end-year");
    const sort = params.get("sort")

    const endpoint = `search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`;
    const data = await fetchData(endpoint);

    let results = data.results;

    if(rating){
      results = results.filter(movie => movie.vote_average >= Number(rating));
    }

    if(genre){
      results = results.filter(movie => movie.genre_ids.includes(Number(genre)));
    }

    if(startYear){
      results = results.filter(movie => {
        return movie.release_date && movie.release_date.slice(0,4) >= startYear;
      })
    }

    if(endYear){
      results = results.filter(movie =>{
        return movie.release_date && movie.release_date.slice(0,4)<= endYear;
      })
    }

    if(sort === "Popularity"){
      results.sort((a,b) => b.popularity - a.popularity);
    }else if(sort === "Rating"){
      results.sort((a,b) => b.vote_average - a.vote_average);
    }else if(sort === "Newest"){
      results.sort((a,b) => new Date(b.release_date) - new Date(a.release_date));
    }

    sendData(res,200,"application/json",results);
    return
  }

});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});