import { createStore } from "vuex"
import { auth } from "./auth.module"
import { user } from "./user.module"
import { pokemon } from "./pokemon.module"

const store = createStore({
	modules: {
		auth,
		user,
		pokemon
	}
})

export default store
