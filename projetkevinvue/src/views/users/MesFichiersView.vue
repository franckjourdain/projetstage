<template>
  <div id="main">
    <input type="file" name="picture" id="picture" @change="updateAltText" multiple>
    <label>Nom du fichier : </label>
    <input type="text" name="alt_picture" placeholder="Nom du fichier" v-model="fileName">
    <button @click="envoi">Télécharger</button>

    <button @click="toggleCreateFolderForm">Créer un dossier</button>
    <div v-if="showCreateFolderForm">
      <input type="text" name="folderName" v-model="folderNameInput" placeholder="Nom du dossier">
      <button @click="createFolder">Enregistrer</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MesPhotos',
  data() {
    return {
      fileName: '',
      showCreateFolderForm: false,
      folderNameInput: '',
    }
  },
  methods: {
    updateAltText(event) {
      const files = event.target.files;
      let filenames = [];

      for (let i = 0; i < files.length; i++) {
        filenames.push(files[i].name.split('.').slice(0, -1).join('.'));
      }

      this.fileName = filenames.join(', ');
    },
    envoi() {
      let files = document.getElementById('picture').files;
      let formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('img', files[i]);
      }

      formData.append('alt_text', this.fileName);

      // Créez un objet de configuration de la requête Axios
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajoutez le jeton d'authentification dans l'en-tête
          'Content-Type': 'multipart/form-data' // Ajoutez cet en-tête pour indiquer que la requête contient des données multipart
        },
      };

      axios.post('http://localhost:3002/mesphotos', formData, config)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleCreateFolderForm() {
      this.showCreateFolderForm = !this.showCreateFolderForm;
      this.folderNameInput = '';
    },
    createFolder() {
      const folderName = this.folderNameInput;

      // Créez un objet de configuration de la requête Axios
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajoutez le jeton d'authentification dans l'en-tête
        },
      };

      axios.post('http://localhost:3002/createfolder', { folderName }, config)
        .then((response) => {
          console.log(response);
          // Réinitialisez le formulaire et masquez le formulaire de création de dossier
          this.folderNameInput = '';
          this.showCreateFolderForm = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>

<style></style>
