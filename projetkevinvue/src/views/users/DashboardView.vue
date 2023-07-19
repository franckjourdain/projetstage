<template>

  <div class="container-principal-dashboard">
    <div v-if="loggedIn">
      <p>Vous devez vous connecter pour accéder à cette page.</p>
    </div>
    <div class="dernieres-photos">
      <p>patatipatata</p>
    </div>
    <div class="derniere-video"></div>
    <div class="derniers-fichiers"></div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
name: "DashboardView",
data() {
return {
  loggedIn: false, 
}
},
methods: {
  checkToken() {
    axios.get('http://localhost:3002/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        console.log(response.data);
        this.email = response.data.email;
      })
      .catch(error => {
        console.log(error);
      });
  }
}
}


//  methods:
//   mounted() {
//     checkToken() {
//        axios.get('http://localhost:3002/mypage', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }})
//     }
//   }}
      
  // this.$root.messageBienvenue = "Bienvenue sur votre tableau de bord !";


</script>

<style>

</style>
