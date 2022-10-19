<script>
import HeaderSign from '@/components/headerSign.vue'
import { accountService } from '@/services'


export default {
  name: 'Login',
  data() {
    return {
      //données formulaire
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      //variable pour servire de bascule entre login et signup
      isLoginMode: true
    }
  },
  methods: {
    signIn() {
      // envois de la requête de connexion axios, enregistrement du token dans le localstorage et rediction sur la page principale
      accountService.login({ 'email': this.email, 'password': this.password })
        .then((res) => {
          accountService.saveToken(res.data.token)
          this.$store.dispatch("setIsAdmin", res.data.admin)
          this.$store.dispatch("setUserId", res.data.userId)
          this.$router.push("/")
        })
        .catch(error => console.log(error))
    },
    signUp() {
      //creation d'un objet FormData
      const body = new FormData()
      body.append('email', this.email)
      body.append('password', this.password)
      body.append('lastname', this.lastname)
      body.append('firstname', this.firstname)
      body.append('avatar', this.avatar)
      //envois de la requête axios pour la  création d'un utilisateur 
      accountService.signup(body)
        .then(res => {
          alert("Le compte a été créé. Veuillez à présent vous connecter")
        })
        .catch(error => console.log(error.response.data))
        this.isLoginMode = true
    },
    // méthode pour basculer de signin à signup, par défaut true =>> signin
    switchSign() {
      this.isLoginMode = !this.isLoginMode
    },
    //méthode pour capturer l'image sur le v-on change
    fileSelectAvatar(event) {
      this.avatar = event.target.files[0]
    }
  },
  components: {
    HeaderSign
  }
}

</script>


<template>

  <HeaderSign />
  
  <main>
    <article class="form-sign border shadow-lg rounded background-secondary">
      <form>
        <h2 class="mb-5 text-center">{{this.isLoginMode ? "S'identifier" : "S'inscrire"}}</h2>
        <div class="form-floating mb-2">
          <input type="email" class="form-control" id="email-input" placeholder="nom@example.com" v-model="email">
          <label for="email">Adresse mail</label>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" id="password-input" placeholder="Mot de passe" v-model="password">
          <label for="password">Mot de passe</label>
        </div>
        <div class="form-floating mb-2" v-if="isLoginMode == false">
          <input type="text" class="form-control" id="lastname-input" placeholder="Nom" v-model="lastname">
          <label for="lastname">Nom</label>
        </div>
        <div class="form-floating mb-2" v-if="isLoginMode == false">
          <input type="text" class="form-control" id="firstname-input" placeholder="Prénom" v-model="firstname">
          <label for="firstname">Prénom</label>
        </div>
        <div class="form-floating" v-if="isLoginMode == false">
          <input type="file" class="form-control" id="avatar-input" placeholder="avatar" v-on:change="fileSelectAvatar">
          <label id="label-avatar" for="avatar">Avatar</label>
        </div>
        <input v-if="isLoginMode == true" class="button-color w-100 btn btn-lg mt-5" type="submit" value="Connexion"
          @click.prevent="signIn()">
        <input v-else class="button-color w-100 btn btn-lg mt-5" type="submit" value="Inscription"
          @click.prevent="signUp()">
        <p class="mt-5 mb-1">{{this.isLoginMode ? "Pas encore de compte?" : "Déjà inscrit?"}}
          <a href="" @click.prevent="switchSign()">{{this.isLoginMode ? "Créez un compte." : "Revenez à la page connexion."}}</a>
        </p>
      </form>
    </article>
  </main>

</template>

<style scoped>
#label-avatar {
  opacity: 1;
}

#avatar-input {
  font-size: 0.8rem;
  padding-top: 2.1rem;
}

.form-sign.border .form-floating>.form-control {
  background: radial-gradient(circle, white 20%, var(--color-secondary));
}
</style>