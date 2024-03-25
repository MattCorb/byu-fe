<template>
	<div className="login-box">
		<v-container className="cont" fluid fill-height>
			<v-layout align-center justify-center>
				<v-flex className="flex" xs12 sm8 md4>
					<v-card class="elevation-12">
						<v-toolbar dark color="primary">
							<v-toolbar-title>Login form</v-toolbar-title>
						</v-toolbar>
						<v-card-text>
							<v-form
								ref="form"
								@submit.prevent="submitLogin()"
								v-model="valid"
							>
								<v-text-field
									v-model="username"
									name="username"
									label="Username"
									type="text"
									placeholder="username"
									:rules="usernameRules"
									required
								></v-text-field>

								<v-text-field
									v-model="password"
									name="password"
									label="Password"
									type="password"
									placeholder="password"
									:rules="passwordRules"
									required
								></v-text-field>
								<div v-if="alertStatus !== ''">
									<v-alert
										v-if="alertStatus === 'success'"
										color="success"
										icon="$success"
										title="Successfully"
										text="Successfully authenticated, redirecting now "
									></v-alert>
									<v-alert
										v-if="alertStatus === 'warning'"
										color="warning"
										icon="$warning"
										title="Invalid Username or Password"
										text="username and password must be different"
									></v-alert>
									<v-alert
										v-if="alertStatus === 'error'"
										color="error"
										icon="$error"
										title="Login Failed"
										text="Login failed, please try again"
									></v-alert>
								</div>
								<div className="buttons">
									<v-btn
										type="submit"
										class="mt-4"
										color="primary"
										value="log in"
										:disabled="!valid"
										:loading="loading"
										>Login</v-btn
									>
									<v-btn
										type="button"
										class="mt-4"
										color="secondary"
										value="fp"
										@click="dialog = true"
										>Forgot Password</v-btn
									>
									<v-btn
										type="button"
										class="mt-4"
										color="secondary"
										value="fp"
										@click="registerDialog = true"
										>Register</v-btn
									>
								</div>
							</v-form>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-container>

		<v-dialog v-model="dialog" width="35%">
			<v-card>
				<v-card-text> Reset your password </v-card-text>
				<v-text-field
					name="username"
					label="Username"
					type="text"
					placeholder="username"
					:rules="usernameRules"
					required
				></v-text-field>

				<v-text-field
					name="password"
					label="Password"
					type="password"
					placeholder="password"
					:rules="passwordRules"
					required
				></v-text-field>

				<v-text-field
					name="Confirm Password"
					label="Confirm Password"
					type="password"
					placeholder="confirm password"
					:rules="passwordRules"
					required
				></v-text-field>
				<v-card-actions>
					<v-btn color="primary" block @click="dialog = false"
						>Submit</v-btn
					>
				</v-card-actions>
				<v-card-actions>
					<v-btn color="primary" block @click="dialog = false"
						>Close Dialog</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>

		<v-dialog v-model="registerDialog" width="35%">
			<v-form
				ref="form"
				@submit.prevent="submitRegister()"
				v-model="valid"
			>
				<v-card>
					<v-card-text> Register an Account</v-card-text>
					<v-text-field
						v-model="register.name"
						name="name"
						label="Name"
						type="text"
						placeholder="name"
						:rules="usernameRules"
						required
					></v-text-field>
					<v-text-field
						v-model="register.username"
						name="username"
						label="Username"
						type="text"
						placeholder="username"
						:rules="usernameRules"
						required
					></v-text-field>

					<v-text-field
						v-model="register.password"
						name="password"
						label="Password"
						type="password"
						placeholder="password"
						:rules="passwordRules"
						required
					></v-text-field>

					<v-text-field
						v-model="register.cpassword"
						name="Confirm Password"
						label="Confirm Password"
						type="password"
						placeholder="confirm password"
						:rules="passwordRules"
						required
					></v-text-field>
					<v-alert
						v-if="registerAlert.visible"
						color="success"
						icon="`$success`"
						title="Success"
						text="Success"
					></v-alert>
					<v-card-actions>
						<v-btn
							type="submit"
							color="primary"
							block
							@click="dialog = false"
							>Submit</v-btn
						>
					</v-card-actions>
					<v-card-actions>
						<v-btn
							color="primary"
							block
							@click="registerDialog = false"
							>Close Dialog</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-form>
		</v-dialog>
	</div>
	<!-- <button v-if="!isAuthenticated" @click="submitLogin()">Login Page Placeholder Here</button> -->
</template>
<script src="./LoginView.ts" />

<style src="./LoginView.scss" />
