import Layout from "./Components/Layout"
import Main from "./Components/MainSection"
import { Route,Routes } from "react-router-dom"
import MoviePage from "./Components/MoviePage"
import Overview from "./Components/Overview"
import Cast from "./Components/Cast"
import SimilarMovies from "./Components/SimilarMovies"
import SearchPage from "./Components/SearchPage"
import ContactPage from "./Components/ContactPage"
import NotFound from "./Components/NotFound"
import React from "react"


export default function App(){
  return (
    <Routes>
      <Route element ={<Layout/>}>
          <Route path="/" element={<Main/>}/>
          <Route path="/:id" element ={<MoviePage/>}>
            <Route index element={<Overview/>}/>
            <Route path="cast" element={<Cast/>}/>
            <Route path="similar-movies" element={<SimilarMovies/>}/>
          </Route>
          <Route path="search" element={<SearchPage/>}>
            <Route></Route>
          </Route>
          <Route path="contact" element={<ContactPage/>}/>
          <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  )
}