(async(a="los angeles")=>{const e=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&units=imperial&appid=9fd048a0fc1fbe1def9f57a580609f63`,{mode:"cors"}),o=await e.json();console.log(o)})();