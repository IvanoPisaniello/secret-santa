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
    <div class="mt-3">
        <h4>Associazioni Secret Santa:</h4>
        <ul>
            <li v-for="(santa, index) in secretSanta" :key="index">
                Il Regalo sarà inviato da:{{ santa.sender.name }} {{ santa.sender.surname }} -
                E ricevuto da: {{ santa.received.name }} {{ santa.received.surname }}
            </li>
        </ul>
    </div>
</template>