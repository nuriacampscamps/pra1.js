/**
 * =============================================================================
 * PROGRAMACIÓN WEB - PRÁCTICA 1
 * Gestión de Anime con JavaScript
 * =============================================================================
 *
 * Este archivo debe de implementar las 8 etapas de la práctica utilizando:
 *   - Clases con getters y setters
 *   - Métodos de clase y funciones flecha
 *   - Recursividad, reduce, map, filter
 *   - Destructuring y spread operator
 *
 * Convenciones ha seguir:
 *   - Se usa `const` para valores que no cambian y `let` para los que sí.
 *   - Las funciones anónimas se escriben como arrow functions.
 *   - Los nombres siguen camelCase (variables/funciones) y PascalCase (clases).
 *   - Las comparaciones son siempre estrictas (=== / !==).
 *   - Se usan métodos de Array (map, filter, reduce, sort, find, etc.)
 *     en lugar de bucles for/while siempre que sea posible.
 *   - Los comentarios siguen el estilo de las 9 reglas de Ellen Spertus:
 *     explicar el "por qué", no el "qué" evidente en el código.
 *   - Se incorporan las validaciones necesarias para el correcto funcionamiento de las clases y funciones. 
 * =============================================================================
 */

/* =============================================================================
   ETAPA 1 — Clase Anime (5 puntos)
   Representa un único anime con todos sus datos relevantes.
   Incluye getters para leer propiedades y setters con validación básica.
   ============================================================================= */

class Anime {
  constructor({mal_id, title,synopsis, episodes, status, score, type, genres, studios, image_url, popularity}) {
     this.mal_id=mal_id;
     this.title=title;
     this.synopsis=synopsis;
     this.episodes=episodes;
     this.status=status;
     this.score=score;
     this.type=type;
     this.genres=genres;
     this.studios=studios;
     this.image_url=image_url;
     this.popularity=popularity;
     // Usamos propiedades privadas (convención con _) para obligar el acceso
    // a través de getters/setters y poder añadir validaciones centralizadas.
    // ...
  }

  // ── Getters ──────────────────────────────────────────────────────────────
get mal_id(){
   return this._mal_id;
}
get title(){
   return this._title;
}
get synopsis(){
   return this._synopsis;
}
get episodes(){
   return this._episodes;
}
get status(){
   return this._status;
}
get score(){
   return this._score;
}
get type(){
   return this._type;
}
get genres(){
   return this._genres;
}
get studios(){
   return this._studios;
}
get image_url(){
   return this._image_url;
}
get popularity(){
   return this._popularity;
}

