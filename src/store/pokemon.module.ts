import pokemonService from "../services/pokemon.service"

export const pokemon = {
	namespaced: true,
	state: { pokemonList: [] },
	actions: {
		getPokemon({ commit }) {
			return pokemonService.getPokemon().then(
				(response) => {
					commit("setPokemon", response)
					return Promise.resolve(response)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		},

		updatePokemon({ commit }, pokemon) {
			return pokemonService.updatePokemon(pokemon).then(
				(response) => {
					commit("updatePokemon", response)
					return Promise.resolve(response)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		},

		createPokemon({ commit }, pokemon) {
			return pokemonService.createPokemon(pokemon).then(
				(response) => {
					commit("createPokemon", response)
					return Promise.resolve(response)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		},

		deletePokemon({ commit }, pokemon) {
			return pokemonService.deletePokemon(pokemon).then(
				(response) => {
					commit("deletePokemon", response)
					return Promise.resolve(response)
				},
				(response) => {
					return Promise.resolve(response)
				}
			)
		}
	},
	mutations: {
		setPokemon(state, pokemon) {
			state.pokemonList.splice(0, state.pokemonList.length, ...pokemon)
		},

		updatePokemon(state, pokemon) {
			const index = state.pokemonList.findIndex(
				(p) => p.id === pokemon.id
			)
			index > -1 ? (state.pokemonList[index] = pokemon) : ""
			return state.pokemonList
		},

		createPokemon(state, pokemon) {
			state.pokemonList.push(pokemon)
		},

		deletePokemon(state, pokemon) {
			const index = state.pokemonList.findIndex(
				(p) => p.id === pokemon.id
			)
			index > -1 ? state.pokemonList.splice(index, 1) : ""
		}
	},
	getters: {
		getPokemon: (state) => {
			console.log("getter", state)
			return state.pokemonList
		}
	}
}
