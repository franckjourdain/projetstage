<template>
  <div class="app-container-contact">
    <div class="formulaire-contact">
      <div class="div-formulaire-contact">
        <h1 class="h1-contact">Formulaire de Contact</h1>
        <p class="p-contact">Pour toute demande ou problèmes veuillez remplir ce formulaire de contact</p>
        <p class="p-contact">Si votre demande concerne la suppression de votre compte, veuillez effectuer cette demande dans la rubrique "Demande de suppression" présente en bas de page ou accessible depuis le "Plan du site"</p>
        <div class="div-input-contact">
          <div id="div-email-contact" class="input-element-contact">
            <label>Email: </label>
            <input type="email" name="email" placeholder="votre Email" v-model="email" class="form-control"/>
          </div>
          <div id="div-nom-contact" class="input-element-contact">
            <label>Nom: </label>
            <input type="text" name="nom" placeholder="votre Nom" class="form-control"/>
          </div>
          <div id="div-prenom-contact" class="input-element-contact">
            <label>Prrénom: </label>
            <input type="text" name="prenom" placeholder="votre Prénom" class="form-control" />
          </div>
          <div id="div-demande-contact" class="input-element-contact">
            <label>Votre demande: </label>
            <textarea name="demande" placeholder="N'hésitez pas à inclure des informations supplémentaires afin d'améliorer la compréhension de votre demande." rows="10" class="form-control" />
          </div>
        </div>
        <div class="button">
          <button id="btn_contact" @click="login">Envoyer ma demande</button>
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
.app-container-contact {
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

.formulaire-contact {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:auto;
}

.div-formulaire-contact{
  border: 1px solid transparent;
  border-radius: 20px;
  background-color: white;
  font-weight: 600;
  width:70%;
  padding: 30px;
}

.div-input-contact {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  gap: 15px;
}

.input-element-contact{
  display: grid;
  grid-template-columns: repeat(2, 1fr);      
}

.input-element-contact label{
  padding: 8px 12px;  
}

.h1-contact {
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

 #btn_contact {
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
  
  #btn_contact:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #42b983;
    font-weight: 800;
  }
  
  #btn_contact:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
  }
  
  #btn_contact::after {
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
  
  #btn_contact:hover::after {
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