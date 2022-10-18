<script>

import { postService } from '@/services'

export default {
    name: 'ModalCommentUpdate',
    default() {
        return {
            feedback: "",
            commentId: ""
        }
    },
    props: ['comment', 'revealUpdate', 'ToggleModal'],
    methods: {
        Publish() {
            console.log(this.comment.feedback)
            postService.updateComment({ 'feedback': this.comment.feedback }, this.comment.commentId)
                .then(res => {
                    console.log(res)
                })
                .catch(error => console.log(error))
        },
    },
}
</script>


<template>
    <article class="bloc-modal" v-if="revealUpdate">
        <div class="overlay"></div>
        <div class=" modal card" id="creat-comment d-flex m-3">
            <div class="btn-modal btn btn-danger" @click="ToggleModal">X</div>
            <p>Modification du commentaire :</p>
            <textarea class="form-control form-Comment shadow-sm" id="inputComment"
                v-model="this.comment.feedback"></textarea>
            <input type="button" class="btn button-color btn-sm my-auto ms-2" value="Envoyer" @click="Publish()">
        </div>
    </article>
</template>

<style>

</style>