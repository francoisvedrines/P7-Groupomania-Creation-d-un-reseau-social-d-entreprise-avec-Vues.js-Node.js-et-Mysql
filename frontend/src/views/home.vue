<script>

import HeaderMain from '@/components/headerMain.vue'
import CreatePost from '@/components/CreatePost.vue'
import DisplayPost from '@/components/DisplayPost.vue'

import { mapState } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      title: String,
      content: String,
      attachment: String,
      revealCreatePost: false,
      search: ""
    }
  },
  components: {
    HeaderMain,
    CreatePost,
    DisplayPost
  },
  methods: {
    // méthode pour afficher ou masquer la modale d'édition d'un commentaire
    ToggleModal() {
      this.revealCreatePost = !this.revealCreatePost
    }
  },
  beforeMount() {
    // déclenche la récupération de l'utilisateur en cours dans le store
    this.$store.dispatch('getUserById')
  },
  mounted() {
    //déclenche la récupération de tout les posts dans le store
    this.$store.dispatch('getAllPosts')

  },
  computed: {
    //accès à la lecture du tableau posts du store
    ...mapState(['posts']),
    //fonction de filtrage des message pour la barre de recherche
    filteredList() {
      return this.posts.filter(post => {
        return  post.message.toLowerCase().includes(this.search.toLowerCase()) || 
        post.message.toLowerCase().includes(this.search.toLowerCase()) || 
        post.firstname.toLowerCase().includes(this.search.toLowerCase()) || 
        post.lastname.toLowerCase().includes(this.search.toLowerCase())
      })

    }
  }
}

</script>

<template>

  <HeaderMain />

  <main>
    <div class="container">

      <div v-if="revealCreatePost == false" class="d-flex justify-content-around flex-wrap ">
        <div class="py-2">
          <button id="btn-display-create" class="btn ms-auto " type="button" @click="ToggleModal"> Créer un nouveau
            message</button>
        </div>
        <div class="search-wrapper py-2">
          <i class="bi bi-search mx-2"></i>
          <label>Recherche</label>
          <input type="text" v-model="search" placeholder="Recherche..." />
        </div>
      </div>

      <CreatePost :revealCreatePost="revealCreatePost" :ToggleModal="ToggleModal" />

      <div class="d-flex mt-5">
        <h3 v-if="posts == '' " class="m-auto"> Aucun message publié. Créez le premier!</h3>
      </div>
      <div class="d-flex mt-5">
        <h3 v-if="filteredList == '' " class="m-auto"> Cette recherche ne donne aucun résultat.</h3>
      </div>

      <DisplayPost v-for="post in filteredList" :key="post.postId" :post="post" />

    </div>
  </main>

</template>




<style scoped>
#btn-display-create {
  background-color: var(--color-secondary);
}

.search-wrapper {
  position: relative;
}

label {
  display: none;
}

input {
  padding: 5px 12px;
  color: rgba(0, 0, 0, .70);
  border: 1px solid rgba(0, 0, 0, .12);
  transition: .15s all ease-in-out;
  background: white;
}

input:focus {
  outline: none;
  transform: scale(1.05);
}

input::-webkit-input-placeholder {
  font-size: 14px;
  color: rgba(0, 0, 0, .50);
  font-weight: 100;
}
</style>