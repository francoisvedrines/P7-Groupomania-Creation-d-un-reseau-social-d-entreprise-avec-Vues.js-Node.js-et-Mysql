<script>

import HeaderMain from '@/components/headerMain.vue'
import ProfileEdit from '@/components/profileEdit.vue'
import {mapGetters} from 'vuex'

export default {
    name: 'Profile',
    components: {
        HeaderMain,
        ProfileEdit
    },
    computed:{
    ...mapGetters(['user'])
    
  }
}

</script>

<template>

    <HeaderMain />

    <div class="container mr-0">
        <div class="main-body">
            <div class="row">
                <div class="col-lg-4">
                    <div class="card">
                        <article class="card-body">
                            <div class="d-flex flex-column align-items-center text-center">
                                <img  v-if="!!user.avatar" :src="user.avatar"  alt="avatar"
                                    class="rounded-circle mx-3 avatar">
                                <div class="mt-3">
                                    <h4>{{ user.firstname}} {{ user.lastname }}</h4>
                                    <p class="text-secondary mb-1">{{ user.email }}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div>
                        <div class="card">
                            <article class="card-body">
                                <h6 class="mb-3">Modifier mot de passe</h6>
                                <div class="row">
                                    <div class="col-sm-12 text-secondary">
                                        <input type="text" class="form-control" value=" nouveau mot de passe">
                                    </div>
                                    <div class=" mt-4 text-secondary">
                                        <input type="button" class="btn button-color px-4" value="Enregistrer">
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>

                <ProfileEdit />

            </div>
            <article>
                <input type="button" class="btn button-color my-5 " value="Supprimer le compte">
            </article>
        </div>
    </div>

</template>

<style scope>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin: auto;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: .25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}

.me-2 {
    margin-right: .5rem;
}
</style>