  // ── Setters con validación básica ────────────────────────────────────────

set mal_id(value){
   if(!Numer.isInteger(value)||value<=0){
      throw new Error("mal_id ha de ser un nombre enter positiu");
   }this._mal_id=value;
}
set title(value){
   if(typeof value!=="string"||value.trim()===""){
      throw new Error("title ha de ser un text ple");
   }this._title=value.trim();
}
set synopsis(value){
   if(typeof value!=="string"){
      throw new Error("synopsis ha de ser un text");
   }this._synopsis=value.trim();
}
set episodes(value){
   if(!Numer.isInteger(value)||value<0){
      throw new Error("episodes ha de ser un nombre enter, més gran o igual que 0");
   }this._episodes=value;
}
set status(value){
   const validStatuses=["Finished Airing", "Currently Airing", "Not yet aired"];
   if(typeof value!=="string"||!validStatuses.includes(value)){
      throw new Error("status no és vàlid");
   }this._status=value;
}
set score(value){
   if(typeof value!=="number"||value<0||value<0){
      throw new Error("score ha de ser un nombre entre 0 i 10");
   }this._score=value;
}
set type(value){
   const validTypes=["TV", "Movie", "OVA", "Special", "ONA", "Music"];
   if(typeof value!=="string"||!validTypes.includes(value)){
      throw new Error("type no és vàlid");
   }this._type=value;
}
set genres(value){
   const validGenres=Array.isArray(value)&&value.every((genre)=>genre&&typeof genre==="object"&&typeof genre.mal_id==="number"&&typeof genre.type==="string"&&typeof genre.name==="string"&&typeof genre.url==="string);
   if (!validGenres){
      throw new Error("genres ha de ser un array vàlid de genere");
   }this._genres=value;
}
set studios(value){
   const validStudios=Array.isArray(value)&&value.every((studio)=>studio&&typeof studio==="object"&&typeof studio.mal_id==="number"&&typeof studio.type==="string"&&typeof studio.name==="string"&&typeof studio.url==="string);
   if(!validStudios){
      throw new Error("studios ha de ser un array valid d'estudis");
   }this._studios=value;
}
set image_url(value){
   if(typeof value!=="string"||value.trim()===""){
      throw new Error("image_url ha de ser un text ple");
   }this._image_url=value.trim();
}
set popularity(value){
   if (!Number.isInteger(value)||value<=0){
      throw new Error("popularity ha de ser un nombre enter positiu");
   }this._popularity=value;
}

/* =============================================================================
   ETAPA 2 — Clase AnimeList (5 puntos)
   Gestiona una colección de objetos Anime.
   ============================================================================= */
class AnimeList {

  constructor() {
   this._animes=[]; 
     //...
  }
   get animes(){
      return this._animes;
   }

  /**
   * Añade un anime a la lista.
   */
  addAnime(anime) {
    if(!anime instanceof Anime)){
       throw new Error("Només es pot afegir instancies d'Anime");
    }
     const alreadyExists=this._animes.some((currentAnime)=>currentAnime.mal_id===anime.mal_id);
     if(alreadyExists){
        throw new Error(`Ja exiteix un anime amb mal_id ${anime.mal_id}.`);
     }this._animes.push(anime);
  }
 // ...
  

  /**
   * Elimina un anime de la lista por su mal_id.
   */
  removeAnime(animeId) {
   const initialLenght=this._animes-lenght;
     this._animes=this._animes.filter((anime)=>anime.mal_id!==animeId);
     return this._animes.length<initialLenght;
  }
     //...

  /**
   * Muestra por consola la información básica de cada anime de la lista.
   */
 showList() {
    this._animes.forEach((anime) => {
      console.log(
        `Título: ${anime.title} | Tipo: ${anime.type} | Puntuación: ${anime.score} | Imagen: ${anime.image_url}`
      );
    });
  }
  showList() {
     this._animes.forEach((anime)=>{
        console.log(`Título: ${anime.title} | Tipo: ${anime.type} | Puntuación: ${anime.score} | Imagen: ${anime.image_url}`);
     });
  }
    //...
  

  /* ===========================================================================
     ETAPA 3 — Funciones flecha dentro de AnimeList (5 puntos)
     Estas arrow functions forman parte de la clase porque operan directamente
     sobre la lista interna (_animes) y son reutilizables en el contexto de
     la gestión de la colección.
     =========================================================================== */

  /**
   * Agrega múltiples anime a la vez usando el operador rest (...animes).
   */
  addMultipleAnimes = (...animes) => {
    animes.forEach((anime)=>this.addAnime(anime));
//... 
  };

  /**
   * Filtra los anime según un rango de puntuación [minScore, maxScore].
   */
   
  getAnimesByScoreRange = (minScore, maxScore) => {
    if(typeof minScore!=="number"||typeof maxScore!=="number"||minScore>maxScore){
       throw new Error("El rang de puntuació no es vàlid");
    }return this._animes.filter((anime)=>anime.score>=minScore&&anim.score<=maxScore(;
     //...
  };
   
  /**
   * Ordena los anime de la lista por popularidad, del más popular (rank 1)
   * al menos popular (rank más alto).
   */
  sortAnimesByPopularity = () => {
    return[...this._animes]-sort((a,b)=>a.popularity-b.popularity);
     //...
  };
}


/* =============================================================================
   ETAPA 4 — Función recursiva: findAnimeById (5 puntos)
   Busca un anime dentro de una AnimeList por su mal_id.
   ============================================================================= */

/**
 * Busca recursivamente un anime en una AnimeList por su mal_id.
 */
const findAnimeById = (animeList, mal_id, index = 0) => {
   if(!(animeList instanceof AnimeList)){
      throw new Error("animeList ha de ser una instància de AnimeList");
   }if(index>=animeList.animes.length){
      return null;
   }if(animeList.animes[index].mal_id===mal_id){
      return animeList.animes[index];
   }return findAnimeById(animeList, mal_id, index+1);
  //...
};


/* =============================================================================
   ETAPA 5 — Uso de reduce: getMostCommonGenre (5 puntos)
   Determina el género más repetido en toda la lista de anime.
   ============================================================================= */

/**
 * Analiza todos los géneros de todos los anime de la lista y devuelve
 * el nombre del género más frecuente.
 */
const getMostCommonGenre = (animeList) => {
  if(!animeList instanceof AnimeList)){
     throw new Error("animeList ha de ser una instància de AnimeList");
  }
   cost genreCount=animeList.animes.reduce((acc,anime)=>{
      anime.genres.forEach((genre)=>{
         acc[genre.name]=(acc[genre.name]||0)+1;
      });
      return acc;
   },{});
   const genreEntries=Object.entries(genreCount);
   if(genreEntries.lenght===0){
      return null;
   }
   const mostCommon=genreEntries.reduce(maxGenre, currentGenre)=>currentGenre[1]>maxGenre[1]?currentGenre:maxGenre);
   return mostCommon[0];                                    
      //...
};


/* =============================================================================
   ETAPA 6 — Uso de map y filter: getHighRatedAnimes (5 puntos)
   Devuelve los títulos de los anime con puntuación >= minScore.
   ============================================================================= */

/**
 * Filtra los anime con puntuación mayor o igual a minScore y devuelve
 * únicamente sus títulos.
 */
const getHighRatedAnimes = (animesArray, minScore) => {
  if(!Array.isArray(animesArray)){
     throw new Error("animesArray ha de ser un array");
  }
   if(typeof minScore!=="number"){
      throw new Error("minScore ha de ser un nombre");
   }return animesArray.filter((anime)=>anime.score>=minScore).map((anime)=>anime.title);
   //...
};


/* =============================================================================
   ETAPA 7 — Destructuring y spread: getAnimeInfo (5 puntos)
   Muestra información organizada de un anime y crea un objeto enriquecido.
   ============================================================================= */

/**
 * Extrae y muestra información relevante de un anime usando destructuring,
 * y devuelve un nuevo objeto con todos los datos originales más el campo
 * 'fullInfo: true' usando el operador spread.
 */
const getAnimeInfo = (anime) => {
  if(!(anime instanceof Anime)){
     throw new Error("anime ha de ser una instància de Anime");
  }
   // Destructuring: extraemos las propiedades que nos interesan del objeto anime
  const{title, type, score, genres, studios}=anime;
   const[firstGenre]=genres;
   const[firstStudio]=studios;
   //...
  // Mostramos la información de forma organizada en la consola
  console.log("Informació anime:");
   console.log(`Titol:${title}`);
   console.log(`Tipus: ${type}`);
   console.log(`Puntuació: ${score}`);
   console.log(`Primer gènere: ${firstGenre ? firstGenre.name : "No disponible"}`);
   console.log(`Primer estudi: ${firstStudio ? firstStudio.name : "No disponible"}`);
   //...
  // Creamos un nuevo objeto con spread: copiamos todo el anime y añadimos fullInfo
  const animeConFullInfo={
     ...anime,fullInfo:true,};
   //...

  return animeConFullInfo;
};


/* =============================================================================
   ETAPA 8 — Función avanzada: getAnimesByStudio (5 puntos)
   Combina filter, map y reduce para obtener estadísticas por estudio.
   ============================================================================= */

/**
 * Filtra los anime producidos por un estudio concreto y devuelve un resumen
 * con el nombre del estudio, cantidad de anime, sus títulos y la puntuación media.
 */


const getAnimesByStudio = (animesArray, nombreEstudio) => {
  if(!Array.isArray(animesArray)){
     throw new Error("animesArray ha de ser un array")/;
  }
   if(typeof nombreEstudio!=="string"||nombreEstudio.trim()===""){
      throw new Error("nombreEstudio ha de ser un text buit");
   }
   const filteredAnimes=animesArray.filter((anime)=>
      anime.studios.some((studio)=>studio.name===nombreEstudio));
   const animeTitles=filteredAnimes.map((anime)=>anime.title);
   const avarageScore=filteredAnimes.length===0?0:filteredAnimes.reduce((sum,anime)=>sum+anime.score,0)/filteredAnimes.length;
   return{
      studio:nombreEstudio,
      count:filteredAnimes.length,
      animes:animeTitles,
      averageScore,
   }:
      /...
  };

/* =============================================================================
   DATOS DE PRUEBA
   Los siguientes datos son reales (extraídos de MyAnimeList / Jikan API)
   y se usan para validar todas las funciones implementadas arriba.
   ============================================================================= */

// ── Géneros reutilizables (objetos con la estructura de Jikan) ──────────────
const G_ACTION     = { mal_id: 1,  type: 'anime', name: 'Action',     url: 'https://myanimelist.net/anime/genre/1/Action' };
const G_ADVENTURE  = { mal_id: 2,  type: 'anime', name: 'Adventure',  url: 'https://myanimelist.net/anime/genre/2/Adventure' };
const G_COMEDY     = { mal_id: 4,  type: 'anime', name: 'Comedy',     url: 'https://myanimelist.net/anime/genre/4/Comedy' };
const G_DRAMA      = { mal_id: 8,  type: 'anime', name: 'Drama',      url: 'https://myanimelist.net/anime/genre/8/Drama' };
const G_FANTASY    = { mal_id: 10, type: 'anime', name: 'Fantasy',    url: 'https://myanimelist.net/anime/genre/10/Fantasy' };
const G_SCIFI      = { mal_id: 24, type: 'anime', name: 'Sci-Fi',     url: 'https://myanimelist.net/anime/genre/24/Sci-Fi' };
const G_SPORT      = { mal_id: 30, type: 'anime', name: 'Sports',     url: 'https://myanimelist.net/anime/genre/30/Sports' };
const G_SHOUNEN    = { mal_id: 27, type: 'anime', name: 'Shounen',    url: 'https://myanimelist.net/anime/genre/27/Shounen' };
const G_SUPERNATURAL = { mal_id: 37, type: 'anime', name: 'Supernatural', url: 'https://myanimelist.net/anime/genre/37/Supernatural' };
const G_MYSTERY    = { mal_id: 7,  type: 'anime', name: 'Mystery',    url: 'https://myanimelist.net/anime/genre/7/Mystery' };
const G_PSYCHOLOGICAL = { mal_id: 40, type: 'anime', name: 'Psychological', url: 'https://myanimelist.net/anime/genre/40/Psychological' };

// ── Estudios reutilizables ───────────────────────────────────────────────────
const S_MAPPA      = { mal_id: 569,  type: 'anime', name: 'MAPPA',          url: 'https://myanimelist.net/anime/producer/569' };
const S_UFOTABLE   = { mal_id: 43,   type: 'anime', name: 'ufotable',       url: 'https://myanimelist.net/anime/producer/43' };
const S_WIT        = { mal_id: 858,  type: 'anime', name: 'Wit Studio',     url: 'https://myanimelist.net/anime/producer/858' };
const S_BONES      = { mal_id: 4,    type: 'anime', name: 'Bones',          url: 'https://myanimelist.net/anime/producer/4' };
const S_MADHOUSE   = { mal_id: 11,   type: 'anime', name: 'Madhouse',       url: 'https://myanimelist.net/anime/producer/11' };
const S_TOEI       = { mal_id: 28,   type: 'anime', name: 'Toei Animation', url: 'https://myanimelist.net/anime/producer/28' };
const S_PIERROT    = { mal_id: 1,    type: 'anime', name: 'Pierrot',        url: 'https://myanimelist.net/anime/producer/1' };
const S_TRIGGER    = { mal_id: 858,  type: 'anime', name: 'Trigger',        url: 'https://myanimelist.net/anime/producer/858' };

// ── Instancias de Anime (datos reales de MAL) ───────────────────────────────

const snk = new Anime({
  mal_id: 16498,
  title: 'Attack on Titan',
  synopsis: 'Siglos después de que una raza de gigantes humanoides llamados Titanes apareció, la humanidad sobrevive tras enormes murallas que los protegen del exterior.',
  episodes: 25,
  status: 'Finished Airing',
  score: 8.54,
  type: 'TV',
  genres: [G_ACTION, G_DRAMA, G_FANTASY, G_SHOUNEN],
  studios: [S_WIT],
  image_url: 'https://cdn.myanimelist.net/images/anime/10/47347.jpg',
  popularity: 1,
});

const demonSlayer = new Anime({
  mal_id: 38000,
  title: 'Demon Slayer: Kimetsu no Yaiba',
  synopsis: 'Un joven aprende a convertirse en cazador de demonios después de que su familia es asesinada y su hermana se transforma en uno.',
  episodes: 26,
  status: 'Finished Airing',
  score: 8.53,
  type: 'TV',
  genres: [G_ACTION, G_FANTASY, G_SHOUNEN],
  studios: [S_UFOTABLE],
  image_url: 'https://cdn.myanimelist.net/images/anime/1286/99889.jpg',
  popularity: 2,
});

const jujutsuKaisen = new Anime({
  mal_id: 40748,
  title: 'Jujutsu Kaisen',
  synopsis: 'Un estudiante ingiere un dedo maldito y se une a una escuela secreta de hechiceros para luchar contra maldiciones sobrenaturales.',
  episodes: 24,
  status: 'Finished Airing',
  score: 8.62,
  type: 'TV',
  genres: [G_ACTION, G_FANTASY, G_SHOUNEN, G_SUPERNATURAL],
  studios: [S_MAPPA],
  image_url: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
  popularity: 3,
});

const cowboyBebop = new Anime({
  mal_id: 1,
  title: 'Cowboy Bebop',
  synopsis: 'Un grupo de cazarrecompensas viaja por el espacio en su nave, la Bebop, en un futuro lejano.',
  episodes: 26,
  status: 'Finished Airing',
  score: 8.75,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_SCIFI, G_DRAMA],
  studios: [S_BONES],
  image_url: 'https://cdn.myanimelist.net/images/anime/4/19644.jpg',
  popularity: 39,
});

const hunterXHunter = new Anime({
  mal_id: 11061,
  title: 'Hunter x Hunter (2011)',
  synopsis: 'Gon Freecss descubre que su padre, al que creía muerto, es un Hunter de élite, y decide seguir sus pasos.',
  episodes: 148,
  status: 'Finished Airing',
  score: 9.04,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_FANTASY, G_SHOUNEN],
  studios: [S_MADHOUSE],
  image_url: 'https://cdn.myanimelist.net/images/anime/1337/99013.jpg',
  popularity: 5,
});

