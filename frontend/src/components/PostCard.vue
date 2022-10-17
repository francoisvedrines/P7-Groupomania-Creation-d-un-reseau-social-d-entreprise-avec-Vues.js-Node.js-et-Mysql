<script>

import { postService } from '@/services'
import PostComment from '@/components/PostComment.vue';
import PostCreateComment from '@/components/PostCreateComment.vue';


export default {
    name: "PostCard",
    data() {
        return {
            title: "",
            content: "",
            attachment: "",
            comments: [],
            comment:{},
            id: ""
        }
    },
    components: {
    PostComment,
    PostCreateComment
},
    props: {
        post: {},
        posts:[],
    
    },
    mounted() {
        const id = this.post.postId
        postService.getComments(id)
        .then(res => this.comments = res.data)
    },
    computed:{
        
  }

}

</script>

<template>

    <div class="card mx-auto my-4 shadow-lg">
        <article id="display-post" class="card-body">
            <div
                class="d-flex flex-wrap align-items-center mb-3 border shadow rounded title-background position-relative">
                <i class="bi bi-trash-fill position-absolute top-0 start-100 translate-middle"></i>
                <div>
                    <img class="rounded-circle avatar p-2 mx-auto" v-if="!!post.avatar" :src="post.avatar">
                    <p class="card-title m-1 name-user">{{ post.firstname }} {{ post.lastname }} </p>
                </div>
                <div class="m-auto">
                    <h4 class="card-title mx-2"> {{ post.title }}</h4>
                    <p class="card-text"><small class="text-muted mx-1"> Le {{ post.datetime }}</small></p>
                </div>
            </div>
            <div class="position-relative rounded shadow-lg">
                <div class="border rounded my-2">
                    <i class="bi bi-pencil-square position-absolute top-0 start-100 translate-middle"></i>
                    <p class="card-text mx-1 py-3">{{ post.message }}</p>
                </div>
                <img :src="post.attachment" class="card-img-bottom" alt="image du post" v-if="!!post.attachment">
            </div>
        </article>

        <PostComment v-for="comment in comments" :key="comment.id" :comment="comment"/>

        <PostCreateComment :post="post" :comment="comment"/>

    </div>

</template>

<style>
.form-post {
    height: 150px;
}

.input-file {
    width: 300px;
}

label {
    font-size: 0.8rem;
}

.card {
    max-width: 70%;
}

@media (max-width: 768px) {
    .card {
        max-width: 95%;
    }
}

img {
    max-height: 30rem;
    object-fit: cover;
}

.border-style {
    color: var(--color-secondary);
}


.name-user {
    font-style: italic;
    font-size: 1.2rem;
}

.bi-trash-fill,
.bi-heart-fill {
    font-size: 1.5rem;
    color: var(--color-primary)
}

.bi-pencil-square {
    font-size: 1.2rem;
}

#comment .bi-trash-fill,
.bi-pencil-square {
    font-size: 0.9rem;
}

.count {
    color: black
}

.title-background {
    background: linear-gradient(-20deg, var(--color-secondary)65%, var(--color-primary));
}
</style>