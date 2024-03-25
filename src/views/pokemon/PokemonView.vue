<template>
	<v-btn @click="toggleAddPokemon" max-width="150px">Add Pokemon</v-btn>
	<v-table>
		<thead>
			<tr>
				<th class="text-left">Image</th>
				<th class="text-left">Name</th>
				<th class="text-left">Primary Type</th>
				<th class="text-left">Secondary Type</th>
				<th class="text-left">Height (CM)</th>
				<th class="text-left">Weight (KG)</th>
				<th class="text-left">Description</th>
				<th class="text-left">Edit</th>
				<th class="text-left">Delete</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="p in pokemon" :key="p.id">
				<td>
					<v-avatar size="36px">
						<v-img :alt="p.name" :src="p.image_url"></v-img>
					</v-avatar>
				</td>
				<td>{{ p.name }}</td>
				<td>{{ p.type1 }}</td>
				<td>{{ p.type2 }}</td>
				<td>{{ p.height }}</td>
				<td>{{ p.weight }}</td>
				<td>{{ p.description }}</td>
				<td><v-btn @click="toggleEditDialog(p)">Edit</v-btn></td>
				<td><v-btn @click="toggleDelteDialog(p)">Delete</v-btn></td>
			</tr>
		</tbody>
	</v-table>

	<PokemonDialog
		v-if="editDialog"
		:pokemon_in="selectedPokemon"
		@submitUpdate="(x) => updatePokemon(x)"
		@cancel="toggleEditDialog"
	/>
	<PokemonDialog
		v-if="addDialog"
		@submitCreate="(x) => createPokemon(x)"
		@cancel="toggleAddPokemon"
	/>
	<DeleteDialog
		v-if="deleteDialog"
		:pokemon="selectedPokemon"
		@deletePokemon="(x) => deletePokemon(x)"
		@cancel="toggleDelteDialog"
	/>
</template>

<script>
import { mapState } from "vuex"
import PokemonDialog from "./PokemonDialog.vue"
import DeleteDialog from "./DeleteDialog.vue"

export default {
	name: "PokemonView",
	components: {
		PokemonDialog,
		DeleteDialog
	},
	data() {
		return {
			editDialog: false,
			addDialog: false,
			deleteDialog: false,
			selectedPokemon: null
		}
	},
	computed: {
		...mapState({
			pokemon() {
				return this.$store.state.pokemon.pokemonList
			}
		})
	},
	created() {
		this.getPokemon()
	},
	methods: {
		toggleEditDialog(e) {
			this.selectedPokemon = e
			this.editDialog = !this.editDialog
		},
		toggleAddPokemon() {
			this.addDialog = !this.addDialog
		},
		toggleDelteDialog(e) {
			this.selectedPokemon = e
			this.deleteDialog = !this.deleteDialog
		},
		async getPokemon() {
			try {
				await this.$store.dispatch("pokemon/getPokemon")
			} catch (error) {
				console.error("Error fetching Pokémon:", error)
			}
		},
		async updatePokemon(pokemon) {
			try {
				await this.$store.dispatch("pokemon/updatePokemon", pokemon)
			} catch (error) {
				console.error("Error updating Pokemon", error)
			}

			this.toggleEditDialog()
		},
		async createPokemon(pokemon) {
			try {
				await this.$store.dispatch("pokemon/createPokemon", pokemon)
			} catch (error) {
				console.error("Error creating Pokemon", error)
			}
			this.toggleAddPokemon()
		},
		async deletePokemon(e) {
			console.log(e)
			try {
				await this.$store.dispatch("pokemon/deletePokemon", e.id)
			} catch (error) {
				console.error("Error deleting pokemon", error)
			}
			this.toggleDelteDialog()
		}
	}
}
</script>

<style></style>