const dragonBallZ = new Anime({
  mal_id: 813,
  title: 'Dragon Ball Z',
  synopsis: 'Goku y sus amigos defienden la Tierra de una serie de villanos, incluyendo extraterrestres, androides y dioses.',
  episodes: 291,
  status: 'Finished Airing',
  score: 8.14,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_COMEDY, G_FANTASY, G_SHOUNEN],
  studios: [S_TOEI],
  image_url: 'https://cdn.myanimelist.net/images/anime/1277/80888.jpg',
  popularity: 7,
});

const naruto = new Anime({
  mal_id: 20,
  title: 'Naruto',
  synopsis: 'Naruto Uzumaki, un joven ninja que busca reconocimiento de sus compañeros y sueña con convertirse en Hokage.',
  episodes: 220,
  status: 'Finished Airing',
  score: 7.97,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_COMEDY, G_SHOUNEN],
  studios: [S_PIERROT],
  image_url: 'https://cdn.myanimelist.net/images/anime/13/17405.jpg',
  popularity: 8,
});

const haikyuu = new Anime({
  mal_id: 20583,
  title: 'Haikyuu!!',
  synopsis: 'Shoyo Hinata, un estudiante de secundaria de baja estatura, sueña con convertirse en un gran jugador de voleibol.',
  episodes: 25,
  status: 'Finished Airing',
  score: 8.43,
  type: 'TV',
  genres: [G_COMEDY, G_DRAMA, G_SPORT, G_SHOUNEN],
  studios: [S_MAPPA],
  image_url: 'https://cdn.myanimelist.net/images/anime/7/76014.jpg',
  popularity: 11,
});

