<template>
  <div>
    <div class="h-screen flex flex-col mx-auto relative">
      <div class="w-full h-full">
        <div class="flex flex-col items-center justify-center h-full bg-white lg:bg-gray-100">
          <div class="w-full flex flex-col px-5 lg:py-6 lg:w-1/2 lg:bg-white lg:rounded lg:shadow-md lg:px-10">
            <h1 class="text-3xl text-teal-500 mx-auto mb-3 font-semibold">
              Register
            </h1>
            <span class="text-sm text-red-500">{{ errorResponse }}</span>
            <span class="text-sm text-teal-500">{{ successResponse }}</span>
            <form class="flex flex-col" @submit.prevent="formSubmitted">
              <div class="grid lg:grid-cols-2 lg:gap-2">
                <div class="my-3 flex flex-col">
                  <label for="first-name" class="mb-2 text-gray-800">First Name</label>
                  <input v-model.trim="$v.firstName.$model" type="text" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your first name...">
                  <div v-if="$v.firstName.$dirty">
                    <span v-if="!$v.firstName.required" class="px-1 text-sm text-red-500">First name can't be empty.</span>
                    <span v-if="!$v.firstName.minLength" class="px-1 text-sm text-red-500">First name minimum 2 characters length.</span>
                  </div>
                </div>
                <div class="my-3 flex flex-col">
                  <label for="family-name" class="mb-2 text-gray-800">Family Name</label>
                  <input v-model.trim="$v.familyName.$model" type="text" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your family name...">
                  <div v-if="$v.familyName.$dirty">
                    <span v-if="!$v.familyName.required" class="px-1 text-sm text-red-500">Family name can't be empty.</span>
                  </div>
                </div>
              </div>
              <div class="my-3 flex flex-col">
                <label for="email" class="mb-2 text-gray-800">Email Address</label>
                <input v-model.trim="$v.email.$model" type="text" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your email address...">
                <div v-if="$v.email.$dirty">
                  <span v-if="!$v.email.required" class="px-1 text-sm text-red-500">Email address can't be empty.</span>
                  <span v-if="!$v.email.email" class="px-1 text-sm text-red-500">Wrong email's format.</span>
                </div>
              </div>
              <div class="my-3 flex flex-col">
                <label for="password" class="mb-2 text-gray-800">Password</label>
                <input v-model.trim="$v.password.$model" type="password" class="px-3 py-2 rounded border focus:outline-none focus:border-teal-400 focus:bg-teal-100" placeholder="Enter your password...">
                <div v-if="$v.password.$dirty">
                  <span v-if="!$v.password.required" class="px-1 text-sm text-red-500">Password can't be empty.</span>
                  <span v-if="!$v.password.minLength" class="px-1 text-sm text-red-500">Password minimum 8 characters length.</span>
                </div>
              </div>
              <button class="my-3 block border rounded px-3 py-2 uppercase text-white hover:bg-teal-400 focus:bg-teal-400 focus:outline-none font-semibold" :class="isFormSubmitted ? 'bg-teal-400' : 'bg-teal-500'" :disabled="isFormSubmitted">
                Register
              </button>
            </form>
            <p class="text-gray-800">
              Already have an account?. Please <nuxt-link to="/login" class="text-teal-500 font-bold focus:outline-none focus:text-teal-400">
                Login
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
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      firstName: '',
      familyName: '',
      email: '',
      password: '',
      errorResponse: '',
      successResponse: '',
      isFormSubmitted: false
    }
  },
  validations: {
    firstName: {
      required,
      minLength: minLength(2)
    },
    familyName: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8)
    }
  },
  methods: {
    async formSubmitted () {
      try {
        this.isFormSubmitted = true
        this.$v.$touch()
        if (!this.$v.$invalid) {
          const input = {
            firstName: this.firstName,
            familyName: this.familyName,
            email: this.email,
            password: this.password
          }
          const { data } = await this.$axios.post('/api/auth/register', input)
          if (data.status) {
            this.errorResponse = ''
            this.successResponse = 'Register was successfully, Please Login.'
          }
        } else {
          this.isFormSubmitted = false
        }
      } catch (error) {
        console.log(error)
        this.errorResponse = 'Register Error : ' + error.response.data.message
        this.isFormSubmitted = false
      }
    }
  }
}
</script>
