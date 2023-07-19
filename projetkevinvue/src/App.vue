<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">


<template>
  <nav id="nav_top" v-if="loggedIn">
     <!-- eslint-disable-next-line no-unused-vars -->
    <div id="messages">
      <p id="p_messages">{{ getMessageBienvenue($route.name) }}</p>
    </div>
    <div class="nav-item">
      <router-link v-if="this.$store.state.loggedIn" to="/dashboard">Tableau de bord </router-link> 
      <a href="/login" @click="deconnexionUtilisateur">Déconnexion</a>
    </div>
  </nav>
  <div class="dashboard-principal">

      <nav id="sous_menu_dashboard" v-if="loggedIn">
        <ul class="ul-dashboard">
          <li :class="{ 'li-dashboard': true, 'active': $route.path === '/mesphotos' }">
            <router-link v-if="loggedIn" to="/mesphotos" exact-active-class="router-link-active" @click="menuActif = 'mesphotos'">Mes Photos</router-link>
          </li>          
          <li :class="{ 'li-dashboard': true, 'active': $route.path === '/mesvideos' }">
            <router-link v-if="loggedIn" to="/mesvideos" exact-active-class="active" @click="menuActif = 'mesvideos'">Mes Vidéos</router-link>
          </li>
          <li :class="{ 'li-dashboard': true, 'active': $route.path === '/mesfichiers' }">
            <router-link v-if="loggedIn" to="/mesfichiers" exact-active-class="active" @click="menuActif = 'mesfichiers'">Mes Fichiers</router-link>
          </li>
          <li :class="{ 'li-dashboard': true, 'active': $route.path === '/partager' }">
            <router-link v-if="loggedIn" to="/partager" exact-active-class="active" @click="menuActif = 'partager'">Partager</router-link>
          </li>
        </ul>
      </nav>
      
    <div :class="{'app-container-connecte': loggedIn, 'app-container-non-connecte': !loggedIn}">
      <router-view/>
    </div>
  </div>

  
    
  <footer v-if="loggedIn">
    <ul>
      <!-- modifier  -->
      <li> <router-link v-if="this.$store.state.loggedIn" to="/planSite">Plan du site</router-link></li>
      <li> <router-link v-if="this.$store.state.loggedIn" to="/conditionsUtilisation">Conditions d'utilisation</router-link> </li>
      <li> <router-link v-if="this.$store.state.loggedIn" to="/demandeSuppression">Demande de Suppression</router-link></li>
      <li> <router-link v-if="this.$store.state.loggedIn" to="/demandeContact">Contact</router-link></li>
    </ul>
    <p class="copyright">@Kévin Boedec - Tous droits réservés</p>
  </footer>
  
</template>

<script>
export default {
  name: 'App',
  data() {
  return {
    menuActif: null,
  };
},
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  methods: {
    deconnexionUtilisateur(event) {
      event.preventDefault();
      if (confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
        localStorage.removeItem('token');
        this.$store.commit('SET_LOGGED_IN', false);
        this.$router.push({ name: 'Login' });
      }
    },
    resetMenuActif() {
    this.menuActif = null;
    },
    getMessageBienvenue(routeName) {
    switch (routeName) {
      case 'MesPhotos':
        return 'Voici la page de gestion de vos photos!';
      case 'MesVideos':
        return 'Voici la page de gestion de vos vidéos!';
      case 'MesFichiers':
        return 'Voici la page de gestion de vos fichiers!';
      case 'Partager':
        return 'Bienvenue sur la page de partage!';
        case 'Dashboard':
        return 'Bienvenue sur votre tableau de bord!';
        case 'PlanSite':
        return 'Voici le plan du site!';
        case 'ConditionsUtilisation':
        return 'Voici nos conditions d\'utilisation!';
        case 'DemandeSuppression':
        return 'Faites votre demande de suppression de compte ici!';
        case 'DemandeContact':
        return 'Un problème, une question le formulaire de contact est là pour ça!';
      default:
        return 'Bienvenue sur notre site!';
    }
  },
  },
  mounted() {
    document.addEventListener('click', this.resetMenuActif);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.resetMenuActif);
  },

};
</script>


<style>
#app {
  font-family: Poppins, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:#111111;
  margin:auto;
}

.nav-item {
  display: flex;
  align-items: center;
}

#p_messages{
  font-weight: bold;
}

.app-container-connecte{
  width:90%;
  min-height: 80vh;
  background-color: #fff;
  padding: 20px;
  border-radius: 0 20px 20px 0;
}

.app-container-non-connecte{
  width:90%;
  min-height: 80vh;
  background-color: #f3f3f3;
  padding: 20px;
  margin: auto;
  border-radius: 0 20px 20px 0;
}

body{
  background-color: #f3f3f3;
  margin:auto;
  font-weight: 400;
}

#nav_top {
  display: flex;
  justify-content: space-around;
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

#nav_top a {
  font-weight: bold;
  color:#111111;
  text-decoration: none;
  margin-right: 20px;
}

#nav_top a:hover {
  color: #2E855E;
}

.dashboard-principal {
  flex-grow: 1;
  display: flex;
  margin: 10px ;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

router-view {
  flex-grow: 1;
}

#sous_menu_dashboard {
  width: 200px;
  background-color: #277250;
  color: #e6e6e6;
  display: flex;
  flex-direction: column;
  border-radius: 20px 0 0 20px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}

#sous_menu_dashboard ul {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  list-style: none;
  margin:auto;
  gap: 2em;
}

#sous_menu_dashboard a {
  font-weight: bold;
  color:#fff;
  text-decoration: none;
  margin-right: 20px;
}

.li-dashboard.active {
  width: 130px;
  background-color: #42b983;
  margin-left: auto;
  padding: 20px 0 20px 20px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px 0 0 20px;
}

#sous_menu_dashboard .li-dashboard.active a{
  color:#111111;
}

h1,h2,h3,h4,h5,h6 {
  font-weight: 700;
  color:#111111;
}

h1{
  font-size: 2.5rem;
}

h2{
  font-size: 1.6rem;
}

h3{
  font-size: 1.4rem;
}

h4{
  font-size:1.25rem;
}


footer{
  background-color: #111111;
  color: #e6e6e6;
  padding:20px;
}

footer ul {
  display: flex;
  justify-content: center;
  list-style: none;
  gap: 50px;
  padding-bottom: 10px;
}

footer ul a{
  text-decoration: none;
  color: #e6e6e6;
}

footer ul a:hover{
  color: #42b983;
}

.copyright{
  font-size: 0.8rem;
}

</style>
