
const allPokemons = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20';
const allTypes = 'https://pokeapi.co/api/v2/type/';
const allLocation = 'https://pokeapi.co/api/v2/location/?offset=0&limit=780';
// const onePokemon = "https://pokeapi.co/api/v2/pokemon/1/";

const cardContain = document.querySelector('.cards'),
  cardTags = document.querySelector('.card-tags'),
  container = document.querySelector('.container.main-container');

const totalPokemon = 780;
const postsPerPage = 20;

const firstURL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${postsPerPage}`;

const lastURL = `https://pokeapi.co/api/v2/pokemon?offset=${totalPokemon - postsPerPage}&limit=${postsPerPage}`;

let state = {

  currentPage: 1,
  currentBtn: '',
};



const Pagination = (currentPage) => {

  const pageNumbers = [];

  const pages = 3;
        
  const maxLeft = currentPage - pages >= 1 ? currentPage - pages : 1;
  const maxRight = (+currentPage + pages) <= Math.ceil(totalPokemon / postsPerPage) ? +currentPage + pages : Math.ceil(totalPokemon / postsPerPage);


  for (let i = maxLeft; i <=maxRight; i++){
    pageNumbers.push(i)
  }


  const paginationBlock = document.querySelector('.pagination-block');
  paginationBlock.innerHTML = '';

  pageNumbers.map(number => {
    paginationBlock.insertAdjacentHTML('beforeend', `
      <button class="btn"> ${number}</button>
    `)
  });

  if (state.currentPage != 1) {
    paginationBlock.insertAdjacentHTML('afterbegin', `<button class="btn-first">First</button>`)
  }

  if (state.currentPage != Math.ceil(totalPokemon / postsPerPage)) {
    paginationBlock.insertAdjacentHTML('beforeend', `<button class="btn-last">Last</button>`)
  }

  container.insertAdjacentElement('afterbegin', paginationBlock);

  btn = document.querySelectorAll('.btn');
  const btnLast = document.querySelector('.btn-last');
  // const btnFirst = document.querySelector('.btn-first');
  btn.forEach(item => (+item.textContent === +currentPage) ? item.style.backgroundColor = '#bebebe': null);


  btn.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const pageURL = `https://pokeapi.co/api/v2/pokemon?offset=${+e.target.textContent*postsPerPage - postsPerPage}&limit=${postsPerPage}`;
      state.currentPage = (e.target.textContent)
      getData.getAllPokemons(pageURL, getPokemonCard);
    })
  });

  const btnFirst = document.querySelector('.btn-first');


  if (btnLast) {
    btnLast.addEventListener('click', (e) => {
      e.preventDefault();
      state.currentPage = Math.ceil(totalPokemon / postsPerPage)
      getData.getAllPokemons(lastURL, getPokemonCard);
    })
  };
  

  if (btnFirst){
    btnFirst.addEventListener('click', (e) => {
      e.preventDefault();
      getData.getAllPokemons(firstURL, getPokemonCard);
      state.currentPage = 1;
    })
  }

}

