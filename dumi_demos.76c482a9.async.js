(self["webpackChunk_sensoro_sensoro_design"]=self["webpackChunk_sensoro_sensoro_design"]||[]).push([[8336],{66148:function(){},18573:function(e,t,n){"use strict";n.d(t,{m:function(){return r.m}});var r=n(34306);n(27482)},25722:function(e,t,n){"use strict";function r(){const e=i(n(59496));return r=function(){return e},e}function o(){const e=n(4553);return o=function(){return e},e}function i(e){return e&&e.__esModule?e:{default:e}}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;const l=e=>e.render();var s=(e,t)=>{let n=[];const i=e.match.params.uuid,a=void 0===e.location.query.wrapper,c=t[i];if(c){const t=u(u({},c.previewerProps),{},{hideActions:(c.previewerProps.hideActions||[]).concat(["EXTERNAL"])});void 0!==e.location.query.capture&&(t.motions=(t.motions||[]).slice(),t.motions.unshift("autoplay"),t.motions.every((e=>!e.startsWith("capture")))&&t.motions.push("capture:[id|=root]")),n=a?[r().default.createElement(l,{render:()=>((0,o().useMotions)(t.motions||[],"undefined"!==typeof window?document.documentElement:null),r().default.createElement("div",{},r().default.createElement(c.component)))})]:[t,r().default.createElement(c.component)]}return n};t.default=s},16419:function(e,t,n){"use strict";n.r(t);var r=n(59496),o=n(48637),i=n(18573),a=n(4553),u=n(23632);n(66148);function c(e,t){return f(e)||m(e,t)||s(e,t)||l()}function l(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(e,t){if(e){if("string"===typeof e)return d(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function m(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done);a=!0)if(i.push(r.value),t&&i.length===t)break}catch(c){u=!0,o=c}finally{try{a||null==n["return"]||n["return"]()}finally{if(u)throw o}}return i}}function f(e){if(Array.isArray(e))return e}function p(e,t){var n,r=null===(n=e.match(/\.(\w+)$/))||void 0===n?void 0:n[1];return r||(r=t.tsx?"tsx":"jsx"),r}var v=function(e){var t,n,l,s=(0,r.useRef)(),d=(0,r.useContext)(a.context),m=d.locale,f=(0,a.useLocaleProps)(m,e),v=(0,a.useDemoUrl)(f.identifier),b=f.demoUrl||v,y=(null===i.m||void 0===i.m?void 0:i.m.location.hash)==="#".concat(f.identifier),_=1===Object.keys(f.sources).length,h=(0,a.useCodeSandbox)((null===(t=f.hideActions)||void 0===t?void 0:t.includes("CSB"))?null:f),E=(0,a.useRiddle)((null===(n=f.hideActions)||void 0===n?void 0:n.includes("RIDDLE"))?null:f),g=(0,a.useMotions)(f.motions||[],s.current),w=c(g,2),O=w[0],k=w[1],j=(0,a.useCopy)(),C=c(j,2),S=C[0],N=C[1],x=(0,r.useState)((function(){return f.sources._?"_":Object.keys(f.sources)[0]})),P=c(x,2),A=P[0],M=P[1],L=(0,r.useState)(p(A,f.sources[A])),R=c(L,2),D=R[0],T=R[1],I=(0,r.useState)(Boolean(f.defaultShowCode)),U=c(I,2),$=U[0],B=U[1],X=(0,r.useState)(Math.random()),q=c(X,2),J=q[0],Z=q[1],G=f.sources[A][D]||f.sources[A].content,H=(0,a.useTSPlaygroundUrl)(m,G),K=(0,r.useRef)(),W=(0,a.usePrefersColor)(),z=c(W,1),F=z[0];function Q(e){M(e),T(p(e,f.sources[e]))}return(0,r.useEffect)((function(){Z(Math.random())}),[F]),r.createElement("div",{style:f.style,className:[f.className,"__dumi-default-previewer",y?"__dumi-default-previewer-target":""].filter(Boolean).join(" "),id:f.identifier,"data-debug":f.debug||void 0,"data-iframe":f.iframe||void 0},f.iframe&&r.createElement("div",{className:"__dumi-default-previewer-browser-nav"}),r.createElement("div",{ref:s,className:"__dumi-default-previewer-demo",style:{transform:f.transform?"translate(0, 0)":void 0,padding:f.compact||f.iframe&&!1!==f.compact?"0":void 0,background:f.background}},f.iframe?r.createElement("iframe",{title:"dumi-previewer",style:{height:String(f.iframe).replace(/(\d)$/,"$1px")},key:J,src:b,ref:K}):f.children),r.createElement("div",{className:"__dumi-default-previewer-desc","data-title":f.title},f.title&&r.createElement(a.AnchorLink,{to:"#".concat(f.identifier)},f.title),f.description&&r.createElement("div",{dangerouslySetInnerHTML:{__html:f.description}})),r.createElement("div",{className:"__dumi-default-previewer-actions"},h&&r.createElement("button",{title:"Open demo on CodeSandbox.io",className:"__dumi-default-icon",role:"codesandbox",onClick:h}),E&&r.createElement("button",{title:"Open demo on Riddle",className:"__dumi-default-icon",role:"riddle",onClick:E}),f.motions&&r.createElement("button",{title:"Execute motions",className:"__dumi-default-icon",role:"motions",disabled:k,onClick:function(){return O()}}),f.iframe&&r.createElement("button",{title:"Reload demo iframe page",className:"__dumi-default-icon",role:"refresh",onClick:function(){return Z(Math.random())}}),!(null===(l=f.hideActions)||void 0===l?void 0:l.includes("EXTERNAL"))&&r.createElement(a.Link,{target:"_blank",to:b},r.createElement("button",{title:"Open demo in new tab",className:"__dumi-default-icon",role:"open-demo",type:"button"})),r.createElement("span",null),r.createElement("button",{title:"Copy source code",className:"__dumi-default-icon",role:"copy","data-status":N,onClick:function(){return S(G)}}),"tsx"===D&&$&&r.createElement(a.Link,{target:"_blank",to:H},r.createElement("button",{title:"Get JSX via TypeScript Playground",className:"__dumi-default-icon",role:"change-tsx",type:"button"})),r.createElement("button",{title:"Toggle source code panel",className:"__dumi-default-icon".concat($?" __dumi-default-btn-expand":""),role:"source",type:"button",onClick:function(){return B(!$)}})),$&&r.createElement("div",{className:"__dumi-default-previewer-source-wrapper"},!_&&r.createElement(o.Z,{className:"__dumi-default-previewer-source-tab",prefixCls:"__dumi-default-tabs",moreIcon:"\xb7\xb7\xb7",defaultActiveKey:A,onChange:Q},Object.keys(f.sources).map((function(e){return r.createElement(o.J,{tab:"_"===e?"index.".concat(p(e,f.sources[e])):e,key:e})}))),r.createElement("div",{className:"__dumi-default-previewer-source"},r.createElement(u.Z,{code:G,lang:D,showCopy:!1}))))};t["default"]=v}}]);