<script>

import HeaderMain from '@/components/headerMain.vue'
import CreatePost from '@/components/CreatePost.vue'
import DisplayPost from '@/components/DisplayPost.vue'

import {mapState} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      title: String,
      content: String,
      attachment: String,
      revealCreatePost: false,
    }
  },
  components: {
    HeaderMain,
    CreatePost,
    DisplayPost
},
methods:{
 // méthode pour afficher ou masquer la modale d'édition d'un commentaire
 ToggleModal() {
            this.revealCreatePost = !this.revealCreatePost
        }
},
  beforeMount () {
    // déclenche la récupération de l'utilisateur en cours dans le store
    this.$store.dispatch('getUserById')
  },
  mounted() {
    //déclenche la récupération de tout les posts dans le store
    this.$store.dispatch('getAllPosts')
   
  },
  computed:{
    //accès à la lecture du tableau posts du store
    ...mapState(['posts'])
    
  }
}

</script>

<template>

  <HeaderMain />

  <main>
    <div class="container">

      <button v-if="revealCreatePost == false" id="btn-display-create" class="btn ms-auto" type="button" @click="ToggleModal">Créer un nouveau message</button>
      
      <CreatePost  :revealCreatePost="revealCreatePost" :ToggleModal="ToggleModal"/>
      <div class="d-flex mt-5">
      <h3 v-if="posts == '' " class="m-auto"> Aucun message publié. Créez le premier!</h3>
      </div>
      <DisplayPost v-for="post in posts" :key="post.postId" :post="post" />
    
    </div>
  </main>

</template>




<style scoped>

#btn-display-create{
  background-color: var(--color-secondary);
}

</style>