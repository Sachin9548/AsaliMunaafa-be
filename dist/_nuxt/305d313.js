(window.webpackJsonp=window.webpackJsonp||[]).push([[45,10],{519:function(e,t,n){"use strict";n.r(t);n(124),n(53);var r={props:{labelText:{type:String,required:!0},selectedValue:{type:Array,required:!0},imageSrc:{type:String,required:!0},checkboxId:{type:String,required:!0},checkboxName:{type:String,required:!0},checkboxValue:{type:String,required:!0}},data:function(){return{selectValue:this.selectedValue}},watch:{selectedValue:function(){this.selectValue=this.selectedValue}},methods:{updateParent:function(){this.$emit("change",this.selectValue)}}},o=n(11),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("div",[t("form",{staticClass:"flex items-center gap-2"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectValue,expression:"selectValue"}],staticClass:"rounded",attrs:{type:"checkbox",id:e.checkboxId,name:e.checkboxName},domProps:{value:e.checkboxValue,checked:Array.isArray(e.selectValue)?e._i(e.selectValue,e.checkboxValue)>-1:e.selectValue},on:{change:[function(t){var n=e.selectValue,r=t.target,o=!!r.checked;if(Array.isArray(n)){var c=e.checkboxValue,l=e._i(n,c);r.checked?l<0&&(e.selectValue=n.concat([c])):l>-1&&(e.selectValue=n.slice(0,l).concat(n.slice(l+1)))}else e.selectValue=o},e.updateParent]}}),e._v(" "),t("img",{attrs:{src:e.imageSrc,alt:""}}),e._v(" "),t("label",{staticClass:"text-[#8C93BE] font-semibold text-lg cursor-pointer",attrs:{for:e.checkboxId}},[e._v(e._s(e.labelText))]),t("br")])])}),[],!1,null,null,null);t.default=component.exports},676:function(e,t,n){e.exports=n.p+"img/meta.abbb5e5.svg"},677:function(e,t,n){e.exports=n.p+"img/googleAds.2b44746.svg"},678:function(e,t){e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjA0OCAzLjI1MzE0QzEyLjI4ODggMi4zNzA0MiAxMS44OTEgMS4yMjk3NiAxMS45MjI1IDAuMDY4NEw5LjA4NDk2IDBWMC4yODQyMlYxMi4xNDM5QzguMzIxMDQgMTUuNTQ4MiAzLjM5NDA4IDE0LjY1OTkgMy44ODcyOCAxMS4xOTYyQzQuMTYyNSA5LjYxMzk4IDUuODYyMjQgOC42NDA1NCA3LjM3Mjk4IDkuMTkwOFY2LjI5NTY4QzQuMDg0MiA1LjcyMzEgMC45Njc0OTYgOC4zNDA2NiAxLjAwMDI2IDExLjY3NTVDMS4yODc3MiAxOC45MDc3IDExLjY2MDkgMTguOTA4OCAxMS45NDg4IDExLjY3NTVDMTEuODc2MiAxMS40MTY3IDExLjkxNjcgNi41OTcgMTEuOTA2NSA2LjE5MDU2QzEzLjE5NjcgNi45OTMzNiAxNC42OTc5IDcuMzk0NTggMTYuMjE4MiA3LjM0MzQ2VjQuMzUzM0MxNC44MTI3IDQuMzUzMyAxMy43NDAxIDMuOTc5NjIgMTMuMDQ4IDMuMjUzMTRaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K"},679:function(e,t,n){e.exports=n.p+"img/snapchat.0bf27de.svg"},785:function(e,t,n){"use strict";n.r(t);n(36),n(34),n(51),n(52),n(40),n(35);var r=n(20),o=n(4),meta=(n(124),n(39),n(77),n(54),n(18),n(37),n(93),n(161),n(92),n(28),n(676)),c=n.n(meta),l=n(677),d=n.n(l),m=n(678),f=n.n(m),x=n(679),h=n.n(x),v=n(31),M=n(123);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var j={layout:"dashboard",data:function(){return{selectedValue:[],isOpen:!1,isMarketing:!0,isLoading:!1,marketingPlatform:[{name:"Meta ads",image:c.a},{name:"Google ads",image:d.a},{name:"TikTok ads",image:f.a},{name:"Snapchat",image:h.a}],selectedPlatform:[],adAccountId:""}},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null===(n=e.getUserBusinessData)||void 0===n||null===(n=n.marketingPlatform)||void 0===n||!n.length){t.next=3;break}return e.$router.push("/industry"),t.abrupt("return");case 3:null!==(r=e.getUserBusinessData)&&void 0!==r&&r.marketingPlatform&&(e.selectedValue=e.getUserBusinessData.marketingPlatform),e.boundHandleMessage=e.handleMessage.bind(e),window.addEventListener("message",e.boundHandleMessage,!1);case 6:case"end":return t.stop()}}),t)})))()},beforeDestroy:function(){window.removeEventListener("message",this.boundHandleMessage)},computed:y({},Object(v.c)({getUserBusinessData:"bussiness-details/getUserBusinessData"})),methods:y(y({},Object(v.b)({MarketingPlatformNext:"bussiness-details/marketingPlatform"})),{},{getName:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.selectedValue=e;case 1:case"end":return n.stop()}}),n)})))()},connect:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var r,o,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if("Meta ads"!==e.name){n.next=15;break}if(t.adAccountId&&/^\d+$/.test(t.adAccountId)){n.next=4;break}return t.$toast.open({message:"Please enter a valid Ad Account ID",type:"error",duration:2e3,position:"bottom-right"}),n.abrupt("return");case 4:if(t.$set(e,"isConnecting",!0),r=window.location.origin,o=sessionStorage.getItem("token")){n.next=10;break}return t.$toast.open({message:"User not authenticated.",type:"error",duration:2e3,position:"bottom-right"}),n.abrupt("return");case 10:o.startsWith("Bearer ")||(o="Bearer "+o),c="https://asali-munaafa-be.vercel.app/marketing/metaauth/facebook?origin=".concat(encodeURIComponent(r),"&token=").concat(encodeURIComponent(o),"&adAccountId=").concat(encodeURIComponent(t.adAccountId)),window.open(c,"facebookOAuth","width=600,height=600"),n.next=16;break;case 15:console.log("Connect clicked for ".concat(e.name));case 16:case"end":return n.stop()}}),n)})))()},handleMessage:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:e.data&&"fb_connected"===e.data.type&&(t.selectedPlatform=t.selectedPlatform.map((function(e){return"Meta ads"===e.name?y(y({},e),{},{connected:!0,isConnecting:!1}):e})),t.$toast.open({message:"Meta connected successfully!",type:"success",duration:2e3,position:"bottom-right"}),setTimeout((function(){t.$router.push("/industry")}),1e3));case 1:case"end":return n.stop()}}),n)})))()},marketingPlatformNext:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,e.selectedValue&&0!==e.selectedValue.length){t.next=5;break}e.$toast.open({message:M.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),t.next=10;break;case 5:return e.isLoading=!0,e.selectedPlatform=e.marketingPlatform.filter((function(t){return e.selectedValue.includes(t.name)})).map((function(e){return y(y({},e),{},{connected:!1,isConnecting:!1})})),data={marketingPlatform:e.selectedValue,businessDetailsSteps:{step1:!0}},t.next=10,e.MarketingPlatformNext(data);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),e.$toast.open({message:t.t0,type:"error",duration:2e3,position:"bottom-right"});case 15:return t.prev=15,e.isLoading=!1,e.isMarketing=!1,e.isOpen=!0,t.finish(15);case 20:case"end":return t.stop()}}),t,null,[[0,12,15,20]])})))()},back:function(){this.isMarketing=!0,this.isOpen=!1},handleSubmit:function(){this.$router.push("/industry")}})},A=n(11),component=Object(A.a)(j,(function(){var e=this,t=e._self._c;return t("div",[e.isMarketing?t("div",{staticClass:"max-w-fulls xl:mx-8 mx-0 mt-16 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"},[e._m(0),e._v(" "),t("div",{staticClass:"grid lg:grid-cols-2 grid-cols-1 mx-5 gap-3 mt-5 mb-5"},e._l(e.marketingPlatform,(function(n,r){return t("CheckBox",{key:r,attrs:{"label-text":n.name,"checkbox-id":n.name,imageSrc:n.image,selectedValue:e.selectedValue,"checkbox-name":n.name,"checkbox-value":n.name},on:{change:e.getName}})})),1),e._v(" "),t("div",{staticClass:"flex gap-3 justify-end"},[t("button",{staticClass:"inline-flex items-center justify-center width-100 bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",attrs:{disabled:e.isLoading},on:{click:e.marketingPlatformNext}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v(" Next")])],1)])]):e._e(),e._v(" "),e.isOpen?t("div",{staticClass:"max-w-fulls mt-16 my-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"},[e._m(1),e._v(" "),t("p",{staticClass:"mt-8 mb-6 font-medium text-xl text-[#5B638B]"},[e._v("Ad Platform")]),e._v(" "),e._l(e.selectedPlatform,(function(n,r){return t("div",{key:r,staticClass:"mb-6"},[t("div",{staticClass:"flex items-center justify-between"},[t("div",{staticClass:"flex items-center gap-4"},[t("div",{staticClass:"py-2 px-2 rounded-full bg-gray-200 transition-main w-7"},[t("img",{attrs:{src:n.image,alt:""}})]),e._v(" "),t("div",{staticClass:"text-[#5B638B] font-medium lg:text-xl text-md"},[e._v("\n            "+e._s(n.name)+"\n          ")]),e._v(" "),"Meta ads"===n.name?t("div",{},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.adAccountId,expression:"adAccountId"}],staticClass:"border p-2 rounded w-full",attrs:{type:"text",placeholder:"Enter Ad Account ID",required:""},domProps:{value:e.adAccountId},on:{input:function(t){t.target.composing||(e.adAccountId=t.target.value)}}})]):e._e()]),e._v(" "),t("button",{staticClass:"inline-flex items-center justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold lg:py-4 py-3 lg:px-7 mt-4 px-4 text-sm rounded-md",attrs:{disabled:n.connected||n.isConnecting},on:{click:function(t){return e.connect(n)}}},[n.isConnecting?t("Loader",{attrs:{loading:n.isConnecting}}):t("span",[e._v("\n            "+e._s(n.connected?"Connected":"Connect")+"\n          ")])],1)])])})),e._v(" "),t("div",{staticClass:"flex gap-3 justify-end flex-column"},[t("button",{staticClass:"inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",on:{click:e.back}},[e._v("\n        Back\n      ")]),e._v(" "),t("button",{staticClass:"inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",attrs:{disabled:e.isLoading},on:{click:e.handleSubmit}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v(" Next")])],1)])],2):e._e()])}),[function(){var e=this,t=e._self._c;return t("div",[t("a",{attrs:{href:"#"}},[t("h5",{staticClass:"mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white"},[e._v("\n          Marketing Platform\n        ")])]),e._v(" "),t("p",{staticClass:"mb-3 mt-3 font-medium text-xl text-[#5B638B]"},[e._v("\n        Which Platform do you advertise and select the Platform\n      ")])])},function(){var e=this,t=e._self._c;return t("div",[t("a",[t("h5",{staticClass:"mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white"},[e._v("\n          Available Integration\n        ")])]),e._v(" "),t("p",{staticClass:"mb-3 mt-3 font-medium text-xl text-[#5B638B]"},[e._v("\n        Connect your ad Platform to your Asali Munaafa dashboard below.\n      ")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{CheckBox:n(519).default,Loader:n(233).default})}}]);