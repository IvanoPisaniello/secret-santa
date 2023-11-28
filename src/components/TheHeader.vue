<script>
export default {


}
</script>

<template>
    <header class="navbar navbar-expand-lg top">
        <div class="container">

            <a class="navbar-brand text-danger" href="#">
                <h1>Secret Santa</h1>
            </a>
            <router-link class="text-danger" to="/">
                <h1>Home</h1>
            </router-link>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.top {
    position: fixed;
    width: 100%;
    z-index: 999;
    top: 0;
    background-color: (rgba(10, 7, 7, 0.415));
    color: red;
    font-family: 'Mountains of Christmas', serif;

}

.navbar {
    height: 60px;
}
</style>