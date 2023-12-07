  
<script>
import axios from "axios";

export default {
    data() {
        return {
            isLoading: false,
            participants: {
                name: '',
                surname: '',
                email: '',
            },
            items: JSON.parse(localStorage.getItem('participants')) || [],
            secretSanta: [],
            makeGift: [],
            receivedGift: [],
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
            if (
                this.participants.name.trim() !== '' &&
                this.participants.surname.trim() !== '' &&
                this.participants.email.trim() !== ''
            ) {
                this.items.push({ ...this.participants });
                this.participants = { name: '', surname: '', email: '' };
                this.updateLocalStorage();
            }
        },
        removeItem(index) {
            this.items.splice(index, 1);
            this.updateLocalStorage();
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },
        createRandomAssociations() {
            this.isLoading = true;
            while (this.secretSanta.length < this.items.length) {
                let gifterIsFound = false;
                let randomNumberForGifter = null;

                while (!gifterIsFound) {
                    randomNumberForGifter = this.getRandomInt(this.items.length);

                    if (!this.makeGift.includes(this.items[randomNumberForGifter])) {
                        console.log("Chi farà il regalo: " + this.items[randomNumberForGifter].name);
                        this.makeGift.push(this.items[randomNumberForGifter]);
                        gifterIsFound = true;
                    }
                }

                gifterIsFound = false;
                let randomNumberForGifted = null;

                while (!gifterIsFound) {
                    randomNumberForGifted = this.getRandomInt(this.items.length);

                    if (
                        !this.receivedGift.includes(this.items[randomNumberForGifted]) &&
                        randomNumberForGifted !== randomNumberForGifter
                    ) {
                        console.log("Chi riceverà il regalo: " + this.items[randomNumberForGifted].name);
                        this.receivedGift.push(this.items[randomNumberForGifted]);
                        gifterIsFound = true;
                    }
                }

                let newSecretSanta = {
                    sender: this.items[randomNumberForGifter],
                    received: this.items[randomNumberForGifted],
                };

                this.secretSanta.push(newSecretSanta);
            }
            console.log("dati che sto inviando sono questi", this.secretSanta);
            axios.post('http://127.0.0.1:8010/sendMail', { secretSanta: this.secretSanta })
                .then((response) => {
                    console.log('i dati inviati sono: ', response);
                    this.isLoading = false;
                    this.$router.push('/Success');
                })
                .catch((error) => {
                    if (!error.response) {
                        this.errorStatus = 'Error: errore di rete diocane';
                    } else {
                        this.errorStatus = error.response.data.message;
                    }
                });
        },
        updateLocalStorage() {
            localStorage.setItem('participants', JSON.stringify(this.items));
        },
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
    <div class="container mt-2 top">

        <div class="row  top-row">
            <!-- Colonna sinistra con il form -->
            <div class="col-4 mt-5">
                <img src="../../public/slitta.png" alt="">
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
            <!-- <router-link to="/Success"></router-link> -->


            <button @click="createRandomAssociations" class="btn btn-danger">Secret
                Santa</button>
        </div>






        <!-- <div v-if="isLoading" class="overlay"></div>


        <div v-if="isLoading" id="mySpinner" class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div> -->

        <div v-if="isLoading" class="overlay"></div>

        <div v-if="isLoading" class="container">
            <svg id="envelope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 500">

                <path class="st0"
                    d="M440 350H200c-2.8 0-5-2.2-5-5V155c0-2.8 2.2-5 5-5h240c2.8 0 5 2.2 5 5v190c0 2.8-2.2 5-5 5z"
                    id="envelope-back" />
                <path id="letter-bottom" class="st1" d="M198 156h243v189H198z" />
                <path id="letter-top" class="st1" d="M198 156h243v189H198z" />
                <path id="letter-top-2" class="st1" d="M198 156h243v189H198z" />
                <path class="st2"
                    d="M332.2 244.7c2-11.9 109-93.7 109-93.7 2.1 0 3.8 1.5 3.8 3.3v191.9c0 1.8-1.7 3.3-3.8 3.3 0 0-108.2-79.4-109-94.2-.1-2.1-.3-8.6 0-10.6z"
                    id="envelope-right" />
                <path class="st2"
                    d="M307.8 255.8c-2 11.9-109 93.7-109 93.7-2.1 0-3.8-1.5-3.8-3.3V154.3c0-1.8 1.7-3.3 3.8-3.3 0 0 108.2 79.4 109 94.2.1 2.1.3 8.6 0 10.6z"
                    id="envelope-left" />
                <path class="st0"
                    d="M327 249.3c15 1.7 118 97.3 118 97.3 0 1.9-1.9 3.4-4.2 3.4H199.2c-2.3 0-4.2-1.5-4.2-3.4 0 0 100-96.6 118.6-97.3 2.7-.2 10.9-.3 13.4 0z"
                    id="envelope-bottom" />
                <path
                    d="M319.4 295c-3.1 0-7.6-.6-11.1-4.1C274 257 195 154.3 195 154.3c0-2.4 1.9-4.3 4.2-4.3h241.6c2.3 0 4.2 1.9 4.2 4.3 0 0-82 103.6-115.5 136.6-3.1 3-7.1 4.1-10.1 4.1z"
                    fill="gray" id="envelope-top-shadow" />
                <path class="st1"
                    d="M319.4 291c-3.1 0-7.6-.5-11.1-4C274 254 195 154.2 195 154.2c0-2.3 1.9-4.2 4.2-4.2h241.6c2.3 0 4.2 1.9 4.2 4.2 0 0-82 100.8-115.5 132.8-3.1 2.9-7.1 4-10.1 4z"
                    id="envelope-top" />
            </svg>
        </div>
    </div>
</template>

<style lang="scss">
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);

    z-index: 998;

}

