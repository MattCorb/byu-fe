<script lang="ts">
import { RouterLink, RouterView } from "vue-router"
import LoginView from "./views/login/LoginView.vue"
import authService from "./services/auth.service"
import { mapGetters, mapState } from "vuex"

export default {
	name: "App",
	components: {
		LoginView,
		RouterLink,
		RouterView
	},
	data: function () {
		return {
			profileDialog: false,
			profileIsUploading: false,
			verificationEmailLoading: false,
			showEmailNotVerifiedDialog: false,
			showChangeEmailTextField: false,
			changeEmail: false,
			successVerificationMessage: "",
			changeEmailRules: [
				(value) => !!value || "Required.",
				(value) => (value && value.length >= 3) || "Min 3 characters"
			],
			profile: {
				avatar: "",
				name: "",
				title: "",
				icon: "mdi-account-circle",
				color: "info"
			},
			profilePictureImage: "",
			emailOfVerification: "",
			user: {
				email: "matt@gmail.com",
				fullName: "matt",
				initials: "mc",
				avatar: ""
			},
			fileEvent: null
		}
	},
	computed: {
		...mapGetters("auth", ["userObj"]),
		...mapState({
			user() {
				return this.$store.state.user.user
			},
			auth() {
				return this.$store.state.auth
			},
			authUser() {
				console.log(this.auth)
				return this.auth.user
			},
			isAuthenticated() {
				return (
					this.auth.status.loggedIn &&
					this.authUser.token !== undefined
				)
			},
			title() {
				return "Welcome " + this.authUser.name + "!"
			},
			avatarURL() {
				return this.auth.user.avatar
			}
		})
	},
	created() {
		// this.isAuthenticated = !!this.userObj
		// if (this.isAuthenticated) {
		// 	this.$router.push("/home")
		// }
		if (this.authUser) {
			this.getCurrentUser()
		}
	},
	methods: {
		logout() {
			authService.logout()
			window.location.reload()
		},
		checkAuth(auth) {
			console.log("Authenticated!", auth)
			this.isAuthenticated = auth
		},
		getCurrentUser() {
			this.profile.name = this.authUser.name
			this.profile.title = this.title
			this.$store.dispatch("user/getUser").then((response) => {
				if (response.avatar) {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					this.profilePictureImage = response.avatar
					console.log(this.profilePictureImage)
				} else {
					this.profilePictureImage = ""
					this.profileIsUploading = false
				}
				if (!response.email_verified_at) {
					this.showEmailNotVerifiedDialog = true
				}
			})
		},
		removeAvatar() {
			this.profileIsUploading = true
			this.$store
				.dispatch("user/removeAvatar")
				.then((response) => {
					this.$store.commit("auth/uploadAvatarSuccess", "")
					this.getCurrentUser()
					this.publicProfileImage = ""
					this.profileIsUploading = false
				})
				.catch((error) => {
					console.log(error)
					// alert("Error. Try again")
					this.profileIsUploading = false
				})
		},
		onAvatarChange(e) {
			var image = e.target.files || e.dataTransfer.files
			if (!image.length) return
			this.profileIsUploading = true
			this.$store
				.dispatch("user/uploadAvatar", image[0], { root: true })
				.then((response) => {
					this.$store.commit(
						"auth/uploadAvatarSuccess",
						response.avatar
					)
					console.log(response)
					this.publicProfileImage = response.avatar
					this.profileIsUploading = false
					this.getCurrentUser()
				})
				.catch((error) => {
					console.log(error)
					alert("Error. Try again")
					this.profileIsUploading = false
				})
		}
	}
}
</script>

<template>
	<div v-if="isAuthenticated">
		<header>
			<v-app>
				<v-app-bar :elevation="0" rounded>
					<template v-slot:prepend>
						<v-app-bar-nav-icon></v-app-bar-nav-icon>
					</template>

					<v-app-bar-title>Application Bar</v-app-bar-title>
					<template v-slot:append>
						<v-menu offset-y width="500">
							<template v-slot:activator="{ props }">
								<v-btn icon v-bind="props">
									<v-avatar
										v-if="
											!profileIsUploading &&
											!profilePictureImage.length
										"
										icon="mdi-account"
										color="green-lighten-2"
										size="32"
									>
									</v-avatar>
									<v-avatar
										v-else-if="
											!profileIsUploading &&
											profilePictureImage.length
										"
										:image="profilePictureImage"
										size="32"
									>
									</v-avatar>
									<v-progress-circular
										v-if="profileIsUploading"
										size="32"
										indeterminate
									></v-progress-circular>
								</v-btn>
							</template>
							<v-list>
								<v-list-item>
									<v-list-item-title>{{
										"File Input"
									}}</v-list-item-title>
									<v-file-input
										@change="(e) => (this.fileEvent = e)"
									></v-file-input>
								</v-list-item>
								<v-list-item>
									<v-btn
										@click="removeAvatar()"
										:disabled="!profilePictureImage"
										:loading="profileIsUploading"
										>Remove Avatar Picture</v-btn
									>
								</v-list-item>
								<v-list-item>
									<v-btn
										@click="onAvatarChange(fileEvent)"
										:disabled="!fileEvent"
										:loading="profileIsUploading"
										>Upload Avatar Picture</v-btn
									>
								</v-list-item>
								<v-list-item>
									<v-btn @click="logout()">Logout</v-btn>
								</v-list-item>
							</v-list>
						</v-menu>
					</template>
				</v-app-bar>
				<div class="header-spacer"></div>
				<RouterView />
				<div class="header-navigation">
					<RouterLink to="/">Home</RouterLink>
					<RouterLink to="/about">About</RouterLink>
				</div>
			</v-app>
		</header>
	</div>
	<LoginView
		v-else
		:is-authenticated="isAuthenticated"
		@authenticate="checkAuth($event)"
	/>
</template>

<style lang="scss">
// .app {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
//   width: 100vw;
// }
.header-spacer {
	height: 65px;
}
</style>
