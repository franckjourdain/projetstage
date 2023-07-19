<template>
  <div class="plan">
    <h1>Plan du site</h1>
    <ul class="ul-plan">
      <li class="li-plan">◆ <router-link v-if="this.$store.state.loggedIn" to="/dashboard">Tableau de bord </router-link>
        <ul class="sub-ul-plan">
          <li class="sub-li-plan">○ <router-link v-if="loggedIn" to="/mesphotos">Mes Photos</router-link></li>
          <li class="sub-li-plan">○ <router-link v-if="loggedIn" to="/mesvideos">Mes Vidéos</router-link></li>
          <li class="sub-li-plan">○ <router-link v-if="loggedIn" to="/mesfichiers">Mes Fichiers</router-link></li>
          <li class="sub-li-plan">○ <router-link v-if="loggedIn" to="/partager" >Partager</router-link></li>
        </ul>
      </li>
      <li class="li-plan">◆ <router-link v-if="this.$store.state.loggedIn" to="/planSite">Plan du site </router-link></li>
      <li class="li-plan">◆ <router-link v-if="this.$store.state.loggedIn" to="/conditionsUtilisation">Conditions d'utilisation </router-link></li>
      <li class="li-plan">◆ <router-link v-if="this.$store.state.loggedIn" to="/dashboard">Demande de Suppression </router-link></li>
      <li class="li-plan">◆ <router-link v-if="this.$store.state.loggedIn" to="/dashboard">Contact </router-link></li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'PlanSite',
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
}
</script>

<style>
.plan {
  text-align: left;
  margin-top: 2em;
  padding: 30px 30px 0 30px;
}

.ul-plan {
  list-style-type: none;
  padding-left: 20px;
}

.li-plan::before {
 
  margin-right: 5px;
}

.sub-ul-plan {
  padding-left: 20px;
}

.sub-li-plan {
  content: "○";
  margin-bottom: 5px;
}
</style>