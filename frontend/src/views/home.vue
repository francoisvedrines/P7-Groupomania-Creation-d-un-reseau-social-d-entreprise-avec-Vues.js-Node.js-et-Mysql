<script>

import HeaderMain from '@/components/headerMain.vue'
import PostCreate from '@/components/PostCreate.vue'
import HomeCard from '@/components/HomeCard.vue'

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
    PostCreate,
    HomeCard
  },
  beforeMount () {
    // récupération de l'utilisateur en cours dans le store
    this.$store.dispatch('getUserById')
  },
  mounted() {
    // récupération de tout les posts dans le store
    this.$store.dispatch('getAllPosts')
   
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

      <HomeCard v-for="post in posts" :key="post.postId" :post="post" />

    </div>
  </main>

</template>

