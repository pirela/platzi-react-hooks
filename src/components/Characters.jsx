import React, { useState, useEffect, useReducer, useMemo } from "react";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    default:
      return state;
  }
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character/")
      .then((response) => response.json())
      .then((data) => {
        console.info("0data", data);
        setCharacters(data.results);
      });
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite });
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) => {
        return character.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );
  /*
  const filteredCharacters = characters.filter((character) => {
    return character.name.toLowerCase().includes(search.toLowerCase());
  });
  */

  return (
    <div className="characters">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <div className="search">
        <input type="text" value={search} onChange={handleSearch} />
      </div>

      {filteredCharacters.map((character) => (
        <div className="item" key={character.id}>
          <h2>{character.name}</h2>
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a favorito
          </button>
        </div>
      ))}
    </div>
  );
};
export default Characters;
