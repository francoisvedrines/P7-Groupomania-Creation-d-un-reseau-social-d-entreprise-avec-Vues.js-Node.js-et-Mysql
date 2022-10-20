<script>

import { postService } from '@/services'

export default {
    name: 'CreateComment',
    default() {
        return {
            message: "",
            id: Number,
        }
    },
    props: {
        post: Object,
    },
    methods: {
        // requête pour la création d'un commentaire
        Publish() {
            postService.createComment({"message": this.message }, this.post.postId)
                .then(res => {
                    postService.getComments(this.post.postId)
                })
                
        },
        //méthode pour le redimensionement auto du textarea
        resize() {
            let element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        }
    }
}

</script>



<template>
    <article id="creat-comment" class="d-flex m-3">
        <textarea class="form-control form-Comment shadow-sm" id="inputComment" placeholder="Commentez ..."
            @input="resize()" ref="textarea" v-model="message"></textarea>
        <input type="button" class="btn button-color btn-sm my-auto ms-2" value="Envoyer" @click="Publish()">
    </article>

</template>