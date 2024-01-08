import{r as o,u as G,b as z,B as re,j as t,c as oe,g as f,d as g,C,D as I,e as ie,t as le,M as ce,s as de,f as M,h as R,A as ue,i as pe,k as P,l as he,m as k,N as _,L as xe,n as me,o as Ee,F as p,p as ye,q as Se,v as be,w as V,x as Te,y as ve,z as U,E as Z,G as K,H as ge,V as fe,I as Le,J as je,K as Ce,O as we,Q as Ie,R as Ne,S as Y,U as N,W as Oe,X as Ae,Y as _e,Z as Me,_ as Re,$ as Pe,a0 as ke,a1 as q}from"./configuratorPage-aA1BNqwE.js";const $=o.createContext(void 0),Ge=({children:e})=>{const{minimapVisibility:a}=G(),[s,m]=o.useState(null),[i,x]=o.useState(a),[l,h]=o.useState(z),[E,u]=o.useState(re),[r,y]=o.useState(z.every(n=>n.enable)),j={map:s,initMap:()=>{m(oe())},isMinimap:i,toggleMinimap:()=>{x(n=>!n)},layers:l,updateLayer:n=>{const d=l.map(c=>c.id===n?{...c,enable:!c.enable}:c);y(d.every(c=>c.enable)),h(d)},selectAll:r,updateAllLayers:n=>{y(n);const d=l.map(c=>({...c,enable:n}));h(d)},baseLayers:E,updateBaseLayers:n=>{const d=E.map(c=>c.id===n?{...c,enable:!0}:{...c,enable:!1});u(d)}};return t.jsx($.Provider,{value:j,children:e})},L=()=>{const e=o.useContext($);if(!e)throw new Error("useMapContext must be used within a MapProvider");return e},X=o.createContext(void 0),Be=({children:e})=>{const[a,s]=o.useState(!1),i={showPrintWindow:a,openPrintWindow:x=>{s(x)}};return t.jsx(X.Provider,{value:i,children:e})},J=()=>{const e=o.useContext(X);if(!e)throw new Error("useToolContext must be used within a ToolProvider");return e},De=({id:e})=>{var h,E,u;const{toggleMinimap:a}=L(),{showPrintWindow:s,openPrintWindow:m}=J(),{map:i}=L(),x=(r,y)=>{switch(r){case he:i&&R(i,k);break;case P:a();break;case pe:m(!s);break;case ue:break;case ce:i&&y?de(i,y):i&&(M(i,"measurmentLayer"),R(i,k));break;case ie:le();break}},l=(r,y)=>{for(const S of y){if(S.id===r)return S.icon;if(S.options){const T=l(r,S.options);if(T)return T}}return null};return(h=f(g,e))!=null&&h.options?t.jsxs(I,{className:"nav-link tool-button",children:[t.jsx(I.Toggle,{className:"card",title:(u=f(g,e))==null?void 0:u.title,children:l(e,g)}),t.jsx(I.Menu,{children:f(g,e).options.map(r=>t.jsxs(I.Item,{onClick:()=>x(e,r.type),children:[l(r.id,g)," ",r.title]},r.id))})]}):t.jsx("button",{className:"nav-link tool-button",title:(E=f(g,e))==null?void 0:E.title,onClick:()=>x(e),children:t.jsx(C,{className:"btn btn-primary",children:l(e,g)})})},Fe=()=>{const{tools:e}=G();return t.jsxs(_,{fixed:"top",className:"map-nav",style:{padding:".25rem .5rem"},children:[t.jsx(xe,{to:"/",className:"navbar-brand",title:"Go to home page",children:t.jsx(C,{style:{padding:".3rem"},children:t.jsx("img",{src:me,alt:"Go to home page",style:{width:"1.5rem",height:"1.5rem"}})})}),t.jsx(_.Toggle,{"aria-controls":"basic-navbar-nav"}),t.jsx(_.Collapse,{id:"basic-navbar-nav",children:t.jsx(Ee,{className:"me-auto",children:e.map(a=>{if(a.enable)return t.jsx(De,{...a},a.id)})})})]})},He=()=>{const{layers:e,updateLayer:a,selectAll:s,updateAllLayers:m}=L();return t.jsxs(p,{className:"sidebar-layers",children:[t.jsx(p.Check,{id:"selectAll",type:"checkbox",label:"Select all",checked:s,onChange:()=>m(!s)}),e.map((i,x)=>t.jsx(p.Check,{id:i.id,type:"checkbox",label:i.id,checked:i.enable,onChange:()=>a(i.id)},x))]})},We=()=>{const{baseLayers:e,updateBaseLayers:a}=L();return t.jsx(p,{className:"sidebar-base-layers",children:e.map((s,m)=>t.jsxs(C,{onClick:()=>a(s.id),className:"sidebar-base-layers-row",border:s.enable?"primary":"secondary",children:[t.jsx("img",{src:`images/${s.image}`}),t.jsx(p.Check,{id:s.id,name:"baselayers",type:"radio",label:s.name,checked:s.enable,onChange:()=>{}})]},m))})},ze=({isOpen:e,toggleSidebar:a})=>t.jsxs(C,{className:`map-sidebar ${e?"open":""}`,children:[t.jsx("button",{className:"card",onClick:a,children:e?t.jsx(ye,{}):t.jsx(Se,{})}),t.jsx("div",{className:"map-sidebar-content",children:t.jsxs(be,{defaultActiveKey:"layers",id:"map-sidebar",className:"mb-3",fill:!0,children:[t.jsx(V,{eventKey:"layers",title:"Layers",children:t.jsx(He,{})}),t.jsx(V,{eventKey:"baseLayers",title:"Base Layers",children:t.jsx(We,{})})]})})]}),Ve=()=>{const{minimapVisibility:e,tools:a}=G(),{map:s,initMap:m,isMinimap:i,layers:x,baseLayers:l}=L(),[h,E]=o.useState(null);return o.useEffect(()=>{m(),E(Te())},[]),o.useEffect(()=>{var u;(u=f(a,P))!=null&&u.enable&&e?s==null||s.addControl(h):s==null||s.removeControl(h)},[s,e,a]),o.useEffect(()=>{var r;const u=!(s!=null&&s.getControls().getArray().includes(h));(r=f(a,P))!=null&&r.enable&&i&&u?s==null||s.addControl(h):s==null||s.removeControl(h)},[i]),o.useEffect(()=>{if(s){navigator.geolocation.getCurrentPosition(r=>{const{longitude:y,latitude:S}=r.coords,T=ve([y,S]);s.getView().setCenter(T)},r=>{console.error("Error getting geolocation:",r)},{enableHighAccuracy:!0}),U(s,x),Z(s,l);const u=r=>{s&&r.key==="Escape"&&R(s,k)};return window.addEventListener("keydown",u),()=>{window.removeEventListener("keydown",u)}}},[s]),o.useEffect(()=>{s&&U(s,x)},[x]),o.useEffect(()=>{s&&Z(s,l)},[l]),t.jsx("main",{className:"map-view",id:"map-view"})},Ue="SET_CENTER",Ze="SET_WIDTH",Ke="SET_HEIGHT",Ye="SET_ORIENTATION",qe="SET_FORMAT",$e="SET_PAGE_SIZE",Xe="SET_RESOLUTION",Je="SET_SCALE",Q={center:null,width:null,height:null,orientation:null,format:null,pageSize:"a4-landscape",resolution:"200",scale:"100"},Qe=(e=Q,a)=>{switch(a.type){case Ue:return{...e,center:a.payload};case Ze:return{...e,width:a.payload};case Ke:return{...e,height:a.payload};case Ye:return{...e,orientation:a.payload};case qe:return{...e,format:a.payload};case $e:return{...e,pageSize:a.payload};case Xe:return{...e,resolution:a.payload};case Je:return{...e,scale:a.payload};default:return e}},et=()=>{const{map:e}=L(),{showPrintWindow:a,openPrintWindow:s}=J(),[m,i]=o.useState(null),[x,l]=o.useReducer(Qe,Q),{center:h,width:E,height:u,orientation:r,format:y,pageSize:S,resolution:T,scale:v}=x,B=n=>{n.preventDefault(),e&&E&&u&&m&&(Ae({map:e,width:E,height:u,overviewExtent:m,scale:v,resolution:T,orientation:r}),s(!a))},D=()=>{const[n,d]=ke[y];let c,b;r==="portrait"?(c=d,b=n):(c=n,b=d),l({type:"SET_WIDTH",payload:c}),l({type:"SET_HEIGHT",payload:b})};o.useEffect(()=>{if(a){const n=e==null?void 0:e.getView().getCenter();n&&l({type:"SET_CENTER",payload:K(n)})}},[a]),o.useEffect(()=>{l({type:"SET_ORIENTATION",payload:S.split("-")[1]}),l({type:"SET_FORMAT",payload:S.split("-")[0]})},[a,S]),o.useEffect(()=>{a&&y&&r&&D()},[a,y,r]),o.useEffect(()=>{if(e&&h&&S&&E&&u&&v){const[n,d]=h||[0,0],c=E/q/+v,b=u/q/+v,ee=[n-c,d-b],te=[n+c,d-b],se=[n+c,d+b],ae=[n-c,d+b],w=ge(ae,se,te,ee),F=new fe({features:[new Le(w)]}),O=je(F,_e),H=new Ce({features:new we(F.getFeatures())});M(e,"overviewLayer"),e==null||e.addLayer(O),e==null||e.addInteraction(H),i(w==null?void 0:w.getExtent()),H.on("translateend",ne=>{const A=ne.features.item(0).getGeometry(),W=A==null?void 0:A.getExtent();i(W),l({type:"SET_CENTER",payload:K(Ie(W))})}),O.setZIndex(999),O.set("id","overviewLayer")}e&&!a&&M(e,"overviewLayer")},[e,a,h,E,u,v]);const j=n=>n.map(d=>t.jsx("option",{value:d.value,children:d.label},d.value));return t.jsxs(C,{className:`map-print ${a?"open":""}`,children:[t.jsx("button",{className:"card",onClick:()=>{s(!a)},children:t.jsx(Ne,{})}),t.jsx("div",{className:"map-print-content",children:t.jsxs(p,{noValidate:!0,onSubmit:B,children:[t.jsxs(Y,{children:[t.jsxs(p.Group,{as:N,controlId:"pageSizeId",children:[t.jsx(p.Label,{children:"Page size"}),t.jsx(p.Select,{size:"sm",name:"pageSize",value:S,onChange:n=>{l({type:"SET_PAGE_SIZE",payload:n.target.value})},required:!0,children:j(Me)})]}),t.jsxs(p.Group,{as:N,controlId:"resolutionId",children:[t.jsx(p.Label,{children:"Resolution"}),t.jsx(p.Select,{size:"sm",name:"resolution",value:T,onChange:n=>{l({type:"SET_RESOLUTION",payload:n.target.value})},required:!0,children:j(Re)})]})]}),t.jsx("br",{}),t.jsxs(Y,{children:[t.jsxs(p.Group,{as:N,xs:8,controlId:"scaleId",children:[t.jsx(p.Label,{children:"Scale"}),t.jsx(p.Select,{size:"sm",name:"scale",value:v,onChange:n=>{l({type:"SET_SCALE",payload:n.target.value})},required:!0,children:j(Pe)})]}),t.jsx(p.Group,{as:N,xs:4,style:{marginTop:"auto"},children:t.jsx(Oe,{size:"sm",type:"submit",variant:"primary",children:"Export PDF"})})]})]})})]})},at=()=>{const[e,a]=o.useState(!1),s=()=>{a(!e)};return t.jsx(Ge,{children:t.jsxs(Be,{children:[t.jsx(Fe,{}),t.jsx(ze,{isOpen:e,toggleSidebar:s}),t.jsx(et,{}),t.jsx(Ve,{})]})})};export{at as M};
