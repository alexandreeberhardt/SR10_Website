<script>
import "../styles/LoginForm.css"
export default {
  name: 'LoginForm',
}
</script>

<template>
  <form>
    <div class="form-group">
      <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Email">
    </div>
    <br>
    <div class="form-group">
      <input type="password" class="form-control" id="password" placeholder="Mot de passe" >
    </div>
    <br>
    <div class="form-group">
    <input type="checkbox" name="Remember" class="checkbox"> 
    <label for="Remember">&nbsp;Rester connecté</label>&nbsp;&nbsp;&nbsp;
    <a href="">Mot de passe oublié</a>
    </div>

    <br>
    <button type="submit" class="connexion">Connexion</button>
  </form>
     
</template>



