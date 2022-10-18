<script>
import { postService } from '@/services'
import ModalCommentUpdate from '@/components/modalUpdate/ModalCommentUpdate.vue';

export default {
    name: 'DisplayComment',
    data () {
        return{
            revealUpdate: false,
        }
    },
    props: {
        post: {},
        posts: [],
        comment: {},
    },
    components: {
    ModalCommentUpdate
},
    methods: {
        DeleteComment(){
            console.log(this.comment)
            if(confirm('Etes-vous sur de supprimer le commentaire?'))
            postService.deleteComment(this.comment.commentId)
            .then(res => {
                console.log(res)
            })
        },
        ToggleModal(){
            this.revealUpdate = !this.revealUpdate
        }
    }
}

</script>

<template>

    <section id="display-comment">
        <p class="mx-3">Commentaires:</p>
        <div class=" display-comment d-flex align-items-center m-3 border shadow-sm rounded position-relative">
            <div class=" user-comment flex-column me-4">
                <img class=" rounded-circle p-2 avatar" v-if="!!comment.avatar" :src="comment.avatar">
                <p class="mx-2 card-title"> {{comment.firstname}} {{comment.lastname}}</p>
            </div>
            <div class="me-1">
                <p class="mx-2 card-title fst-italic"> {{comment.feedback}} </p>
                <i class="bi bi-pencil-square position-absolute top-100 start-0 translate-middle" role="button" @click="ToggleModal"></i>
                <i class="bi bi-trash-fill position-absolute top-100 start-100 translate-middle" role="button" @click="DeleteComment"></i>
            </div>
        </div>
    </section>

   <ModalCommentUpdate :comment="comment" :revealUpdate="revealUpdate" :ToggleModal="ToggleModal"/>

</template>

<style>
.display-comment {
    min-height: 5rem;
}
.user-comment {
    max-width: 8rem;
}

.user-comment .avatar{
    width: 4rem;
    height: 4rem;
}
</style>