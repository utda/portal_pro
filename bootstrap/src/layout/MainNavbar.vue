<template>
    <navbar position="fixed" type="primary" :transparent="transparent" :color-on-scroll="colorOnScroll" menu-classes="ml-auto">
        <template>
                      <router-link class="navbar-brand" to="/">
                      {{ $t("message.title") }}
                      </router-link>
</template>

<template slot="navbar-menu">
    <li class="nav-item">
        <a href="https://da.dl.itc.u-tokyo.ac.jp/portal" class="nav-link">{{ $t("message.title") }}</a>
    </li>
    <li class="nav-item"><a href="#" v-on:click.prevent="handleClick_changeLanguage('en')" class="nav-link">English</a></li>
    <li class="nav-item"><a href="#" v-on:click.prevent="handleClick_changeLanguage('ja')" class="nav-link">日本語</a></li>
</template>
  </navbar>
</template>

<script>
import { DropDown, NavbarToggleButton, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
import axios from 'axios';

export default {
    name: 'main-navbar',
    props: {
        transparent: Boolean,
        colorOnScroll: Number
    },
    components: {
        DropDown,
        Navbar,
        NavbarToggleButton,
        NavLink,
        [Popover.name]: Popover
    },
    methods: {
        handleClick_changeLanguage(lang) {
            this.$i18n.locale = lang;
        }
    }
};
</script>

<style scoped>

</style>