#mySpinner {
    position: fixed;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%);
    z-index: 10000;
    /* Assicurati che lo spinner sia sopra l'overlay */
}

@keyframes scroll {
    from {
        transform: translateX(1200px); // Inizia dalla destra della pagina
    }

    to {
        transform: translateX(-900px); // Sposta verso sinistra della pagina
    }
}

img {
    animation: scroll 20s linear infinite;
    height: 20px;
}


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


//loader


// VARIABLES

$envelope-color: red;







svg {
    display: block;
    width: 400px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    z-index: 999;
}

svg {
    animation: 2s envelope-enter, 2s envelope-pulse 2.75s infinite;
}


#letter-top {
    animation: 1.75s letter-top ease-out;
    animation-fill-mode: both;
    transform-origin: 50% 32%;
}

#letter-top-2 {
    animation: 1.75s letter-top-2 ease-out;
    animation-fill-mode: both;
    transform-origin: 50% 32%;
}

#letter-bottom {
    animation: 2s letter-bottom;
    animation-delay: 1s;
    animation-fill-mode: both;
}

#envelope-back {
    animation: 1s envelope-back;
    animation-delay: 1.5s;
    animation-fill-mode: both;
}

#envelope-top {
    animation: 1.25s envelope-top ease-in-out;
    animation-delay: 2s;
    animation-fill-mode: both;
    transform-origin: 50% 30%;
}

#envelope-top-shadow {
    animation: 1.25s envelope-top-shadow;
    animation-delay: 2s;
    animation-fill-mode: both;
    transform-origin: 50% 30%;
}

#envelope-right {
    animation: 1.25s envelope-right ease-in-out;
    animation-delay: 2s;
    animation-fill-mode: both;
    transform-origin: 69.5% 50%;
}

#envelope-left {
    animation: 1.25s envelope-left ease-in-out;
    animation-delay: 1.6s;
    animation-fill-mode: both;
    transform-origin: 30.5% 50%;
}

#envelope-bottom {
    animation: 1.25s envelope-bottom ease-in-out;
    animation-delay: 2s;
    animation-fill-mode: both;
    transform-origin: 50% 70%;
}

@keyframes letter-top {
    0% {
        transform: scaleY(-1) skewX(0deg);
        fill: #e6e6e6;
    }

    50% {
        transform: scaleY(0) skewX(-10deg);
        fill: darken(#e6e6e6, 20%);
    }

    60% {
        fill: lighten(#e6e6e6, 5%);
    }

    100% {
        transform: scaleY(1) skewX(0deg);
        fill: #e6e6e6;
    }
}

@keyframes letter-top-2 {
    0% {
        transform: scaleY(-1) skewX(0deg);
        fill: #e6e6e6;
    }

    50% {
        transform: scaleY(0) skewX(10deg);
        fill: darken(#e6e6e6, 20%);
    }

    60% {
        fill: lighten(#e6e6e6, 5%);
    }

    100% {
        transform: scaleY(1) skewX(0deg);
        fill: #e6e6e6;
    }
}

@keyframes letter-bottom {
    from {
        fill: #e6e6e6;
    }

    to {
        fill: darken(#e6e6e6, 10%);
    }
}

@keyframes envelope-back {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes envelope-enter {
    0% {
        opacity: 0;
        transform: scale(0);
    }

    50% {
        opacity: 1;
        transform: scale(1.1);
    }

    75% {
        // transform: scale(.95);
    }

    100% {
        transform: scale(1);
    }
}

@keyframes envelope-pulse {
    0% {
        transform: scale(1);
    }

    25% {
        transform: scale(1);
    }

    50% {
        transform: scale(.95);
    }

    100% {
        transform: scale(1);
    }
}



@keyframes envelope-top {
    0% {
        transform: scaleY(0);
        fill: lighten($envelope-color, 20%);
    }

    50% {
        transform: scaleY(-1);
        fill: lighten($envelope-color, 10%);
    }

    60% {
        fill: darken($envelope-color, 20%);
    }

    100% {
        transform: scaleY(1);
        fill: lighten($envelope-color, 10%);
    }
}

@keyframes envelope-top-shadow {
    0% {
        opacity: 0;
    }

    65% {
        opacity: 0;
        transform: scaleY(1.5);
    }

    100% {
        opacity: .25;
        transform: scaleY(1);
    }
}

@keyframes envelope-right {
    0% {
        transform: scaleX(0);
        fill: lighten(#ccc, 20%);
    }

    50% {
        transform: scaleX(-1);
        fill: #ccc;
    }

    60% {
        fill: darken(#ccc, 20%);
    }

    100% {
        transform: scaleX(1);
        fill: #ccc;
    }
}

@keyframes envelope-left {
    0% {
        transform: scaleX(0);
        fill: lighten(#ccc, 20%);
    }

    50% {
        transform: scaleX(-1);
        fill: #ccc;
    }

    60% {
        fill: darken(#ccc, 20%);
    }

    100% {
        transform: scaleX(1);
        fill: #ccc;
    }
}

@keyframes envelope-bottom {
    0% {
        transform: scaleY(0);
        fill: darken(#b3b3b3, 20%);
    }

    50% {
        transform: scaleY(-1);
        fill: #b3b3b3;
    }

    60% {
        fill: lighten(#b3b3b3, 20%);
    }

    100% {
        transform: scaleY(1);
        fill: #b3b3b3;
    }

}

.st0 {
    fill: #b3b3b3
}

.st1 {
    fill: #e6e6e6
}

.st2 {
    fill: #ccc
}
</style>

