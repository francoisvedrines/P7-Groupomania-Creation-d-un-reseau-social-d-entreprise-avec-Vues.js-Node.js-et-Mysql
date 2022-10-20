<script>
import { userService } from '@/services'
import { mapGetters } from 'vuex'

//import des composants pour ulisier le contrôleur de formulaire vuelidate
import { useVuelidate } from '@vuelidate/core'
import { errorPassword, requiredValue, minL, maxL, same}  from "../assets/rules.js"

export default {
    name: 'ProfilePassword',
    data() {
        return {
            password: "",
            checkPassword: "",
            v$: useVuelidate()
        }
    },
    //régles vuelidate pour le contrôle de saise dans le formulaire
    validations() {
        return {
            password: { requiredValue, minLength: minL(8), maxLength: maxL(20), errorPassword },
            checkPassword: { requiredValue, minLength: minL(8), maxLength: maxL(20), sameAs: same(this.password), errorPassword }
        }
    },

    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        //méthode pour l'enregistrement du nouveau mot de passe 
        Submit() {
            this.v$.$validate()
            if (this.v$.$errors.length === 0) {
                // requête axios pour envoi a la base de données
                userService.updatePassword({ 'password': this.password }, this.user.id)
                    .then(res => {
                        alert("mot de passe modifié")
                    })
                    .catch(error => console.log(error.response.data))
            }
        },
    }
}
</script>

<template>
    <div>
        <div class="card">
            <article class="card-body">
                <h6 class="mb-3">Modifier mot de passe</h6>
                <div class="row">
                    <div class="col-sm-12 text-secondary">
                        <input v-model="password" type="password" class="form-control"
                            placeholder="Nouveau mot de passe">
                    </div>
                    <small v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</small>
                    <div class="col-sm-12 text-secondary mt-3">
                        <input v-model="checkPassword" type="password" class="form-control" placeholder="Confirmation">
                    </div>
                    <small v-if="v$.checkPassword.$error">{{ v$.checkPassword.$errors[0].$message }}</small>
                    <div class=" mt-4 text-secondary">
                        <input @click="Submit()" type="button" class="btn button-color px-4" value="Enregistrer">
                    </div>
                </div>
            </article>
        </div>
    </div>

</template>