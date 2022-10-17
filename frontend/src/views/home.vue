<script>

import HeaderMain from '@/components/headerMain.vue'
import PostCreate from '@/components/PostCreate.vue'
import PostCard from '@/components/PostCard.vue'

import {mapGetters} from 'vuex'
//import des service axios pour les requêtes http
import { postService, userService } from '@/services'

export default {
  name: 'Home',
  data() {
    return {
      title: "",
      content: "",
      attachment: "",
      
    }
  },
  components: {
    HeaderMain,
    PostCreate,
    PostCard
  },
  beforeMount () {
    // récupération de l'utilisateur en cours dans le store
    this.$store.dispatch('getUserById')
  },
  mounted() {
    // récupération de tout les posts dans le store
    this.$store.dispatch('getAllPosts')
   
  },
  methods: {
    
        
  },
  computed:{
    ...mapGetters(['posts'])
    
  }
}

</script>

<template>

  <HeaderMain />

  <main>
    <div class="container">

      <PostCreate />

      <hr class="dropdow-divider mt-5">

      <PostCard v-for="post in posts" :key="post.postId" :post="post" />

    </div>
  </main>

</template>

