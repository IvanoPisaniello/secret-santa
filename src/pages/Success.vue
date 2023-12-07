<script>


export default {
    data() {
        return {

        }
    },

    methods: {

    },
    mounted() {

    }

}


</script>

<template>
    <div class="page-background">


        <h1 class="text-danger text-center"> <strong>IL SECRET SANTA E' UFFICIALMENTE INIZIATO!</strong></h1>

        <h2 class="text-danger text-center"> <strong>BUON DIVERTIMENTO!</strong></h2>
        <img src="../../public/slitta.png" alt="" class="slitta-success">
    </div>
</template>

<style lang="scss" scoped>
.slitta-success {
    height: 150px;
}

@keyframes illuminate {

    0%,
    100% {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.553);
    }

    50% {
        text-shadow: 0 0 30px rgba(255, 255, 255, 0.553);
    }
}

h1,
h2 {
    font-family: 'Mountains of Christmas', serif;
    color: gold;
    animation: illuminate 2s ease-in-out infinite;
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