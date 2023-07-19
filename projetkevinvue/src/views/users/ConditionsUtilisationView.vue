<template>
  <div class="container-conditions">
    <h1 class="h1-conditions">Conditions d'Utilisation et Politique de Confidentialité</h1>
    <p class="p-conditions">Le contenu de cette page décrit comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre site de stockage de photos, vidéos et fichiers. Nous nous engageons à respecter la législation en vigueur sur la protection des données, y compris le Règlement Général sur la Protection des Données (RGPD).
    </p>
    <ul class="accordion-conditions">
      <li class="has-sub-conditions">
        <label class="label-conditions" for="collecte-conditions">Collecte des informations personnelles</label>
        <input id="collecte-conditions" type="checkbox" name="menu" />        
        <ul class="sub-conditions"> 
          <li>Lors de votre inscription sur notre site, nous collectons les informations personnelles suivantes : votre nom, votre prénom et votre adresse e-mail. Ces informations sont nécessaires pour créer et gérer votre compte utilisateur.</li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="utilisation-conditions">Utilisation des informations personnelles</label>
        <input id="utilisation-conditions" type="checkbox" name="menu" />        
        <ul class="sub-conditions"> 
          <li>Nous utilisons vos informations personnelles uniquement dans le but de vous fournir les services de stockage de photos, vidéos et fichiers que nous proposons sur notre site. Vos informations ne seront pas partagées avec des tiers sans votre consentement explicite, sauf dans les cas prévus par la loi.</li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="stockage-conditions">Stockage et sécurité des médias</label>
        <input id="stockage-conditions" type="checkbox" name="menu" />
        <ul class="sub-conditions">  
          <li>Les photos, vidéos et fichiers que vous téléchargez sur notre site sont stockés sur nos serveurs sécurisés. Nous prenons des mesures techniques et organisationnelles appropriées pour garantir la sécurité et la confidentialité de vos médias, y compris l'utilisation de protocoles de cryptage et de sauvegardes régulières.</li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="droits-conditions">Droits des utilisateurs</label>
        <input id="droits-conditions" type="checkbox" name="menu" />        
        <ul class="sub-conditions">  
          <li>Vous avez le droit d'accéder à vos données personnelles, de les rectifier, de les supprimer ou de limiter leur utilisation. Vous pouvez exercer ces droits en nous contactant via les formulaires de "Demande de suppression" et de "Contact" prévus à cet effet. Nous nous engageons à répondre à votre demande dans les meilleurs délais.
          Vous pouvez également nous contacter à l'adresse email: boedec2@gmail.com.
          </li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="cookies-conditions">Cookies et technologies similaires</label>
        <input id="cookies-conditions" type="checkbox" name="menu" /> 
        <ul class="sub-conditions"> 
          <li>Nous utilisons des cookies et des technologies similaires sur notre site afin d'améliorer votre expérience utilisateur et de recueillir des informations statistiques. Vous avez la possibilité de gérer vos préférences en matière de cookies ou de les désactiver dans les paramètres de votre navigateur.</li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="conservation-conditions">Conservation des données</label>
        <input id="conservation-conditions" type="checkbox" name="menu" /> 
        <ul class="sub-conditions">  
          <li>Nous conservons vos données personnelles et les médias que vous téléchargez sur notre site pendant la durée nécessaire pour vous fournir nos services. Nous supprimerons vos données personnelles de manière sécurisée lorsque vous supprimez votre compte ou lorsque nous n'en avons plus besoin.</li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="securite-conditions">Sécurité des données</label>
        <input id="securite-conditions" type="checkbox" name="menu" />  
        <ul class="sub-conditions">  
          <li>Nous avons mis en place des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, la perte ou la divulgation. Cependant, veuillez noter qu'aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée.</li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="modification-conditions">Modifications de la politique de confidentialité</label>
        <input id="modification-conditions" type="checkbox" name="menu" />
        <ul class="sub-conditions">
          <li>Nous pouvons mettre à jour notre politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page et vous serez informé(e) des changements importants par le biais d'une notification sur notre site.</li>
        </ul>
      </li>
      <li class="has-sub-conditions">
        <label class="label-conditions" for="consentement-conditions">Consentement</label>
        <input id="consentement-conditions" type="checkbox" name="menu" /> 
        <ul class="sub-conditions">  
          <li>En utilisant notre site et en fournissant vos informations personnelles, vous consentez à la collecte, à l'utilisation et à la conservation de vos données conformément à cette politique de confidentialité.</li>
        </ul>
      </li>
    </ul>
  </div>
</template>
<style>
.container-conditions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.p-conditions{
  margin-top: 2em;
  font-size: 500;
}

.accordion-conditions{
  max-width: 90%;
  margin: 2.5em 5em 1em 5em;
  padding: 0;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
}
  
.sub-conditions{
  margin: 0;
  padding: 0;
}
  
li{
  display: block;
  border-radius: 0 0 10px 10px;
}
    
.label-conditions{
  cursor: pointer;
  display: block;
  font-weight: bold;
  padding: 1em 1em;
  overflow: hidden;
  background: #42b983;
  border-bottom: 1px solid #333;
  box-shadow: inset 0 1px 1px rgba(#fff,0.2);
}
    
  .label-conditions:hover{
    background: #277250;
    color: #fff;
  }
      
  input[type="checkbox"]{
    display: none;
  }
    
  .sub-conditions > li{
    cursor: pointer;
    overflow: hidden;
    height: 0;
    margin: 0;
    opacity: 0;
    font-size: 0.9em;
    font-weight: 500;
    transition: all 0.25s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
    
  .sub-conditions > li:hover{
    padding-left: 1.5em;
    background: rgba(0,0,0,0.1);
  }
      
  input:checked + .sub-conditions > li{
    padding: 0.9em 1.2em;
    height: auto;
    opacity: 1;
    margin-bottom: 10px;
    border-left:1px solid #555;
    border-right: 1px solid #555;
    border-bottom: 1px solid #555;
  }
    
</style>
