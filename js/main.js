
const allPokemons = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=50';
// const onePokemon = "https://pokeapi.co/api/v2/pokemon/1/";

const cardContain = document.querySelector('.cards');


// const getData = (url, callback, reject = console.error) => {
//   const request = new XMLHttpRequest();

//   request.open('GET', url);

//   request.addEventListener('readystatechange', () => {
//     if (request.readyState !== 4) return;

//     if (request.status === 200) {
//       callback(JSON.parse(request.response));
//     } else {
//       reject(request.state);
//     }
//   });

//   request.send();
// };

const state = {
  
  'page': 1,
  'cards': 5,

} 

// const pagination()

const createCards = (data) => {


  const { weight, height, id, name, types } = data;

  const pokemonCard = document.createElement('a');
  pokemonCard.className = 'card';
  pokemonCard.href = "#${name}"
  pokemonCard.id = id;
  // pokemonCard.href = 'card.html';

  pokemonCard.insertAdjacentHTML('beforeend', `
        <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="" class="card-img">
          <div class="card-nfo">
            <h3 class="card-id">№0${id<10 ? "0"+id : id}</h3>
            <h1 class="card-title">${name}</h1>
            <div class="card-tags">
            </div>
          </div>
  
  `)

  cardContain.insertAdjacentElement('beforeend', pokemonCard);


  const cardTags = document.querySelectorAll('.card-tags');
  const cardsArray = [...cardTags];
  const lastCardTag = cardsArray[cardsArray.length - 1];

  types.forEach((item) => {

    const tag = `
      <span class="card-tag background-color-${item.type.name}">${item.type.name}</span>
    `;

    lastCardTag.insertAdjacentHTML('afterbegin', tag)
  }); 

}

// function getData(handler){
//   fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
//   .then(response => response.json())
//   .then((allpokemon) => {
//     allpokemon.results.forEach((pokemon, index) => {
//       let url = pokemon.url;
//       fetch(url)
//       .then(response => response.json())
//       .then(function(pokemonInfo){
//         handler(pokemonInfo)
//       })
//     })
//   })
// }

