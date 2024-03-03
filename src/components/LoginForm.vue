<script>
import "../styles/LoginForm.css"
export default {
  name: 'App',
}
</script>
<template>
  <div class="container">
    <div class="columng">
      <h1>Connexion</h1>
      <p>Se connecter pour acceder au site</p>
      <form id="login">
      <input type="text" id="email" name="email" placeholder="Email"><br><br>
      <input type="password" id="mdp" name="mdp" placeholder="mdp" ><br><br>
      <input type="submit" value="Connexion">
      </form>
      <p>-----Autre connexion-----</p>
    </div>
    <div class="columnd">
    aaa
    </div>
  </div>
</template>



