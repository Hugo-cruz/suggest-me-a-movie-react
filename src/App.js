import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

async function findMovieInfo(name) {
  const name_without_spaces = parseSpaces(name)
  console.log(`http://www.omdbapi.com/?apikey=a2c9d949&t=${name_without_spaces}`)
  let response = await fetch(`https://www.omdbapi.com/?apikey=a2c9d949&t=${name_without_spaces}`);
  return await response;
}

async function getMovies(movie_name) {

  let retorno;

  retorno = findMovieInfo(movie_name)
    .then(response => response.json())
    .then(data => {
      if (data.Title) {
        console.log('deu bom')
        console.log(data.Actors);
        return data;
      } else {
        console.log("deu ruim");
        console.log(data.Error);
        return data.Error;
      }
    })
    .catch(err => {
      return err;
    })
  console.log("valor de retorno: " + retorno)
  return retorno;

}


function parseSpaces(name) {
  return name.replace(/\s/g, '+')
}


const MovieInfoComponent = (key, actors) => {

  if(key == "Poster")
  {
    return (
      <tr>
        <th scope="row">{key}</th>
        <td><img src={actors[key]} alt="Girl in a jacket" width="500" height="600"/></td>
      </tr>
    );
  }
  if (typeof (actors[key]) != "object") {
    return (
      <tr>
        <th scope="row">{key}</th>
        <td>{actors[key]}</td>
      </tr>
    );
  }

}


function App() {

  const [stringFilme, setStringFilme] = useState('')
  const [nomeFilme, setNomeFilme] = useState('')
  const [actors, setActors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("funcao");
    setNomeFilme(stringFilme);
    console.log(nomeFilme);
    console.log(".......")
    getMovies(stringFilme)
      .then(movie => setActors(movie))
      .then(console.log("filmes: " + actors))

  }


  return (
    <div class="container">
      <div>
        <form name='form-group' id='form_movies' onSubmit={handleSubmit}>
          <h1 class="h3 mb-3 font-weight-normal">Digite o nome do filme</h1>
          <label for="film_name" class="sr-only">Nome do filme</label>
          <input type="text" id="film_name" class="form-control" placeholder="Nome do Filme"
            onChange={(e) => setStringFilme(e.target.value)} required autofocus />
          <button class="btn btn-lg btn-primary btn-block" type="submit">Pesquisar</button>
        </form>
      </div>


      <div class='row justify-content-center'>
        <table class="table">
          
          <tbody>
            {Object.keys(actors).map((key) => { return MovieInfoComponent(key, actors) })}
          </tbody>
        </table>
        

      </div>
    </div>
  );
}

export default App;
