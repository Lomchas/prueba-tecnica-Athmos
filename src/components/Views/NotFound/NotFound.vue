<template>
    <div class="container-noFound">
        <h1>'{{ this.$route.params.pathMatch }}' is not Found</h1>
        if you want to get in to login:
        <router-link to="/login">Click Here</router-link>
    </div>
</template>
<script>

export default {
    name: 'NotFound',
    components: {
    }
}
</script>

<style>
.container-noFound {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;
    height: 50vh;
}
</style>