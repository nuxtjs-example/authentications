<template>
  <div>
    <div class="h-screen flex flex-col mx-auto relative">
      <div class="w-full h-full">
        <div class="flex flex-col items-center justify-center h-full bg-white lg:bg-gray-100">
          <div class="w-full flex flex-col px-5 lg:py-6 lg:w-auto lg:bg-white lg:rounded lg:shadow-md lg:px-10">
            <h1 class="text-3xl text-teal-500 mx-auto mb-3 font-semibold">
              Welcome Back
            </h1>
            <span class="text-sm text-red-500">{{ errorResponse }}</span>
            <form autocomplete="off" class="flex flex-col" @submit.prevent="formSubmitted">
              <div class="my-3 flex flex-col">
                <label for="email" class="mb-2 text-gray-800">Email Address</label>
                <input
                  v-model.trim="$v.email.$model"
                  type="text"
                  name="email"
                  class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100"
                  placeholder="Enter your email address..."
                  :disabled="isFormSubmitted"
                >
                <div v-if="$v.email.$dirty">
                  <span v-if="!$v.email.email" class="px-1 text-sm text-red-500">Wrong email's format.</span>
                  <span v-if="!$v.email.required" class="px-1 text-sm text-red-500">Email address can't be empty.</span>
                </div>
              </div>
              <div class="my-3 flex flex-col">
                <label for="password" class="mb-2 text-gray-800">Password</label>
                <input
                  v-model="$v.password.$model"
                  type="password"
                  name="password"
                  class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100"
                  placeholder="Enter your password..."
                  :disabled="isFormSubmitted"
                >
                <div v-if="$v.password.$dirty">
                  <span v-if="!$v.password.required" class="px-1 text-sm text-red-500">Password can't be empty.</span>
                </div>
              </div>
              <button type="submit" class="my-3 block border rounded font-semibold px-3 py-2 uppercase text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none" :class="isFormSubmitted ? 'bg-teal-400' : 'bg-teal-500'" :disabled="isFormSubmitted">
                Login
              </button>
            </form>
            <div class="grid grid-cols-2 gap-2">
              <button class="border rounded px-3 py-2 uppercase bg-red-700 text-white font-semibold">
                Google
              </button>
              <button class="border rounded px-3 py-2 uppercase bg-blue-700 text-white font-semibold">
                Facebook
              </button>
            </div>
            <p class="text-gray-800 mt-3">
              Don't have an account?. Please <nuxt-link to="/register" class="text-teal-500 font-bold focus:outline-none focus:text-teal-400">
                Register
              </nuxt-link>
              here,
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      errorResponse: '',
      isFormSubmitted: false
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    async formSubmitted () {
      try {
        this.isFormSubmitted = true
        this.$v.$touch()
        if (!this.$v.$invalid) {
          const input = {
            email: this.email,
            password: this.password
          }
          await this.$auth.loginWith('local', { data: input })
          const { data } = await this.$axios.get('/api/auth/currentUser')
          this.$auth.setUser(data.user)
          this.$router.push('/')
        } else {
          this.isFormSubmitted = false
        }
      } catch (error) {
        console.log(error)
        this.errorResponse = 'Login Error : ' + error.response.data.message
        this.isFormSubmitted = false
      }
    }
  }
}
</script>
