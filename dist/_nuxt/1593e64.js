(window.webpackJsonp=window.webpackJsonp||[]).push([[47,6,13,17,19,20],{498:function(e,t,n){e.exports=n.p+"img/frame.b42f0b9.webp"},589:function(e,t,n){"use strict";n.r(t);n(34),n(39),n(51),n(52),n(40),n(18),n(35);var o=n(4),r=n(20),l=(n(28),n(123)),c=n(31);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var m={props:{isLoading:{type:Boolean}},data:function(){return{onBoarding:{fullName:"",mobile:"",websiteUrl:"",onboardingSteps:{step1:!0}}}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(c.c)({getUserOnbordingData:"auth/getUserOnbordingData"})),mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,o,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(n=e.getUserOnbordingData)||void 0===n?void 0:n.fullName;case 2:return e.onBoarding.fullName=t.sent,t.next=5,null===(o=e.getUserOnbordingData)||void 0===o?void 0:o.mobile;case 5:return e.onBoarding.mobile=t.sent,t.next=8,null===(r=e.getUserOnbordingData)||void 0===r?void 0:r.websiteUrl;case 8:e.onBoarding.websiteUrl=t.sent;case 9:case"end":return t.stop()}}),t)})))()},methods:{next:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""!=e.onBoarding.fullName&&""!=e.onBoarding.mobile&&""!=e.onBoarding.websiteUrl){t.next=4;break}e.$toast.open({message:l.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),t.next=6;break;case 4:return t.next=6,e.$emit("next",e.onBoarding);case 6:case"end":return t.stop()}}),t)})))()}}},f=m,v=n(11),component=Object(v.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"xl:w-[30%] sm:w-full min-h-screen flex items-center justify-center py-6"},[t("div",{staticClass:"py-8 px-16 rounded-lg shadow-xl bg-opacity-img"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.next.apply(null,arguments)}}},[e._m(0),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("Full Name ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.fullName,expression:"onBoarding.fullName"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{type:"text",id:"email",placeholder:"Full Name"},domProps:{value:e.onBoarding.fullName},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"fullName",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("Phone Number")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.mobile,expression:"onBoarding.mobile"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{type:"text",id:"phone",placeholder:"Mobile"},domProps:{value:e.onBoarding.mobile},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"mobile",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("Website URL")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.websiteUrl,expression:"onBoarding.websiteUrl"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full mb-3",attrs:{type:"text",id:"website",placeholder:"url"},domProps:{value:e.onBoarding.websiteUrl},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"websiteUrl",t.target.value)}}})])]),e._v(" "),t("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{disabled:e.isLoading}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v("Next")])],1)])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"items-center mb-4"},[e("h2",{staticClass:"text-[26px] font-bold text-white"},[this._v("Complete Onboarding")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Loader:n(233).default})},590:function(e,t,n){"use strict";n.r(t);n(34),n(39),n(51),n(52),n(40),n(18),n(35);var o=n(4),r=n(20),l=(n(28),n(31)),c=n(123);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var m={props:{isLoading:{type:Boolean}},data:function(){return{onBoarding:{aboutAsaliMunafaa:"",sellingProduct:"",monthlyRevenue:"",onboardingSteps:{step2:!0}}}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(l.c)({getUserOnbordingData:"auth/getUserOnbordingData"})),mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,o,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(n=e.getUserOnbordingData)||void 0===n?void 0:n.aboutAsaliMunafaa;case 2:return e.onBoarding.aboutAsaliMunafaa=t.sent,t.next=5,null===(o=e.getUserOnbordingData)||void 0===o?void 0:o.sellingProduct;case 5:return e.onBoarding.sellingProduct=t.sent,t.next=8,null===(r=e.getUserOnbordingData)||void 0===r?void 0:r.monthlyRevenue;case 8:e.onBoarding.monthlyRevenue=t.sent;case 9:case"end":return t.stop()}}),t)})))()},methods:{next:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.onBoarding.aboutAsaliMunafaa&&e.onBoarding.sellingProduct&&e.onBoarding.monthlyRevenue){t.next=4;break}e.$toast.open({message:c.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),t.next=6;break;case 4:return t.next=6,e.$emit("next",e.onBoarding);case 6:case"end":return t.stop()}}),t)})))()},back:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$emit("back");case 2:case"end":return t.stop()}}),t)})))()}}},f=m,v=n(11),component=Object(v.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"xl:w-[30%] sm:w-full min-h-screen flex items-center justify-center py-6"},[t("div",{staticClass:"py-8 px-16 rounded-lg shadow-xl bg-opacity-img"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.next.apply(null,arguments)}}},[e._m(0),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("How did you hear about Asali Munafaa ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.aboutAsaliMunafaa,expression:"onBoarding.aboutAsaliMunafaa"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{type:"text",id:"name",placeholder:"Enter Here ..."},domProps:{value:e.onBoarding.aboutAsaliMunafaa},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"aboutAsaliMunafaa",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("Which type of Product Your selling ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.sellingProduct,expression:"onBoarding.sellingProduct"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{type:"text",id:"selling",placeholder:"Enter Here ..."},domProps:{value:e.onBoarding.sellingProduct},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"sellingProduct",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("Your Monthly Revenue ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.monthlyRevenue,expression:"onBoarding.monthlyRevenue"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full mb-3",attrs:{type:"text",id:"website",placeholder:"Enter Here ..."},domProps:{value:e.onBoarding.monthlyRevenue},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"monthlyRevenue",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"flex gap-3 lg:flex-row flex-col"},[t("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{type:"button"},on:{click:e.back}},[e._v("\n        Back\n      ")]),e._v(" "),t("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{disabled:e.isLoading}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v("Next")])],1)])])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"items-center mb-4"},[e("h2",{staticClass:"text-[26px] font-bold text-white text-center"},[this._v("\n        Almost Done !\n      ")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Loader:n(233).default})},591:function(e,t,n){"use strict";n.r(t);n(34),n(39),n(51),n(52),n(40),n(18),n(35);var o=n(4),r=n(20),l=(n(28),n(31)),c=n(123);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}var m={props:{isLoading:{type:Boolean}},data:function(){return{onBoarding:{goal:"",futureRevenue:"",onboardingSteps:{step3:!0}}}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(l.c)({getUserOnbordingData:"auth/getUserOnbordingData"})),mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(n=e.getUserOnbordingData)||void 0===n?void 0:n.goal;case 2:return e.onBoarding.goal=t.sent,t.next=5,null===(o=e.getUserOnbordingData)||void 0===o?void 0:o.futureRevenue;case 5:e.onBoarding.futureRevenue=t.sent;case 6:case"end":return t.stop()}}),t)})))()},methods:{next:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.onBoarding.goal&&e.onBoarding.futureRevenue){t.next=4;break}e.$toast.open({message:c.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),t.next=6;break;case 4:return t.next=6,e.$emit("next",e.onBoarding);case 6:case"end":return t.stop()}}),t)})))()}}},f=m,v=n(11),component=Object(v.a)(f,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"xl:w-[30%] sm:w-full min-h-screen flex items-center justify-center py-6"},[t("div",{staticClass:"py-8 px-16 rounded-lg shadow-xl bg-opacity-img"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.next.apply(null,arguments)}}},[e._m(0),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-[13px] font-bold"},[e._v("What’s your main goal using Asali Munafaa ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.goal,expression:"onBoarding.goal"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{type:"text",id:"name",placeholder:"Enter Here ..."},domProps:{value:e.onBoarding.goal},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"goal",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("How much revenue you want in Future ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.futureRevenue,expression:"onBoarding.futureRevenue"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full mb-3",attrs:{type:"text",id:"website",placeholder:"Enter Here ..."},domProps:{value:e.onBoarding.futureRevenue},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"futureRevenue",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"flex gap-3 lg:flex-row flex-col"},[t("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{type:"button"},on:{click:function(t){return e.$emit("back")}}},[e._v("\n        Back\n      ")]),e._v(" "),t("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{disabled:e.isLoading}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v("Next")])],1)])])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"items-center mb-4"},[e("h2",{staticClass:"text-[26px] font-bold text-white"},[this._v("Last Barrier")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Loader:n(233).default})},592:function(e,t,n){"use strict";n.r(t);var o=n(4),r=(n(28),n(42)),l={name:"EcommerceModal",props:{isLoading:{type:Boolean,default:!1}},data:function(){return{store:"",apiKey:"",apiSecret:"",accessToken:"",selectedProvider:"shopify"}},methods:{selectProvider:function(e){this.selectedProvider=e},handleSubmit:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.store&&e.apiKey&&e.apiSecret&&e.accessToken){t.next=3;break}return console.log("Please fill all fields"),t.abrupt("return");case 3:return console.log("EcommerceModal handleSubmit invoked"),t.prev=4,t.next=7,r.a.post("/shopify/manual-connect",{store:e.store,apiKey:e.apiKey,apiSecret:e.apiSecret,accessToken:e.accessToken});case 7:n=t.sent,console.log("Response from server:",n),n.data&&200===n.data.status?(console.log("Shopify store connected successfully in EcommerceModal."),e.$emit("next")):console.log("Connection unsuccessful. Response data:",n.data),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(4),console.error("Error connecting Shopify store:",t.t0);case 15:case"end":return t.stop()}}),t,null,[[4,12]])})))()},handleCancel:function(){this.$emit("back")}}},c=n(11),component=Object(c.a)(l,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"fixed inset-0 flex items-center justify-center min-h-screen"},[t("div",{staticClass:"fixed inset-0 bg-black opacity-50",on:{click:e.handleCancel}}),e._v(" "),t("div",{staticClass:"bg-white p-8 rounded-md w-full max-w-lg relative z-10"},[t("div",{staticClass:"flex gap-4 mb-6"},[t("button",{staticClass:"bg-gradient-to-r from-[#3CBB00] to-[#05E852] hover:bg-gradient-to-r hover:from-[#05E852] transition-main hover:to-[#3CBB00] text-white font-bold py-3 px-4 w-full text-sm rounded-md",class:{"ring-2 ring-white":"shopify"===e.selectedProvider},on:{click:function(t){return e.selectProvider("shopify")}}},[e._v("\n          Shopify\n        ")]),e._v(" "),t("button",{staticClass:"bg-[#2E0A93] text-white font-bold py-3 px-4 w-full text-sm rounded-md opacity-50 cursor-not-allowed",attrs:{disabled:""}},[e._v("\n          WordPress (Coming Soon)\n        ")])]),e._v(" "),"shopify"===e.selectedProvider?t("div",[t("h2",{staticClass:"text-2xl font-bold mb-4"},[e._v("Connect your Shopify store")]),e._v(" "),t("p",{staticClass:"text-gray-600 mb-6"},[e._v("\n          Enter your Shopify store details below:\n        ")]),e._v(" "),t("form",{on:{submit:function(t){return t.preventDefault(),e.handleSubmit.apply(null,arguments)}}},[t("div",{staticClass:"mb-4"},[t("label",{staticClass:"block font-medium mb-1"},[e._v("Store URL")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.store,expression:"store"}],staticClass:"border p-2 rounded w-full",attrs:{placeholder:"example.myshopify.com",required:""},domProps:{value:e.store},on:{input:function(t){t.target.composing||(e.store=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"mb-4"},[t("label",{staticClass:"block font-medium mb-1"},[e._v("Shopify API Key")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.apiKey,expression:"apiKey"}],staticClass:"border p-2 rounded w-full",attrs:{placeholder:"Your Shopify app key",required:""},domProps:{value:e.apiKey},on:{input:function(t){t.target.composing||(e.apiKey=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"mb-4"},[t("label",{staticClass:"block font-medium mb-1"},[e._v("Shopify API Secret")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.apiSecret,expression:"apiSecret"}],staticClass:"border p-2 rounded w-full",attrs:{placeholder:"Your Shopify app secret",required:""},domProps:{value:e.apiSecret},on:{input:function(t){t.target.composing||(e.apiSecret=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"mb-4"},[t("label",{staticClass:"block font-medium mb-1"},[e._v("Shopify Access Token")]),e._v(" "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.accessToken,expression:"accessToken"}],staticClass:"border p-2 rounded w-full",attrs:{placeholder:"Your Shopify access token",required:""},domProps:{value:e.accessToken},on:{input:function(t){t.target.composing||(e.accessToken=t.target.value)}}})]),e._v(" "),t("div",{staticClass:"flex justify-end gap-3"},[t("button",{staticClass:"bg-green-600 text-white px-4 py-2 rounded",attrs:{type:"submit",disabled:e.isLoading}},[e._v("\n              Connect Shopify\n            ")]),e._v(" "),t("button",{staticClass:"bg-gray-300 text-gray-800 px-4 py-2 rounded",attrs:{type:"button"},on:{click:e.handleCancel}},[e._v("\n              Cancel\n            ")])])])]):e._e()])])])}),[],!1,null,null,null);t.default=component.exports},651:function(e,t,n){"use strict";n.r(t);var o=[function(){var e=this._self._c;return e("div",{staticClass:"w-1/2 xl:block md:hidden lg:block hidden mt-7 py-6"},[e("img",{attrs:{src:n(498),alt:"Frame Image"}})])}],r={layout:"blank"},l=n(11),component=Object(l.a)(r,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"bg-black w-full min-h-screen"},[t("div",{staticClass:"flex overflow-hidden mx-auto justify-center w-full rounded-md world-img sm:p-0"},[e._t("modalContent"),e._v(" "),e._m(0)],2)])}),o,!1,null,null,null);t.default=component.exports},785:function(e,t,n){"use strict";n.r(t);n(34),n(39),n(51),n(52),n(18),n(35);var o=n(4),r=n(20),l=(n(28),n(40),n(31)),c=n(123),d=n(589),m=n(590),f=n(591),v=n(592);function x(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?x(Object(n),!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):x(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var y={name:"OnboardingModals",layout:"blank",components:{OnBoardingModal:d.default,AllmostDoneModal:m.default,LastBarrierModal:f.default,EcommerceModal:v.default},data:function(){return{isLoading:!1}},computed:h(h({},Object(l.d)("auth",{isOnBoardingModal:function(e){return e.modal.isOnBoardingModal},isAllmostDoneModal:function(e){return e.modal.isAllmostDoneModal},isLastBarrierModal:function(e){return e.modal.isLastBarrierModal},isEcommerceModal:function(e){return e.modal.isEcommerceModal}})),Object(l.c)({getUserData:"auth/getUserData"})),mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,o,r,l,c,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.getProfileData();case 3:if(o=t.sent,r=null===(n=e.getUserData)||void 0===n?void 0:n.shopifyAppInstalled,l=o.data.onboardingSteps,e.closeModal("isOnBoardingModal"),!l.step1){t.next=11;break}e.openModal("isAllmostDoneModal"),t.next=42;break;case 11:if(!l.step2){t.next=15;break}e.openModal("isLastBarrierModal"),t.next=42;break;case 15:if(!l.step3){t.next=24;break}if(!r){t.next=21;break}return t.next=19,e.ecommerceNext();case 19:t.next=22;break;case 21:e.openModal("isEcommerceModal");case 22:t.next=42;break;case 24:if(!l.step4){t.next=41;break}if(t.prev=25,!r){t.next=33;break}return t.next=29,e.getBusinessDetail();case 29:(c=t.sent).data&&Object.keys(c.data).length>0?(d=c.data.businessDetailsSteps).step1?e.$router.push("/industry"):d.step2?e.$router.push("/shipping"):d.step3?e.$router.push("/about-business"):d.step4?e.$router.push("/product"):d.step5?e.$router.push("/dashboard"):e.$router.push("/marketing-platform"):e.$router.push("/marketing-platform"),t.next=34;break;case 33:e.openModal("isEcommerceModal");case 34:t.next=39;break;case 36:t.prev=36,t.t0=t.catch(25),console.log(t.t0);case 39:t.next=42;break;case 41:e.openModal("isOnBoardingModal");case 42:t.next=47;break;case 44:t.prev=44,t.t1=t.catch(0),console.log(t.t1);case 47:case"end":return t.stop()}}),t,null,[[0,44],[25,36]])})))()},methods:h(h({},Object(l.b)({addProfileData:"auth/addProfileData",getProfileData:"auth/getProfileData",getBusinessDetail:"bussiness-details/getBusinessDetail",openModal:"auth/openModal",closeModal:"auth/closeModal"})),{},{onBoardingNext:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t.isLoading=!0,n.next=4,t.addProfileData(e);case 4:t.$toast.open({message:c.dataUpdateMessage,type:"success",duration:2e3,position:"bottom-right"}),t.openModal("isAllmostDoneModal"),t.closeModal("isOnBoardingModal"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),t.$toast.open({message:n.t0,type:"error",duration:2e3,position:"bottom-right"});case 12:return n.prev=12,t.isLoading=!1,n.finish(12);case 15:case"end":return n.stop()}}),n,null,[[0,9,12,15]])})))()},allmostNext:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t.isLoading=!0,n.next=4,t.addProfileData(e);case 4:t.$toast.open({message:c.dataUpdateMessage,type:"success",duration:2e3,position:"bottom-right"}),t.openModal("isLastBarrierModal"),t.closeModal("isAllmostDoneModal"),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(0),t.$toast.open({message:n.t0,type:"error",duration:2e3,position:"bottom-right"});case 12:return n.prev=12,t.isLoading=!1,n.finish(12);case 15:case"end":return n.stop()}}),n,null,[[0,9,12,15]])})))()},allMostBack:function(){this.openModal("isOnBoardingModal"),this.closeModal("isAllmostDoneModal")},ecommerceNext:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.isLoading=!0,data={onboardingSteps:{step4:!0}},t.next=5,e.addProfileData(data);case 5:e.closeModal("isEcommerceModal"),window.location.assign("/marketing-platform"),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),e.$toast.open({message:t.t0,type:"error",duration:2e3,position:"bottom-right"});case 12:return t.prev=12,e.isLoading=!1,t.finish(12);case 15:case"end":return t.stop()}}),t,null,[[0,9,12,15]])})))()},lastBarrierBack:function(){this.openModal("isAllmostDoneModal"),this.closeModal("isLastBarrierModal")},lastBarrierNext:function(e){var t=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,t.isLoading=!0,n.next=4,t.addProfileData(e);case 4:if(t.$toast.open({message:c.dataUpdateMessage,type:"success",duration:2e3,position:"bottom-right"}),t.closeModal("isLastBarrierModal"),!(null===(o=t.getUserData)||void 0===o?void 0:o.shopifyAppInstalled)){n.next=12;break}return n.next=10,t.ecommerceNext();case 10:n.next=13;break;case 12:t.openModal("isEcommerceModal");case 13:n.next=18;break;case 15:n.prev=15,n.t0=n.catch(0),t.$toast.open({message:n.t0,type:"error",duration:2e3,position:"bottom-right"});case 18:return n.prev=18,t.isLoading=!1,n.finish(18);case 21:case"end":return n.stop()}}),n,null,[[0,15,18,21]])})))()}})},w=n(11),component=Object(w.a)(y,(function(){var e=this,t=e._self._c;return t("div",[t("Modal",{scopedSlots:e._u([{key:"modalContent",fn:function(){return[e.isOnBoardingModal?t("OnBoardingModal",{attrs:{isLoading:e.isLoading},on:{next:e.onBoardingNext}}):e._e(),e._v(" "),e.isAllmostDoneModal?t("AllmostDoneModal",{attrs:{isLoading:e.isLoading},on:{next:e.allmostNext,back:e.allMostBack}}):e._e(),e._v(" "),e.isLastBarrierModal?t("LastBarrierModal",{attrs:{isLoading:e.isLoading},on:{next:e.lastBarrierNext,back:e.lastBarrierBack}}):e._e(),e._v(" "),e.isEcommerceModal?t("EcommerceModal",{attrs:{isLoading:e.isLoading},on:{next:e.ecommerceNext}}):e._e()]},proxy:!0}])})],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{OnBoardingModal:n(589).default,AllmostDoneModal:n(590).default,LastBarrierModal:n(591).default,EcommerceModal:n(592).default,Modal:n(651).default})}}]);