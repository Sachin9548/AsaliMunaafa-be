(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{670:function(e,t,n){"use strict";n.r(t);n(235);var o={props:{items:{type:Array,required:!0},selectedLabel:{type:String,required:!0},index:{type:Number}},data:function(){return{isDropdownVisible:!1}},methods:{toggleDropdown:function(){this.isDropdownVisible=!this.isDropdownVisible},closeDropdown:function(){this.isDropdownVisible=!1},selectItem:function(e){this.isDropdownVisible=!1,this.$emit("getValue",e,this.index)}}},l=n(11),component=Object(l.a)(o,(function(){var e=this,t=e._self._c;return t("div",{},[t("button",{staticClass:"text-[#8C93BE] border-2 bg-[#F3F3F3] xl:mx-7 mx-0 lg:mx-8 md:mx-5 xl:w-1/2 xs:w-full width-100 lg:w-1/2 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center",attrs:{type:"button"},on:{click:e.toggleDropdown}},[e._v("\n    "+e._s(e.selectedLabel)+"\n  ")]),e._v(" "),e.isDropdownVisible?t("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.closeDropdown,expression:"closeDropdown"}],staticClass:"shadow-md z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-1/2 dark:bg-gray-700 mx-6 my-4"},[t("ul",{staticClass:"py-2 text-sm text-gray-700 dark:text-gray-200 lg:px-3 px-0"},e._l(e.items,(function(n){return t("li",{key:n.value},[t("a",{staticClass:"block lg:px-4 px-0 py-2 border-b",attrs:{href:"#"},on:{click:function(t){return t.preventDefault(),e.selectItem(n)}}},[t("span",{staticClass:"text-[#8C93BE] font-semibold text-lg"},[e._v("\n            "+e._s(n.label)+"\n          ")])])])})),0)]):e._e()])}),[],!1,null,null,null);t.default=component.exports}}]);