import{r as i,u as H,b as K,B as ie,j as e,c as ce,d as R,e as le,M as O,f as L,g as w,h as v,C as N,D as b,i as de,t as ue,k as pe,s as he,l as B,A as xe,m as me,n as F,o as ye,p as G,N as W,L as je,q as Ee,v as fe,F as E,w as Se,x as be,y as Te,z as ge,E as ve,G as we,H as Le,I as Ce,J as Y,K as q,O as Me,V as Oe,Q as Ne,R as Ie,S as Ae,U as _e,W as Re,X as ke,Y as $,Z as _,_ as De,$ as Pe,a0 as We,a1 as Be,a2 as Fe,a3 as Ge,a4 as J,a5 as He,a6 as ze,a7 as Q,a8 as ee,a9 as Ve}from"./configuratorPage-6IrJdjKk.js";const se=i.createContext(void 0),Ue=({children:s})=>{const{minimapVisibility:a}=H(),[t,h]=i.useState(null),[c,m]=i.useState(a),[r,l]=i.useState(K),[n,d]=i.useState(ie),[o,j]=i.useState(K.every(u=>u.enable)),S={map:t,initMap:()=>{h(ce())},isMinimap:c,toggleMinimap:()=>{m(u=>!u)},layers:r,switchLayer:u=>{const x=r.map(y=>y.id===u?{...y,enable:!y.enable}:y);j(x.every(y=>y.enable)),l(x)},removeLayer:u=>{const x=r.filter(y=>y.id!==u);l(x),t&&R(t,u)},changeOpacityLayer:(u,x)=>{const y=r.map(M=>M.id===u?{...M,opacity:x}:M);l(y)},selectAll:o,updateAllLayers:u=>{j(u);const x=r.map(y=>({...y,enable:u}));l(x)},baseLayers:n,updateBaseLayers:u=>{const x=n.map(y=>y.id===u?{...y,enable:!0}:{...y,enable:!1});d(x)}};return e.jsx(se.Provider,{value:S,children:s})},C=()=>{const s=i.useContext(se);if(!s)throw new Error("useMapContext must be used within a MapProvider");return s},Xe=()=>{var m,r;const{showMoreDetailsWindow:s,moreDetailsWindowContent:a,closeMoreDetailsWindow:t}=k();let h=[],c;return(m=a.features[0])!=null&&m.properties&&(h=Object.keys((r=a.features[0])==null?void 0:r.properties)),a.features.length>0&&h.length>0?c=e.jsxs(le,{responsive:!0,children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"No."}),h.map((l,n)=>e.jsx("th",{children:l.toUpperCase()},n))]})}),e.jsx("tbody",{children:a.features.map((l,n)=>e.jsxs("tr",{children:[e.jsx("td",{children:n+1}),Object.values(l.properties).map((d,o)=>e.jsx("td",{children:d},o))]},n))})]}):c=e.jsx(e.Fragment,{children:"No features found"}),e.jsxs(O,{centered:!0,size:"lg",show:s,onHide:t,dialogClassName:"more-details-window",children:[e.jsx(O.Header,{closeButton:!0,children:e.jsx(O.Title,{children:a.title})}),e.jsx(O.Body,{children:c}),e.jsx(O.Footer,{children:e.jsx(L,{variant:"secondary",onClick:t,children:"Close"})})]})},te=i.createContext(void 0),Ze=({children:s})=>{const[a,t]=i.useState(!1),[h,c]=i.useState(!1),[m,r]=i.useState({title:"",features:[]}),o={showPrintWindow:a,openPrintWindow:j=>{t(j)},showMoreDetailsWindow:h,openMoreDetailsWindow:(j,f)=>{r({title:j,features:f}),c(!0)},closeMoreDetailsWindow:()=>{c(!1)},moreDetailsWindowContent:m};return e.jsxs(te.Provider,{value:o,children:[s,e.jsx(Xe,{})]})},k=()=>{const s=i.useContext(te);if(!s)throw new Error("useToolContext must be used within a ToolProvider");return s},Ke=({id:s})=>{var l,n,d;const{toggleMinimap:a}=C(),{showPrintWindow:t,openPrintWindow:h}=k(),{map:c}=C(),m=(o,j)=>{switch(o){case ye:c&&B(c,G);break;case F:a();break;case me:h(!t);break;case xe:break;case pe:c&&j?he(c,j):c&&(R(c,"measurmentLayer"),B(c,G));break;case de:ue();break}},r=(o,j)=>{for(const f of j){if(f.id===o)return f.icon;if(f.options){const T=r(o,f.options);if(T)return T}}return null};return(l=w(v,s))!=null&&l.options?e.jsxs(b,{className:"nav-link tool-button",children:[e.jsx(b.Toggle,{className:"card",title:(d=w(v,s))==null?void 0:d.title,children:r(s,v)}),e.jsx(b.Menu,{children:w(v,s).options.map(o=>e.jsxs(b.Item,{as:L,onClick:()=>m(s,o.type),children:[r(o.id,v)," ",o.title]},o.id))})]}):e.jsx("button",{className:"nav-link tool-button",title:(n=w(v,s))==null?void 0:n.title,onClick:()=>m(s),children:e.jsx(N,{className:"btn btn-primary",children:r(s,v)})})},Ye=()=>{const{tools:s}=H();return e.jsxs(W,{fixed:"top",className:"map-nav",style:{padding:".25rem .5rem"},children:[e.jsx(je,{to:"/",className:"navbar-brand",title:"Go to home page",children:e.jsx(N,{style:{padding:".3rem"},children:e.jsx("img",{src:Ee,alt:"Go to home page",style:{width:"1.5rem",height:"1.5rem"}})})}),e.jsx(W.Toggle,{"aria-controls":"basic-navbar-nav"}),e.jsx(W.Collapse,{id:"basic-navbar-nav",children:e.jsx(fe,{className:"me-auto",children:s.map(a=>{if(a.enable)return e.jsx(Ke,{...a},a.id)})})})]})},qe=()=>{const{layers:s,switchLayer:a,removeLayer:t,changeOpacityLayer:h,selectAll:c,updateAllLayers:m}=C(),{openMoreDetailsWindow:r}=k(),l=async(n,d)=>{document.body.style.cursor="progress";const o=await ve(d);document.body.style.cursor="auto",r(n,o)};return e.jsxs(E,{className:"sidebar-layers",children:[e.jsx(E.Check,{id:"selectAll",type:"checkbox",label:"Select all",checked:c,onChange:()=>m(!c)}),s.map((n,d)=>e.jsxs("div",{className:"sidebar-layer",children:[e.jsx(E.Check,{id:n.id,type:"checkbox",label:n.name,checked:n.enable,onChange:()=>a(n.id)}),e.jsxs(b,{className:"sidebar-layer-dropdown",children:[e.jsx(b.Toggle,{className:"card",children:e.jsx(Se,{})}),e.jsxs(b.Menu,{children:[e.jsxs(b.Item,{as:L,onClick:o=>o.stopPropagation(),children:[e.jsxs("div",{children:[e.jsx(be,{}),"Opacity: "," "+n.opacity]}),e.jsx(E.Range,{value:n.opacity,min:0,max:1,step:.1,onTouchMove:o=>o.stopPropagation(),onChange:o=>h(n.id,parseFloat(o.target.value))})]}),e.jsxs(b.Item,{as:L,onClick:()=>{n.url&&l(n.name,n.url)},children:[e.jsx(Te,{})," Details"]}),e.jsxs(b.Item,{as:L,onClick:()=>t(n.id),children:[e.jsx(ge,{})," Remove"]})]})]})]},d))]})},$e=()=>{const{baseLayers:s,updateBaseLayers:a}=C();return e.jsx(E,{className:"sidebar-base-layers",children:s.map((t,h)=>e.jsxs(N,{onClick:()=>a(t.id),className:"sidebar-base-layers-row",border:t.enable?"primary":"secondary",children:[e.jsx("img",{src:`images/${t.image}`}),e.jsx(E.Check,{id:t.id,name:"baselayers",type:"radio",label:t.name,checked:t.enable,onChange:()=>{}})]},h))})},Je=({isOpen:s,toggleSidebar:a})=>e.jsxs(N,{className:`map-sidebar ${s?"open":""}`,children:[e.jsx("button",{className:"card",onClick:a,children:s?e.jsx(we,{}):e.jsx(Le,{})}),e.jsx("div",{className:"map-sidebar-content",children:e.jsxs(Ce,{defaultActiveKey:"layers",id:"map-sidebar",className:"mb-3",fill:!0,children:[e.jsx(Y,{eventKey:"layers",title:"Layers",children:e.jsx(qe,{})}),e.jsx(Y,{eventKey:"baseLayers",title:"Base Layers",children:e.jsx($e,{})})]})})]}),Qe="SET_CENTER",es="SET_WIDTH",ss="SET_HEIGHT",ts="SET_ORIENTATION",as="SET_FORMAT",ns="SET_PAGE_SIZE",os="SET_RESOLUTION",rs="SET_SCALE",ae={center:null,width:null,height:null,orientation:null,format:null,pageSize:"a4-landscape",resolution:"200",scale:"100"},is=(s=ae,a)=>{switch(a.type){case Qe:return{...s,center:a.payload};case es:return{...s,width:a.payload};case ss:return{...s,height:a.payload};case ts:return{...s,orientation:a.payload};case as:return{...s,format:a.payload};case ns:return{...s,pageSize:a.payload};case os:return{...s,resolution:a.payload};case rs:return{...s,scale:a.payload};default:return s}},cs=()=>{const{map:s}=C(),{showPrintWindow:a,openPrintWindow:t}=k(),[h,c]=i.useState(null),[m,r]=i.useReducer(is,ae),{center:l,width:n,height:d,orientation:o,format:j,pageSize:f,resolution:T,scale:g}=m,z=p=>{p.preventDefault(),s&&n&&d&&h&&(De({map:s,width:n,height:d,overviewExtent:h,scale:g,resolution:T,orientation:o}),t(!a))},V=()=>{const[p,S]=Ge[j];let u,x;o==="portrait"?(u=S,x=p):(u=p,x=S),r({type:"SET_WIDTH",payload:u}),r({type:"SET_HEIGHT",payload:x})};i.useEffect(()=>{if(a){const p=s==null?void 0:s.getView().getCenter();p&&r({type:"SET_CENTER",payload:q(p)})}},[a]),i.useEffect(()=>{r({type:"SET_ORIENTATION",payload:f.split("-")[1]}),r({type:"SET_FORMAT",payload:f.split("-")[0]})},[a,f]),i.useEffect(()=>{a&&j&&o&&V()},[a,j,o]),i.useEffect(()=>{if(s&&l&&f&&n&&d&&g){const[p,S]=l||[0,0],u=n/J/+g,x=d/J/+g,y=[p-u,S-x],M=[p+u,S-x],ne=[p+u,S+x],oe=[p-u,S+x],A=Me(oe,ne,M,y),U=new Oe({features:[new Ne(A)]}),D=Ie(U,Pe),X=new Ae({features:new _e(U.getFeatures())});R(s,"overviewLayer"),s==null||s.addLayer(D),s==null||s.addInteraction(X),c(A==null?void 0:A.getExtent()),X.on("translateend",re=>{const P=re.features.item(0).getGeometry(),Z=P==null?void 0:P.getExtent();c(Z),r({type:"SET_CENTER",payload:q(Re(Z))})}),D.setZIndex(999),D.set("id","overviewLayer")}s&&!a&&R(s,"overviewLayer")},[s,a,l,n,d,g]);const I=p=>p.map(S=>e.jsx("option",{value:S.value,children:S.label},S.value));return e.jsxs(N,{className:`map-print ${a?"open":""}`,children:[e.jsx("button",{className:"card",onClick:()=>{t(!a)},children:e.jsx(ke,{})}),e.jsx("div",{className:"map-print-content",children:e.jsxs(E,{noValidate:!0,onSubmit:z,children:[e.jsxs($,{children:[e.jsxs(E.Group,{as:_,controlId:"pageSizeId",children:[e.jsx(E.Label,{children:"Page size"}),e.jsx(E.Select,{size:"sm",name:"pageSize",value:f,onChange:p=>{r({type:"SET_PAGE_SIZE",payload:p.target.value})},required:!0,children:I(We)})]}),e.jsxs(E.Group,{as:_,controlId:"resolutionId",children:[e.jsx(E.Label,{children:"Resolution"}),e.jsx(E.Select,{size:"sm",name:"resolution",value:T,onChange:p=>{r({type:"SET_RESOLUTION",payload:p.target.value})},required:!0,children:I(Be)})]})]}),e.jsx("br",{}),e.jsxs($,{children:[e.jsxs(E.Group,{as:_,xs:8,controlId:"scaleId",children:[e.jsx(E.Label,{children:"Scale"}),e.jsx(E.Select,{size:"sm",name:"scale",value:g,onChange:p=>{r({type:"SET_SCALE",payload:p.target.value})},required:!0,children:I(Fe)})]}),e.jsx(E.Group,{as:_,xs:4,style:{marginTop:"auto"},children:e.jsx(L,{size:"sm",type:"submit",variant:"primary",children:"Export PDF"})})]})]})})]})},ls=()=>{const{minimapVisibility:s,tools:a}=H(),{map:t,initMap:h,isMinimap:c,layers:m,baseLayers:r}=C(),[l,n]=i.useState(null);return i.useEffect(()=>{h(),n(He())},[]),i.useEffect(()=>{var d;(d=w(a,F))!=null&&d.enable&&s?t==null||t.addControl(l):t==null||t.removeControl(l)},[t,s,a]),i.useEffect(()=>{var o;const d=!(t!=null&&t.getControls().getArray().includes(l));(o=w(a,F))!=null&&o.enable&&c&&d?t==null||t.addControl(l):t==null||t.removeControl(l)},[c]),i.useEffect(()=>{if(t){navigator.geolocation.getCurrentPosition(o=>{const{longitude:j,latitude:f}=o.coords,T=ze([j,f]);t.getView().setCenter(T)},o=>{console.error("Error getting geolocation:",o)},{enableHighAccuracy:!0}),Q(t,m),ee(t,r);const d=o=>{t&&o.key==="Escape"&&B(t,G)};return window.addEventListener("keydown",d),()=>{window.removeEventListener("keydown",d)}}},[t]),i.useEffect(()=>{t&&Q(t,m)},[m]),i.useEffect(()=>{t&&ee(t,r)},[r]),e.jsx("main",{className:"map-view",id:"map-view"})},ps=()=>{const s=i.useRef(0),a=i.useRef(0),[t,h]=i.useState(!1),c=n=>{s.current=n.touches[0].clientX},m=n=>{a.current=n.touches[0].clientX},r=()=>{const n=s.current-a.current;Ve()&&a.current&&n>60&&(h(!1),a.current=0)},l=()=>{h(!t)};return e.jsx(Ue,{children:e.jsxs(Ze,{children:[e.jsx(Ye,{}),e.jsx("div",{onTouchStart:c,onTouchMove:m,onTouchEnd:r,children:e.jsx(Je,{isOpen:t,toggleSidebar:l})}),e.jsx(cs,{}),e.jsx(ls,{})]})})};export{ps as default};
