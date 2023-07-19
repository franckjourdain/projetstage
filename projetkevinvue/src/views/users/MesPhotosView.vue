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
    
    <!-- Boucle sur la liste des albums -->
    <div v-for="album in albums" :key="album._id">
      <h3>{{ album.name }}</h3>
      <div v-if="album.type === 'photo'">
        <img :src="`${baseUrl}${album.filePath}`" alt="Photo">
      </div>
      <div v-else>
        <!-- Boucle sur les photos du dossier -->
        <div v-for="photo in album.photos" :key="photo._id">
          <img :src="imageUrl" alt="Photo">
          <!-- <img :src="`${baseUrl}${photo.filePath}`" alt="Photo"> -->
        </div>
      </div>
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
      albums: [], // Tableau pour stocker les albums
      baseUrl: 'http://localhost:3002',
      imageUrl: '/uploads/64b3eb75869ba72efcabbcab/photo/kevin.jpg',
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

      axios.post(`${this.baseUrl}/mesphotos`, formData, config)
        .then((response) => {
          console.log(response);
          this.albums = response.data.albums; // Mettez à jour la liste des albums dans le composant Vue
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

      axios.post(`${this.baseUrl}/mesphotos/createfolder`, { folderName }, config)
        .then((response) => {
          console.log(response);
          // Réinitialisez le formulaire et masquez le formulaire de création de dossier
          this.folderNameInput = '';
          this.showCreateFolderForm = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePhoto(photoId) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };

      axios.delete(`${this.baseUrl}/mesphotos/${photoId}`, config)
        .then((response) => {
          console.log(response);
          // Supprimer la photo du tableau de photos dans le composant Vue
          for (const album of this.albums) {
            const index = album.photos.findIndex((photo) => photo._id === photoId);
            if (index !== -1) {
              album.photos.splice(index, 1);
              break; // Sortir de la boucle dès que la photo est supprimée
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadPhotos() {
      // Créez un objet de configuration de la requête Axios
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajoutez le jeton d'authentification dans l'en-tête
        },
      };
     
      // Récupérer les albums depuis l'API
      axios.get(`${this.baseUrl}/mesphotos`, config)
        .then((response) => {
          console.log(response);
          this.albums = response.data.albums; // Mettez à jour la liste des albums avec les données de la réponse
          
          // // Déboguer le chemin d'accès aux images
          // this.albums.forEach((album) => {
          //   if (album.type === 'photo') {
          //     console.log(`Chemin d'accès à l'image : ${this.baseUrl}${album.filePath}`);
          //   } else {
          //     album.photos.forEach((photo) => {
          //       console.log(`Chemin d'accès à l'image : ${this.baseUrl}${photo.filePath}`);
          //     });
          //   }
          // });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  mounted() {
    // Charger les albums au moment du montage du composant
    this.loadPhotos();
  }
}
</script>

<style></style>
