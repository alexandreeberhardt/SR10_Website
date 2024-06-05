<script>
import "../styles/Login.css"
import UsersList from '../components/UsersList.vue';
export default {
  name: 'HomeCandidat',
  components: {
  UsersList,
  },
}
</script>
<template>
  <div>
    <p>Page d'accueil</p>
    <p>Affichage des utilisateurs</p>
    <UsersList/>
  </div>

</template>
