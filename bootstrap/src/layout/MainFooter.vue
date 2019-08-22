<template>
    <footer class="footer" :class="{ [`footer-${type}`]: type }" :data-background-color="backgroundColor">
        <div class="container">
            <div class="copyright">
                {{ $t("message.committee") }}<br/> {{ $t("message.team") }}
                    <br/> E-mail：digital-archive [at] lib.u-tokyo.ac.jp
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    props: {
        backgroundColor: String,
        type: String
    },
    data() {
        return {
            year: new Date().getFullYear()
        };
    }
};
</script>

<style>

</style>
