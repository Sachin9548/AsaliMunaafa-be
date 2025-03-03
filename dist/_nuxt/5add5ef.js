(window.webpackJsonp=window.webpackJsonp||[]).push([[50,24,33],{493:function(t,e,r){"use strict";r.r(e);var l={extends:r(496).a,props:{chartData:{type:Object},options:{type:Object}},mounted:function(){this.renderChart(this.chartData,this.options)}},n=r(11),component=Object(n.a)(l,undefined,undefined,!1,null,null,null);e.default=component.exports},500:function(t,e,r){"use strict";r.r(e);r(34),r(76);var l={props:{sales:{type:Object,required:!0}}},n=r(11),component=Object(n.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"max-w-fulls border-gray-200 flex gap-6"},[e("div",{staticClass:"w-14 h-14"},[e("div",{staticClass:"rounded-full bg-[#6514DD] transition-main w-14 h-14 flex justify-center"},[e("img",{staticClass:"w-6",attrs:{src:t.sales.image,alt:""}})])]),t._v(" "),e("div",{staticClass:"flex relative"},[e("div",[e("p",{staticClass:"text-2xl font-semibold text-[#000087]"},[t._v(t._s(t.sales.title))]),t._v(" "),e("p",{staticClass:"text-[#5B638B] text-base font-normal"},[t._v("\n          "+t._s(t.sales.description)+"\n        ")])]),t._v(" "),e("div",{staticClass:"absolute mt-1",style:{left:t.sales.left+"px"}},[e("img",{attrs:{src:t.sales.icon,alt:""}})])])])])}),[],!1,null,null,null);e.default=component.exports},503:function(t,e,r){var map={"./af":356,"./af.js":356,"./ar":357,"./ar-dz":358,"./ar-dz.js":358,"./ar-kw":359,"./ar-kw.js":359,"./ar-ly":360,"./ar-ly.js":360,"./ar-ma":361,"./ar-ma.js":361,"./ar-ps":362,"./ar-ps.js":362,"./ar-sa":363,"./ar-sa.js":363,"./ar-tn":364,"./ar-tn.js":364,"./ar.js":357,"./az":365,"./az.js":365,"./be":366,"./be.js":366,"./bg":367,"./bg.js":367,"./bm":368,"./bm.js":368,"./bn":369,"./bn-bd":370,"./bn-bd.js":370,"./bn.js":369,"./bo":371,"./bo.js":371,"./br":372,"./br.js":372,"./bs":373,"./bs.js":373,"./ca":374,"./ca.js":374,"./cs":375,"./cs.js":375,"./cv":376,"./cv.js":376,"./cy":377,"./cy.js":377,"./da":378,"./da.js":378,"./de":379,"./de-at":380,"./de-at.js":380,"./de-ch":381,"./de-ch.js":381,"./de.js":379,"./dv":382,"./dv.js":382,"./el":383,"./el.js":383,"./en-au":384,"./en-au.js":384,"./en-ca":385,"./en-ca.js":385,"./en-gb":386,"./en-gb.js":386,"./en-ie":387,"./en-ie.js":387,"./en-il":388,"./en-il.js":388,"./en-in":389,"./en-in.js":389,"./en-nz":390,"./en-nz.js":390,"./en-sg":391,"./en-sg.js":391,"./eo":392,"./eo.js":392,"./es":393,"./es-do":394,"./es-do.js":394,"./es-mx":395,"./es-mx.js":395,"./es-us":396,"./es-us.js":396,"./es.js":393,"./et":397,"./et.js":397,"./eu":398,"./eu.js":398,"./fa":399,"./fa.js":399,"./fi":400,"./fi.js":400,"./fil":401,"./fil.js":401,"./fo":402,"./fo.js":402,"./fr":403,"./fr-ca":404,"./fr-ca.js":404,"./fr-ch":405,"./fr-ch.js":405,"./fr.js":403,"./fy":406,"./fy.js":406,"./ga":407,"./ga.js":407,"./gd":408,"./gd.js":408,"./gl":409,"./gl.js":409,"./gom-deva":410,"./gom-deva.js":410,"./gom-latn":411,"./gom-latn.js":411,"./gu":412,"./gu.js":412,"./he":413,"./he.js":413,"./hi":414,"./hi.js":414,"./hr":415,"./hr.js":415,"./hu":416,"./hu.js":416,"./hy-am":417,"./hy-am.js":417,"./id":418,"./id.js":418,"./is":419,"./is.js":419,"./it":420,"./it-ch":421,"./it-ch.js":421,"./it.js":420,"./ja":422,"./ja.js":422,"./jv":423,"./jv.js":423,"./ka":424,"./ka.js":424,"./kk":425,"./kk.js":425,"./km":426,"./km.js":426,"./kn":427,"./kn.js":427,"./ko":428,"./ko.js":428,"./ku":429,"./ku-kmr":430,"./ku-kmr.js":430,"./ku.js":429,"./ky":431,"./ky.js":431,"./lb":432,"./lb.js":432,"./lo":433,"./lo.js":433,"./lt":434,"./lt.js":434,"./lv":435,"./lv.js":435,"./me":436,"./me.js":436,"./mi":437,"./mi.js":437,"./mk":438,"./mk.js":438,"./ml":439,"./ml.js":439,"./mn":440,"./mn.js":440,"./mr":441,"./mr.js":441,"./ms":442,"./ms-my":443,"./ms-my.js":443,"./ms.js":442,"./mt":444,"./mt.js":444,"./my":445,"./my.js":445,"./nb":446,"./nb.js":446,"./ne":447,"./ne.js":447,"./nl":448,"./nl-be":449,"./nl-be.js":449,"./nl.js":448,"./nn":450,"./nn.js":450,"./oc-lnc":451,"./oc-lnc.js":451,"./pa-in":452,"./pa-in.js":452,"./pl":453,"./pl.js":453,"./pt":454,"./pt-br":455,"./pt-br.js":455,"./pt.js":454,"./ro":456,"./ro.js":456,"./ru":457,"./ru.js":457,"./sd":458,"./sd.js":458,"./se":459,"./se.js":459,"./si":460,"./si.js":460,"./sk":461,"./sk.js":461,"./sl":462,"./sl.js":462,"./sq":463,"./sq.js":463,"./sr":464,"./sr-cyrl":465,"./sr-cyrl.js":465,"./sr.js":464,"./ss":466,"./ss.js":466,"./sv":467,"./sv.js":467,"./sw":468,"./sw.js":468,"./ta":469,"./ta.js":469,"./te":470,"./te.js":470,"./tet":471,"./tet.js":471,"./tg":472,"./tg.js":472,"./th":473,"./th.js":473,"./tk":474,"./tk.js":474,"./tl-ph":475,"./tl-ph.js":475,"./tlh":476,"./tlh.js":476,"./tr":477,"./tr.js":477,"./tzl":478,"./tzl.js":478,"./tzm":479,"./tzm-latn":480,"./tzm-latn.js":480,"./tzm.js":479,"./ug-cn":481,"./ug-cn.js":481,"./uk":482,"./uk.js":482,"./ur":483,"./ur.js":483,"./uz":484,"./uz-latn":485,"./uz-latn.js":485,"./uz.js":484,"./vi":486,"./vi.js":486,"./x-pseudo":487,"./x-pseudo.js":487,"./yo":488,"./yo.js":488,"./zh-cn":489,"./zh-cn.js":489,"./zh-hk":490,"./zh-hk.js":490,"./zh-mo":491,"./zh-mo.js":491,"./zh-tw":492,"./zh-tw.js":492};function l(t){var e=n(t);return r(e)}function n(t){if(!r.o(map,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return map[t]}l.keys=function(){return Object.keys(map)},l.resolve=n,t.exports=l,l.id=503},601:function(t,e,r){var content=r(681);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(29).default)("22d7cdd0",content,!0,{sourceMap:!1})},679:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjMiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyMyAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTExLjUgMjkuOTYwN0wyMyAyMy41MTQ0VjcuMzk4ODFMMTEuNSAwLjk2ODA0OEwwIDcuMzk4ODFWMjMuNTE0NEwxMS41IDI5Ljk2MDdaTTIwLjEzODggMjIuODk0NkwxMS41IDI3LjcyOTNMOC4xNjg4NyAyNS44Njk4TDE2Ljc1MjQgMjEuMDA0MUwyMC4xMzg4IDIyLjg5NDZaTTExLjUgMTguMDU5OUwxNC43ODk3IDE5Ljg4ODRMNi4xOTIzMSAyNC43NTQxTDIuODYxMTggMjIuODk0NkwxMS41IDE4LjA1OTlaTTEuNzY5MjMgMjEuMjgzVjguNjM4NDdMMTAuNjE1NCAzLjY3OTgxVjE2LjMyNDRMMS43NjkyMyAyMS4yODNaTTEyLjM4NDYgMy42Nzk4MUwyMS4yMzA4IDguNjM4NDdWMjEuMjgzTDEyLjM4NDYgMTYuMzI0NFYzLjY3OTgxWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg=="},680:function(t,e,r){"use strict";r(601)},681:function(t,e,r){var l=r(25)((function(i){return i[1]}));l.push([t.i,"\n.mx-input[data-v-d81ab25e] {\n  background-color: transparent;\n  border: 1px solid rgba(0, 0, 0, 0.3);\n}\n.stats-grid[data-v-d81ab25e] {\n  /* Additional grid styling if needed */\n}\n.stat-card[data-v-d81ab25e] {\n  /* Customize your stat cards */\n}\n",""]),l.locals={},t.exports=l},787:function(t,e,r){"use strict";r.r(e);r(34),r(39),r(51),r(52),r(40),r(18),r(35);var l=r(4),n=r(20),o=(r(28),r(679)),d=r.n(o),c=r(31);function j(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);e&&(l=l.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,l)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?j(Object(r),!0).forEach((function(e){Object(n.a)(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var f={layout:"overview",components:{PieChart:r(493).default},data:function(){return{date:[new Date((new Date).setDate((new Date).getDate()-7)),new Date],loading:!0,activeTab:"bestSellers",tableHeaders:["No.","Product Name","Sales","Total Sales"],tableData:[],totalSales:0,averageOrderValue:0,totalOrders:0,totalCustomers:0,newCustomers:0,returningCustomers:0,newCustomerGrowthRate:0,repurchaseRate:0,cohortAnalysis:[],bestSellers:[],leastSellers:[],sessionsByDevices:{},newVsReturningChartData:{labels:["New Customers","Returning Customers"],datasets:[{data:[0,0],backgroundColor:["#4C45E3","#2453FF"]}]},chartData:{labels:[],datasets:[{data:[],label:"Orders Over Time",borderColor:"#2453FF",borderWidth:2,fill:!1}]},overallStatusChartData:{labels:["Delivered","Cancelled","Pending"],datasets:[{data:[0,0,0],backgroundColor:["#1FC105","#F16C20","#ECAA38"]}]},revenueChartData:{labels:["Product A","Product B","Product C"],datasets:[{data:[0,0,0],backgroundColor:["#4C45E3","#2453FF","#1FC105"]}]},chartOptions:{maintainAspectRatio:!1,responsive:!0,tooltips:{backgroundColor:"#000000",titleFontColor:"#ffffff",bodyFontColor:"#ffffff",position:"nearest",intersect:!1,bodySpacing:4}},pieChartOptions:{maintainAspectRatio:!1,responsive:!0,legend:{position:"bottom"}},product:{image:d.a,title:"Products",description:"See a breakdown of your most profitable products",icon:"",left:0}}},computed:{filteredProductData:function(){return"bestSellers"===this.activeTab?Array.isArray(this.bestSellers)?this.bestSellers:[]:"leastSellers"===this.activeTab&&Array.isArray(this.leastSellers)?this.leastSellers:[]}},methods:v(v({},Object(c.b)({getProductDetails:"bussiness-details/getProductDetails"})),{},{prodocuDetails:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var r,l,n,data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.loading=!0,r=Array.isArray(t.date)?t.date[0].toISOString():t.date.toISOString(),l=Array.isArray(t.date)?t.date[1].toISOString():t.date.toISOString(),e.next=6,t.getProductDetails({start_date:r,end_date:l});case 6:n=e.sent,data=n.data,t.tableData=data.Response||[],t.bestSellers=data.bestSellers||[],t.leastSellers=data.leastSellers||[],t.totalSales=data.totalSales||0,t.averageOrderValue=data.averageOrderValue||0,t.totalOrders=data.totalOrders||0,t.totalCustomers=data.totalCustomers||0,t.newCustomers=data.newCustomers||0,t.returningCustomers=data.returningCustomers||0,t.newCustomerGrowthRate=data.newCustomerGrowthRate||0,t.repurchaseRate=data.repurchaseRate||0,t.cohortAnalysis=data.cohortAnalysis||[],t.sessionsByDevices=data.sessionsByDevices||{},t.newVsReturningChartData=data.newVsReturningChartData||{labels:["New Customers","Returning Customers"],datasets:[{data:[t.newCustomers,t.returningCustomers],backgroundColor:["#4C45E3","#2453FF"]}]},t.chartData=data.chartData||t.chartData,t.overallStatusChartData=data.overallStatusChartData||t.overallStatusChartData,t.revenueChartData=data.revenueChartData||t.revenueChartData,e.next=30;break;case 27:e.prev=27,e.t0=e.catch(0),console.error(e.t0);case 30:return e.prev=30,t.loading=!1,e.finish(30);case 33:case"end":return e.stop()}}),e,null,[[0,27,30,33]])})))()}}),mounted:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.prodocuDetails();case 2:case"end":return e.stop()}}),e)})))()},watch:{date:function(){this.prodocuDetails()}}},h=(r(680),r(11)),component=Object(h.a)(f,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"mx-2 mt-16"},[t.loading?e("div",{staticClass:"flex items-center justify-center h-screen"},[e("p",{staticClass:"text-xl font-semibold"},[t._v("Loading and analyzing data...")])]):e("div",[e("Sales",{attrs:{sales:t.product}}),t._v(" "),e("div",{staticClass:"stats-grid grid grid-cols-4 gap-4 my-6"},[e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("Total Sales")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.totalSales))])]),t._v(" "),e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("Average Order Value")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.averageOrderValue))])]),t._v(" "),e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("Total Orders")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.totalOrders))])]),t._v(" "),e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("Total Customers")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.totalCustomers))])]),t._v(" "),e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("New Customers")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.newCustomers))])]),t._v(" "),e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("Returning Customers")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.returningCustomers))])]),t._v(" "),e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("New Customer Growth Rate")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.newCustomerGrowthRate)+"%")])]),t._v(" "),e("div",{staticClass:"stat-card bg-white shadow-lg rounded-xl p-4"},[e("p",{staticClass:"text-lg font-semibold"},[t._v("Repurchase Rate")]),t._v(" "),e("p",{staticClass:"text-2xl font-bold"},[t._v(t._s(t.repurchaseRate)+"%")])])]),t._v(" "),e("div",{staticClass:"mb-4 flex space-x-4"},[e("button",{staticClass:"px-4 py-2 rounded font-semibold",class:"bestSellers"===t.activeTab?"bg-[#4C45E3] text-white":"border border-[#4C45E3] text-[#4C45E3]",on:{click:function(e){t.activeTab="bestSellers"}}},[t._v("\n        Best Selling Products\n      ")]),t._v(" "),e("button",{staticClass:"px-4 py-2 rounded font-semibold",class:"leastSellers"===t.activeTab?"bg-[#4C45E3] text-white":"border border-[#4C45E3] text-[#4C45E3]",on:{click:function(e){t.activeTab="leastSellers"}}},[t._v("\n        Least Selling Products\n      ")])]),t._v(" "),e("div",{staticClass:"mb-6 bg-white rounded-xl shadow-lg py-3 px-2 overflow-x-auto"},[e("h3",{staticClass:"text-lg font-semibold mb-2"},[t._v("\n        "+t._s("bestSellers"===t.activeTab?"Best Selling Products":"Least Selling Products")+"\n      ")]),t._v(" "),e("table",{staticClass:"min-w-full divide-y divide-gray-200"},[t._m(0),t._v(" "),e("tbody",{staticClass:"bg-white divide-y divide-gray-200"},[t._l(t.filteredProductData,(function(r,l){return e("tr",{key:l},[e("td",{staticClass:"px-6 py-4 whitespace-nowrap"},[t._v(t._s(l+1))]),t._v(" "),e("td",{staticClass:"px-6 py-4 whitespace-nowrap"},[t._v(t._s(r.productName))]),t._v(" "),e("td",{staticClass:"px-6 py-4 whitespace-nowrap"},[t._v(t._s(r.sales))]),t._v(" "),e("td",{staticClass:"px-6 py-4 whitespace-nowrap"},[t._v(t._s(r.totalSales))])])})),t._v(" "),0===t.filteredProductData.length?e("tr",[e("td",{staticClass:"px-6 py-4 text-center text-gray-500",attrs:{colspan:"4"}},[t._v("No product data available.")])]):t._e()],2)])]),t._v(" "),e("div",{staticClass:"flex flex-wrap justify-center gap-4"},[e("div",{staticClass:"bg-white shadow-lg rounded-xl p-5 w-[50] sm:w-[45%]"},[e("h3",{staticClass:"text-lg font-semibold mb-2"},[t._v("New vs. Returning Customers")]),t._v(" "),e("div",{staticClass:"flex justify-center"},[e("PieChart",{staticClass:"w-[70%]",attrs:{chartData:t.newVsReturningChartData,options:t.pieChartOptions}})],1)]),t._v(" "),e("div",{staticClass:"bg-white shadow-lg rounded-xl p-5 w-[50] sm:w-[45%]"},[e("h3",{staticClass:"text-lg font-semibold mb-2"},[t._v("Overall Shipment Status")]),t._v(" "),e("div",{staticClass:"flex justify-center"},[e("PieChart",{staticClass:"w-[70%]",attrs:{chartData:t.overallStatusChartData,options:t.pieChartOptions}})],1)])]),t._v(" "),e("div",{staticClass:"mt-6"},[e("Footer")],1)],1)])}),[function(){var t=this,e=t._self._c;return e("thead",{staticClass:"bg-gray-50"},[e("tr",[e("th",{staticClass:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},[t._v("No.")]),t._v(" "),e("th",{staticClass:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},[t._v("Product Name")]),t._v(" "),e("th",{staticClass:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},[t._v("Sales")]),t._v(" "),e("th",{staticClass:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"},[t._v("Total Sales")])])])}],!1,null,"d81ab25e",null);e.default=component.exports;installComponents(component,{Sales:r(500).default,PieChart:r(493).default,Footer:r(154).default})}}]);