<template>
  <div class="app-container-inscription">
    <div class="formulaire-inscription">
      <div class="div-formulaire-inscription">
        <h1 class="h1-inscription">Formulaire d'inscription</h1>
        <div class="div-input-inscription">
          <div id="div-nom-inscription" class="input-element-inscription">
            <label>Nom: </label>
            <input type="text" v-model="lastname" class="form-control">
          </div>
          <div id="div-prenom-inscription" class="input-element-inscription">
            <label>Prénom: </label>
            <input type="text" v-model="firstname" class="form-control">
          </div>
          <div id="div-email-inscription" class="input-element-inscription">
            <label>Email: </label>
            <input type="email" v-model="email" class="form-control">
          </div>
          <div id="div-mdp-inscription" class="input-element-inscription">
            <label>Mot de passe: </label>
            <input type="password" v-model="password" class="form-control">
          </div>
        </div>
        <div class="button">
          <button id="btn_inscription" @click="inscriptionUtilisateur">Inscription</button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      };
    },
    methods: {
      inscriptionUtilisateur() {
        axios
          .post('http://localhost:3002/inscription', {
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
          })
          .then((response) => {
            // Vérifier si la réponse contient un message de succès
            if (response.data && response.data.message === "Inscription réussie") {
              // Redirection vers une autre page
              this.$router.push({ path: 'Login' });
            } else {
              this.errorMessage = "Une erreur est survenue lors de votre inscription. Veuillez réessayer plus tard.";
            }
          })
          .catch((error) => {
            console.error('Erreur lors de l`inscription', error);
          });
      },
    },
  };
  </script>
  
  <style>
  .app-container-inscription {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    background-color: #f3f3f3;
  }
  .formulaire-inscription {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;    
  }
  
  .div-formulaire-inscription{
    border: 1px solid transparent;
    border-radius: 20px;
    background-color: white;
    font-weight: 600;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
    width:40%;
    padding: 30px;
  }
  
  .div-input-inscription {
    width: 50%;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding: 25px 0;
    gap: 15px;
  }
  
  .input-element-inscription label{
    padding: 8px 12px;  
  }
  
  .input-element-connexion{
    display: grid;
    grid-template-columns: repeat(2, 1fr);      
  }
  
  .h1-inscription {
    margin: 20px 0 10px;
    color:#42b983
  }
  
  #btn_inscription {
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
  
  #btn_inscription:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #42b983;
    font-weight: 800;
  }
  
  #btn_inscription:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  #btn_inscription::after {
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
  
  #btn_inscription:hover::after {
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