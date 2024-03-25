<template>
	<v-dialog v-model="dialog" max-width="500px">
		<v-card>
			<v-card-title>Delete Pokémon</v-card-title>
			<v-card-text>
				<p>Are you sure you want to delete {{ pokemon.name }}?</p>
			</v-card-text>
			<v-card-actions>
				<v-btn color="red darken-1" @click="deletePokemon"
					>Delete</v-btn
				>
				<v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	name: "DeleteDialog",
	props: {
		pokemon: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			dialog: true
		}
	},
	methods: {
		deletePokemon() {
			// Emit event to notify parent component about deletion
			this.$emit("deletePokemon", this.pokemon)
			// Close the dialog
		},
		closeDialog() {
			// Close the dialog
			this.$emit("cancel")
		}
	}
}
</script>

<style scoped>
/* Add your custom styles here */
</style>
