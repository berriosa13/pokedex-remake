import { useState, useEffect, React } from "react";
import { getSession, signOut } from "next-auth/react";
import progressBarStyles from "../styles/progressBars.module.css";
import pokedexStyles from "../styles/pokedex.module.css";
import formStyles from "../styles/form.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import Spinner from "../components/spinner";
import ProgressBar from "../components/progressBar";
import CreatableSelect from "react-select/creatable";

export default function Pokedex() {
  const base_url = "https://pokeapi.co/api/v2/pokemon/";
  const [inputPokemonName, setInputPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonOptions, setPokemonOptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // attribute consts
  const [pokemonId, setPokemonId] = useState("");
  const [speciesName, setSpeciesName] = useState("");
  const [mainType, setMainType] = useState("");
  const [subType, setSubType] = useState("");
  const [pokemonSpriteImage, setPokemonSpriteImage] = useState(null);
  const [officialArtwork, setOfficialArtwork] = useState(null);
  const [pokemonHeight, setPokemonHeight] = useState("");
  const [pokemonWeight, setPokemonWeight] = useState("");

  // Stat consts
  const [baseExp, setBaseExp] = useState("");
  const [baseHp, setBaseHp] = useState("");
  const [baseAtk, setBaseAtk] = useState("");
  const [baseDf, setBaseDf] = useState("");
  const [baseSpAtk, setBaseSpAtk] = useState("");
  const [baseSpDf, setBaseSpDf] = useState("");
  const [baseSpd, setBaseSpd] = useState("");

  // Function to fetch pokemon api data
  const fetchPokemon = async (e) => {
    setIsLoading(true);
    setError(null);
    const apiUrl = `${base_url}${inputPokemonName.toLowerCase()}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setPokemonData(data);
      toPokemonValues(data);
      setIsLoading(false);
    } catch (error) {
      setPokemonData(null);
      setIsLoading(false);
      setError("Error getting pokemon data");
    }
  };

  // Hook that gets a list of pokemon to set as options in the select component
  useEffect(() => {
    const fetchPokemonList = async () => {
      const response = await fetch(`${base_url}?limit=100`);
      const data = await response.json();
      const pokemonList = data.results.map((pokemon) => ({
        value: pokemon.name,
        label: toUpperCaseFirstLetter(pokemon.name),
      }));
      setPokemonOptions(pokemonList);
    };
    fetchPokemonList();
  }, []);

  // Function to set pokemon const values to be used in returned jsx elements
  const toPokemonValues = (data) => {
    if (data != null) {
      try {
        setPokemonId(data?.id);
        setBaseExp(data?.base_experience);
        setBaseHp(data?.stats[0]?.base_stat);
        setBaseAtk(data?.stats[1]?.base_stat);
        setBaseDf(data?.stats[2]?.base_stat);
        setBaseSpAtk(data?.stats[3]?.base_stat);
        setBaseSpDf(data?.stats[4]?.base_stat);
        setBaseSpd(data?.stats[5]?.base_stat);
        setMainType(data?.types[0]?.type.name);
        setSubType(data?.types[1]?.type.name);
        setPokemonHeight(data?.height);
        setPokemonWeight(data?.weight);
        setSpeciesName(data?.species?.name);
        setPokemonSpriteImage(data?.sprites?.other?.dream_world?.front_default);
        setOfficialArtwork(data?.sprites?.front_default);
      } catch (error) {
        setError("Error setting pokemon values from api" + "\n" + error);
      }
    }
  };

  const getMinStat = (baseStat) => {
    return Math.round(baseStat / 2);
  };

  const getMaxStat = (baseStat) => {
    return Math.round(baseStat * 2 + 5);
  };

  function handleSignOut() {
    signOut();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon();
  };

  const handleInputChange = (newValue) => {
    const pokemonName = newValue?.value;
    console.log("new value: " + pokemonName);
    setInputPokemonName(pokemonName);
  };

  const toUpperCaseFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const handleCreateOption = async (inputValue) => {
    const apiUrl = `${base_url}${inputValue.toLowerCase()}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      const newOption = {
        value: data?.name,
        label: toUpperCaseFirstLetter(data?.name),
      };
      if (data && data.name) {
        setPokemonOptions([...pokemonOptions, newOption]);
        setInputPokemonName(newOption.value);
      } else {
        setError(`The Pokémon ${inputValue} does not exist.`);
      }
    } catch (error) {
      setError("Invalid pokemon entered.");
      setPokemonData(null);
    }
  };

  function getBackgroundColor(type) {
    switch (type) {
      case "fire":
        return "#974948";
      case "grass":
        return "#DEFDE0";
      case "electric":
        return "#FAE182";
      case "water":
        return "#36AFF6";
      case "ground":
        return "#726262";
      case "rock":
        return "#d5d5d4";
      case "fairy":
        return "#fceaff";
      case "poison":
        return "#C68CC6";
      case "bug":
        return "#CAD479";
      case "dragon":
        return "#97b3e6";
      case "psychic":
        return "#FCB6D0";
      case "flying":
        return "#F5F5F5";
      case "fighting":
        return "#D9827E";
      case "normal":
        return "#CCC9AA";
      case "ghost":
        return "#CEB6C3";
      case "ice":
        return "#AFDDF3";
      case "dark":
        return "#9D806C";
      case "steel":
        return "#B8B8D0";
      default:
        return "#fff";
    }
  }

  function getTextColor(type) {
    switch (type) {
      case "fire":
        return "#D6350c";
      case "grass":
        return "#89E78F";
      case "electric":
        return "#EFDB17";
      case "water":
        return "#0A7ABC";
      case "ground":
        return "#B27520";
      case "rock":
        return "#A1A150";
      case "fairy":
        return "#F8AEC9";
      case "poison":
        return "#7C017C";
      case "flying":
        return "#C4C4C4";
      case "bug":
        return "#62960E";
      case "dragon":
        return "#6179A4";
      case "psychic":
        return "#F55792";
      case "fighting":
        return "#800B11";
      case "normal":
        return "#ACA974";
      case "ghost":
        return "#96617D";
      case "ice":
        return "#81C0DF";
      case "dark":
        return "#593D29";
      case "steel":
        return "#DFDFE9";
      default:
        return "#000";
    }
  }

  return (
    <section>
      <div className={pokedexStyles.logout_btn_wrapper}>
        <button
          className={formStyles.pokedex_logout_button}
          type="button"
          onClick={handleSignOut}
        >
          <a className={pokedexStyles.logout_link}>
            <TbLogout /> <span>Sign Out</span>
          </a>
        </button>
      </div>
      <section>
        <div className="flex justify-center align-center">
          <img
            className="mb-3"
            src="https://fontmeme.com/permalink/230407/c354e58918f7f409f929956c5c6444f6.png"
            alt="pokemon-font"
            border="0"
          />
        </div>
      </section>
      <div className={pokedexStyles.input_fields}>
        <form className="w-1/4" onSubmit={handleSubmit}>
          <label className="relative block mb-3">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <HiOutlineMagnifyingGlass className="h-5 w-5 fill-slate-300" />
            </span>
            <CreatableSelect
              value={inputPokemonName}
              onChange={handleInputChange}
              onCreateOption={handleCreateOption}
              options={pokemonOptions}
              isClearable
              menuId="pokemon-name-select"
              idPrefix="pokemon-name-select"
              placeholder={toUpperCaseFirstLetter(inputPokemonName)}
            />
          </label>
          <button className={formStyles.pokedex_search_btn} type="submit">
            Search
          </button>
        </form>
      </div>
      {isLoading && (
        <div className={pokedexStyles.spinner}>
          <Spinner />
        </div>
      )}
      {error && (
        <div className={pokedexStyles.invalid_placeholder}>{error}</div>
      )}
      {pokemonData != null && (
        <div className="flex justify-center align-center">
          <div
            className={pokedexStyles.pokemon}
            style={{ backgroundColor: getBackgroundColor(mainType) }}
          >
            <div className={pokedexStyles.pokemon_image_bg}>
              <div className={pokedexStyles.top_header}>
                <div className={pokedexStyles.pokemon_name}>
                  {speciesName.toUpperCase()}
                </div>
                <div className={pokedexStyles.pokemon_id}>#{pokemonId}</div>
              </div>
              {pokemonSpriteImage != null && (
                <img
                  className={pokedexStyles.pokemon_image}
                  src={pokemonSpriteImage}
                  alt=""
                />
              )}
              {pokemonSpriteImage == null && officialArtwork != null && (
                <img
                  className={pokedexStyles.pokemon_image}
                  src={officialArtwork}
                  alt=""
                />
              )}
            </div>
            {/* If both mainType & subType have values display both, assume only mainType is present */}
            <div className="flex justify-evenly align-center">
              {mainType && subType != null && (
                <>
                  <div className={pokedexStyles.type}>
                    <div
                      className={pokedexStyles.type_header}
                      style={{
                        backgroundColor: getTextColor(mainType),
                      }}
                    >
                      {mainType.toUpperCase()}
                    </div>
                  </div>
                  <div className={pokedexStyles.type}>
                    <div
                      className={pokedexStyles.type_header}
                      style={{
                        backgroundColor: getTextColor(subType),
                      }}
                    >
                      {subType.toUpperCase()}
                    </div>
                  </div>
                </>
              )}
              {!subType && (
                <div className={pokedexStyles.type}>
                  <div
                    className={pokedexStyles.type_header}
                    style={{
                      backgroundColor: getTextColor(mainType),
                    }}
                  >
                    {mainType.toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            <div className={pokedexStyles.hw}>
              <div className={pokedexStyles.height_header}>
                Height:&nbsp;{pokemonHeight}'&nbsp;|&nbsp;{" "}
              </div>
              <div className={pokedexStyles.height_header}>
                Weight:&nbsp;{pokemonHeight} lbs.
              </div>
            </div>
            <div className={pokedexStyles.base_stats}>Base Stats</div>

            <div className="flex flex-col justify-center items-evenly mx-auto">
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-3 font-bold">HP | {baseHp}</p>
                <ProgressBar
                  value={baseHp}
                  min={getMinStat(baseHp)}
                  max={getMaxStat(baseHp)}
                  color={getTextColor(mainType)}
                  width="150px"
                />
                <p className="px-2 font-bold">
                  min: {getMinStat(baseHp)} &nbsp;max: {getMaxStat(baseHp)}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-3 font-bold">ATK | {baseAtk}</p>
                <ProgressBar
                  value={baseAtk}
                  min={getMinStat(baseAtk)}
                  max={getMaxStat(baseAtk)}
                  color={getTextColor(mainType)}
                  width="150px"
                />
                <p className="px-2 font-bold">
                  min: {getMinStat(baseAtk)} &nbsp;max: {getMaxStat(baseAtk)}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-3 font-bold">DEF | {baseDf}</p>
                <ProgressBar
                  value={baseDf}
                  min={getMinStat(baseDf)}
                  max={getMaxStat(baseDf)}
                  color={getTextColor(mainType)}
                  width="150px"
                />
                <p className="px-2 font-bold">
                  min: {getMinStat(baseDf)} &nbsp;max: {getMaxStat(baseDf)}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-3 font-bold">SPD | {baseSpd}</p>
                <ProgressBar
                  value={baseSpd}
                  min={getMinStat(baseSpd)}
                  max={getMaxStat(baseSpd)}
                  color={getTextColor(mainType)}
                  width="150px"
                />
                <p className="px-2 font-bold">
                  min: {getMinStat(baseSpd)} &nbsp;max: {getMaxStat(baseSpd)}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-3 font-bold">SP-ATK | {baseSpAtk}</p>
                <ProgressBar
                  value={baseSpAtk}
                  min={getMinStat(baseSpAtk)}
                  max={getMaxStat(baseSpAtk)}
                  color={getTextColor(mainType)}
                  width="150px"
                />
                <p className="px-2 font-bold">
                  min: {getMinStat(baseSpAtk)} &nbsp;max:{" "}
                  {getMaxStat(baseSpAtk)}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-3 font-bold">SP-DF | {baseSpDf}</p>
                <ProgressBar
                  value={baseSpDf}
                  min={getMinStat(baseSpDf)}
                  max={getMaxStat(baseSpDf)}
                  color={getTextColor(mainType)}
                  width="150px"
                />
                <p className="px-2 font-bold">
                  min: {getMinStat(baseSpDf)} &nbsp;max: {getMaxStat(baseSpDf)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <style global jsx>{`
        @media (max-width: 768px) {
          .control input {
            width: 15rem;
            margin-bottom: 1.5rem;
          }
          .control button {
            width: 15rem;
            transition: all 0.5 ease;
          }
        }

        @media (max-width: 350px) {
          .hw {
            font-size: 12px !important;
          }
        }

        @media (max-width: 700px) {
          footer {
            position: relative;
          }
          .logout-button {
            width: -webkit-fill-available;
          }
        }

        @media (max-width: 600px) {
          .stats-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
          .attribute {
            font-size: 12px !important;
          }
          .ranges {
            font-size: 12px !important;
          }
          .progress-bars {
            width: 75%;
            flex-wrap: nowrap;
          }

          .search-section {
            width: fit-content;
          }
        }

        @media (max-width: 365px) {
          .top-header {
            display: flex;
            flex-direction: column;
            padding: 15px 0 0 0 !important;
          }
          .pokemon-name {
            margin-bottom: 10px;
          }

          .ranges {
            font-size: 9px !important;
          }
          .attribute {
            font-size: 9px !important;
          }
        }
      `}</style>
    </section>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
