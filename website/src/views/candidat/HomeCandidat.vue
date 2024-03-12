<script>
import "../../styles/HomeCandidat.css"
import Header from "../components/Header.vue";
export default {
  name: 'HomeCandidat',
  components : {
    Header,
  }
}
</script>
<template>
  <Header/>
  <div class="main-wrapper">
    <div class="main-content">
      <div class="title-search">
        <h1>VOIR LES OFFRES </h1>
        <h3>Cherchez les offres d'emploi pertinentes pour vous !</h3>
      </div>

    </div>
    <div class="main-filters">
        <div class="filters-home">
          <p style="color:blue;">Test</p>
        </div>
    </div>
  </div>

</template>
