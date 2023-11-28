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
            <div class="col-4 mt-5">
                <form @submit.prevent="addTo" class="white-text">
                    <h1>Inserisci un Nuovo Partecipante!</h1>
                    <div class="">
                        <label for="name" class="form-label">Nome:</label>
                        <input v-model="participants.name" type="text" class="form-control red-border white-text" id="name"
                            required>
                    </div>

                    <div class="">
                        <label for="surname" class="form-label">Cognome:</label>
                        <input v-model="participants.surname" type="text" class="form-control red-border white-text"
                            id="surname" required>
                    </div>

                    <div class="">
                        <label for="email" class="form-label">E-mail:</label>
                        <input v-model="participants.email" type="email" class="form-control red-border white-text"
                            id="email" required>
                    </div>

                    <button type="submit" class="btn btn-danger mt-3"><i class="fa-solid fa-plus"></i></button>
                </form>
            </div>
            <div class="col-4 d-flex flex-column align-items-center">
                <h1>Countdown a Capodanno</h1>
                <h2 id="countdown">{{ formattedCountdown }}</h2>
                <ul>
                    <li class="hohoho">
                        <h2></h2>
                        <h2></h2>
                        <h2></h2>
                    </li>
                    <li class="santaclaus">
                        <div class="chapeu">
                            <div class="cone-2"></div>
                            <div class="cone-1"></div>
                        </div>
                        <div class="face">
                            <div class="eyes"></div>
                            <div class="nariz"></div>
                            <div class="barba">
                                <div class="boca"></div>
                            </div>
                        </div>
                        <div class="orelhas"></div>
                    </li>
                    <li class="hohoho">
                        <h2></h2>
                        <h2></h2>
                        <h2></h2>
                    </li>
                </ul>

            </div>

            <div class="col-4 d-flex flex-column align-items-end mt-5">
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

        <div class="col-12">
        </div>
        <div class="text-center btn-santa">
            <router-link to="/Success"><button @click="createRandomAssociations" class="btn btn-danger">Secret
                    Santa</button></router-link>
        </div>







    </div>
</template>

<style lang="scss">
.btn-santa {
    margin-top: 50px;
}

.row {
    padding-top: 100px;
}

form {
    width: 200px;
}

input {
    background: transparent;
    width: 200px;
    padding: 1em;
    border: none;
    border-left: 1px solid white;
    border-top: 1px solid white;
    border-radius: 5000px;
    backdrop-filter: blur(5px);
    box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
    color: #fff;
    font-family: Montserrat, sans-serif;
    font-weight: 500;
    transition: all 0.2s ease-in-out;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}


.container {
    width: 100%;
}

body {
    text-align: center;
    background-color: #f4f4f4;

    color: red;

}

#countdown {
    font-size: 3rem;
    padding: 1rem;
    margin-top: 50px;
    border: 1px white solid;
    border-radius: 20px;
    box-shadow: rgba(255, 255, 255, 0.379) 0px 0px 10px;

}


li {
    list-style-type: none;
}

h1,
h2 {
    color: red;
    font-family: 'Mountains of Christmas', serif;
}

