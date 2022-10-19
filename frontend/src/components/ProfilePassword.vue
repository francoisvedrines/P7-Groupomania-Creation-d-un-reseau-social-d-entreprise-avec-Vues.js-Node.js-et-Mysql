<script>
import { userService } from '@/services'
import { mapGetters } from 'vuex'
export default {
    name: 'ProfilePassword',
    data() {
        return {
            password: "",
            checkPassword: ""
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        //méthode pour l'enregistrement du nouveau mot de passe 
        Submit() {
            // requête axios pour envoi a la base de données
            userService.updatePassword({'password': this.password}, this.user.id)
                .then(res => {
                    alert("mot de passe modifié")
                })
                .catch(error => console.log(error.response.data))
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
                        <input v-model="password" type="password" class="form-control" placeholder=" Saisir le nouveau mot de passe">
                    </div>
                    <div class="col-sm-12 text-secondary mt-3">
                        <input v-model="checkPassword" type="password" class="form-control" placeholder=" Vérifier le nouveau mot de passe">
                    </div>
                    <div class=" mt-4 text-secondary">
                        <input @click="Submit()" type="button" class="btn button-color px-4" value="Enregistrer">
                    </div>
                </div>
            </article>
        </div>
    </div>

</template>