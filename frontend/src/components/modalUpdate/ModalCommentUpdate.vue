<script>

import { postService } from '@/services'

export default {
    name: 'ModalCommentUpdate',
    default() {
        return {
            commentId: Number
        }
    },
    props: {
        comment: Object,
        revealUpdate: Boolean,
        ToggleModal: Function
    },
    methods: {
        //méthode pour l'enregistrement des modifications du commentaire
        Publish() {
            if (this.comment.message != "") {
                postService.updateComment({ 'message': this.comment.message }, this.comment.commentId)
                    .then(res =>  this.ToggleModal())
                    .catch(error => console.log(error))
            }
        },
    }
}
</script>


<template>
    <article class="bloc-modal" v-if="revealUpdate">
        <div class="overlay"></div>
        <div class=" modal card" id="creat-comment d-flex m-3">
            <div class="btn-modal btn btn-danger" @click="ToggleModal">X</div>
            <p>Modification du commentaire :</p>
            <textarea class="form-control form-Comment shadow-sm" id="inputComment"  ref="textarea"
                v-model="this.comment.message"></textarea>
            <input type="button" class="btn button-color btn-sm my-auto ms-2" value="Envoyer" @click.prevent="Publish()">
        </div>
    </article>
</template>



<style scoped>
#inputComment {
    height: 150px;
}

</style>