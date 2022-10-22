<script>

import { postService } from '@/services'

export default {
  name: 'CreatePost',
  data() {
    return {
      title: "",
      message: ""
    }
  },
  props: {
    revealCreatePost: Boolean,
    ToggleModal: Function
  },
  methods: {
    //lors de l'événement onchange (selection d'un fichier), enregistrement de ce fichier dans une variable
    fileSelectPost(event) {
      this.attachment = event.target.files[0]
    },
    //méthode pour la publication d'un post 
    Publish() {
      //déclaration du body au format formdata
      const bodyPost = new FormData()
      bodyPost.append('title', this.title)
      bodyPost.append('message', this.message)
      bodyPost.append('attachment', this.attachment)
      //bloque l'envois d'une requête sans payload
      if (this.title != "" && this.message != "") {
        // requête axios pour envoi a la base de données
        postService.createPost(bodyPost)
          .then(res => {
            this.$store.dispatch('getAllPosts')
            //remise à zéro du formulaire
            this.title = ""
            this.message = ""
            this.$refs.fileupload.value = null
            //fermeture du formulaire
            this.ToggleModal()
          })
          .catch(error => console.log(error))
      }
    },
    //méthode pour le redimensionnement auto du textarea
    resize() {
      let element = this.$refs["textarea"];
      element.style.height = "18px";
      element.style.height = element.scrollHeight + "px";
    }
  }
}
</script>

<template>

  <article v-if="revealCreatePost">
      <div>
        <form ref="createPost">
          <div>
            <div class="d-flex">
              <h3>Nouveau message :</h3>
              <button id="" class="d-inline btn button-color btn-sm ms-auto" type="button" @click="ToggleModal">Fermer</button>
            </div>
            <label class="labelPost my-1" for="inputTitle"> Titre</label>
            <input type="text" id="inputTitle" class="form-control shadow-sm" placeholder="titre obligatoire"
              aria-label="titre" v-model="this.title">
            <label class="labelPost my-1" for="inputContent"> Que voulez-vous dire ?</label>
            <textarea class="form-control shadow-sm" id="inputPost" placeholder="message obligatoire" @input="resize()"
              ref="textarea" v-model="message"></textarea>
          </div>
          <div class="mt-1">
            <label for="formFile" class="d-block labelPost my-1">Joindre une image</label>
            <div class="d-flex">
              <input class=" form-control form-control-sm input-file shadow-sm" id="formFile" ref="fileupload"
                type="file" v-on:change="fileSelectPost">
              <input type="submit" class="d-inline btn button-color btn-sm ms-auto" value="Envoyer"
                @click.prevent="Publish()">
            </div>
          </div>
        </form>
      </div>
      <hr class="dropdow-divider mt-5">
  </article>

</template>

<style scoped>
.labelPost {
  font-size: 1.1rem;
}
#inputPost {
  min-height: 300px;
}
</style>