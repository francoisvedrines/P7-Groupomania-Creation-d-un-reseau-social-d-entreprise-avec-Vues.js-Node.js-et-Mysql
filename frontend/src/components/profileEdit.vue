<script>

import { userService } from '@/services'
import { mapState } from 'vuex'


export default {
    name: 'ProfileEdit',
    data() {
        return {
            firstname: "",
            lastname: "",
        }
    },
    computed: {
        //récupération des données de l'utilisateur connecté
        ...mapState(['user'])
    },
    methods: {
        //lors de l'événement onchange (selection d'un fichier), enregistrement de ce fichier dans une variable
        fileSelectPost(event) {
            this.avatar = event.target.files[0]
        },
        //méthode pour l'enregistrement des nouvelles informations au clic du bouton
        Submit() {
            //déclaration du body au format formdata
            const bodyUser = new FormData()
            bodyUser.append('firstname', this.firstname)
            bodyUser.append('lastname', this.lastname)
            bodyUser.append('avatar', this.avatar)
            // blocage dde la possibilité d'envoyer une requête sans payload
            if(this.firstname.length > 0 || this.lastname.length > 0 || this.$refs.fileupload.value != ""){
            // requête axios pour envoi a la base de données
            userService.updateUser(bodyUser, this.user.id)
                .then(res => {
                    alert("profil enregistré")
                    //remise à jour des informations affichées
                    this.$store.dispatch('getUserById')
                    //vidage des champs
                    this.firstname = ""
                    this.lastname = ""
                    this.$refs.fileupload.value = null
                })
                .catch(error => console.log(error.response.data))
            }
        },
    }
}

</script>

<template>

    <article class="col-lg-12 mt-3">
        <div class="card">
            <div>
                <h5 class="m-2 text-decoration-underline">Modifier Profil</h5>
            </div>
            <div class="card-body">
                <section class="row mb-3">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Prénom</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <input  v-model="firstname" type="text" class="form-control" placeholder="Prénom...">
                    </div>
                </section>
                <section class="row mb-3">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Nom</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <input v-model="lastname" type="text" class="form-control" placeholder="Nom..." >
                    </div>
                </section>
                <section class="my-5">
                    <div class="d-flex">
                        <i class="bi bi-person-bounding-box"></i>
                        <label for="formFile" class="mx-1 d-block form-label">Modifier l'avatar</label>
                    </div>
                    <div class="d-flex">
                        <input v-on:change="fileSelectPost" ref="fileupload" class=" form-control form-control-sm input-file" id="formFile" type="file">
                    </div>
                </section>
                <div class="row">
                    <div class="col-sm-9">
                        <input @click.prevent="Submit()" type="button" class="btn button-color px-4" value="Enregistrer">
                    </div>
                </div>
            </div>
        </div>
    </article>

</template>
