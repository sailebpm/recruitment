export default ({ store, redirect, $config }) => {
  if (!store.getters['auth/check']) {
    return redirect('/job-posting')
  }
}
