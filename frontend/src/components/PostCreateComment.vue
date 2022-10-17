<script>

import { postService } from '@/services'

export default {
    name: 'PostCreateComment',
    default() {
        return {
            feedback: {},
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
                    this.$store.dispatch('getAllPosts')
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
            v-model="feedback" required></textarea>
        <button type="button" class="btn button-color  mt-4 m-auto" @click="Publish()">Envoyer</button>
    </article>

</template>