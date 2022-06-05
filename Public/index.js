const pokemonSearchInput = document.querySelector(".search-txt");

document.querySelector(".search-btn").onclick = function () {
  const pokemon = pokemonSearchInput.value;
  axios
    .post(`http://localhost:4000/get-pokemon/`, { pokemon })
    .then(function (response) {
      const data = response.data;
      if (data === false) {
        alert("You can only have 6 pokemon in your party!!");
        return;
      }
      console.log(response.data);
      const partyWrapper = document.querySelector(".party");
      partyWrapper.innerHTML = "";

      console.log(response.data.sprites);
      data.forEach((element) => {
        const pokemonWrapper = document.createElement("div");
        pokemonWrapper.classList.add("card");
        pokemonWrapper.id = element.name;
        pokemonWrapper.style.display = "flex";
        pokemonWrapper.style.flexDirection = "column";
        pokemonWrapper.style.alignItems = "center";
        const pokemonImage = document.createElement("img");
        const pokemonName = document.createElement("p");
        const pokemonType = document.createElement("p");
        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", () => {
          axios.delete(`http://localhost:4000/pokemon/${element.name}`);
          pokemonWrapper.remove();
        });
        pokemonImage.src = element.sprites;
        deleteBtn.innerText = "X";
        pokemonImage.height = "150";
        pokemonImage.width = "125";
        pokemonName.textContent = element.name;
        pokemonType.textContent = element.types;
        pokemonWrapper.appendChild(pokemonImage);
        partyWrapper.appendChild(pokemonWrapper);
        pokemonWrapper.appendChild(pokemonName);
        pokemonWrapper.appendChild(pokemonType);
        pokemonWrapper.appendChild(deleteBtn);
        console.log(partyWrapper);
      });
    });
};
