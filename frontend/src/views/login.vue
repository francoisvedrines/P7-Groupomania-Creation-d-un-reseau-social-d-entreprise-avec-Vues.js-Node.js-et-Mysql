<script>
import HeaderSign from '@/components/headerSign.vue'
import { accountService } from '@/services'

//import des composants pour utiliser le contrôleur de formulaire vuelidate
import { useVuelidate } from '@vuelidate/core'
import { errorPassword, requiredValue, minL, maxL, mail}  from "../assets/rules.js"


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
      isLoginMode: true,
      v$: useVuelidate(),
      msgLogin: "",
      msgSignUp: ""
    }
  },
  //régles vuelidate pour le contrôle de saise dans le formulaire
  validations() {
   
    if (this.isLoginMode) {
      return {
        email: { requiredValue, mail },
        password: { requiredValue, minLength: minL(8), maxLength: maxL(20), errorPassword },
      }
    } else {
      return {
        email: { requiredValue, mail },
        password: { requiredValue, minLength: minL(8), maxLength: maxL(20), errorPassword },
        firstname: { requiredValue, minLength: minL(3), maxLength: maxL(20)},
        lastname: { requiredValue, minLength: minL(3), maxLength: maxL(20)}
      }
    }
  },
  methods: {
    async signIn() {
      //appel de la fonction de vérification des champs avec vuelidate
      this.v$.$validate()
      if (this.v$.$errors.length === 0) {
        // envois de la requête de connexion axios, enregistrement du token dans le localstorage et rediction sur la page principale
        await accountService.login({ 'email': this.email, 'password': this.password })
          .then((res) => {
            if (res) {
              accountService.saveToken(res.data.token)
              this.$store.dispatch("setIsAdmin", res.data.admin)
              this.$store.dispatch("setUserId", res.data.userId)
              this.$router.push("/")
            } else {
              this.msgLogin = " L'email ou le mot de passe n'est pas correct. Veuillez vérifier votre saisie."
            }
          })
          .catch(err => console.log(err))
      }
    },
    signUp() {
      //appel de la fonction de vérification des champs avec vuelidate
      this.v$.$validate()

      if (this.v$.$errors.length === 0) {
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
            if (res) {
              this.msgSignUp = "Le compte a été créé. Vous pouvez dès à présent vous connecter."
              this.isLoginMode = true
            } else {
              this.msgSignUp = "Un compte utilisateur est déjà existant avec cette adresse email"
            }
          })
          .catch(err => console.log(err))
      }
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
          <input type="email" class="form-control" id="email" name="email" placeholder="nom@example.com"
            v-model="email">
          <label for="email">Adresse mail</label>
          <small v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</small>
        </div>
        <div class="form-floating mb-2">
          <input type="password" class="form-control" id="password" name="password" placeholder="Mot de passe"
            v-model="password">
          <label for="password">Mot de passe</label>
          <small v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</small>
        </div>
        <small v-if=" this.msgLogin">{{ msgLogin }}</small>
        <div class="form-floating mb-2" v-if="isLoginMode == false">
          <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Nom" v-model="lastname">
          <label for="lastname">Nom</label>
          <small v-if="v$.lastname.$error">{{ v$.lastname.$errors[0].$message }}</small>
        </div>
        <div class="form-floating mb-2" v-if="isLoginMode == false">
          <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Prénom"
            v-model="firstname">
          <label for="firstname">Prénom</label>
          <small v-if=" v$.firstname.$error">{{ v$.firstname.$errors[0].$message }}</small>
        </div>
        <div class="form-floating" v-if="isLoginMode == false">
          <input type="file" class="form-control" id="avatar-input" name="avatar" placeholder="avatar"
            v-on:change="fileSelectAvatar">
          <label id="label-avatar" for="avatar">Avatar</label>
        </div>
        <small v-if=" this.msgSignUp">{{ msgSignUp }}</small>
        <input v-if="isLoginMode == true" class="button-color w-100 btn btn-lg mt-5" type="submit" value="Connexion"
          @click.prevent="signIn()">
        <input v-else class="button-color w-100 btn btn-lg mt-5" type="submit" value="Inscription"
          @click.prevent="signUp()">
        <p class="mt-5 mb-1">{{this.isLoginMode ? "Pas encore de compte?" : "Déjà inscrit?"}}
          <a href="" @click.prevent="switchSign()">{{this.isLoginMode ? "Créez un compte." : "Revenez à la page de connexion."}} </a>
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
  padding-top: 2rem;
}

.form-sign.border .form-floating>.form-control {
  background: radial-gradient(circle, white 20%, var(--color-secondary));
}

small {
  color: var(--color-primary);
  font-weight: 700;
}
</style>