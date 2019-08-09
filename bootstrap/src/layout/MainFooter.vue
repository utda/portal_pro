<template>
    <footer class="footer" :class="{ [`footer-${type}`]: type }" :data-background-color="backgroundColor">
        <div class="container">
            <div class="copyright">
                東京大学学術資産等アーカイブズ委員会事務局<br/> （東京大学附属図書館総務課／学術資産アーカイブ化推進室）
                    <br/> E-mail：digital-archive [at] lib.u-tokyo.ac.jp.
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
