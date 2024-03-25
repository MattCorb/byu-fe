<template>
	<v-dialog v-model="dialog" max-width="500px">
		<v-card>
			<v-card-title> Pokemon Details </v-card-title>
			<v-card-text>
				<v-form @submit.prevent="submitForm">
					<v-text-field
						v-model="pokemon.name"
						label="Name"
						required
					></v-text-field>
					<v-text-field
						v-model="pokemon.type1"
						label="Type 1"
						required
					></v-text-field>
					<v-text-field
						v-model="pokemon.type2"
						label="Type 2"
					></v-text-field>
					<v-file-input
						@change="(e) => (this.fileEvent = e)"
						:single-item="true"
						:max-items="1"
						label="Image"
						accept="image/*"
					></v-file-input>
					<v-text-field
						v-model="pokemon.weight"
						label="Weight"
					></v-text-field>
					<v-text-field
						v-model="pokemon.height"
						label="Height"
					></v-text-field>
					<v-textarea
						v-model="pokemon.description"
						label="Description"
					></v-textarea>
					<div v-if="errorList.length > 0" v-for="e in errorList">
						<span class="red-text">{{ e }}</span>
					</div>
					<v-btn color="primary" type="submit">Submit</v-btn>
					<v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import { pokemon } from "../../store/pokemon.module"

export default {
	name: "PokemonDialog",
	data() {
		return {
			dialog: true,
			pokemon: {
				name: "",
				type1: "",
				type2: "",
				weight: "",
				height: "",
				description: "",
				id: ""
			},
			fileEvent: null,
			errorList: []
		}
	},
	props: {
		pokemon_in: Object
	},
	created() {
		this.errorList = []
		if (this.pokemon_in) {
			Object.keys(this.pokemon).forEach((key) => {
				this.pokemon[key] = this.pokemon_in[key]
			})
		}
	},
	methods: {
		submitForm() {
			this.errorList = []
			if (!this.validateForm()) {
				// If form validation fails, prevent form submission
				return
			}

			if (
				this.fileEvent &&
				this.fileEvent.target &&
				(this.fileEvent.target.files ||
					this.fileEvent.dataTransfer.files)
			) {
				const images =
					this.fileEvent.target.files ||
					this.fileEvent.dataTransfer.files
				this.pokemon.image = images[0]
			}

			if (this.pokemon_in) {
				this.pokemon["pokemon"] = this.pokemon_in.id
				this.$emit("submitUpdate", this.pokemon)
			} else {
				this.$emit("submitCreate", this.pokemon)
			}
			// this.$emit("cancel")
			//check for image and emit with new pokemon object
		},
		closeDialog() {
			// Close the dialog without submitting the form
			this.$emit("cancel")
		},
		validateForm() {
			const errorList = []
			// Validate form fields
			if (!this.pokemon.name || !this.pokemon.type1 || !this.fileEvent) {
				// If any of the required fields are empty, show an error message
				if (!this.pokemon.name) {
					errorList.push("Name is required")
				}
				if (!this.pokemon.type1) {
					errorList.push("Type 1 is required")
				}
				if (!this.fileEvent) {
					errorList.push("Image is required")
				}
				this.errorList = errorList
				return false
			}
			return true
		}
	}
}
</script>

<style lang="scss">
.red-text {
	color: red;
}
</style>
