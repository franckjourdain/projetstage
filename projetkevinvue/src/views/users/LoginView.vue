<template>
  <div class="app-container-connexion">
    <div class="formulaire-connexion">
      <div class="div-formulaire-connexion">
        <h1 class="h1-connexion">Connexion</h1>
        <div class="div-input-connexion">
          <div id="div-email-connexion" class="input-element-connexion">
            <label>Email: </label>
            <input type="email" name="email" placeholder="Email" v-model="email" class="form-control"/>
          </div>
          <div id="div-mdp-connexion" class="input-element-connexion">
            <label>Mot de passe: </label>
            <input type="password" name="password" placeholder="Password" v-model="password" class="form-control"/>
          </div>
        </div>
        <div class="button">
          <button id="btn_connexion" @click="login">Se connecter</button>
        </div>
        <div class="lien-inscription">
          <router-link  to="/inscription">Pas de compte: en créer un</router-link>
        </div>
      </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios
        .post('http://localhost:3002/login', {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          this.$store.commit('SET_LOGGED_IN', true);
          this.$router.push({ path: 'dashboard' });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
.app-container-connexion {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  background-color: #f3f3f3;
}

.formulaire-connexion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;    
}

.div-formulaire-connexion{
  border: 1px solid transparent;
  border-radius: 20px;
  background-color: white;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  width:40%;
  padding: 30px;
}

.div-input-connexion {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  gap: 15px;
}

.input-element-connexion{
  display: grid;
  grid-template-columns: repeat(2, 1fr);      
}

.input-element-connexion label{
  padding: 8px 12px;  
}

.h1-connexion {
  margin: 20px 0 10px;
  color:#42b983
}

.lien-inscription{
  margin-top:20px;
}

  .lien-inscription a {
      color: #A9A9A9;
  }

  .lien-inscription a:hover{
      color:#42b983;
  }

 #btn_connexion {
    padding: 10px;
    width: 140px;
    margin: 15px 0 20px 0;
    border: 1px solid rgba(66,185,131,1);
    border-radius: 20px;
    background: rgb(54,108,83);
    background: linear-gradient(85deg, rgba(54,108,83,1) 0%, rgba(66,185,131,1) 38%, rgba(96,249,179,1) 85%);
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    cursor: pointer;
    position: relative;
    text-transform: uppercase;
    text-decoration: none;
    transition: all .2s;
    animation: moveInBottom 1s ease-out;
    animation-fill-mode: backwards;
  }
  
  #btn_connexion:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #42b983;
    font-weight: 800;
  }
  
  #btn_connexion:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  #btn_connexion::after {
    content: " ";    
    display: inline-block;
    height: 100%;
    width: 100%;
    border-radius: 100px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all .4s;
    background-color: #f3f3f3;
    transform: scaleX(1.4) scaleY(1.6);
    opacity: 0;
    
  }
  
  #btn_connexion:hover::after {
    transform: scaleX(1) scaleY(1);
    opacity: 1;
  }
  
  
  @keyframes moveInBottom {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
  
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .form-control{
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}
</style>