<script>
import "../../styles/Header.css"
export default {
  name: 'Header-app',

}
</script>
<template>
  <div class="main-wrapper">
    <div class="wrapper-left">
      <button class="header-buttons" onclick="location.href='/';"><img class="img-header" src="../../assets/header/icon _home.png">Home</button>

    </div>
    <div class="wrapper-right">
      <button class="header-buttons" onclick="location.href='/candidatures';"> <img class="img-header" src="../../assets/header/icon _cv.png"> Mes candidatures</button>
      <button class="header-buttons" onclick="location.href='/account';"> <img class="img-header" src="../../assets/header/icon_user.png">Mon compte</button>
    </div>
  </div>
</template>
