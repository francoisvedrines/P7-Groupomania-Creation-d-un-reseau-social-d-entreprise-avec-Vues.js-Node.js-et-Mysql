<script>

import { accountService } from '@/services'
import { mapState } from 'vuex'
export default {
  name: 'HeaderMain',
  components:{
  },
  methods: {
    //méthode pour la décoonexion de l'utilisateur (supression du local storage) et redirection ver la page login
    logout() {
      accountService.logout()
      this.$router.push("/login")
    }
  },
  computed: {
    //récupération des données de l'utilisateur connecté
    ...mapState(["user"])
  },
}

</script>


<template>
  <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <section class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <img class="bi me-2" src="/logo.svg" alt="Groupomania">
        <ul class="nav col-lg-auto py-2 me-lg-auto justify-content-center">
          <li>
            <router-link to="/" class=" px-2 ">Accueil</router-link>
          </li>
          <li>
            <router-link :to="`/profile/${user.id}`" class="px-2 ">Profil</router-link>
          </li>
        </ul>
        <div class="d-flex py-2">
          <img v-if="!!user.avatar" :src="user.avatar" class="rounded-circle mx-3 avatar">
          <div>
            <p class="username">{{user.firstname}} {{user.lastname}}</p>
            <button type="button" class="d-inline btn btn-sm ms-auto" @click.prevent="logout()">Déconnexion</button>
          </div>
        </div>
      </section>
    </div>
  </header>

</template>

<style scoped>
header li a {
  color: var(--color-primary);
  font-size: 1.2rem;
  text-decoration: none;
}

header li a:hover,
header li a:focus {
  color: var(--color-secondary);

}

.username {
  color: var(--color-secondary);
  font-size: 1.5rem;
}

.avatar {
  height: 6rem;
  width: 6rem;
}
</style>