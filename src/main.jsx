import React,{useEffect,useMemo,useState} from "react";
import {createRoot} from "react-dom/client";
import {MapContainer,TileLayer,Marker,Popup,Polyline,CircleMarker,useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const stops=[
 {name:"ABES Engineering College",pos:[28.6762,77.4525]},
 {name:"ISBT Sector 43",pos:[28.5678,77.2102]},
 {name:"CTU Workshop",pos:[28.6488,77.3174]},
 {name:"Maripat Railway Station",pos:[28.662,77.486]},
 {name:"Shaheed Sthal",pos:[28.6815,77.4264]},
 {name:"Crossings Republik",pos:[28.6285,77.4391]}
];
const routes={
 R1:{name:"ISBT Sector 43 → CTU Workshop",eta:7,color:"#536dfe",path:[[28.6762,77.4525],[28.669,77.454],[28.650,77.443],[28.6285,77.4391],[28.61,77.40],[28.6488,77.3174]]},
 R2:{name:"ABES → Maripat Railway Station",eta:11,color:"#18b985",path:[[28.6762,77.4525],[28.6815,77.46],[28.675,77.475],[28.662,77.486]]},
 R3:{name:"Shaheed Sthal → ABES",eta:4,color:"#ff9d42",path:[[28.6815,77.4264],[28.679,77.437],[28.6762,77.4525]]}
};
const buses=[
 {id:"BUS-101",route:"R1",pos:[28.665,77.452],speed:31,seats:18,status:"On Time",delay:"—"},
 {id:"BUS-204",route:"R2",pos:[28.673,77.474],speed:24,seats:9,status:"On Time",delay:"—"},
 {id:"BUS-307",route:"R3",pos:[28.679,77.439],speed:19,seats:24,status:"Delayed",delay:"+6 min"}
];

const icon=(active)=>L.divIcon({className:"",html:`<div class="bus-pin ${active?"active":""}">🚌</div>`,iconSize:[46,46],iconAnchor:[23,23]});
function Fly({pos}){const m=useMap();useEffect(()=>{if(pos)m.flyTo(pos,12,{duration:.7})},[pos]);return null}

function App(){
 const [page,setPage]=useState("dashboard"),[route,setRoute]=useState("R1"),[bus,setBus]=useState("BUS-101");
 const [from,setFrom]=useState("Current Location"),[to,setTo]=useState("CTU Workshop"),[q,setQ]=useState("");
 const [tracking,setTracking]=useState(false),[toast,setToast]=useState("");
 const [alertOn,setAlertOn]=useState(true);
 const active=useMemo(()=>buses.find(x=>x.id===bus)||buses[0],[bus]);
 const flash=(x)=>{setToast(x);setTimeout(()=>setToast(""),2500)};
 const searchResults=stops.filter(s=>!q||s.name.toLowerCase().includes(q.toLowerCase())).slice(0,4);

 return <div className="shell">
  <header className="navbar">
   <button className="logo" onClick={()=>setPage("dashboard")}><span>🚌</span>Bus<span>Kr</span></button>
   <nav>
    {[
      ["dashboard","Live Map"],["driver","Driver App"],["admin","Admin View"],["about","Project"]
    ].map(([id,label])=><button key={id} className={page===id?"nav active":"nav"} onClick={()=>setPage(id)}>{label}</button>)}
   </nav>
   <div className="nav-right"><span className="live"><i/> SYSTEM LIVE</span><button className="bell" onClick={()=>flash(alertOn?"No new alerts":"Alerts muted")}>🔔</button><div className="avatar">R</div></div>
  </header>

  {page==="dashboard"&&<Dashboard {...{route,setRoute,bus,setBus,active,from,setFrom,to,setTo,q,setQ,searchResults,flash,alertOn,setAlertOn}}/>}
  {page==="driver"&&<Driver {...{bus,setBus,active,tracking,setTracking,flash}}/>}
  {page==="admin"&&<Admin {...{flash}}/>}
  {page==="about"&&<About/>}

  <footer><div><b>🚌 BusKr</b><span>Real-time routes. Reliable rides.</span></div><div>React • JavaScript • Firebase-ready • GPS • Maps</div><div>Smart India Hackathon 2025 concept</div></footer>
  {toast&&<div className="toast">✓ {toast}</div>}
 </div>
}

function Dashboard(p){
 return <main>
  <section className="hero">
   <div className="hero-copy"><div className="eyebrow">SMART PUBLIC TRANSPORT • 01</div>
    <h1>Know where your bus is.<br/><em>Before you leave.</em></h1>
    <p>BusKr combines live GPS, interactive maps and predictive ETAs to make daily bus travel simpler, safer and more reliable.</p>
    <div className="hero-actions"><button className="primary" onClick={()=>p.flash("Live tracking is centered on your selected bus.")}>Track my bus <b>→</b></button><button className="secondary" onClick={()=>p.setAlertOn(!p.alertOn)}>🔔 {p.alertOn?"Alerts ON":"Alerts OFF"}</button></div>
   </div>
   <div className="hero-metric"><span>NEXT ARRIVAL</span><strong>{p.route==="R3"?4:p.route==="R2"?11:7}<small>min</small></strong><div className="metric-route">● {routes[p.route].name}</div><div className="metric-progress"><i style={{width:p.route==="R3"?"82%":p.route==="R2"?"58%":"71%"}}/></div><small>Live estimate • updates automatically</small></div>
  </section>

  <section className="quick-stats">
   <Stat n="03" t="Buses online" icon="🚌"/><Stat n="07 min" t="Average ETA" icon="⏱"/><Stat n="98%" t="ETA accuracy target" icon="🎯"/><Stat n="<10s" t="GPS refresh goal" icon="📡"/>
  </section>

  <section className="workspace">
   <div className="map-panel panel">
    <div className="panel-head"><div><span className="section-tag">LIVE NETWORK</span><h2>Bus locations & routes</h2><p>Tap a bus to inspect speed, seats and route.</p></div><span className="live-badge"><i/> LIVE</span></div>
    <div className="map"><MapContainer center={[28.66,77.40]} zoom={11} scrollWheelZoom>
     <TileLayer attribution="&copy; OpenStreetMap" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
     {Object.entries(routes).map(([k,r])=><Polyline key={k} positions={r.path} pathOptions={{color:r.color,weight:k===p.route?7:3,opacity:k===p.route?1:.3}}/>)}
     {stops.map(s=><CircleMarker key={s.name} center={s.pos} radius={6} pathOptions={{color:"#fff",weight:2,fillColor:"#536dfe",fillOpacity:1}}><Popup><b>{s.name}</b><br/>Bus stop</Popup></CircleMarker>)}
     {buses.map(b=><Marker key={b.id} position={b.pos} icon={icon(b.id===p.bus)} eventHandlers={{click:()=>{p.setBus(b.id);p.setRoute(b.route)}}}><Popup><b>{b.id}</b><br/>{routes[b.route].name}<br/>{b.speed} km/h • {b.status}</Popup></Marker>)}
     <Fly pos={p.active.pos}/>
    </MapContainer></div>
    <div className="legend"><span>🚌 Live bus</span><span><i className="dot"/> Bus stop</span><span><i className="route-dot"/> Selected route</span><span><i className="gray-route"/> Other routes</span></div>
   </div>

   <aside className="side">
    <div className="panel planner">
     <div className="panel-head compact"><div><span className="section-tag">JOURNEY PLANNER</span><h2>Where are you going?</h2></div></div>
     <label>FROM</label><select value={p.from} onChange={e=>p.setFrom(e.target.value)}><option>Current Location</option>{stops.map(s=><option key={s.name}>{s.name}</option>)}</select>
     <label>TO</label><div className="input"><span>⌕</span><input value={p.q||p.to} onChange={e=>{p.setQ(e.target.value);p.setTo(e.target.value)}} placeholder="Search a destination"/></div>
     <div className="suggestions">{p.searchResults.map(s=><button key={s.name} onClick={()=>{p.setTo(s.name);p.setQ("");p.flash("Destination selected: "+s.name)}}>{s.name}<b>›</b></button>)}</div>
     <button className="primary wide" onClick={()=>p.flash("Best available route selected on the map.")}>Find best route <b>→</b></button>
    </div>
    <div className="panel bus-card">
      <div className="card-top"><span className="section-tag">SELECTED BUS</span><span className={`status ${p.active.status==="Delayed"?"warn":""}`}>{p.active.status}</span></div>
      <h3>{p.active.id}</h3><p>{routes[p.active.route].name}</p>
      <div className="bus-data"><div><b>{p.active.speed}</b><small>km/h</small></div><div><b>{p.active.seats}</b><small>seats</small></div><div><b>{p.active.delay}</b><small>delay</small></div></div>
      <button className="text-btn" onClick={()=>p.flash("Favourite stop saved.")}>☆ Add to favourites</button>
    </div>
    <div className="alert-card"><div>🔔 <b>Smart alert</b></div><p>Bus 307 is delayed by 6 minutes. An alternate route is available.</p><button onClick={()=>p.setRoute("R1")}>View alternate route →</button></div>
   </aside>
  </section>

  <section className="features"><Feature icon="📡" title="Live ETA" text="Real-time bus arrival times based on GPS movement."/><Feature icon="🧠" title="Smart alerts" text="Delays, route changes and service notifications."/><Feature icon="↗" title="Alternate routes" text="Quick suggestions when your normal route changes."/><Feature icon="⭐" title="Favourite stops" text="One-tap tracking for your everyday journey."/></section>
 </main>
}

function Stat({n,t,icon}){return <div className="stat"><span>{icon}</span><div><b>{n}</b><small>{t}</small></div></div>}
function Feature({icon,title,text}){return <article className="feature"><span>{icon}</span><div><b>{title}</b><p>{text}</p></div></article>}

function Driver(p){
 return <main><section className="page-title"><span className="eyebrow">DRIVER APP • 02</span><h1>Simple for drivers.<br/><em>Powerful for monitoring.</em></h1><p>The driver app sends GPS updates every few seconds so passengers and administrators see the same live picture.</p></section>
 <section className="driver-layout"><div className="panel driver-console">
  <div className="panel-head"><div><span className="section-tag">DRIVER CONSOLE</span><h2>Start a tracking session</h2></div><span className={p.tracking?"live-badge":"offline"}>{p.tracking?"● TRACKING":"○ READY"}</span></div>
  <label>BUS ID</label><select value={p.bus} onChange={e=>p.setBus(e.target.value)}>{buses.map(b=><option key={b.id}>{b.id}</option>)}</select>
  <label>ROUTE</label><select><option>{routes[p.active.route].name}</option><option>R2 — ABES → Maripat Railway Station</option><option>R3 — Shaheed Sthal → ABES</option></select>
  <div className="gps-box"><div className="gps-ring">⌖</div><div><b>{p.tracking?"GPS signal active":"GPS not started"}</b><small>{p.tracking?"Location shared every 5 seconds":"Tap start to begin location sharing"}</small></div><span>{p.tracking?"●":"○"}</span></div>
  <button className={`primary wide ${p.tracking?"stop":""}`} onClick={()=>{p.setTracking(!p.tracking);p.flash(p.tracking?"Tracking stopped":"GPS tracking started successfully")}}>{p.tracking?"Stop tracking":"Start GPS tracking"} <b>{p.tracking?"■":"▶"}</b></button>
 </div>
 <div className="panel activity"><span className="section-tag">TODAY'S ACTIVITY</span><h2>Fleet snapshot</h2><div className="activity-grid"><Metric label="Distance" value="42.8 km"/><Metric label="Avg speed" value={p.active.speed+" km/h"}/><Metric label="Updates" value="513"/><Metric label="GPS accuracy" value="±8 m"/></div><h3>Recent location log</h3>{["18:20:05","18:15:02","18:10:08","18:05:01"].map((t,i)=><div className="log" key={t}><span>📍</span><div><b>Location update</b><small>{t} • Lat 28.67 • Long 77.45 • ±{8+i}m</small></div></div>)}</div></section>
 <section className="benefit-grid"><Info title="Quick Bus ID & Route Selection" text="Minimum input so drivers can start quickly."/><Info title="Automatic GPS Tracking" text="Location updates are sent every few seconds."/><Info title="Activity Log" text="Recent location history supports route validation."/><Info title="Low Data & Battery Use" text="Optimized for basic smartphones and low connectivity."/></section></main>
}
function Metric({label,value}){return <div><small>{label}</small><b>{value}</b></div>}
function Info({title,text}){return <div className="info"><span>✓</span><div><b>{title}</b><p>{text}</p></div></div>}

function Admin({flash}){
 const [tab,setTab]=useState("overview");
 return <main><section className="page-title row-title"><div><span className="eyebrow">ADMIN DASHBOARD • 03</span><h1>Monitor the whole fleet.</h1><p>Real-time operational view for government and transport administrators.</p></div><button className="secondary" onClick={()=>flash("Dashboard data refreshed.")}>↻ Refresh data</button></section>
 <div className="admin-tabs">{["overview","fleet","analytics"].map(x=><button className={tab===x?"on":""} onClick={()=>setTab(x)} key={x}>{x[0].toUpperCase()+x.slice(1)}</button>)}</div>
 <section className="admin-grid"><div className="panel admin-main"><div className="panel-head"><div><span className="section-tag">REAL-TIME MONITORING</span><h2>{tab==="overview"?"Fleet overview":tab==="fleet"?"Fleet management":"Transit analytics"}</h2></div><span className="live-badge"><i/> LIVE</span></div>
 {tab==="overview"&&<><div className="big-numbers"><Metric label="Active buses" value="3 / 10"/><Metric label="On-time rate" value="94%"/><Metric label="Avg delay" value="2.8m"/><Metric label="Passengers today" value="2,481"/></div><div className="chart"><div className="bars">{[42,68,55,78,62,88,71,93,80,95].map((h,i)=><i key={i} style={{height:h+"%"}}><span>{i+8}</span></i>)}</div><small>Passenger demand by hour</small></div></>}
 {tab==="fleet"&&buses.map(b=><div className="fleet-row" key={b.id}><span className="fleet-icon">🚌</span><div><b>{b.id}</b><small>{routes[b.route].name}</small></div><strong>{b.speed} km/h</strong><span className={b.status==="Delayed"?"status warn":"status"}>{b.status}</span></div>)}
 {tab==="analytics"&&<div className="analytics"><div><b>31%</b><span>Wait-time reduction target</span></div><div><b>100+</b><span>Potential scalable buses</span></div><div><b>24/7</b><span>Fleet visibility</span></div><div><b>Low</b><span>Operational cost</span></div></div>}
 </div><aside className="side"><div className="panel"><span className="section-tag">GOVERNMENT BENEFITS</span><h2>Why BusKr?</h2><ul className="checklist"><li>Real-time monitoring from driver app</li><li>Fleet analytics for speed, delays and stops</li><li>Service reliability and schedule optimization</li><li>Fuel & cost efficiency through route insights</li><li>Scales to 100+ buses without new hardware</li></ul></div><div className="panel quote">“Data turns everyday bus movement into better public service.”<small>— BusKr concept</small></div></aside></section></main>
}

function About(){
 return <main><section className="page-title"><span className="eyebrow">PROJECT • 04</span><h1>From a college prototype<br/><em>to a smart-city solution.</em></h1><p>A realistic second-year project: strong frontend skills, clean architecture and clear scope for future Firebase, GPS and AI/ML integration.</p></section>
 <section className="about-grid"><div className="panel"><span className="section-tag">TECHNOLOGY STACK & ARCHITECTURE</span><h2>How the system works</h2><div className="stack">{["React Native / React Frontend","JavaScript","Firebase Realtime Database","GPS & Maps API"].map((x,i)=><div key={x}><span>0{i+1}</span><b>{x}</b><small>{["Cross-platform mobile/web development","Interactive UI and application logic","Instant data synchronization for live bus locations","Accurate bus positioning and route visualization"][i]}</small></div>)}</div><div className="flow"><b>Driver GPS</b><i>→</i><b>Firebase</b><i>→</i><b>Passenger + Admin</b></div></div>
 <div className="panel"><span className="section-tag">FEASIBILITY & VIABILITY</span><h2>Why it can work</h2><ol className="numbered"><li>Uses existing smartphones and cloud services — no expensive hardware required.</li><li>Can scale from a pilot of 10–20 buses to a city-wide deployment.</li><li>Low operational cost while improving commuter convenience.</li></ol><h3>Planned improvements</h3><ul className="checklist"><li>More intuitive map and better route discovery</li><li>Voice assistance and translation options</li><li>AI/ML predictive arrival times</li><li>Offline support for low-connectivity regions</li></ul></div></section>
 <section className="challenge"><div><span className="section-tag">CHALLENGES</span><h2>What can go wrong?</h2><div className="chips"><span>Poor internet connectivity</span><span>Drivers may not have technical literacy</span><span>GPS inaccuracies</span><span>Dynamic route changes</span></div></div><div><span className="section-tag">INNOVATION</span><h2>How BusKr responds</h2><div className="chips blue"><span>Offline support + SMS fallback</span><span>Simple driver UI</span><span>CCTV-based availability checks</span><span>GPS + SIM beacon tracking</span></div></div></section>
 <section className="impact"><span className="section-tag">IMPACT & BENEFITS</span><h2>Built for small cities with low infrastructure.</h2><div className="impact-grid">{["No expensive IoT hardware required","Predictive arrival times instead of static locations","Offline support for low-connectivity regions","Government integration for planning & analytics","Reduced waiting time and improved trip planning","Simpler, more reliable public transport"].map(x=><div key={x}>✓ {x}</div>)}</div></section>
 <section className="refs panel"><span className="section-tag">RESOURCES & REFERENCES</span><h2>Research direction</h2><p>NITI Aayog — Transforming Mobility in Tier-2 Cities (2022)</p><p>Ministry of Housing and Urban Affairs — Urban Mobility Report</p><p>World Bank — Urban Transport / Real-time Transit Data</p><small>For a college submission, add the exact URLs/PDF links provided by your team or mentor.</small></section>
 </main>
}
function AppRoot(){return <App/>}
createRoot(document.getElementById("root")).render(<AppRoot/>);
