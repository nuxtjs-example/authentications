<template>
  <div>
    <h1 class="text-2xl font-light">
      Hello {{ this.$auth.user.firstName }}
    </h1>
    <button type="button" class="px-2 py-2 border rounded" @click="logout">
      LOGOUT
    </button>
    <button type="button" class="px-2 py-2 border rounded" @click="checkUser">
      Check User
    </button>
  </div>
</template>

<script>
export default {
  // middleware: 'loggedIn',
  async fetch ({ store, $auth, $axios }) {
    try {
      if (Object.keys($auth.user).length === 0) {
        const { data } = await $axios.get('/api/auth/currentUser')
        $auth.setUser(data.user)
        store.commit('setUser', data.user)
      }
    } catch (error) {
      console.log(error)
      $auth.logout()
      $auth.redirect('login')
    }
  },
  data () {
    return {
      user: {
        firstName: 'Loading...'
      }
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
      this.$auth.redirect('login')
    },
    checkUser () {
      console.log(this.$auth.$state)
    }
  }
}
</script>
