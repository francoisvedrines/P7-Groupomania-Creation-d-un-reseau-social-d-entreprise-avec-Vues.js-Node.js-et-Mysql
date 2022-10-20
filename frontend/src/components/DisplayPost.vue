<script>

import { postService } from '@/services'
import DisplayComment from '@/components/DisplayComment.vue'
import CreateComment from '@/components/CreateComment.vue'
import ModalPostUpdate from '@/components/modalUpdate/ModalPostUpdate.vue'
import { mapGetters } from 'vuex'



export default {
    name: "DisplayPost",
    data() {
        return {
            title: String,
            attachment: File,
            comments: Array,
            comment: Object,
            id: Number,
            isLiked: Boolean,
            revealUpdate: false,
        }
    },
    components: {
        DisplayComment,
        CreateComment,
        ModalPostUpdate
    },
    props: {
        post: Object,
        posts: Array,
    },
    mounted() {
            
        //récupère la liste des commentaires au montage
        postService.getComments(this.post.postId)
            .then(res => {
                this.comments = res.data
            })
            //récupération de l'état like de l'utilisateur sur un post
        postService.searchLike(this.post.postId)
            .then(res => {
                this.isLiked = !!res.data.result[0]
            })

    },
    computed: {
        ...mapGetters(['userId', 'admin']),
        //contrôle si l'utilisateur est auteur ou administrateur pour l'authorisation d'édition
        author: function () {
            return this.userId === this.post.user_id || this.admin === 1
        },
    },
    
    methods: {
        //fonction incrémentation like et dislike
        Liked() {
            postService.likedPost(this.post.postId)
                .then(res => {
                    this.$store.dispatch('getAllPosts')
                })
                .catch(error => console.log(error))
        },
        // requête pour supression d'un post
        DeletePost() {
            if (confirm('Etes-vous sur de supprimer le post?'))
                postService.deletePost(this.post.postId)
                    .then(res => {
                        this.$store.dispatch('getAllPosts')
                        postService.getComments(this.post.postId)
                    })
        },
        //méthode pour afficher ou masquer la modale d'édition du post
        ToggleModal() {
            this.revealUpdate = !this.revealUpdate
        }
    }
    
}

</script>

<template>

    <div class="card mx-auto my-4 shadow-lg">
        <article id="display-post" class="card-body">
            <div
                class="d-flex flex-wrap align-items-center mb-3 border shadow rounded title-background position-relative">
                <i class="bi bi-trash-fill position-absolute top-0 start-100 translate-middle" role="button"
                    v-if="author" @click="DeletePost"></i>
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
                    <i class="bi bi-pencil-square position-absolute top-0 start-100 translate-middle" role="button"
                        v-if="author" @click="ToggleModal"></i>
                    <p class="card-text mx-1 py-3">{{ post.message }}</p>
                </div>
                <img :src="post.attachment" class="card-img-bottom" alt="image du post" v-if="!!post.attachment">
            </div>

            <button @click="Liked" id="like" class="mx-3 btn btn-outline-light">
                <i v-if="isLiked" class="bi bi-heart-fill"></i>
                <i v-else class="bi bi-heart"></i>
                <span class="ms-1 count badge border"> {{post.like_count}} j'aime</span>
            </button>

        </article>

        <DisplayComment v-for="comment in comments" :key="comment.id" :comment="comment" :post="post"/>

        <CreateComment :post="post" :comment="comment" />

        <ModalPostUpdate :post="post" :revealUpdate="revealUpdate" :ToggleModal="ToggleModal" />

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
.bi-heart-fill,
.bi-heart {
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