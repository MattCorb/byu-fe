import axios from "axios"
import API_URL from "./env"
import authHeader from "./auth-headers"

class PokemonService {
	getPokemon() {
		return axios
			.get(API_URL + "pokemon", { headers: authHeader() })
			.then((response) => {
				return response.data.data
			})
	}

	createPokemon(pokemon) {
		return axios
			.post(API_URL + "pokemon/create", pokemon, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}

	updatePokemon(pokemon) {
		console.log(pokemon)
		// pokemon.image = pokemon.image[0]
		return axios
			.post(API_URL + "pokemon/update?_method=PUT", pokemon, {
				headers: authHeader("multipart")
			})
			.then((response) => {
				return response.data.data
			})
	}

	deletePokemon(pokemon_id) {
		return axios
			.delete(API_URL + "pokemon/delete", {
				params: { pokemon: pokemon_id },
				headers: authHeader()
			})
			.then((response) => {
				return response.data.data
			})
	}
}

const pokemonService = new PokemonService()
export default pokemonService