const deathNote = new Anime({
  mal_id: 1535,
  title: 'Death Note',
  synopsis: 'Light Yagami encuentra un cuaderno sobrenatural que le da el poder de matar a cualquier persona cuyo nombre escriba en él.',
  episodes: 37,
  status: 'Finished Airing',
  score: 8.62,
  type: 'TV',
  genres: [G_MYSTERY, G_PSYCHOLOGICAL, G_SUPERNATURAL, G_DRAMA],
  studios: [S_MADHOUSE],
  image_url: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
  popularity: 4,
});

const chainsaw = new Anime({
  mal_id: 44511,
  title: 'Chainsaw Man',
  synopsis: 'Denji, un joven cazador de demonios en deuda con la mafia yakuza, se fusiona con su perro demonio para sobrevivir.',
  episodes: 12,
  status: 'Finished Airing',
  score: 8.57,
  type: 'TV',
  genres: [G_ACTION, G_FANTASY, G_SHOUNEN],
  studios: [S_MAPPA],
  image_url: 'https://cdn.myanimelist.net/images/anime/1806/126216.jpg',
  popularity: 12,
});

const fullmetalAlchemist = new Anime({
  mal_id: 5114,
  title: 'Fullmetal Alchemist: Brotherhood',
  synopsis: 'Dos hermanos buscan la Piedra Filosofal para recuperar sus cuerpos perdidos tras un fallido ritual de alquimia.',
  episodes: 64,
  status: 'Finished Airing',
  score: 9.08,
  type: 'TV',
  genres: [G_ACTION, G_ADVENTURE, G_DRAMA, G_FANTASY, G_SHOUNEN],
  studios: [S_BONES],
  image_url: 'https://cdn.myanimelist.net/images/anime/1208/94745.jpg',
  popularity: 6,
});

const steinsGate = new Anime({
  mal_id: 9253,
  title: 'Steins;Gate',
  synopsis: 'Un científico aficionado descubre accidentalmente cómo enviar mensajes al pasado, desencadenando consecuencias impredecibles.',
  episodes: 24,
  status: 'Finished Airing',
  score: 9.07,
  type: 'TV',
  genres: [G_DRAMA, G_MYSTERY, G_SCIFI, G_PSYCHOLOGICAL],
  studios: [S_WIT],
  image_url: 'https://cdn.myanimelist.net/images/anime/5/73199.jpg',
  popularity: 18,
});
