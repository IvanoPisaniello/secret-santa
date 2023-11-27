<script>
export default {


}
</script>

<template>
    <header class="navbar navbar-expand-lg top">
        <div class="container">

            <a class="navbar-brand text-white" href="#">Secret Santa</a>
            <router-link class="text-white" to="/">Home</router-link>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.top {
    position: fixed;
    width: 100%;
    z-index: 999;
    background-color: (rgba(31, 23, 23, 0.325));
    color: white; // Cambia il colore del testo in base al tuo design
}
</style>