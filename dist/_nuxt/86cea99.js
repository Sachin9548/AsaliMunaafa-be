(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{506:function(t,e,r){var content=r(536);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("4286dfeb",content,!0,{sourceMap:!1})},535:function(t,e,r){"use strict";r(506)},536:function(t,e,r){var n=r(25)((function(i){return i[1]}));n.push([t.i,"\n@media screen and (min-width: 1199px) {\n.rotate-2[data-v-bb6dfb36] {\n    transform: rotate(2deg);\n}\n.rotate-20[data-v-bb6dfb36] {\n    transform: rotate(20deg);\n}\n.-rotate-15[data-v-bb6dfb36] {\n    transform: rotate(-15deg);\n}\n.hover\\:right-\\[var\\(--hover-right\\)\\][data-v-bb6dfb36] {\n    right: var(--hover-right) !important;\n}\n}\n@media screen and (max-width: 1198px) {\n.review-card[data-v-bb6dfb36] {\n    transform: none !important;\n}\n}\n",""]),n.locals={},t.exports=n},551:function(t,e,r){"use strict";r.r(e);var n={props:{review:{type:String,required:!0},image:{type:String,required:!0},title:{type:String,required:!0},right:{type:String,required:!0},top:{type:String,required:!0},rotate:{type:String,required:!0},bgColor:{type:String,required:!0},hoverRight:{type:String,default:""}},computed:{cardStyle:function(){return{backgroundColor:this.bgColor,right:this.right,top:this.top}},rotateClass:function(){switch(this.rotate){case"2deg":case"2deg":return"rotate-2";case"20deg":return"rotate-20";case"-15deg":return"-rotate-15";default:return""}}}},o=(r(535),r(11)),component=Object(o.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"review-card sm:mx-0 mx-4 max-w-[340px] p-5 rounded-xl xl:absolute duration-300 ease-in-out transform hover:!scale-110 hover:z-50 hover:!rotate-0",class:[t.hoverRight?"hover:!right-[4rem]":"",t.rotateClass],style:t.cardStyle},[e("h1",{staticClass:"text-white pr-16"},[t._v(t._s(t.review))]),t._v(" "),e("img",{staticClass:"mt-36 rounded-full w-12 h-12",attrs:{src:t.image,alt:""}}),t._v(" "),e("p",{staticClass:"text-white mt-3"},[t._v(t._s(t.title))])])}),[],!1,null,"bb6dfb36",null);e.default=component.exports}}]);