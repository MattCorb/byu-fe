import authService from "../../services/auth.service"

export default {
	name: "LoginView",
	emits: ["authenticate"],
	data: function () {
		return {
			isAuthenticated: false,
			username: "",
			password: "",
			passwordRules: [
				(value) => !!value || "Please type password.",
				(value) =>
					(value && value.length >= 8) || "minimum 8 characters"
			],
			usernameRules: [(value) => !!value || "Please type username."],
			valid: false,
			alertStatus: "",
			loading: false,
			dialog: false,
			registerDialog: false,
			errMessage: "",
			register: { name: "", username: "", password: "", cpassword: "" },
			registerAlert: {
				visible: false,
				type: "success",
				title: "",
				text: ""
			}
		}
	},
	computed: {
		isFormValid() {
			// return this.$refs.form.validate();
		}
	},
	methods: {
		submitRegister() {
			this.loading = true
			this.$store
				.dispatch("auth/register", {
					name: this.register.name,
					email: this.register.username,
					password: this.register.password,
					cpassword: this.register.cpassword
				})
				.then((data) => {
					console.log(data.success)
					if (data.success) {
						this.username = this.register.username
						this.password = this.register.password
						this.registerDialog = false
						this.submitLogin()
						this.registerAlert.visible = true
						console.log(this.register.username)
						setTimeout(() => {}, 2000)
						// this.$store.dispatch("auth/login", {
						// 	email: this.regsiter.username,
						// 	password: this.register.password
						// })
					} else {
						// this.registerAlert.visible = true
						// this.registerAlert.title = "error"
						// this.registerAlert.type = "error"
						// this.registerAlert.text = data.message
					}
				})
				.catch((error) => {
					this.loading = false
					this.errMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				})
			// this.isAuthenticated = true
		},
		submitLogin() {
			this.alertStatus = ""
			// const userInfo = await authService.login({
			// 	email: this.username,
			// 	password: this.password
			// })
			console.log(this.username, this.password)

			this.loading = true
			this.$store
				.dispatch("auth/login", {
					email: this.username,
					password: this.password
				})
				.then((data) => {
					console.log("loing", data)
					console.log("frick")
					if (data.success) {
						this.alertStatus = "success"
						window.location.reload()
					} else {
						this.alertStatus = "error"
					}
					this.loading = false
					// this.isAuthenticated = true
					//set alert
					//login

					setTimeout(() => {}, 2000)
				})
				.catch((error) => {
					this.loading = false
					this.errMessage =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				})
			if (this.username === this.password) {
				this.alertStatus = "warning"
				return
			}

			// if (userInfo.success) {
			// 	this.alertStatus = "success"
			// 	this.isAuthenticated = true
			// 	this.loading = false
			// 	this.$emit("authenticate", this.isAuthenticated)
			// 	return
			// } else {
			// 	this.alertStatus = "error"
			// 	return
			// }
		}
	}
}
