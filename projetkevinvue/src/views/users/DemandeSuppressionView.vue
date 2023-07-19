<template>
  <div class="app-container-suppression">
    <div class="formulaire-suppression">
      <div class="div-formulaire-suppression">
        <h1 class="h1-suppression">Demande de suppression de compte</h1>
        <p class="p-suppression">La suppression de votre compte entraînera le suppression totale et définitive de vos informations de connection (nom, prénom, email,mot-de-passe) ainsi que celle de vos photos, vidéos et fichiers</p>
        <p class="p-suppression">A réception de votre demande de suppression, nous nous engageons à supprimer votre compte et son comptenu dans les plus brefs délais.</p>
        <p class="p-suppression">Veuillez renseigner vos informations de compte afin de pouvoir procéder à la suppression</p>
        <div class="div-input-suppression">
          <div id="div-email-suppression" class="input-element-suppression">
            <label>Email: </label>
            <input type="email" name="email" placeholder="Email" v-model="email" class="form-control"/>
          </div>
          <div id="div-nom-suppression" class="input-element-suppression">
            <label>Nom: </label>
            <input type="text" name="nom" placeholder="votre Nom" class="form-control"/>
          </div>
          <div id="div-prenom-suppression" class="input-element-suppression">
            <label>Prrénom: </label>
            <input type="text" name="prenom" placeholder="votre Prénom" class="form-control" />
          </div>
        </div>
        <div class="button">
          <button id="btn_envoi_suppression" @click="login">Envoyer ma demande</button>
        </div>
      </div>
    </div>
</div>

</template>

<script>
// import axios from 'axios';

export default {
  name: 'DemandeSuppression',
  computed: {
    loggedIn() {
      return this.$store.state.loggedIn;
    },
  },
  // methods: {
  // envoyerDemande() {
  //   const email = this.email; // Récupérez l'adresse e-mail de l'utilisateur depuis les données du composant

  //   const data = {
  //     destinataire: 'adresse-email@exemple.com',
  //     sujet: 'Demande de suppression de compte',
  //     contenu: `Bonjour, j'aimerais demander la suppression de mon compte.`
  //   };

  //   axios.post('/votre-endpoint-d-envoi-d-email', data)
  //     .then(response => {
  //       console.log('E-mail envoyé avec succès !');
  //       // Gérer la suite du flux de l'application après l'envoi de l'e-mail
  //     })
  //     .catch(error => {
  //       console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
  //       // Gérer les erreurs d'envoi d'e-mail
  //     });
  // }

};
</script>

<style>
.app-container-suppression {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.formulaire-suppression {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;    
}

.div-formulaire-suppression{
  border: 1px solid transparent;
  border-radius: 20px;
  background-color: white;
  font-weight: 600;
  width:60%;
  padding: 30px;
}

.div-input-suppression {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  gap: 15px;
}

.input-element-suppression{
  display: grid;
  grid-template-columns: repeat(2, 1fr);      
}

.input-element-suppression label{
  padding: 8px 12px;  
}

.h1-suppression {
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

 #btn_envoi_suppression {
    padding: 10px;
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
  
  #btn_envoi_suppression:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #42b983;
    font-weight: 800;
  }
  
  #btn_envoi_suppression:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  #btn_envoi_suppression::after {
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
  
  #btn_envoi_suppression:hover::after {
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