const createCard = (data) => {
  // console.log(data);
  const { height, id ,name, stats, types, weight, abilities, location_area_encounters: location } = data;

  let locationURL = location;

  const abilityURL = abilities[0].ability.url;

  cardContain.textContent = '';
  
  const pokemon = `
        <div class="main-wrapper">
          <h1 class="pokemon-name">${name.toUpperCase()}
            <span class="pokemon-id">№0${id<10 ? "0"+id : id}</span>
          </h1>
          <div class="card-block">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png" alt="" class="card-left-img">
            <div class="card-left">
            <div class="pokemon-info">
              <ul>
                <li class="pokemon-par">Height</li>
                <li class="pokemon-par">${height}.0 m</li>
                <li class="pokemon-par">Weight</li>
                <li class="pokemon-par">${weight}.0 kg</li>
                <li class="pokemon-par">Gender</li>
                <li class="pokemon-par">
                  <span class="pokemon-sex background-color-male">Male</span>
                  <span class="pokemon-sex background-color-female">Female</span>
                </li>
              </ul>
              <ul>
                <li class="pokemon-par">Category</li>
                <li class="pokemon-par">Seed</li>
                <li class="pokemon-par">Abilities</li>
                <li class="pokemon-par overgrow">${abilities[0].ability.name.toUpperCase()}</li>
              </ul>
              <div class="pokemon-info-close-toggle">?</div>
            </div>
            <div class="pokemon-info pokemon-info-close">
              <div class="info-close-btn">X</div>
              <h2 class="info-close">Ability info</h2>
              <h3 class="info-ability-title">${abilities[0].ability.name.toUpperCase()}</h3>
              <p class="info-ability-descr">
                
              </p>
            </div>
            <div class="tags">
              <div class="tags-types">
                <div class="tags-title">Types</div>
                <div class="card-tags card-page">
                </div>
              </div>
              <div class="tags-location">
                <div class="tags-title">Location</div>
                <div class="card-tags card-page-location">
                </div>
              </div>
            </div>          
            </div>
          </div>
          <div class="card-right">
          <div class="card-stats">
            <h3 class="stats-title">Stats</h3>
            <ul class="stats-links">
              <li class="stats-link">
                <ul class="stats-column">
                  <li class="meter" data-value="3"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <span class="state">HP</span>
              </li>
              <li class="stats-link">
                <ul class="stats-column">
                  <li class="meter" data-value="3"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <span class="state">Attack</span>
              </li>
              <li class="stats-link">
                <ul class="stats-column">
                  <li class="meter" data-value="3"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <span class="state">Defense</span>
              </li>
              <li class="stats-link">
                <ul class="stats-column">
                  <li class="meter" data-value="3"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <span class="state">Special</br> Attacks</span>
              </li>
              <li class="stats-link">
                <ul class="stats-column">
                  <li class="meter" data-value="3"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <span class="state">Special</br> Defense</span>
              </li>
              <li class="stats-link">
                <ul class="stats-column">
                  <li class="meter" data-value="3"></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
                <span class="state">Speed</span>
              </li>
            </ul>
          </div>
        </div>
        </div>
  `;
  
  cardContain.insertAdjacentHTML('beforeend', pokemon);

  const cardTags = document.querySelector('.card-tags');

  const meter = document.querySelectorAll('.meter');

  meter.forEach((item, index) => {
    item.style.top = 100 - stats[index].base_stat + '%';

  });

  const getLocation = (data) => {

    const locationName = document.querySelector('.card-page-location');

    if (!data.length) {
      const locationTag = document.createElement('div');
      locationTag.className = 'card-tag card-tag-location';
      locationTag.textContent = 'Этого покемона нельзя поймать';
      locationName.insertAdjacentElement('beforeend', locationTag);  
    } else {
      data.forEach(({ location_area }) => {

        const name = location_area.name;

        const locationTag = document.createElement('div');
        locationTag.className = 'card-tag card-tag-location';
        
        locationTag.textContent = name;
  
        locationTag.location = name;
  
        locationName.insertAdjacentElement('beforeend', locationTag); 
    })
    }  
    
  }

  types.forEach((item) => {

    const tag = `
      <div class="card-tag background-color-${item.type.name} card-page">${item.type.name}</div>
    `;

    cardTags.insertAdjacentHTML('afterbegin', tag)
  }); 

  const getAbility = (data) => {
    const dataEffects = data.effect_entries;

    const englishElem = dataEffects.find((item) => {
      if (item.language.name === 'en') {return item};
    })

    let sliced = englishElem.effect.slice(0,380);

    if (sliced.length < englishElem.effect.length) {
      sliced += '...';
    }

    const infoAbilityDescr = document.querySelector('.info-ability-descr')

    infoAbilityDescr.textContent = sliced;
    
  }; 

  getData.getAllPokemons(abilityURL, getAbility);
  getData.getAllPokemons(locationURL, getLocation);  

  
  const infOpen = document.querySelector('.pokemon-info-close-toggle'),
    pokemonInfoClose = document.querySelector('.pokemon-info-close'),
    pokemonInfo = document.querySelector('.pokemon-info'),
    infoCloseBtn = document.querySelector('.info-close-btn');


  infOpen.addEventListener('click', () => {
    pokemonInfoClose.classList.add('active');
    pokemonInfo.classList.add('active');
  });

  infoCloseBtn.addEventListener('click', ()=> {
    pokemonInfoClose.classList.remove('active');
    pokemonInfo.classList.remove('active');
  })
}


// getData(createCard);

const getPokemonCard = (allPokemons) => {
  allPokemons.results.forEach((pokemon) => {
    let url = pokemon.url;
    fetch(url)
      .then(response => response.json())
      .then(pokemonInfo => createCards(pokemonInfo))
  })
};

const getData = {

  getAllPokemons(url, handler) {  

    fetch(url)
      .then(response => response.json())
      .then(allPokemons => handler(allPokemons))
  },

}

const getCard = (e) => {
  e.preventDefault();
  const target = e.target.closest('.card').id
  
  getData.getAllPokemons(`https://pokeapi.co/api/v2/pokemon/${target}`, createCard)
}

cardContain.addEventListener('click', (e) => {
  getCard(e);
})

// getData.getAllPokemons(allPokemons, console.log)

getData.getAllPokemons(allPokemons, getPokemonCard);


