<script>
import { userService } from '@/services'
import {mapGetters} from 'vuex'
export default {
    name: 'ProfileEdit',
    data() {
        return {
            users: []
        }
    },
    mounted() {
        userService.getAllUsers()
            .then(res => this.users = res.data)
            .catch(err => console.log(err))
    },
    computed:{
    ...mapGetters(['user'])
    }
}

</script>

<template>

    <article class="col-lg-8 mt-3">
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
                        <input type="text" class="form-control" :value="`${user.firstname}`">
                    </div>
                </section>
                <section class="row mb-3">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Nom</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <input type="text" class="form-control" :value="`${user.lastname}`">
                    </div>
                </section>
                <section class="row mb-3">
                    <div class="col-sm-3">
                        <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        <input type="text" class="form-control" :value="`${user.email}`">
                    </div>
                </section>
                <section class="mb-5">
                    <div class="d-flex">
                        <i class="bi bi-person-bounding-box"></i>
                        <label for="formFile" class="mx-1 d-block form-label">Modifier l'avatar</label>
                    </div>
                    <div class="d-flex">
                        <input class=" form-control form-control-sm input-file" id="formFile" type="file">
                    </div>
                </section>
                <div class="row">
                    <div class="col-sm-9">
                        <input type="button" class="btn button-color px-4" value="Enregistrer">
                    </div>
                </div>
            </div>
        </div>
    </article>

</template>

<style>

</style>