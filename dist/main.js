(()=>{"use strict";const e=e=>`https://api.openweathermap.org/data/2.5/weather?q=${e}&units=imperial&appid=9fd048a0fc1fbe1def9f57a580609f63`,t=document.documentElement,n=document.getElementById("input"),a=(document.getElementById("search-button"),document.getElementById("current-icon"),document.getElementById("current-temp")),o=document.getElementById("current-high"),r=document.getElementById("current-low"),i=(document.getElementById("time"),document.getElementById("location")),c=(document.querySelectorAll("hourly-cell"),document.getElementById("circle"),async n=>{t.style.setProperty("--spin-animation","gradient 15s ease infinite, spin 1s linear infinite"),t.style.setProperty("--before-filters","blur(50px) opacity(80%)");let a=await(async(t="los angeles")=>{const n=await fetch(e(t),{mode:"cors"});return await n.json()})(n),o=await(async(t="los angeles")=>{const n=await fetch(e(t),{mode:"cors"}),a=await n.json(),o=await fetch((r=a.coord,`https://api.openweathermap.org/data/2.5/onecall?lat=${r.lat}&lon=${r.lon}&units=imperial&appid=70d3ce744008d557a872cee31d8820ce`),{mode:"cors"});var r;return await o.json()})(n);s(a),l(a),m(a),t.style.setProperty("--before-filters","blur(50px) opacity(50%)"),t.style.setProperty("--spin-animation","gradient 15s ease infinite"),console.log(o)}),s=e=>{let t=Math.round(e.main.temp);a.innerHTML=`${t}°F`},l=e=>{let t=Math.round(e.main.temp_max),n=Math.round(e.main.temp_min);o.innerHTML=`${t}°F`,r.innerHTML=`${n}°F`},m=e=>{let t=e.name.toUpperCase(),n=e.sys.country;i.innerHTML=`${t}, ${n}`};(async()=>{c()})(),document.addEventListener("click",(async e=>{e.target.matches("#search-button")&&c(n.value)}))})();