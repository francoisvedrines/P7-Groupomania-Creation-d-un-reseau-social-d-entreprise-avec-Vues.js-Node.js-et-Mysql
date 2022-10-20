<script>

import { postService } from '@/services'

export default {
    name: 'ModalPostUpdate',
    data() {
        return {
            title: String,
            message: String,
            postId: Number
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
            // requête axios pour envoi a la base de données
            postService.updatePost(bodyPost, this.post.postId)
                .then(res => this.ToggleModal())
                .catch(error => console.log(error.response.data))
        },
        //méthode de redimensionnement auto du textarea
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
        <div class=" modal card">
            <div>
                <div class="btn-modal btn btn-danger" @click="ToggleModal">X</div>
                <p>Modification du message :</p>
                <label for="inputTitle"> Titre</label>
                <input type="text" id="inputTitle" class="form-control shadow-sm" 
                    aria-label="titre" v-model="this.post.title">
                <label for="inputContent"> Message</label>
                <textarea class="form-control shadow-sm" id="inputPost" @input="resize()" ref="textarea"
                    v-model="this.post.message"></textarea>
            </div>
            <div class="mt-1">
                <label for="formFile " class="d-block form-label">Joindre une nouvelle image</label>
                <div class="d-flex">
                    <input class=" form-control form-control-sm input-file shadow-sm" id="formFile" type="file"
                        v-on:change="fileSelectPost">
                    <input type="submit" class="d-inline btn button-color btn-sm ms-auto" value="Modifier"
                        @click="Publish()">
                </div>
            </div>
        </div>
    </article>

</template>