const createCards = (data) => {


  const { weight, height, id, name, types } = data;

  const pokemonCard = document.createElement('a');
  pokemonCard.className = 'card';
  pokemonCard.href = "#${name}"
  pokemonCard.id = id;

  // pokemonCard.href = 'card.html';

  pokemonCard.insertAdjacentHTML('beforeend', `
        <img src="https://pokeres.bastionbot.org/images/pokemon/${id}.png " alt="" class="card-img">
          <div class="card-nfo">
            <h3 class="card-id">№${id<10 ? "00"+id : id>=10 && id<100 ? "0"+id : id}</h3>
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


const createCard = (data) => {
  // console.log(data);
  const pageBlock = document.querySelector('.pagination-block');

  pageBlock.innerHTML = '';

  const { height, id ,name, stats, types, weight, abilities, location_area_encounters: location } = data;

  window.scrollTo(0,0)

  let locationURL = location;

  const abilityURL = abilities[0].ability.url;

  cardContain.textContent = '';
  
  const pokemon = `
        <div class="main-wrapper">
          <h1 class="pokemon-name">${name.toUpperCase()}
            <span class="pokemon-id">№${id<10 ? "00"+id : id>=10 && id<100 ? "0"+id : id}</span>
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

  const filterByLocation = (target) => {
    
    // Pagination(state.currentPage);
    getData.getAllPokemons(allLocation, ({ results }) => {
      const locationName = results.find(({ name }) => name === target ? name : null);
      const locationId = locationName.url.split('/location/')[1].slice('/')[0];
      const locationURL = `https://pokeapi.co/api/v2/location-area/${locationId}`;
  
      getData.getAllPokemons(locationURL, ({ pokemon_encounters: pokemon }) => {
  
        pokemon.forEach(({ pokemon }) => {
          cardContain.textContent = '';
          getData.getAllPokemons(pokemon.url, createCards)
        })
      })
    })
  }

  const getLocation = (data) => {

    const locationName = document.querySelector('.card-page-location');

    if (!data.length) {
      const locationTag = document.createElement('div');
      locationTag.className = 'card-tag card-tag-location';
      locationTag.textContent = 'Этого покемона нельзя поймать';
      locationName.insertAdjacentElement('beforeend', locationTag);  
    } else {
      data.forEach(({ location_area }) => {

        const name = location_area.name.split('-area')[0];

        const locationTag = document.createElement('div');
        locationTag.className = 'card-tag card-tag-location';
        
        locationTag.textContent = name;
  
        locationTag.location = name;
  
        locationName.insertAdjacentElement('beforeend', locationTag); 
      })
    } 
    const locationTag = document.querySelectorAll('.card-tag-location');

    locationTag.forEach(tag => {
      tag.addEventListener('click', (e) => {
        e.preventDefault();
        filterByLocation(e.target.textContent);
      })
    })
    
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
     
    const infoAbilityDescr = document.querySelector('.info-ability-descr');

    if (document.documentElement.clientWidth <= 770 && document.documentElement.clientWidth > 320){
       sliced = englishElem.effect.slice(0,339);

      if (sliced.length < englishElem.effect.length) {
        sliced += '...';
      }

      infoAbilityDescr.textContent = sliced;

    } else if (document.documentElement.clientWidth <= 320) {
        sliced = englishElem.effect.slice(0,200);

        if (sliced.length < englishElem.effect.length) {
        sliced += '...';
        }
        infoAbilityDescr.textContent = sliced;
    } else if (document.documentElement.clientWidth > 320){

      sliced = englishElem.effect.slice(0,380);

        if (sliced.length < englishElem.effect.length) {
        sliced += '...';
        }
      infoAbilityDescr.textContent = sliced;
    }  
  }; 

  const filterByType = (target) => {

    getData.getAllPokemons(allTypes, ({results}) => {
      const typeName = results.find((item) => {
        if (item.name === target) {return item};
      })
      getData.getAllPokemons(typeName.url, ({ pokemon }) => {
        pokemon.forEach(({ pokemon }) => {
          cardContain.textContent = '';
          getData.getAllPokemons(pokemon.url, createCards)
        })
      })
    })
  }

  getData.getAllPokemons(abilityURL, getAbility);
  getData.getAllPokemons(locationURL, getLocation);  

  
  const infOpen = document.querySelector('.pokemon-info-close-toggle'),
    pokemonInfoClose = document.querySelector('.pokemon-info-close'),
    pokemonInfo = document.querySelector('.pokemon-info'),
    infoCloseBtn = document.querySelector('.info-close-btn');
    //tagsLocation = document.querySelectorAll('.card-tags.card-page-location');

  infOpen.addEventListener('click', () => {
    pokemonInfoClose.classList.add('active');
    pokemonInfo.classList.add('active');
  });

  infoCloseBtn.addEventListener('click', ()=> {
    pokemonInfoClose.classList.remove('active');
    pokemonInfo.classList.remove('active');
  })

  cardTags.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.closest('.card-tag').textContent;

    filterByType(target);

    // if (e.target.closest('.card-tag')) {
    //   const target = e.target.closest('.card-tag').textContent;

    //   getData.getAllPokemons(allTypes, filterByType)
    // } else return;
  
  })
}


const getPokemonCard = (allPokemons) => {

  cardContain.textContent = '';

  Pagination(state.currentPage);

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



const init = () => {


  getData.getAllPokemons(allPokemons, getPokemonCard);

  cardContain.addEventListener('click', (e) => {
    e.preventDefault();
  
    if (e.target.closest('.card')) {
      const target = e.target.closest('.card').id;
  
      getData.getAllPokemons(`https://pokeapi.co/api/v2/pokemon/${target}`, createCard)
  
    } 
  });

}

document.addEventListener('DOMContentLoaded', init);


