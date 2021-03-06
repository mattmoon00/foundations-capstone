const axios = require("axios");

let party = [];

module.exports = {
  getPokemon: async (req, res) => {
    const { pokemon } = req.body;
    if (party.length === 6) {
      res.status(200).send(false);
      return;
    }
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
      );
      const types = data.types.map((pokemon) => pokemon.type.name);
      console.log(types);
      if (party.length <= 5) {
        party.push({
          name: data.name,
          sprites: data.sprites.front_default,
          types,
        });
      }
      res.status(200).send(party);
    } catch (err) {
      console.log(err);
      res.status(500).send("something went wrong");
    }
  },
  deletePokemon(req, res) {
    const name = req.params.name;
    const pkmIndex = party.findIndex((pokemon) => name === pokemon.name);
    party.splice(pkmIndex, 1);
    res.status(200).send(party);
  },
};
