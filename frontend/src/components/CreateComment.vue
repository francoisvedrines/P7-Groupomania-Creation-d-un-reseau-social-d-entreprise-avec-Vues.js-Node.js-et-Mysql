<script>

import { postService } from '@/services'

export default {
    name: 'CreateComment',
    default() {
        return {
            feedback:"",
            id: ""
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


    },
    computed: {
    }

}

</script>



<template>
    <article id="creat-comment" class="d-flex m-3">
        <textarea class="form-control form-Comment shadow-sm" id="inputComment" placeholder="Commentez ..."
            v-model="feedback"></textarea>
        <input type="button" class="btn button-color btn-sm my-auto ms-2" value="Envoyer" @click="Publish()">
    </article>

</template>