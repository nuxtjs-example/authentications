export default ({ $auth, $axios }) => {
  try {
    if (!$auth.$state.loggedIn) {
      $auth.logout()
      $auth.redirect('login')
    }
  } catch (error) {
    console.log(error)
    $auth.logout()
  }
}
