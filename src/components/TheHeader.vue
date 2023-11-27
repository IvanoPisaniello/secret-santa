<script>
export default {


}
</script>

<template>
    <header class="navbar navbar-expand-lg navbar-light top">
        <div class="container">

            <a class="navbar-brand" href="#">Secret Santa</a>
            <router-link to="/">Home</router-link>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.top {
    position: relative;
    z-index: 999;
    background-image: url('/header-image2.jpg'); // Assicurati di specificare il percorso corretto
    background-size: contain;
    background-position: center;
    color: white; // Cambia il colore del testo in base al tuo design
}
</style>