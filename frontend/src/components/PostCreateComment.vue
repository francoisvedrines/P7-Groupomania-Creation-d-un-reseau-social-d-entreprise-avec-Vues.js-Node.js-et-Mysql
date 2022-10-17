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
                    window.location.reload()
                })
                .catch(error => console.log(error))
        },
    },
}

</script>



<template>
    <article>
        <section id="like" class="mx-3">
            <i class="bi bi-heart-fill"></i>
            <span class="count badge border"> {{post.like_count}} j'aime</span>
        </section>
        <section id="creat-comment" class="d-flex m-3">
            <textarea class="form-control form-Comment shadow-sm" id="inputComment" placeholder="Commentez ..."
                v-model="feedback" required></textarea>
            <button type="button" class="btn button-color  mt-4 m-auto" @click="Publish()">Envoyer</button>
        </section>
    </article>
</template>