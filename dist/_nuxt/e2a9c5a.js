(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{590:function(t,e,n){"use strict";n.r(e);n(40),n(53),n(18),n(35),n(51),n(52),n(41),n(36);var o=n(3),r=n(20),l=(n(28),n(31)),c=n(123);function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}var d={props:{isLoading:{type:Boolean}},data:function(){return{onBoarding:{aboutAsaliMunafaa:"",sellingProduct:"",monthlyRevenue:"",onboardingSteps:{step2:!0}}}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){Object(r.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},Object(l.c)({getUserOnbordingData:"auth/getUserOnbordingData"})),mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,null===(n=t.getUserOnbordingData)||void 0===n?void 0:n.aboutAsaliMunafaa;case 2:return t.onBoarding.aboutAsaliMunafaa=e.sent,e.next=5,null===(o=t.getUserOnbordingData)||void 0===o?void 0:o.sellingProduct;case 5:return t.onBoarding.sellingProduct=e.sent,e.next=8,null===(r=t.getUserOnbordingData)||void 0===r?void 0:r.monthlyRevenue;case 8:t.onBoarding.monthlyRevenue=e.sent;case 9:case"end":return e.stop()}}),e)})))()},methods:{next:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.onBoarding.aboutAsaliMunafaa&&t.onBoarding.sellingProduct&&t.onBoarding.monthlyRevenue){e.next=4;break}t.$toast.open({message:c.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),e.next=6;break;case 4:return e.next=6,t.$emit("next",t.onBoarding);case 6:case"end":return e.stop()}}),e)})))()},back:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$emit("back");case 2:case"end":return e.stop()}}),e)})))()}}},f=d,m=n(11),component=Object(m.a)(f,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"xl:w-[30%] sm:w-full min-h-screen flex items-center justify-center py-6"},[e("div",{staticClass:"py-8 px-16 rounded-lg shadow-xl bg-opacity-img"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.next.apply(null,arguments)}}},[t._m(0),t._v(" "),e("div",{staticClass:"mt-4 flex gap-3 flex-col"},[e("label",{staticClass:"block text-white text-sm font-bold"},[t._v("\n          How did you hear about Asali Munafaa ?\n        ")]),t._v(" "),e("div",{staticClass:"flex items-center text-sm"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.onBoarding.aboutAsaliMunafaa,expression:"onBoarding.aboutAsaliMunafaa"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{id:"aboutAsaliMunafaa"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.onBoarding,"aboutAsaliMunafaa",e.target.multiple?n:n[0])}}},[e("option",{attrs:{disabled:"",value:""}},[t._v("Select an option")]),t._v(" "),e("option",{attrs:{value:"Ascent Media"}},[t._v("Ascent Media")]),t._v(" "),e("option",{attrs:{value:"referal"}},[t._v("Referal")]),t._v(" "),e("option",{attrs:{value:"google"}},[t._v("Google")]),t._v(" "),e("option",{attrs:{value:"linkedin"}},[t._v("LinkedIn")]),t._v(" "),e("option",{attrs:{value:"social media"}},[t._v("Social Media")]),t._v(" "),e("option",{attrs:{value:"other"}},[t._v("Other")])])])]),t._v(" "),e("div",{staticClass:"mt-4 flex gap-3 flex-col"},[e("label",{staticClass:"block text-white text-sm font-bold"},[t._v("\n          Which type of Product Your selling ?\n        ")]),t._v(" "),e("div",{staticClass:"flex items-center text-sm"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.onBoarding.sellingProduct,expression:"onBoarding.sellingProduct"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{id:"sellingProduct"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.onBoarding,"sellingProduct",e.target.multiple?n:n[0])}}},[e("option",{attrs:{disabled:"",value:""}},[t._v("Select an option")]),t._v(" "),e("option",{attrs:{value:"clothing"}},[t._v("Clothing")]),t._v(" "),e("option",{attrs:{value:"electronics"}},[t._v("Electronics")]),t._v(" "),e("option",{attrs:{value:"watches"}},[t._v("Watches")]),t._v(" "),e("option",{attrs:{value:"other"}},[t._v("Other")])])])]),t._v(" "),e("div",{staticClass:"mt-4 flex gap-3 flex-col"},[e("label",{staticClass:"block text-white text-sm font-bold"},[t._v("\n          Your Monthly Revenue ?\n        ")]),t._v(" "),e("div",{staticClass:"flex items-center text-sm"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.onBoarding.monthlyRevenue,expression:"onBoarding.monthlyRevenue"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full mb-3",attrs:{id:"monthlyRevenue"},on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.onBoarding,"monthlyRevenue",e.target.multiple?n:n[0])}}},[e("option",{attrs:{disabled:"",value:""}},[t._v("Select an option")]),t._v(" "),e("option",{attrs:{value:"0-1 lack"}},[t._v("0-1 lack")]),t._v(" "),e("option",{attrs:{value:"1-5 lack"}},[t._v("1-5 lack")]),t._v(" "),e("option",{attrs:{value:"5-10 lack"}},[t._v("5-10 lack")]),t._v(" "),e("option",{attrs:{value:"more than 10 lack"}},[t._v("More than 10 lack")])])])]),t._v(" "),e("div",{staticClass:"flex gap-3 lg:flex-row flex-col"},[e("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{type:"button"},on:{click:t.back}},[t._v("\n          Back\n        ")]),t._v(" "),e("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{disabled:t.isLoading}},[t.isLoading?e("Loader",{attrs:{loading:t.isLoading}}):e("span",[t._v("Next")])],1)])])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"items-center mb-4"},[t("h2",{staticClass:"text-[26px] font-bold text-white text-center"},[this._v("\n          Almost Done !\n        ")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{Loader:n(233).default})}}]);