<script>

import { store, addTo, removeItem, getRandomInt, createRandomAssociations, updateLocalStorage } from '../store.js';
export default {
    components: {

    },
    data() {
        return {

            store,
            items: store.items,
            participants: store.participants,
            capodanno: new Date('January 1, 2024 00:00:00').getTime(),
            countdown: {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            },
        }
    },

    methods: {
        addTo() {
            addTo(this.participants);  // passo i partecipanti come argomento altrimenti non funziona
            this.participants = { name: '', surname: '', email: '' };
        },
        removeItem,
        getRandomInt,
        createRandomAssociations,
        updateLocalStorage,
        updateCountdown() {
            const now = new Date().getTime();
            const difference = this.capodanno - now;

            this.countdown.days = Math.floor(difference / (1000 * 60 * 60 * 24));
            this.countdown.hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.countdown.minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            this.countdown.seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (difference < 0) {
                clearInterval(this.countdownInterval);
                this.formattedCountdown = 'Buon Anno!';
            }
        },




    },
    mounted() {
        this.updateCountdown();
        this.countdownInterval = setInterval(this.updateCountdown, 1000);
    },
    computed: {
        formattedCountdown() {
            return `${this.countdown.days}d ${this.countdown.hours}h ${this.countdown.minutes}m ${this.countdown.seconds}s`;
        },
    }


}







</script>

<template>
    <div class="container mt-5 top">
        <div class="row mt-5 top-row">
            <!-- Colonna sinistra con il form -->
            <div class="col-6">
                <form @submit.prevent="addTo" class="white-text">
                    <h1>Inserisci un Nuovo Partecipante!</h1>
                    <div class="mb-3">
                        <label for="name" class="form-label">Nome:</label>
                        <input v-model="participants.name" type="text" class="form-control red-border white-text" id="name"
                            required>
                    </div>

                    <div class="mb-3">
                        <label for="surname" class="form-label">Cognome:</label>
                        <input v-model="participants.surname" type="text" class="form-control red-border white-text"
                            id="surname" required>
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">E-mail:</label>
                        <input v-model="participants.email" type="email" class="form-control red-border white-text"
                            id="email" required>
                    </div>

                    <button type="submit" class="btn btn-secondary"><i class="fa-solid fa-plus"></i></button>
                </form>
            </div>


            <div class="col-6 d-flex flex-column align-items-end">
                <h1>Lista Partecipanti</h1>
                <div class="card">

                    <div class="card-body">

                        <ul>
                            <li v-for="(item, index) in items" :key="index" class="mt-4">
                                {{ item.name }} {{ item.surname }} - {{ item.email }}
                                <button @click="removeItem(index)" class="btn btn-secondary btn-sm"><i
                                        class="fa-solid fa-trash-can"></i></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="snow"></div>
        </div>
        <div class="row">
            <div class="col-12">
            </div>
            <div class="mt-5 text-center">
                <router-link to="/Success"><button @click="createRandomAssociations" class="btn btn-secondary">Secret
                        Santa</button></router-link>
            </div>


            <div>
                <h1>Countdown a Capodanno</h1>
                <div id="countdown">{{ formattedCountdown }}</div>
            </div>
        </div>

    </div>
</template>

<style lang="scss">
.container {
    width: 100%;
}

body {
    text-align: center;
    background-color: #f4f4f4;

}

#countdown {
    font-size: 5rem;
    margin-top: 50px;
}


li {
    list-style-type: none;
}

h1 {
    color: grey;
}

.card {
    background: transparent;
    color: grey;
    max-height: 400px;
    width: 500px;


    overflow: auto;

    border: 1px solid #ccc;
    padding: 10px;
    border: 10px grey solid;
    border-radius: 30px;
}

.white-text {
    color: grey;
    background: transparent;

}

.card::-webkit-scrollbar {
    width: 0px;
    /* Larghezza della scrollbar */
}



.top {
    // position: fixed;
    // z-index: 999;
}

$d: 70; // density
$w: 600; // grid size
$s: 3s; // speed

// Generate the snow image using radial gradients
$grad: (
);

@for $i from 0 to $d {
    $v: random(4) + 2;
    $a: random(5) * .1 + .5;
    $grad: $grad, radial-gradient($v+px $v+px at (random($w - $v * 2) + $v)+px (random($w - $v * 2) + $v)+px,
            rgba(255, 255, 255, $a) 50%,
            rgba(0, 0, 0, 0)) !global;
}


body {
    height: 100%;
    background-image: url('207.jpg');
    background-size: auto;
    overflow: hidden;
}

.snow,
.snow:before,
.snow:after {
    position: absolute;
    top: -$w + px;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: $grad;
    background-size: $w + px $w + px;
    animation: snow $s linear infinite;
    content: "";
}

.snow:after {
    margin-left: -$w/3 + px;
    opacity: .4;
    animation-duration: $s*2;
    animation-direction: reverse;
    filter: blur(3px);
}

.snow:before {
    animation-duration: $s*3;
    animation-direction: reverse;
    margin-left: -$w/2 + px;
    opacity: .65;
    filter: blur(1.5px);
}

@keyframes snow {
    to {
        transform: translateY($w + px);
    }
}
</style>

