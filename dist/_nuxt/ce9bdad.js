(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{602:function(e,t,n){"use strict";n.r(t);n(35),n(40),n(51),n(52),n(41),n(18),n(36);var r=n(3),o=n(20),l=(n(28),n(31)),c=n(123);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var f={props:{isLoading:{type:Boolean}},data:function(){return{onBoarding:{goal:"",futureRevenue:"",onboardingSteps:{step3:!0}}}},computed:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},Object(l.c)({getUserOnbordingData:"auth/getUserOnbordingData"})),mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,null===(n=e.getUserOnbordingData)||void 0===n?void 0:n.goal;case 2:return e.onBoarding.goal=t.sent,t.next=5,null===(r=e.getUserOnbordingData)||void 0===r?void 0:r.futureRevenue;case 5:e.onBoarding.futureRevenue=t.sent;case 6:case"end":return t.stop()}}),t)})))()},methods:{next:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.onBoarding.goal&&e.onBoarding.futureRevenue){t.next=4;break}e.$toast.open({message:c.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),t.next=6;break;case 4:return t.next=6,e.$emit("next",e.onBoarding);case 6:case"end":return t.stop()}}),t)})))()}}},m=f,v=n(11),component=Object(v.a)(m,(function(){var e=this,t=e._self._c;return t("div",{staticClass:"xl:w-[30%] sm:w-full min-h-screen flex items-center justify-center py-6"},[t("div",{staticClass:"py-8 px-16 rounded-lg shadow-xl bg-opacity-img"},[t("form",{on:{submit:function(t){return t.preventDefault(),e.next.apply(null,arguments)}}},[e._m(0),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-[13px] font-bold"},[e._v("What’s your main goal using Asali Munafaa ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.goal,expression:"onBoarding.goal"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full",attrs:{type:"text",id:"name",placeholder:"Enter Here ..."},domProps:{value:e.onBoarding.goal},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"goal",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"mt-4 flex gap-3 flex-col"},[t("label",{staticClass:"block text-white text-sm font-bold"},[e._v("How much revenue you want in Future ?")]),e._v(" "),t("div",{staticClass:"flex items-center text-sm"},[t("input",{directives:[{name:"model",rawName:"v-model",value:e.onBoarding.futureRevenue,expression:"onBoarding.futureRevenue"}],staticClass:"bg-white rounded pl-6 py-2 md:py-2 focus:outline-none w-full mb-3",attrs:{type:"text",id:"website",placeholder:"Enter Here ..."},domProps:{value:e.onBoarding.futureRevenue},on:{input:function(t){t.target.composing||e.$set(e.onBoarding,"futureRevenue",t.target.value)}}})])]),e._v(" "),t("div",{staticClass:"flex gap-3 lg:flex-row flex-col"},[t("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{type:"button"},on:{click:function(t){return e.$emit("back")}}},[e._v("\n        Back\n      ")]),e._v(" "),t("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full text-sm rounded-md",attrs:{disabled:e.isLoading}},[e.isLoading?t("Loader",{attrs:{loading:e.isLoading}}):t("span",[e._v("Next")])],1)])])])])}),[function(){var e=this._self._c;return e("div",{staticClass:"items-center mb-4"},[e("h2",{staticClass:"text-[26px] font-bold text-white"},[this._v("Last Barrier")])])}],!1,null,null,null);t.default=component.exports;installComponents(component,{Loader:n(233).default})}}]);