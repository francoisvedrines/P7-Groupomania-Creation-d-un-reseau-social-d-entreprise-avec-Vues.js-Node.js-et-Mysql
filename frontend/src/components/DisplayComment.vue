<script>
import { postService } from '@/services'
import ModalCommentUpdate from '@/components/modalUpdate/ModalCommentUpdate.vue'
import { mapGetters } from 'vuex'

export default {
    name: 'DisplayComment',
    data() {
        return {
            revealUpdate: false,
        }
    },
    props: {
        post: Object,
        posts: Array,
        comment: Object,
    },
    emits:['refreshComments'],
    components: {
        ModalCommentUpdate
    },
    methods: {
        //requête pour suppression d'un commentaire
        DeleteComment() {
            if (confirm('Etes-vous sur de supprimer le commentaire?'))
                postService.deleteComment(this.comment.commentId)
                    .then(res => {
                       this.$emit('refreshComments')
                    })
                    .catch(error => console.log(error))
        },
        // méthode pour afficher ou masquer la modale d'édition d'un commentaire
        ToggleModal() {
            this.revealUpdate = !this.revealUpdate
        }
    },
    computed: {
        ...mapGetters(['userId', 'admin']),
        //contrôle si l'utilisateur est auteur ou administrateur pour l'authorisation d'édition
        author: function () {
            return this.userId === this.comment.user_id || this.admin === 1
        },
    }
}

</script>

<template>

    <section id="display-comment">
        <p class="mx-3">Commentaires:</p>
        <div class=" d-flex align-items-center m-3 border shadow-sm rounded position-relative">
            <div class=" flex-column me-4" >
                <img class=" rounded-circle p-2 avatar " v-if="!!comment.avatar" :src="comment.avatar">
                <p class="mx-2 card-title"> {{comment.firstname}} {{comment.lastname}}</p>
            </div>
            <div class="me-1 overflow-auto ">
                <p class="mx-2 fst-italic content"> {{comment.message}} </p>
                <i class="bi bi-pencil-square position-absolute top-100 start-100 translate-middle" role="button"
                    v-if="author" @click.prevent="ToggleModal"></i>
                <i class="bi bi-trash-fill position-absolute top-100 start-0 translate-middle" role="button"
                    v-if="author" @click.prevent="DeleteComment"></i>
            </div>
        </div>
    </section>

    <ModalCommentUpdate :comment="comment" :revealUpdate="revealUpdate" :ToggleModal="ToggleModal" />

</template>

<style scoped>
.avatar {
    width: 3rem;
    height: 3rem;
}
p {
    font-size: 0.8rem;
}

</style>