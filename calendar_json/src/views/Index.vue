<template>
  <v-app>
    <section class="mb-5">
      <v-parallax src="assets/hero.jpeg" height="600">
        <v-layout column align-center justify-center class="white--text">
          <h1 class="white--text mb-2 display-1 text-xs-center">カレンダー検索</h1>
        </v-layout>
      </v-parallax>
    </section>

    <h2 class="headline text-center mt-5">About</h2>

    <v-container>
      <p>カレンダー形式でアイテムを検索します。</p>
      <p>以下のフォームに所定のフォーマットのJSONファイルを読み込んで表示します。</p>

      <v-form ref="form">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field label="JSON URL" v-model="url" class="mx-2"></v-text-field>
          </v-flex>
        </v-layout>

        <v-btn color="primary" v-bind:to="{name: 'search'}">Search</v-btn>
      </v-form>
    </v-container>
  </v-app>
</template>