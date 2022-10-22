<script>

import { postService } from '@/services'

export default {
    name: 'ModalCommentUpdate',
    default() {
        return {
            message: "",
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
            if (this.message != null) {
                postService.updateComment({ 'message': this.comment.message }, this.comment.commentId)
                    .then(res =>  this.ToggleModal())
                    .catch(error => console.log(error))
            }
        },
        //methode pour redimensionner le textarea
        resize() {
            let element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        }
    },
}
</script>


<template>
    <article class="bloc-modal" v-if="revealUpdate">
        <div class="overlay"></div>
        <div class=" modal card" id="creat-comment d-flex m-3">
            <div class="btn-modal btn btn-danger" @click="ToggleModal">X</div>
            <p>Modification du commentaire :</p>
            <textarea class="form-control form-Comment shadow-sm" id="inputComment" @input="resize()" ref="textarea"
                v-model="this.comment.message"></textarea>
            <input type="button" class="btn button-color btn-sm my-auto ms-2" value="Envoyer" @click="Publish()">
        </div>
    </article>
</template>

