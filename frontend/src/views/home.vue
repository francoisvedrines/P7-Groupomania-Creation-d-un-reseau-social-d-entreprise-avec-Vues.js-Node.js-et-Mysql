<script>

import HeaderMain from '@/components/headerMain.vue'
import CreatePost from '@/components/CreatePost.vue'
import DisplayPost from '@/components/DisplayPost.vue'

import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      title: String,
      content: String,
      attachment: String,
    }
  },
  components: {
    HeaderMain,
    CreatePost,
    DisplayPost
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
    ...mapGetters(['posts'])
    
  }
}

</script>

<template>

  <HeaderMain />

  <main>
    <div class="container">

      <CreatePost />

      <hr class="dropdow-divider mt-5">

      <DisplayPost v-for="post in posts" :key="post.postId" :post="post" />
      

    </div>
  </main>

</template>

