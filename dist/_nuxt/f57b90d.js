(window.webpackJsonp=window.webpackJsonp||[]).push([[53,10],{519:function(e,t,n){"use strict";n.r(t);n(124),n(53);var r={props:{labelText:{type:String,required:!0},selectedValue:{type:Array,required:!0},imageSrc:{type:String,required:!0},checkboxId:{type:String,required:!0},checkboxName:{type:String,required:!0},checkboxValue:{type:String,required:!0}},data:function(){return{selectValue:this.selectedValue}},watch:{selectedValue:function(){this.selectValue=this.selectedValue}},methods:{updateParent:function(){this.$emit("change",this.selectValue)}}},o=n(11),component=Object(o.a)(r,(function(){var e=this,t=e._self._c;return t("div",[t("form",{staticClass:"flex items-center gap-2"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.selectValue,expression:"selectValue"}],staticClass:"rounded",attrs:{type:"checkbox",id:e.checkboxId,name:e.checkboxName},domProps:{value:e.checkboxValue,checked:Array.isArray(e.selectValue)?e._i(e.selectValue,e.checkboxValue)>-1:e.selectValue},on:{change:[function(t){var n=e.selectValue,r=t.target,o=!!r.checked;if(Array.isArray(n)){var l=e.checkboxValue,c=e._i(n,l);r.checked?c<0&&(e.selectValue=n.concat([l])):c>-1&&(e.selectValue=n.slice(0,c).concat(n.slice(c+1)))}else e.selectValue=o},e.updateParent]}}),e._v(" "),t("img",{attrs:{src:e.imageSrc,alt:""}}),e._v(" "),t("label",{staticClass:"text-[#8C93BE] font-semibold text-lg cursor-pointer",attrs:{for:e.checkboxId}},[e._v(e._s(e.labelText))]),t("br")])])}),[],!1,null,null,null);t.default=component.exports},687:function(e,t,n){e.exports=n.p+"img/shiprocket.e04f155.svg"},688:function(e,t,n){e.exports=n.p+"img/truck.94d279c.svg"},689:function(e,t,n){e.exports=n.p+"img/packaging.aa7984f.svg"},791:function(e,t,n){"use strict";n.r(t);n(36),n(34),n(51),n(52),n(40),n(35);var r=n(20),o=n(4),l=(n(39),n(77),n(18),n(93),n(28),n(42)),c=n(687),d=n.n(c),m=n(688),h=n.n(m),f=n(689),x=n.n(f),v=n(31),y=n(123);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function w(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var _={layout:"dashboard",data:function(){return{selectedValue:[],selectedPlatform:[],isOpen:!1,isMarketing:!0,isLoading:!1,shipping:[{name:"Shiprocket",image:d.a},{name:"I think logistic",image:h.a},{name:"Delhivery",image:x.a}],isModalOpen:!1,modalEmail:"",modalPassword:"",modalLoading:!1}},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null===(n=e.getUserBusinessData)||void 0===n||!n.shipping){t.next=4;break}return t.next=3,null===(r=e.getUserBusinessData)||void 0===r?void 0:r.shipping;case 3:e.selectedValue=t.sent;case 4:case"end":return t.stop()}}),t)})))()},watch:{getUserBusinessData:{deep:!0,handler:function(e){null!=e&&e.shipping&&(this.selectedValue=null==e?void 0:e.shipping)}}},computed:w({},Object(v.c)({getUserBusinessData:"bussiness-details/getUserBusinessData"})),methods:w(w({},Object(v.b)({MarketingPlatformNext:"bussiness-details/marketingPlatform"})),{},{getName:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.selectedValue=e;case 1:case"end":return n.stop()}}),n)})))()},shipingBack:function(){this.$router.push("/industry")},handleShippingNext:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,0!==e.selectedValue.length){t.next=5;break}e.$toast.open({message:y.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),t.next=10;break;case 5:return e.isLoading=!0,e.selectedPlatform=e.shipping.filter((function(t){return e.selectedValue.includes(t.name)})),data={shipping:e.selectedValue,businessDetailsSteps:{step3:!0}},t.next=10,e.MarketingPlatformNext(data);case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(0),e.$toast.open({message:t.t0,type:"error",duration:2e3,position:"bottom-right"});case 15:return t.prev=15,e.isLoading=!1,e.isOpen=!0,e.isMarketing=!1,t.finish(15);case 20:case"end":return t.stop()}}),t,null,[[0,12,15,20]])})))()},back:function(){this.isMarketing=!0,this.isOpen=!1},handleSubmit:function(){this.$router.push("/about-business")},handleConnect:function(e){"Shiprocket"===e.name?(this.isModalOpen=!0,this.modalEmail="",this.modalPassword=""):this.$toast.open({message:"Integration for ".concat(e.name," is not available yet."),type:"info",duration:2e3,position:"bottom-right"})},closeModal:function(){this.isModalOpen=!1},submitShiprocketCredentials:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.modalEmail&&e.modalPassword){t.next=3;break}return e.$toast.open({message:"Please enter both email and password.",type:"error",duration:2e3,position:"bottom-right"}),t.abrupt("return");case 3:return e.modalLoading=!0,t.prev=4,t.next=7,l.a.post("/shipping/shiprocket/generateToken",{email:e.modalEmail,password:e.modalPassword});case 7:(n=t.sent)&&200===n.status?(e.$toast.open({message:"Shiprocket connected successfully!",type:"success",duration:2e3,position:"bottom-right"}),e.isModalOpen=!1,e.$router.push("/about-business")):e.$toast.open({message:"Failed to connect Shiprocket.",type:"error",duration:2e3,position:"bottom-right"}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(4),console.error("Error connecting Shiprocket:",t.t0),e.$toast.open({message:t.t0.response&&t.t0.response.data&&t.t0.response.data.msg||"Failed to connect Shiprocket.",type:"error",duration:2e3,position:"bottom-right"});case 15:return t.prev=15,e.modalLoading=!1,t.finish(15);case 18:case"end":return t.stop()}}),t,null,[[4,11,15,18]])})))()}})},C=n(11),component=Object(C.a)(_,(function(){var e=this,t=e._self._c;return t("div",[e.isMarketing?t("div",{staticClass:"max-w-fulls xl:mx-8 mx-0 mt-16 p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"},[e._m(0),e._v(" "),t("div",{staticClass:"mx-5 gap-3 mt-5 mb-5 flex flex-col gap-3"},e._l(e.shipping,(function(n,r){return t("CheckBox",{key:r,attrs:{"label-text":n.name,"checkbox-id":n.name,selectedValue:e.selectedValue,"checkbox-name":n.name,"checkbox-value":n.name,imageSrc:n.image},on:{change:e.getName}})})),1),e._v(" "),t("div",{staticClass:"flex gap-3 justify-end flex-column"},[t("button",{staticClass:"inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",on:{click:e.shipingBack}},[e._v("\n        Back\n      ")]),e._v(" "),t("button",{staticClass:"inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",attrs:{disabled:e.isLoading},on:{click:e.handleShippingNext}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v(" Next")])],1)])]):e._e(),e._v(" "),e.isOpen?t("div",{staticClass:"max-w-fulls mt-16 my-8 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"},[e._m(1),e._v(" "),t("p",{staticClass:"mt-8 mb-6 font-medium text-xl text-[#5B638B]"},[e._v("Ad Shipping")]),e._v(" "),e._l(e.selectedPlatform,(function(n,r){return t("div",{key:r,staticClass:"grid lg:grid-cols-2 grid-cols-1 gap-3 w-full"},[t("div",{staticClass:"flex justify-between items-center gap-4"},[t("div",{staticClass:"flex items-center gap-4"},[t("div",{staticClass:"py-2 px-2 rounded-full bg-gray-200 transition-main w-7"},[t("img",{attrs:{src:n.image,alt:""}})]),e._v(" "),t("div",{staticClass:"text-[#5B638B] font-medium lg:text-xl text-md"},[e._v("\n            "+e._s(n.name)+"\n          ")])]),e._v(" "),t("button",{staticClass:"inline-flex items-center justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold lg:py-4 py-3 mt-4 lg:px-7 px-5 text-sm rounded-md",on:{click:function(t){return e.handleConnect(n)}}},[e._v("\n          Connect\n        ")])])])})),e._v(" "),t("div",{staticClass:"flex gap-3 justify-end flex-column"},[t("button",{staticClass:"inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",on:{click:e.back}},[e._v("\n        Back\n      ")]),e._v(" "),t("button",{staticClass:"inline-flex items-center width-100 justify-center bg-[#2B0064] transition-main hover:to-[#EA69FF] bg-primaryBg text-white font-bold py-4 mt-4 px-12 text-sm rounded-md",attrs:{disabled:e.isLoading},on:{click:e.handleSubmit}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v(" Next")])],1)])],2):e._e(),e._v(" "),e.isModalOpen?t("div",{staticClass:"fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"},[t("div",{staticClass:"bg-white p-6 rounded-lg shadow-lg w-96"},[t("h2",{staticClass:"text-xl font-bold mb-4"},[e._v("Connect Shiprocket")]),e._v(" "),t("div",{staticClass:"mb-4"},[t("label",{staticClass:"block text-sm font-medium text-gray-700",attrs:{for:"modalEmail"}},[e._v("\n          Email\n        ")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.modalEmail,expression:"modalEmail"}],staticClass:"mt-1 block w-full border-gray-300 rounded-md p-2",attrs:{type:"email",id:"modalEmail",placeholder:"Enter your email"},domProps:{value:e.modalEmail},on:{input:function(t){t.target.composing||(e.modalEmail=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"mb-4"},[t("label",{staticClass:"block text-sm font-medium text-gray-700",attrs:{for:"modalPassword"}},[e._v("\n          Password\n        ")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.modalPassword,expression:"modalPassword"}],staticClass:"mt-1 block w-full border-gray-300 rounded-md p-2",attrs:{type:"password",id:"modalPassword",placeholder:"Enter your password"},domProps:{value:e.modalPassword},on:{input:function(t){t.target.composing||(e.modalPassword=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"flex justify-end gap-3"},[t("button",{staticClass:"bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600",on:{click:e.closeModal}},[e._v("\n          Cancel\n        ")]),e._v(" "),t("button",{staticClass:"bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center",attrs:{disabled:e.modalLoading},on:{click:e.submitShiprocketCredentials}},[e.modalLoading?t("Loader",{attrs:{loading:e.modalLoading}}):t("span",[e._v("Connect")])],1)])])]):e._e()])}),[function(){var e=this,t=e._self._c;return t("div",[t("a",{attrs:{href:"#"}},[t("h5",{staticClass:"mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white"},[e._v("\n          Shipping \n        ")])]),e._v(" "),t("p",{staticClass:"mb-3 mt-3 font-medium text-xl text-[#5B638B]"},[e._v("\n        Select your Shipping Portal\n      ")]),e._v(" "),t("p",{staticClass:"mb-3 mt-3 font-medium text-xl text-[#5B638B]"},[e._v("\n        ( You can select Multiple options )\n      ")])])},function(){var e=this,t=e._self._c;return t("div",[t("a",[t("h5",{staticClass:"mb-2 text-3xl font-bold tracking-tight text-[#7562FF] dark:text-white"},[e._v("\n          Available Integration\n        ")])]),e._v(" "),t("p",{staticClass:"mb-3 mt-3 font-medium text-xl text-[#5B638B]"},[e._v("\n        Connect your ad Shipping to your Asali Munaafa dashboard below.\n      ")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{CheckBox:n(519).default,Loader:n(233).default})}}]);