.card {
    background: transparent;
    color: white;
    max-height: 300px;
    width: 300px;
    backdrop-filter: blur(5px);

    overflow: auto;


    padding: 10px;
    border: 1px white solid;
    box-shadow: rgba(255, 255, 255, 0.379) 0px 0px 10px;
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
    background-image: url('cartoon.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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
    z-index: -200;
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

//santa claus
ul {
    display: table;
    list-style: none;
    margin: 0 auto;
    max-width: 400px;
    /* Rimpicciolito del 50% */
    padding: 0;
}

ul li {
    display: inline-block;
    float: left;
}

.santaclaus {
    display: block;
    margin: 0 auto;
    max-width: 250px;
    /* Rimpicciolito del 50% */
}

.santaclaus>div {
    margin: 0 auto;
    max-width: 200px;
    /* Rimpicciolito del 50% */
}

.santaclaus .chapeu {
    display: block;
    position: relative;
    width: 155px;
    /* Rimpicciolito del 50% */
    z-index: 99;
}

.santaclaus .chapeu .cone-1 {
    border-left: 25px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 35px solid #D32F2F;
}

.santaclaus .chapeu .cone-2 {
    background-color: #D32F2F;
    border-top: 0px solid transparent;
    border-right: 170px solid #D32F2F;
    border-bottom: 50px solid transparent;
    border-color: transparent;
    box-shadow: -12.5px 7.5px 15px -2.5px rgba(1, 1, 1, 0.3);
    position: relative;
    left: -28px;
    top: 24.5px;

    transform: rotate(-15deg);

    border-radius: 15% 50% 0 50%;
}

.santaclaus .chapeu::after,
.santaclaus .chapeu::before {
    background-color: #fff;
    content: " ";
    display: block;
}

.santaclaus .chapeu::after {
    box-shadow: 0px -7.5px 20px -2.5px rgba(1, 1, 1, 0.4);
    height: 40px;
    margin-left: -7.5px;
    position: relative;
    width: 170px;

    border-radius: 0.4em;
}

.santaclaus .chapeu::before {
    box-shadow: 10px 10px 20px -2.5px rgba(1, 1, 1, 0.3);
    height: 40px;
    left: -60px;
    position: absolute;
    top: 40px;
    width: 40px;
    z-index: 111;

    border-radius: 25%;
}

.santaclaus .face {
    background-color: #ffccbc;
    box-shadow: 0px 0px 15px 2.5px rgba(1, 1, 1, 0.3);
    content: " ";
    display: block;
    height: 65px;
    position: relative;
    top: -5px;
    width: 150px;
}

.santaclaus>.orelhas {
    background-color: #eea2ad;
    box-shadow: 0px 0px 15px 2.5px rgba(1, 1, 1, 0.3);
    display: block;
    height: 30px;
    margin: 0 auto;
    position: relative;
    top: -62.5px;
    width: 165px;
    z-index: -1;

    border-radius: 0.5em 0.5em 1em 1em;
}

.santaclaus .face>.eyes {
    display: inline-block;
    height: 0px;
    margin: 10px auto 0;
    max-width: 80px;
    width: 100%;
}

.santaclaus .face>.eyes::before,
.santaclaus .face>.eyes::after {
    background-color: #111;
    content: " ";
    display: inline-block;
    float: left;
    height: 10px;
    width: 10px;

    border-radius: 50%;
}

.santaclaus .face>.eyes::after {
    float: right;
}

.santaclaus .face>.nariz {
    background-color: #EEA2AD;
    height: 25px;
    margin: 0 auto;
    position: relative;
    width: 35px;
    z-index: 111;

    border-radius: 50%;
}

.santaclaus .face>.barba {
    background-color: #ecf0f1;
    box-shadow: -5px 5px 5px -2.5px rgba(1, 1, 1, 0.3);
    height: 120px;
    margin: 0 auto;
    position: relative;
    top: -15px;
    width: 170px;
    left: -10px;

    transform: rotate(-20deg);

    border-radius: 0% 50% 35% 50%;
}

.santaclaus .face>.barba>.boca {
    height: 25px;
    left: 15px;
    margin: 0 auto;
    position: relative;
    top: 10px;
    width: 30px;

    border-radius: 50%;

    animation: hoho 1.6s ease-in-out infinite alternate;
}

.hohoho {
    height: 0;
    padding-top: 100px;
    width: 75px;

    animation: txtHohoho 1.6s ease-in-out infinite alternate;
}

.hohoho h2::before {
    text-shadow: 0px 5px 10px rgba(1, 1, 1, 0.4);
    color: #fff;
    content: "HO";
    font-size: 31px;
    line-height: 0.7em;
}

/* FadeIn e fadeOut per testi Hohoho */
@keyframes txtHohoho {
    from {
        opacity: .2
    }

    to {
        opacity: 1
    }
}


/*Texto Ho do meio em ambos os lados*/
@-webkit-keyframes txtHohohoMiddle {
    from {
        -webkit-transform: scale(1.5);
    }

    to {
        -webkit-transform: scale(1);
    }
}

@-moz-keyframes txtHohohoMiddle {
    from {
        -moz-transform: scale(1.5);
    }

    to {
        -moz-transform: scale(1);
    }
}

@keyframes txtHohohoMiddle {
    from {
        transform: scale(1.5);
    }

    to {
        transform: scale(1);
    }
}

/*Hohoho do lado esquerdo*/
@-webkit-keyframes txtHohohoLeft {
    to {
        -webkit-transform: scale(1.5);
    }
}

@-moz-keyframes txtHohohoLeft {
    to {
        -moz-transform: scale(1.5);
    }
}

@keyframes txtHohohoLeft {
    to {
        transform: scale(1.5);
    }
}

/*Hohoho do lado direito*/
@-webkit-keyframes txtHohohoRight {
    to {
        -webkit-transform: scale(1.5);
    }
}

@-moz-keyframes txtHohohoRight {
    to {
        -moz-transform: scale(1.5);
    }
}

@keyframes txtHohohoRight {
    to {
        transform: scale(1.5);
    }
}

/*Movimenta barba*/
@-webkit-keyframes animaBarba {
    to {
        -webkit-transform: rotate(-10deg);
    }
}

@-moz-keyframes animaBarba {
    to {
        -moz-transform: rotate(-10deg);
    }
}

@keyframes animaBarba {
    to {
        transform: rotate(-10deg);
    }
}

/*Hoho no movimento da boca*/
@-webkit-keyframes hoho {
    0% {
        background-color: #ecf0f1;
        box-shadow: 0px 20px 0 0 #111;
        height: 40px;
        width: 60px;
    }

    60% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 60px;
        width: 30px;
    }

    80% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 50px;
        width: 40px;
    }

    100% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 60px;
        width: 30px;
    }
}

@-moz-keyframes hoho {
    0% {
        background-color: #ecf0f1;
        box-shadow: 0px 20px 0 0 #111;
        height: 40px;
        width: 60px;
    }

    60% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 60px;
        width: 30px;
    }

    80% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 50px;
        width: 40px;
    }

    100% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 60px;
        width: 30px;
    }
}

@keyframes hoho {
    0% {
        background-color: #ecf0f1;
        box-shadow: 0px 20px 0 0 #111;
        height: 40px;
        width: 60px;
    }

    60% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 60px;
        width: 30px;
    }

    80% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 50px;
        width: 40px;
    }

    100% {
        background-color: #ecf0f1;
        box-shadow: 0px 60px 0 0 #111;
        height: 60px;
        width: 30px;
    }
}
</style>

