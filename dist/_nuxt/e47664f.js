(window.webpackJsonp=window.webpackJsonp||[]).push([[44,23],{498:function(t,e,r){t.exports=r.p+"img/frame.b42f0b9.webp"},543:function(t,e,r){"use strict";r.r(e);var o=[function(){var t=this._self._c;return t("div",{staticClass:"w-1/2 xl:block md:hidden lg:block hidden mt-7 py-6"},[t("img",{attrs:{src:r(498),alt:"Frame Image"}})])}],n={layout:"blank"},l=r(11),component=Object(l.a)(n,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"bg-cover bg-center bg-fixed bg-black"},[e("div",{staticClass:"min-h-screen flex justify-center gap-10 items-center bg-world-img"},[t._t("content"),t._v(" "),t._m(0)],2)])}),o,!1,null,null,null);e.default=component.exports},782:function(t,e,r){"use strict";r.r(e);r(34),r(39),r(51),r(52),r(40),r(35);var o=r(4),n=r(20),l=(r(28),r(18),r(37),r(55),r(158),r(56),r(236),r(31)),d=r(123);function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,o)}return r}function m(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={layout:"blank",data:function(){return{ensh:"",form:{},isLoading:!1}},computed:m({},Object(l.d)("auth",{isOnBoardingModal:function(t){return t.modal.isOnBoardingModal},isAllmostDoneModal:function(t){return t.modal.isAllmostDoneModal},isLastBarrierModal:function(t){return t.modal.isLastBarrierModal},isEcommerceModal:function(t){return t.modal.isEcommerceModal}})),mounted:function(){var t=new URLSearchParams(window.location.search);t.get("ensh")&&(this.ensh=t.get("ensh"))},methods:m(m({},Object(l.b)({Login:"auth/login",openModal:"auth/openModal",closeModal:"auth/closeModal"})),{},{login:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r,o,n,l,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,""!=t.form.emailOrPhone&&""!=t.form.password){e.next=5;break}t.$toast.open({message:d.errorMessage,type:"error",duration:2e3,position:"bottom-right"}),e.next=18;break;case 5:return t.isLoading=!0,t.form.ensh=t.ensh,e.next=9,t.Login(t.form);case 9:r=e.sent,o=r.data.onboardingSteps,t.closeModal("isOnBoardingModal"),t.closeModal("isAllmostDoneModal"),t.closeModal("isLastBarrierModal"),t.closeModal("isEcommerceModal"),o.step1?t.openModal("isAllmostDoneModal"):o.step2?t.openModal("isLastBarrierModal"):o.step3?t.openModal("isEcommerceModal"):o.step4?(n=r.data.businessDetailsSteps).step1?t.$router.push("/industry"):n.step2?t.$router.push("/shipping"):n.step3?t.$router.push("/about-business"):n.step4?t.$router.push("/product"):n.step5?t.$router.push("/dashboard"):t.$router.push("/marketing-platform"):t.openModal("isOnBoardingModal"),t.$toast.open({message:d.loginMessage,type:"success",duration:2e3,position:"bottom-right"}),t.$router.push("/onboarding");case 18:e.next=23;break;case 20:e.prev=20,e.t0=e.catch(0),t.$toast.open({message:(null===e.t0||void 0===e.t0||null===(l=e.t0.response)||void 0===l||null===(l=l.data)||void 0===l?void 0:l.msg)||(null===(c=t.message)||void 0===c?void 0:c.techinalError),type:"error",duration:2e3,position:"bottom-right"});case 23:return e.prev=23,t.isLoading=!1,e.finish(23);case 26:case"end":return e.stop()}}),e,null,[[0,20,23,26]])})))()}})},v=r(11),component=Object(v.a)(f,(function(){var t=this,e=t._self._c;return e("PageTemplate",{scopedSlots:t._u([{key:"content",fn:function(){return[e("div",{staticClass:"pt-8 my-4 xl:w-[22%] lg:w-1/2 sm:w-1/2 md:w-[75%] mx-5 sm:mx-0"},[e("h2",{staticClass:"xl:text-4xl text-2xl py-2 font-medium text-center text-white lg:mb-12 xl:mb-12 sm:mb-0"},[t._v("\n        Login\n      ")]),t._v(" "),e("a",{staticClass:"flex items-center justify-center mt-4 text-white rounded-lg shadow-md bg-white",attrs:{href:"#"}},[e("div",{staticClass:"px-4 py-3"},[e("svg",{staticClass:"h-6 w-6",attrs:{viewBox:"0 0 40 40"}},[e("path",{attrs:{d:"M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z",fill:"#FFC107"}}),t._v(" "),e("path",{attrs:{d:"M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z",fill:"#FF3D00"}}),t._v(" "),e("path",{attrs:{d:"M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z",fill:"#4CAF50"}}),t._v(" "),e("path",{attrs:{d:"M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z",fill:"#1976D2"}})])]),t._v(" "),e("h1",{staticClass:"px-4 xl:py-3 sm:py-0 w-5/6 text-gray-600 font-bold"},[t._v("\n          Sign in with Google\n        ")])]),t._v(" "),e("div",{staticClass:"mt-7 flex items-center justify-between mb-6"},[e("span",{staticClass:"border-b w-[46%]"}),t._v(" "),e("a",{staticClass:"text-base text-center text-white",attrs:{href:"#"}},[t._v("Or")]),t._v(" "),e("span",{staticClass:"border-b w-[46%]"})]),t._v(" "),e("div",{staticClass:"mt-4 flex gap-3 flex-col"},[e("form",{on:{submit:function(e){return e.preventDefault(),t.login.apply(null,arguments)}}},[e("label",{staticClass:"block text-white xl:text-lg text-sm font-bold mb-2"},[t._v("Email or Phone")]),t._v(" "),e("div",{staticClass:"flex items-center text-lg"},[e("svg",{staticClass:"absolute ml-3 mb-5",attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 128 96",id:"email",width:"24"}},[e("g",[e("path",{attrs:{d:"M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z"}})])]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.emailOrPhone,expression:"form.emailOrPhone"}],staticClass:"bg-white rounded pl-12 py-2 md:py-2 focus:outline-none w-full mb-5",attrs:{type:"email",id:"email",placeholder:"Email"},domProps:{value:t.form.emailOrPhone},on:{input:function(e){e.target.composing||t.$set(t.form,"emailOrPhone",e.target.value)}}})]),t._v(" "),e("label",{staticClass:"block text-white xl:text-lg text-sm font-bold mb-1"},[t._v("Password\n        ")]),t._v(" "),e("div",{staticClass:"flex items-center text-lg"},[e("svg",{staticClass:"absolute ml-3",attrs:{viewBox:"0 0 24 24",width:"24"}},[e("path",{attrs:{d:"m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"}})]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.form.password,expression:"form.password"}],staticClass:"bg-white rounded pl-12 py-2 md:py-2 focus:outline-none w-full mb-3",attrs:{type:"password",id:"password",placeholder:"Password"},domProps:{value:t.form.password},on:{input:function(e){e.target.composing||t.$set(t.form,"password",e.target.value)}}})]),t._v(" "),e("div",{staticClass:"flex items-start"},[e("div",{staticClass:"flex items-center h-5"},[e("input",{staticClass:"w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800",attrs:{id:"remember","aria-describedby":"remember",type:"checkbox"}})]),t._v(" "),e("div",{staticClass:"ml-3 xl:text-base mb-4"},[e("label",{staticClass:"text-white dark:text-white",attrs:{for:"remember"}},[t._v("Remember me")])])]),t._v(" "),e("button",{staticClass:"bg-gradient-to-r from-[#00CACE] to-[#00C3D3] hover:bg-gradient-to-r hover:from-[#00CACE] transition-main hover:to-[#00C3D3] bg-primaryBg text-white font-bold py-3 mt-4 px-4 w-full rounded-md mb-2",attrs:{disabled:t.isLoading}},[t.isLoading?e("Loader",{attrs:{loading:t.isLoading}}):e("span",[t._v("Continue With Email")])],1),t._v(" "),e("div",{staticClass:"flex justify-end"},[e("a",{staticClass:"xl:text-[18px] font-normal text-white",attrs:{href:"#"}},[t._v("Forget Password?")])])])]),t._v(" "),e("div",{staticClass:"py-4 mt-3"},[e("p",{staticClass:"xl:text-[20px] font-medium text-center font-light text-white"},[t._v("\n          Don’t have an Account ?\n          "),e("Nuxt-link",{attrs:{to:"/signup/?ensh=".concat(t.ensh)}},[e("span",{staticClass:"cursor-pointer font-medium border-b"},[t._v("Create New")])])],1)])])]},proxy:!0}])})}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Loader:r(233).default,PageTemplate:r(543).default})}}]);