<template>
    <Header :name="name"></Header>
    
</template>

<script>
    import Header from '../components/Header'
    export default {
        name: 'homepage',
        data() {
            return {
                name: 'illiant'
            }
        },
        components: {
            Header
        },
        mounted() {
         this.name = localStorage.getItem('username')
        }
    }
</script>

<style>
    #nameMenu {
        margin-right: 500px;
    }

</style>