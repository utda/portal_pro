(function(t){function e(e){for(var n,s,l=e[0],i=e[1],c=e[2],d=0,p=[];d<l.length;d++)s=l[d],r[s]&&p.push(r[s][0]),r[s]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);u&&u(e);while(p.length)p.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,l=1;l<a.length;l++){var i=a[l];0!==r[i]&&(n=!1)}n&&(o.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},o=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=i;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"21d8":function(t,e,a){},"56d7":function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),r=a("bb71");a("da64");n["a"].use(r["a"],{iconfont:"md"});var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-toolbar",[a("v-toolbar-title",{staticClass:"headline"},[t._v("\n            UTokyo Digital Archives Project Pro\n        ")]),a("v-spacer"),a("v-toolbar-items",[a("v-btn",{attrs:{flat:""}},[a("a",{attrs:{href:"https://github.com/utda/portal_pro"}},[a("i",{staticClass:"material-icons"},[t._v("home")])])])],1)],1),a("v-content",[a("router-view")],1),a("v-footer",{attrs:{dark:"",height:"auto"}},[a("v-card",{staticClass:"flex",attrs:{flat:"",tile:""}},[a("v-card-actions",{staticClass:"grey darken-3 justify-center my-5 text-xs-center"},[t._v("\n                東京大学学術資産等アーカイブズ委員会事務局"),a("br"),t._v(" （東京大学附属図書館総務課／学術資産アーカイブ化推進室）\n                "),a("br"),t._v(" E-mail：digital-archive [at] lib.u-tokyo.ac.jp.\n            ")])],1)],1)],1)},s=[],l=a("2877"),i=a("6544"),c=a.n(i),u=a("7496"),d=a("8336"),p=a("b0af"),h=a("99d9"),f=a("549c"),v=a("553a"),b=a("9910"),m=a("71d9"),y=a("2a7f"),g={},_=Object(l["a"])(g,o,s,!1,null,null,null),j=_.exports;c()(_,{VApp:u["a"],VBtn:d["a"],VCard:p["a"],VCardActions:h["a"],VContent:f["a"],VFooter:v["a"],VSpacer:b["a"],VToolbar:m["a"],VToolbarItems:y["a"],VToolbarTitle:y["b"]});var w=a("8c4f"),x=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-content",[a("v-container",{staticClass:"my-2"},[a("h1",{staticClass:"mb-4"},[t._v("ポスター検索")]),a("v-layout",{attrs:{row:"",wrap:""}},t._l(t.items,function(e){return a("v-flex",{staticClass:"px-4 my-4",attrs:{xs12:"",sm2:""}},[a("a",{attrs:{href:e.seeAlso.value,target:"_blank"}},[a("v-img",{attrs:{src:e.thumbnail.value}})],1),a("div",{staticClass:"subheading pt-3"},[a("a",{attrs:{href:e.seeAlso.value,target:"_blank"}},[t._v(t._s(e.title.value))]),a("br"),t._v(t._s(e.publisher.value))])])}),1)],1)],1)],1)},V=[],C=a("dc09"),O=a("3cdd"),P=a.n(O),k=a("3e32"),q=a.n(k),E=a("a20c"),A=a.n(E),D=a("bc3a"),T=a.n(D);function F(t){let e=t.getFullYear(),a=t.getMonth()+1;return a=a<10?"0"+a:a,e+"-"+a}var I={components:{FullCalendar:C["a"]},data:function(){return{calendarPlugins:[P.a,q.a,A.a],calendarWeekends:!0,calendarEvents:[],defaultDate:new Date("1918-01"),q:"",type:"",collection:"",date:"1918-01",collection:"",items:[]}},watch:{$route(t,e){this.search()}},created:function(){let t=Object.assign({},this.$route.query);t.q&&(this.q=t.q),t.type&&(this.type=t.type),t.collection&&(this.collection=t.collection),t.date&&(this.defaultDate=new Date(t.date),this.date=F(this.defaultDate)),this.search()},methods:{updatePath(){this.defaultDate=new Date(this.date),this.$router.push({path:"list",query:{q:this.q,type:this.type,date:this.date,collection:this.collection}})},search(){this.calendarEvents=[];let t=" PREFIX dcterms: <http://purl.org/dc/terms/> \n";t+=" PREFIX dcndl: <http://ndl.go.jp/dcndl/terms/> \n",t+=" select distinct * \n",t+=" WHERE { \n",t+=" ?s dcterms:title ?title . \n",t+=" ?s foaf:thumbnail ?thumbnail . \n",t+=' { ?s dcterms:isPartOf "第一次世界大戦期プロパガンダ・ポスター 益田コレクション"@ja . }  \n',t+=" UNION \n",t+=' { ?s dcterms:isPartOf "第一次世界大戦期プロパガンダポスターコレクション"@ja . }  \n',t+=" ?s dcndl:digitizedPublisher ?publisher . \n",t+=' filter (lang(?publisher) = "ja") . \n',t+=" ?s rdfs:seeAlso ?seeAlso . \n",t+=" } order by ?title \n",T.a.get("https://sparql.dl.itc.u-tokyo.ac.jp?query="+encodeURIComponent(t)+"&output=json").then(t=>{this.items=t.data.results.bindings,console.log(this.items)}).catch(t=>{console.log(t)})}}},S=I,$=(a("6c31"),a("a523")),M=a("0e8f"),R=a("adda"),U=a("a722"),J=Object(l["a"])(S,x,V,!1,null,null,null),N=J.exports;c()(J,{VApp:u["a"],VContainer:$["a"],VContent:f["a"],VFlex:M["a"],VImg:R["a"],VLayout:U["a"]}),n["a"].use(w["a"]);var W=new w["a"]({routes:[{path:"/",name:"index",component:N},{path:"/poster",name:"poster",component:N}]});n["a"].config.productionTip=!1,new n["a"]({router:W,render:function(t){return t(j)}}).$mount("#app")},"6c31":function(t,e,a){"use strict";var n=a("21d8"),r=a.n(n);r.a}});
//# sourceMappingURL=app.7b75c25d.js.map