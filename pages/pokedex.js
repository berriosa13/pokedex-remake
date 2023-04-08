import { useState, React } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import progressBarStyles from "../styles/progressBars.module.css";
import pokedexStyles from "../styles/pokedex.module.css";
import formStyles from "../styles/form.module.css";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { TbLogout } from "react-icons/tb";
import Spinner from "../components/spinner";

export default function Pokedex() {
  const { data: session } = useSession();

  function handleSignOut() {
    signOut();
  }

  const base_url = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonTypeClassName, setPokemonTypeClassName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPokemon = async (e) => {
    setIsLoading(true);
    setError(null);
    const apiUrl = `${base_url}${pokemonName.toLowerCase()}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setPokemonData(data);
      setPokemonTypeClassName(pokemonData?.types[0]?.type?.name);
      setIsLoading(false);
    } catch (error) {
      setPokemonData(null);
      setIsLoading(false);
      setError("Error getting pokemon data");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPokemon();
  };

  function getBackgroundColor(type) {
    // const type = pokemonData?.types[0]?.type?.name;
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
    // const type = pokemonData?.types[0]?.type?.name;
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
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-4 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
              type="text"
              name="search"
              placeholder="Enter Pokemon Name or ID"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
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
            style={{ backgroundColor: getBackgroundColor() }}
          >
            <div className={pokedexStyles.pokemon_image_bg}>
              <div className={pokedexStyles.top_header}>
                <div className={pokedexStyles.pokemon_name}>
                  {pokemonData.species.name.toUpperCase()}
                </div>
                <div className={pokedexStyles.pokemon_id}>
                  # {pokemonData.id}
                </div>
              </div>
              <img
                className={pokedexStyles.pokemon_image}
                src={pokemonData.sprites.other.dream_world.front_default}
                alt=""
              />
            </div>
            <div className={pokedexStyles.type}>
              <div
                className={pokedexStyles.type_header}
                style={{
                  backgroundColor: getTextColor(pokemonData.types[0].type.name),
                }}
              >
                &nbsp; {pokemonData.types[0].type.name.toUpperCase()} &nbsp;
              </div>
            </div>
            <div className={pokedexStyles.hw}>
              <div className={pokedexStyles.height_header}>
                Height:&nbsp;{pokemonData.height}'&nbsp;|&nbsp;{" "}
              </div>
              <div className={pokedexStyles.height_header}>
                Weight:&nbsp;{pokemonData.weight} lbs.
              </div>
            </div>
            <div className={pokedexStyles.base_stats}>Base Stats</div>

            <div className="flex flex-col justify-center justify-center items-center mx-auto">
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-2 font-bold">
                  HP | {pokemonData.stats[0].base_stat}
                </p>
                <progress
                  className={getTextColor()}
                  style={{
                    "--progress-color": getTextColor(
                      pokemonData.types[0].type.name
                    ),
                  }}
                  value={pokemonData.stats[0].base_stat}
                  max="500"
                ></progress>
                <p className="px-2 font-bold">
                  min: 50 &nbsp;max: {pokemonData.stats[1].base_stat * 2 + 5}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-2 font-bold">
                  ATK | {pokemonData.stats[1].base_stat}
                </p>
                <progress
                  className={pokemonTypeClassName}
                  value={pokemonData.stats[1].base_stat}
                  max={pokemonData.stats[1].base_stat * 2 + 5}
                ></progress>
                <p className="px-2 font-bold">
                  min: 50 &nbsp;max: {pokemonData.stats[1].base_stat * 2 + 5}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-2 font-bold">
                  DEF | {pokemonData.stats[2].base_stat}
                </p>
                <progress
                  className={pokemonTypeClassName}
                  value={pokemonData.stats[2].base_stat}
                  max={pokemonData.stats[2].base_stat * 2 + 5}
                ></progress>
                <p className="px-2 font-bold">
                  min: 50 &nbsp;max: {pokemonData.stats[1].base_stat * 2 + 5}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-2 font-bold">
                  SPD | {pokemonData.stats[5].base_stat}
                </p>
                <progress
                  className={pokemonTypeClassName}
                  value={pokemonData.stats[5].base_stat}
                  max={pokemonData.stats[5].base_stat * 2 + 5}
                ></progress>
                <p className="px-2 font-bold">
                  min: 50 &nbsp;max: {pokemonData.base_experience * 2 + 5}
                </p>
              </div>
              <div className={progressBarStyles.progress_bars}>
                <p className="mx-2 font-bold">
                  EXP | {pokemonData.base_experience}
                </p>
                <progress
                  className={pokemonTypeClassName}
                  value={pokemonData.base_experience}
                  max={pokemonData.base_experience * 2 + 5}
                ></progress>
                <p className="px-2 font-bold">
                  min: 50 &nbsp;max: {pokemonData.base_experience * 2 + 5}
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
