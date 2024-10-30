import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

function PokemonDetail() {

  const { name } = useParams();
  const [pokemon, setPokemon] = useState({});

  function fetchPokemonDetail() {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(response => setPokemon(response.data))
      .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchPokemonDetail();
  }, []);


  const imageUrl = pokemon.sprites.other["official-artwork"].front_default;

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >

      <img src={imageUrl} alt={name} />

      
    </div>
  );
}

export default PokemonDetail;
