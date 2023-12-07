<script>

import { store, createRandomAssociations } from '../store.js';
export default {
    data() {
        return {
            secretSanta: store.secretSanta,
        }
    },

    methods: {
        createRandomAssociations,
    },
    mounted() {

    }

}


</script>

<template>
    <div class="page-background">
        <h4 class="text-secondary">Associazioni Secret Santa:</h4>

        <p v-for="(santa, index) in secretSanta" :key="index" class="text-secondary">
            Il Regalo sarà inviato da:{{ santa.sender.name }} {{ santa.sender.surname }} -
            E ricevuto da: {{ santa.received.name }} {{ santa.received.surname }}
        </p>

        <h1 class="text-danger text-center">Il Secret Santa è ufficialmente iniziato!</h1>
        <h2 class="text-danger text-center">Buon Divertimento!</h2>
        <img src="../../public/slitta.png" alt="">
    </div>
    <div id="mySpinner" class="spinner-border visibility" role="status">
        <span class="sr-only">Loading...</span>
    </div>
</template>

<style lang="scss" scoped>
.visibility {
    visibility: visible;
}



.page-background {
    // Assicurati di specificare il percorso corretto
    background-size: cover;
    background-position: center;
    color: white; // Cambia il colore del testo in base al tuo
    height: 800px;
    padding-top: 100px;
}

@keyframes scroll {
    from {
        transform: translateX(100%); // Inizia dalla destra della pagina
    }

    to {
        transform: translateX(-140%); // Sposta verso sinistra della pagina
    }
}

img {
    animation: scroll 10s linear infinite;
}
</style>