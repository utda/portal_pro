<template>
    <div>
        <div class="page-header page-header-small">
            <parallax class="page-header-image" style="background-image: url('img/home.jpg')">
            </parallax>
            <div class="content-center">
                <div class="container">
                    <h1 class="title">東京大学学術資産等アーカイブズポータル・ポスター検索</h1>
                </div>
            </div>
        </div>
        <div class="section section-about-us">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
    
                        <blockquote>
                            <p class="blockquote blockquote-primary">
                                東京大学学術資産等アーカイブズポータルで公開されているポスターを一覧できます。
                            </p>
                        </blockquote>
                    </div>
                </div>
                <div class="separator separator-primary"></div>
    
                <div class="section-story-overview">
                    <div class="row">
                        <div class="col-md-2 my-4 px-4" v-for="item in items">
    
                            <a :href="item.seeAlso.value" target="_blank">
                                        <img :src="item.thumbnail.value" class="rounded img-raised"/>
                                    </a>
                            <p class="mt-3"><a :href="item.seeAlso.value" target="_blank">{{item.title.value}}</a><br/><small>{{item.publisher.value}}</small></p>
    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import { Button, FormGroupInput } from '@/components';
import axios from 'axios';

export default {
    name: 'landing',
    bodyClass: 'landing-page',
    components: {
        [Button.name]: Button,
        [FormGroupInput.name]: FormGroupInput
    },
    data() {
        return {
            form: {
                firstName: '',
                email: '',
                message: ''


            },
            items: []
        };
    },
    created: function() {
        let query = " PREFIX dcterms: <http://purl.org/dc/terms/> \n";
        query += " PREFIX dcndl: <http://ndl.go.jp/dcndl/terms/> \n";
        query += " select distinct * \n";
        query += " WHERE { \n";
        query += " ?s dcterms:title ?title . \n";
        query += " ?s foaf:thumbnail ?thumbnail . \n";
        query += " { ?s dcterms:isPartOf \"第一次世界大戦期プロパガンダ・ポスター 益田コレクション\"@ja . }  \n";
        query += " UNION \n";
        query += " { ?s dcterms:isPartOf \"第一次世界大戦期プロパガンダポスターコレクション\"@ja . }  \n";
        query += " ?s dcndl:digitizedPublisher ?publisher . \n";
        query += " filter (lang(?publisher) = \"ja\") . \n";
        query += " ?s rdfs:seeAlso ?seeAlso . \n";
        query += " } order by ?title \n";

        axios.get("https://sparql.dl.itc.u-tokyo.ac.jp?query=" + encodeURIComponent(query) + "&output=json")
            .then(response => {

                this.items = response.data.results.bindings
                console.log(this.items)

            }).catch(error => { console.log(error); });
    }
};
</script>

<style>

</style>
