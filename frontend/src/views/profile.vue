<script>

import HeaderMain from '@/components/headerMain.vue'
import ProfileEdit from '@/components/ProfileEdit.vue'
import ProfilePassword from '@/components/ProfilePassword.vue'
import { mapGetters } from 'vuex'


export default {
    name: 'Profile',
    components: {
        HeaderMain,
        ProfileEdit,
        ProfilePassword
    },
    computed: {
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
                                <img v-if="!!user.avatar" :src="user.avatar" alt="avatar"
                                    class="rounded-circle mx-3 avatar">
                                <div class="mt-3">
                                    <h4>{{ user.firstname}} {{ user.lastname }}</h4>
                                    <p class="text-secondary mb-1">{{ user.email }}</p>
                                </div>
                            </div>
                        </article>
                    </div>

                    <ProfilePassword />

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