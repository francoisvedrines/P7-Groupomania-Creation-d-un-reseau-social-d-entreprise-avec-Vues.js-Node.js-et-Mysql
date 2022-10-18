<script>

import { postService } from '@/services'

export default {
    name: 'CreateComment',
    default() {
        return {
            feedback: "",
            id: "",
            input: ""
        }
    },
    props: {
        post: {},

    },
    methods: {
        Publish() {
            const id = this.post.postId
            postService.createComment({ 'feedback': this.feedback }, id)
                .then(res => {
                    console.log(res)
                    postService.getComments(id)
                })
                .catch(error => console.log(error))
        },
        resize() {
            let element = this.$refs["textarea"];
            element.style.height = "18px";
            element.style.height = element.scrollHeight + "px";
        }


    },
}

</script>



<template>
    <article id="creat-comment" class="d-flex m-3">
        <textarea class="form-control form-Comment shadow-sm" id="inputComment" placeholder="Commentez ..."
            @input="resize()" ref="textarea" v-model="feedback"></textarea>
        <input type="button" class="btn button-color btn-sm my-auto ms-2" value="Envoyer" @click="Publish()">
    </article>

</template>