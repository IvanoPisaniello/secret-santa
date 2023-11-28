<script>
import { store } from '../store.js';
export default {
    data() {
        return {
            secretSanta: store.secretSanta,
        }
    },

    methods: {

    },

}


</script>

<template>
    <div class="page-background">
        <h4 class="text-secondary">Associazioni Secret Santa:</h4>
        <ul>
            <li v-for="(santa, index) in secretSanta" :key="index" class="text-secondary">
                Il Regalo sarà inviato da:{{ santa.sender.name }} {{ santa.sender.surname }} -
                E ricevuto da: {{ santa.received.name }} {{ santa.received.surname }}
            </li>
        </ul>
        <h1 class="text-danger text-center">Il Secret Santa è ufficialmente iniziato!</h1>
        <h2 class="text-danger text-center">Buon Divertimento!</h2>

    </div>
</template>

<style lang="scss" scoped>
.page-background {
    // Assicurati di specificare il percorso corretto
    background-size: cover;
    background-position: center;
    color: white; // Cambia il colore del testo in base al tuo
    height: 800px;
    padding-top: 100px;
}
</style>