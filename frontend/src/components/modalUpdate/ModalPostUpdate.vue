<script>

import { postService } from '@/services'

export default {
    name: 'ModalPostUpdate',
    data() {
        return {
            postId: Number,
        }
    },
    props: {
        post: Object,
        revealUpdate: Boolean,
        ToggleModal: Function
    },
    methods: {
        //lors de l'événement onchange (selection d'un fichier), enregistrement de ce fichier dans une variable
        fileSelectPost(event) {
            this.attachment = event.target.files[0]
        },
        //méthode pour l'enregistrement des modifications du post
        Publish() {
            //déclaration du body au format formdata
            const bodyPost = new FormData()
            bodyPost.append('title', this.post.title)
            bodyPost.append('message', this.post.message)
            bodyPost.append('attachment', this.attachment)
            if (this.post.title != "" && this.post.message != "") {
                // requête axios pour envoi a la base de données
                postService.updatePost(bodyPost, this.post.postId)
                    .then((res) => {
                        this.$store.dispatch('getAllPosts')
                        this.ToggleModal()
                    })
                    .catch(error => console.log(error.response.data))
            }
        }
    }
}
</script>

<template>

    <article class="bloc-modal" v-if="revealUpdate">
        <div class="overlay"></div>
        <div class=" modal card">
            <div>
                <div class="btn-modal btn btn-danger" @click="ToggleModal">X</div>
                <p>Modification du message :</p>
                <label for="inputTitle"> Titre</label>
                <input type="text" id="inputTitle" class="form-control shadow-sm" aria-label="titre"
                    placeholder="titre obligatoire" v-model="this.post.title">
                <label for="inputContent"> Message</label>
                <textarea class="form-control shadow-sm" id="inputPost" ref="textarea" placeholder="message obligatoire"
                    v-model="this.post.message"></textarea>
            </div>
            <div class="mt-1 d-flex flex-wrap my-3 justify-content-around">
                <img :src="this.post.attachment" class="border img-modal" alt="image du post" v-if="!!post.attachment">
                <div class="d-flex-column">
                    <label for="formFile " class="d-block form-label label-join-img mx-1">Joindre une nouvelle image</label>
                        <input class=" form-control form-control-sm input-file shadow-sm mx-1" id="formFile" type="file"
                            v-on:change="fileSelectPost">
                        <input type="submit" class="d-inline btn button-color btn-sm mx-1 mt-2" value="Modifier"
                            @click.prevent="Publish()">
                    
                </div>
            </div>
        </div>
    </article>

</template>


<style>
#inputPost {
    height: 150px;
}

.card {
    max-width: 60%;
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    margin: auto;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: .25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}

.img-modal {
    max-height: 8rem;
    object-fit: cover;
}

.label-join-img {
    font-size: 1rem;
}

</style>