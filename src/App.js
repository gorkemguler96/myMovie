import './App.css';
import {useEffect, useState} from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import axios from "axios";


function App() {

  const  [movies,setMovies] = useState([])
  const [filteredMovies,setFilteredMovies] = useState([])
  const [searchInput,setSearchInput] = useState("")


  useEffect(async ()=>{
    const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=9bc6be60644acd7e47721c3e9e7c1d06&language=en-US&page=1");
    setMovies(response.data.results)
    setFilteredMovies(response.data.results)
    console.log(response)
  },[])


  const filterMovies = () => {
    return  movies.filter((item)=> item.name.toLowerCase().trim().includes(searchInput.toLowerCase().trim()))
  }

  useEffect(()=> {
    if (searchInput.length < 1) {
      setFilteredMovies(movies)
    }else{
      setFilteredMovies(filterMovies())
    }
  },[searchInput])



const deleteMovie = async (movie) =>{
    axios.delete(`http://localhost:3002/movies/${movie.id}`)

    const newMovies = movies.filter(item=>item.id !== movie.id)
    const newFilteredMovies =filteredMovies.filter(item=>item.id !== movie.id)
  setMovies(newMovies)
  setFilteredMovies(newFilteredMovies)
}

  return (
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SearchBar setInput={setSearchInput} movies={movies} deleteMovie={deleteMovie} />
            </div>
          </div>
          <MovieList deleteMovie={deleteMovie} movies={filteredMovies}/>
        </div>
  );
}

export default App;
