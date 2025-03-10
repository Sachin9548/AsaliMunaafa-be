(window.webpackJsonp=window.webpackJsonp||[]).push([[43,10],{518:function(e,t,r){"use strict";r.r(t);r(124),r(54);var n={props:{labelText:{type:String,required:!0},selectedValue:{type:Array,required:!0},imageSrc:{type:String,required:!0},checkboxId:{type:String,required:!0},checkboxName:{type:String,required:!0},checkboxValue:{type:String,required:!0}},data:function(){return{selectValue:this.selectedValue}},watch:{selectedValue:function(){this.selectValue=this.selectedValue}},methods:{updateParent:function(){this.$emit("change",this.selectValue)}}},c=r(11),component=Object(c.a)(n,(function(){var e=this,t=e._self._c;return t("div",[t("form",{staticClass:"flex items-center gap-2"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectValue,expression:"selectValue"}],staticClass:"rounded",attrs:{type:"checkbox",id:e.checkboxId,name:e.checkboxName},domProps:{value:e.checkboxValue,checked:Array.isArray(e.selectValue)?e._i(e.selectValue,e.checkboxValue)>-1:e.selectValue},on:{change:[function(t){var r=e.selectValue,n=t.target,c=!!n.checked;if(Array.isArray(r)){var o=e.checkboxValue,l=e._i(r,o);n.checked?l<0&&(e.selectValue=r.concat([o])):l>-1&&(e.selectValue=r.slice(0,l).concat(r.slice(l+1)))}else e.selectValue=c},e.updateParent]}}),e._v(" "),t("img",{attrs:{src:e.imageSrc,alt:""}}),e._v(" "),t("label",{staticClass:"text-[#8C93BE] font-semibold text-lg cursor-pointer",attrs:{for:e.checkboxId}},[e._v(e._s(e.labelText))]),t("br")])])}),[],!1,null,null,null);t.default=component.exports},781:function(e,t,r){"use strict";r.r(t);r(35),r(40),r(51),r(52),r(41),r(18),r(36);var n=r(20),c=r(3),o=(r(28),r(31)),l=r(123);function d(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?d(Object(r),!0).forEach((function(t){Object(n.a)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):d(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var h={layout:"dashboard",data:function(){return{selectedValue:[],isLoading:!1,industry:["Clothing & Fashion","Jewellery & Accessories","Sports Wear & Product","Dropshipping","Home Decor","Electronics","Pharmaceutical","Food & Beverages","Skin Care","Other"]}},mounted:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var r,n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null===(r=e.getUserBusinessData)||void 0===r||!r.industry){t.next=4;break}return t.next=3,null===(n=e.getUserBusinessData)||void 0===n?void 0:n.industry;case 3:e.selectedValue=t.sent;case 4:case"end":return t.stop()}}),t)})))()},watch:{getUserBusinessData:{deep:!0,handler:function(e){null!=e&&e.industry&&(this.selectedValue=e.industry)}}},computed:m({},Object(o.c)({getUserBusinessData:"bussiness-details/getUserBusinessData"})),methods:m(m({},Object(o.b)({MarketingPlatformNext:"bussiness-details/marketingPlatform"})),{},{getName:function(e){this.selectedValue=e},back:function(){this.$router.push("/marketing-platform")},handleSubmit:function(){var e=this;return Object(c.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,""!=e.selectedValue){t.next=5;break}e.$toast.open({message:l.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),t.next=11;break;case 5:return e.isLoading=!0,data={industry:e.selectedValue,businessDetailsSteps:{step2:!0}},t.next=9,e.MarketingPlatformNext(data);case 9:t.sent,e.$router.push("/shipping");case 11:t.next=16;break;case 13:t.prev=13,t.t0=t.catch(0),e.$toast.open({message:t.t0,type:"error",duration:2e3,position:"bottom-right"});case 16:return t.prev=16,e.isLoading=!1,t.finish(16);case 19:case"end":return t.stop()}}),t,null,[[0,13,16,19]])})))()}})},f=r(11),component=Object(f.a)(h,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"max-w-fulls xl:mx-8 mx-0 mt-16 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"},[e._m(0),e._v(" "),t("div",{staticClass:"grid lg:grid-cols-2 grid-cols-1 mx-5 gap-3 mt-5 mb-5"},e._l(e.industry,(function(r,n){return t("CheckBox",{key:n,attrs:{"label-text":r,"checkbox-id":r,selectedValue:e.selectedValue,"checkbox-name":r,"checkbox-value":r,imageSrc:r},on:{change:e.getName}})})),1),e._v(" "),t("div",{staticClass:"flex gap-3 justify-end flex-column"},[t("button",{staticClass:"inline-flex items-center justify-center width-100 bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",on:{click:e.back}},[e._v("\n        Back\n      ")]),e._v(" "),t("button",{staticClass:"inline-flex items-center justify-center width-100 bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",attrs:{disabled:e.isLoading},on:{click:e.handleSubmit}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v(" Next")])],1)])])])}),[function(){var e=this,t=e._self._c;return t("div",[t("a",{attrs:{href:"#"}},[t("h5",{staticClass:"mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white"},[e._v("\n          Industry\n        ")])]),e._v(" "),t("p",{staticClass:"mb-3 mt-3 font-medium text-xl text-[#5B638B]"},[e._v("\n        Which types of Product you are selling ?\n      ")]),e._v(" "),t("p",{staticClass:"mb-3 mt-3 font-medium text-xl text-[#5B638B]"},[e._v("\n        ( You can select multiple options )\n      ")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{CheckBox:r(518).default,Loader:r(233).default})}}]);