<template>
    <navbar position="fixed" type="primary" :transparent="transparent" :color-on-scroll="colorOnScroll" menu-classes="ml-auto">
        <template>
                  <router-link class="navbar-brand" to="/">
                    東京大学学術資産等アーカイブズポータル・ポスター検索
                  </router-link>
</template>

<template slot="navbar-menu">
    <li class="nav-item">
        <a href="https://da.dl.itc.u-tokyo.ac.jp/portal" class="nav-link">東京大学学術資産等アーカイブズポータル</a>
    </li>
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
    }
};
</script>

<style scoped>

</style>
