(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{538:function(e,t,n){"use strict";(function(e){n(36),n(24),n(42),n(26),n(4),n(43),n(45);var r=n(23),o=(n(76),n(48),n(60),n(28),n(146),n(49),n(27),n(63),n(29),n(17),n(34),n(21),n(107)),l=n.n(o),c=n(544),d=n.n(c),f=n(584);n(586);function v(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){c=!0,o=e},f:function(){try{l||null==n.return||n.return()}finally{if(c)throw o}}}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var h,y=function(e){var t=document.createElement("div");t.className="pa-2";var n=document.createElement("div");n.className="mt-2",t.appendChild(n);var r=document.createElement("div");r.className="mt-2",t.appendChild(r);var o=e.annotation;o&&o.body.map((function(body){var e,div,t,button;"tagging"==body.purpose?r.appendChild((t=body.value,(button=document.createElement("span")).className="badge badge-secondary mx-1 pa-2",button.innerHTML=t,button)):n.appendChild((e=body.value,(div=document.createElement("div")).innerHTML=e.trim(),div.firstChild))}));return t};t.a={components:{},data:function(){return{dialog:!1,detail:{},baseUrl:"https://portal-pro.dl.itc.u-tokyo.ac.jp",search:"",headers:[{text:this.$t("name"),value:"label"},{text:this.$t("category"),value:"category"},{text:this.$t("legend"),value:"kigo"},{text:"",value:"detail",sortable:!1}],rows:[],viewer:null,anno:null,tabs:"",items:[],thres:2e3,alert:!1,details:[],hide:["sort"]}},props:{itemsAll:{required:!0},aggs:{required:!0}},created:function(){this.init()},methods:{zoom:function(e){this.anno.fitBounds(e)},init:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o,l,data,c,d,f,map,m,h,y,x,w,_,label,k,C,V,S,A,j,T,O,$,E,N,body,R,D,I,M,J,L,U;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.itemsAll,(o=JSON.parse(JSON.stringify(t.$route.query))).size=-1,o.max=-1,n.next=6,t.$localEs.search(null,o,null);case 6:for(m in l=n.sent,data=l.data,r=data.hits.hits,t.alert=!1,c=data.aggregations,d=c["図"].buckets,f=e.env.settings,map={},f)map[f[m].label]=m;h=[],y={},x=v(d);try{for(x.s();!(w=x.n()).done;)_=w.value,label=_.key,k=_.doc_count,C=map[label],h.push({id:C,label:label,value:k,annos:[],rows:[]}),y[label]=h.length-1}catch(e){x.e(e)}finally{x.f()}V=0,S=v(r),n.prev=21,S.s();case 23:if((A=S.n()).done){n.next=57;break}j=(j=A.value)._source,T=j["図"][0],O=h[y[T]],$=j.member.split("=")[1],O.image=j.thumbnail.split("/"+$)[0]+"/info.json",E=O.annos,N=O.rows,body=[{type:"TextualBody",value:'<div><a href="'.concat(t.baseUrl+"/item/"+j.objectID,'">').concat(j.label,"</a></div>")}],n.t0=regeneratorRuntime.keys(j);case 34:if((n.t1=n.t0()).done){n.next=48;break}if(R=n.t1.value,D=t.$utils.formatArrayValue(j[R])){n.next=39;break}return n.abrupt("continue",34);case 39:if(!"".concat(D).startsWith("http")){n.next=41;break}return n.abrupt("continue",34);case 41:if(!["objectID","fulltext","label","sort"].includes(R)){n.next=43;break}return n.abrupt("continue",34);case 43:if(!["地名/記述","記号"].includes(R)){n.next=45;break}return n.abrupt("continue",34);case 45:body.push({type:"TextualBody",purpose:"tagging",value:R+": "+D}),n.next=34;break;case 48:if(I={"@context":"http://www.w3.org/ns/anno.jsonld",id:j.objectID,type:"Annotation",body:body,target:{selector:{type:"FragmentSelector",conformsTo:"http://www.w3.org/TR/media-frags/",value:j.member.split("#")[1]}}},E.push(I),N.push({id:j.objectID,label:j.label,category:t.$utils.formatArrayValue(j["分類"]),kigo:t.$utils.formatArrayValue(j["記号説明"]),index:V}),!((V+=1)>=t.thres&&t.thres>0)){n.next=55;break}return t.alert=!0,n.abrupt("break",57);case 55:n.next=23;break;case 57:n.next=62;break;case 59:n.prev=59,n.t2=n.catch(21),S.e(n.t2);case 62:return n.prev=62,S.f(),n.finish(62);case 65:for(M=[],J=0,L=h;J<L.length;J++)(U=L[J]).annos.length>0&&(U.value=U.annos.length,M.push(U));t.items=M;case 68:case"end":return n.stop()}}),n,null,[[21,59,62,65]])})))()},update:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,c,v;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.anno=null,e.viewer=null,e.rows=[],document.getElementById("openseadragon").innerHTML="",n=e.items[Number(e.tabs)]){t.next=7;break}return t.abrupt("return");case 7:return t.next=9,l.a.get(n.image);case 9:r=t.sent,o=r.data,c=d()({id:"openseadragon",prefixUrl:"https://recogito.github.io/js/openseadragon/images/",tileSources:o}),e.viewer=c,v=f(c,{readOnly:!0,locale:"auto",widgets:[y]}),e.anno=v,v.setAnnotations(n.annos),e.rows=n.rows;case 18:case"end":return t.stop()}}),t)})))()},showAll:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.thres=-1,t.next=3,e.init();case 3:e.update();case 4:case"end":return t.stop()}}),t)})))()}},watch:{tabs:function(e){this.update()},$route:(h=Object(r.a)(regeneratorRuntime.mark((function e(t,n){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.query,o=n.query,delete r.layout,delete r.page,delete r.max,delete o.layout,delete o.page,delete o.max,JSON.stringify(r)==JSON.stringify(o)){e.next=12;break}return e.next=11,this.init();case 11:this.update();case 12:case"end":return e.stop()}}),e,this)}))),function(e,t){return h.apply(this,arguments)})}}}).call(this,n(202))},545:function(e,t,n){var content=n(589);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(16).default)("29daf1c1",content,!0,{sourceMap:!1})},585:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=585},588:function(e,t,n){"use strict";n(545)},589:function(e,t,n){var r=n(15)(!1);r.push([e.i,".badge-secondary{color:#fff;background-color:#6c757d}.badge{display:inline-block;padding:.25em .4em;font-size:75%;font-weight:700;line-height:1;text-align:center;white-space:nowrap;vertical-align:baseline;border-radius:.25rem;transition:color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out}.openseadragon-canvas{outline:none;background-color:#f4f4f4!important}svg.a9s-annotationlayer .a9s-annotation .a9s-inner,svg.a9s-annotationlayer .a9s-selection .a9s-inner{stroke:#1976d2}",""]),e.exports=r},635:function(e,t,n){"use strict";n.r(t);var r=n(538).a,o=(n(588),n(54)),l=n(58),c=n.n(l),d=n(638),f=n(499),v=n(233),m=n(92),h=n(513),y=n(620),x=n(515),w=n(234),_=n(189),k=n(514),C=n(540),V=n(512),S=n(615),A=n(622),j=n(109),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-tabs",{staticClass:"my-5",model:{value:e.tabs,callback:function(t){e.tabs=t},expression:"tabs"}},e._l(e.items,(function(t,r){return n("v-tab",{key:r,staticClass:"primary--text",attrs:{href:"#"+r}},[e._v("\n      "+e._s(t.label)+" ("+e._s(t.value.toLocaleString())+" "+e._s(e.$t("results"))+")\n    ")])})),1),e._v(" "),e.alert?n("v-alert",{staticClass:"my-5",attrs:{type:"warning",outlined:"",prominent:""}},[n("v-row",{attrs:{align:"center"}},[n("v-col",{staticClass:"grow"},[e._v("\n        上位\n        "+e._s(e.thres.toLocaleString())+"\n        件の結果のみを表示しています。全件を表示するには、検索結果を絞り込んでください。もしくは、表示に時間がかかる可能性がありますが、右のボタンから全件を表示してください。\n      ")]),e._v(" "),n("v-col",{staticClass:"shrink"},[n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.showAll()}}},[e._v("全件表示")])],1)],1)],1):e._e(),e._v(" "),n("v-row",{staticClass:"mb-5"},[n("v-col",{attrs:{cols:"12",md:"4"}},[n("v-data-table",{attrs:{headers:e.headers,items:e.rows,search:e.search},scopedSlots:e._u([{key:"top",fn:function(){return[n("v-text-field",{staticClass:"mx-4 my-5",attrs:{"background-color":"grey lighten-3",filled:"",rounded:"",dense:"","hide-details":"","single-line":"",placeholder:e.$t("add_a_search_term"),"append-icon":"mdi-magnify",clearable:"","clear-icon":"mdi-close-circle",label:e.$t("search")},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})]},proxy:!0},{key:"item.detail",fn:function(t){var r=t.item;return[n("a",{on:{click:function(t){return e.zoom(r.id)}}},[n("v-icon",{staticClass:"primary--text"},[e._v("mdi-select-search")])],1)]}}])})],1),e._v(" "),n("v-col",{attrs:{cols:"12",md:"8"}},[n("div",{staticStyle:{height:"600px",width:"100%"},attrs:{id:"openseadragon"}})])],1),e._v(" "),n("v-dialog",{attrs:{width:"500"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",{staticClass:"text-h5 grey lighten-2"},[n("span",{staticClass:"text-h5"},[e._v(e._s(e.detail.label))])]),e._v(" "),n("v-card-text",{staticClass:"py-5",staticStyle:{height:"600px","overflow-y":"auto"}},[n("v-simple-table",{scopedSlots:e._u([{key:"default",fn:function(){return[n("tbody",[e._l(e.details,(function(t,r){return[!e.hide[t.value]&&e.detail[t.value]&&e.detail[t.value].length>0?n("tr",{key:r},[n("td",[e._v(e._s(t.value))]),e._v(" "),n("td",[e._v(e._s(e.$utils.formatArrayValue(e.detail[t.value])))])]):e._e()]}))],2)]},proxy:!0}])})],1),e._v(" "),n("v-divider"),e._v(" "),n("v-card-actions",[n("v-btn",{attrs:{color:"primary",text:""},on:{click:function(t){e.dialog=!1}}},[e._v("\n          "+e._s("閉じる")+"\n        ")]),e._v(" "),n("v-spacer"),e._v(" "),n("v-btn",{attrs:{color:"primary",to:e.localePath({name:"item-id",params:{id:e.detail.objectID}})}},[e._v("\n          "+e._s("詳細を開く")+"\n        ")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VAlert:d.a,VBtn:f.a,VCard:v.a,VCardActions:m.a,VCardText:m.b,VCardTitle:m.c,VCol:h.a,VDataTable:y.a,VDialog:x.a,VDivider:w.a,VIcon:_.a,VRow:k.a,VSimpleTable:C.a,VSpacer:V.a,VTab:S.a,VTabs:A.a,VTextField:j.a})}}]);