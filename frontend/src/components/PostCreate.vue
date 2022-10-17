<script>

import { postService } from '@/services'

export default {
  name: 'PostCreate',
  data() {
    return {
      title: "",
      message: "",
    }
  },
  methods: {
    //lors de l'événement onchange (selection d'un fichier), enregistrement de ce fichier dans une variable
    fileSelectPost(event) {
      this.attachment = event.target.files[0]
    },
    //méthode pour la publication d'un post au clic du bouton
    Publish() {
      //déclaration du body au format formdata
      const bodyPost = new FormData()
      bodyPost.append('title', this.title)
      bodyPost.append('message', this.message)
      bodyPost.append('attachment', this.attachment)
      // requête axios pour envoi a la base de données
      postService.createPost(bodyPost)
        .then(res => {
          alert("message envoyé")
          window.location.reload() 
        })
        .catch(error => console.log(error.response.data))
      },
  },
}
</script>

<template>

  <article>
    <div>
      <label for="inputTitle"> Titre</label>
      <input type="text" id="inputTitle" class="form-control shadow-sm" placeholder="Donnez un titre ..."
        aria-label="titre" v-model="title" required>
      <label for="inputContent"> Que voulez-vous dire ?</label>
      <textarea class="form-control shadow-sm" id="inputPost" placeholder="Commencez à écrire ici" v-model="message"
        required></textarea>
    </div>
    <div class="mt-1">
      <label for="formFile " class="d-block form-label">Joindre une image</label>
      <div class="d-flex">
        <input class=" form-control form-control-sm input-file shadow-sm" id="formFile" type="file"
          v-on:change="fileSelectPost">
        <button type="submit" class="d-inline btn button-color btn-sm ms-auto" @click="Publish()">Envoyer </button>
      </div>
    </div>
  </article>

</template>