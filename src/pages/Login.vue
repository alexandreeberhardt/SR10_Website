<script>
import "../styles/Login.css"
import LoginForm from "../components/LoginForm.vue";
import LoginText from "../components/LoginText.vue";

export default {
  name: 'App',
  components: {
    LoginForm,
    LoginText
  },
}
</script>

<template>

  <div class="container">
    <div class="columng">
      <br><br><br>
      <h1>Connexion</h1>
      <p>Se connecter pour acceder au site</p>
      <div class="form-wrapper">
        <LoginForm/>
      </div>
      <br>
      <p>Vous n'avez pas de compte ? <a href="">Créer un compte</a> </p>
    </div>
    <div class="columnd">
      <LoginText/>
    </div>
  </div>

</template>



