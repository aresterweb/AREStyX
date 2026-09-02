(function () {
"use strict";
const impl = Object.create(null);
const catalog = Array.isArray(window.AREStyxToolCatalog) ? window.AREStyxToolCatalog : [];
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const fmt = (n,d=8) => Number.isFinite(n) ? n.toLocaleString("id-ID",{maximumFractionDigits:d}) : "Tidak terdefinisi";
const get = id => $(id) ? $(id).value : "";
function num(id){const n=Number.parseFloat(get(id));if(!Number.isFinite(n))throw new Error("Masukkan angka yang valid.");return n;}
function int(id){const n=Number.parseInt(get(id),10);if(!Number.isFinite(n))throw new Error("Masukkan bilangan bulat yang valid.");return n;}
function gcd2(a,b){a=Math.abs(Math.trunc(a));b=Math.abs(Math.trunc(b));while(b)[a,b]=[b,a%b];return a;}
function list(s){const a=String(s).split(/[\s,;]+/).filter(Boolean).map(Number);if(!a.length||a.some(x=>!Number.isFinite(x)))throw new Error("Daftar angka tidak valid.");return a;}
function field(f){const id=esc(f.id),label=esc(f.label||f.id),full=f.full?" tool-field-full":"";if(f.type==="select"){const o=f.options.map(x=>{const z=typeof x==="string"?{value:x,label:x}:x;return `<option value="${esc(z.value)}"${z.selected?" selected":""}>${esc(z.label)}</option>`}).join("");return `<div class="tool-field${full}"><label for="${id}">${label}</label><select id="${id}" class="tool-select">${o}</select></div>`;}if(f.type==="textarea")return `<div class="tool-field${full}"><label for="${id}">${label}</label><textarea id="${id}" class="tool-textarea" placeholder="${esc(f.placeholder||"")}">${esc(f.value||"")}</textarea></div>`;const type=f.type||"number",attrs=[f.step!=null?`step="${esc(f.step)}"`:"",f.min!=null?`min="${esc(f.min)}"`:"",f.max!=null?`max="${esc(f.max)}"`:"",f.accept?`accept="${esc(f.accept)}"`:""].filter(Boolean).join(" ");return `<div class="tool-field${full}"><label for="${id}">${label}</label><input id="${id}" class="tool-input" type="${esc(type)}" ${attrs} value="${esc(f.value==null?"":f.value)}" placeholder="${esc(f.placeholder||"")}"></div>`;}
function form(fields,compute,label="Hitung",note=""){
 const w=$("toolWorkspace");w.innerHTML=`<div class="tool-form-grid">${fields.map(field).join("")}</div><div class="tool-action-row"><button id="extraRun" class="tool-button tool-button-primary" type="button">${esc(label)}</button><button id="extraReset" class="tool-button tool-button-secondary" type="button">Reset</button></div>${note?`<p class="tool-form-note">${esc(note)}</p>`:""}<div class="tool-result" aria-live="polite"><span class="tool-result-label">HASIL</span><div id="extraValue" class="tool-result-value">-</div><div id="extraDetail" class="tool-result-detail"></div></div>`;
 $("extraRun").addEventListener("click",async()=>{try{const r=await compute();if(r){$("extraValue").textContent=String(r.value);$("extraDetail").textContent=String(r.detail||"");}}catch(e){$("extraValue").textContent="Input tidak valid";$("extraDetail").textContent=e.message||String(e);}});
 $("extraReset").addEventListener("click",()=>{w.querySelectorAll("input,textarea").forEach(x=>{if(x.type!=="file")x.value=""});$("extraValue").textContent="-";$("extraDetail").textContent="";});
}
function textTool(transform,label="Proses",extras=[]){form([{id:"text",label:"Teks",type:"textarea",full:true},...extras],()=>({value:transform(get("text")),detail:"Hasil siap disalin."}),label);}
function add(id,fn){impl[id]=fn;}


/* calculator extensions */
add("fraction-calculator",()=>form([{id:"n1",label:"Pembilang 1",value:1},{id:"d1",label:"Penyebut 1",value:2},{id:"op",label:"Operasi",type:"select",options:["+","-","×","÷"]},{id:"n2",label:"Pembilang 2",value:1},{id:"d2",label:"Penyebut 2",value:3}],()=>{let a=int("n1"),b=int("d1"),c=int("n2"),d=int("d2"),n,q;if(!b||!d)throw new Error("Penyebut tidak boleh 0.");switch(get("op")){case"+":n=a*d+c*b;q=b*d;break;case"-":n=a*d-c*b;q=b*d;break;case"×":n=a*c;q=b*d;break;default:if(!c)throw new Error("Tidak dapat membagi dengan pecahan nol.");n=a*d;q=b*c;}if(q<0){n=-n;q=-q;}const g=gcd2(n,q)||1;return{value:`${n/g}/${q/g}`,detail:`Desimal ${fmt((n/g)/(q/g))}`};}));
add("gcd-lcm-calculator",()=>form([{id:"a",label:"Bilangan A",value:24},{id:"b",label:"Bilangan B",value:36}],()=>{const a=int("a"),b=int("b"),g=gcd2(a,b),l=a===0||b===0?0:Math.abs(a*b)/g;return{value:`FPB ${g}`,detail:`KPK ${fmt(l,0)}`};}));
add("median-calculator",()=>form([{id:"text",label:"Daftar angka",type:"textarea",full:true,value:"1, 3, 5, 7"}],()=>{const a=list(get("text")).sort((x,y)=>x-y),m=Math.floor(a.length/2),v=a.length%2?a[m]:(a[m-1]+a[m])/2;return{value:fmt(v),detail:`${a.length} data`};}));
add("standard-deviation-calculator",()=>form([{id:"text",label:"Daftar angka",type:"textarea",full:true,value:"2,4,4,4,5,5,7,9"}],()=>{const a=list(get("text")),mean=a.reduce((x,y)=>x+y,0)/a.length,pop=Math.sqrt(a.reduce((s,x)=>s+(x-mean)**2,0)/a.length),sample=a.length>1?Math.sqrt(a.reduce((s,x)=>s+(x-mean)**2,0)/(a.length-1)):0;return{value:`σ ${fmt(pop,4)}`,detail:`s ${fmt(sample,4)} • mean ${fmt(mean,4)}`};}));


/* converter extensions */
const conv={
"time-unit-converter":{s:["detik",1],min:["menit",60],h:["jam",3600],day:["hari",86400],week:["minggu",604800]},
"angle-converter":{rad:["radian",1],deg:["derajat",Math.PI/180],grad:["gradian",Math.PI/200],turn:["putaran",2*Math.PI]},
"frequency-converter":{Hz:["Hz",1],kHz:["kHz",1e3],MHz:["MHz",1e6],GHz:["GHz",1e9],rpm:["RPM",1/60]},
"force-converter":{N:["N",1],kN:["kN",1000],kgf:["kgf",9.80665],lbf:["lbf",4.4482216152605]},
"power-converter":{W:["W",1],kW:["kW",1000],MW:["MW",1e6],hp:["mechanical hp",745.699871582],PS:["metric PS",735.49875]},
"torque-converter":{Nm:["N·m",1],kNm:["kN·m",1000],lbft:["lb-ft",1.3558179483314],kgfm:["kgf·m",9.80665]},
"density-converter":{kgm3:["kg/m³",1],gcm3:["g/cm³",1000],kgL:["kg/L",1000],lbft3:["lb/ft³",16.01846337396]},
"flow-rate-converter":{Ls:["L/s",1],Lmin:["L/min",1/60],m3s:["m³/s",1000],m3h:["m³/h",1000/3600],gpm:["US gpm",3.785411784/60]}
};
Object.entries(conv).forEach(([id,u])=>add(id,()=>{const opts=Object.entries(u).map(([v,[label]])=>({value:v,label}));form([{id:"x",label:"Nilai",value:1},{id:"from",label:"Dari",type:"select",options:opts},{id:"to",label:"Ke",type:"select",options:opts.map((o,i)=>({...o,selected:i===1}))}],()=>{const a=u[get("from")],b=u[get("to")];return{value:fmt(num("x")*a[1]/b[1]),detail:`${a[0]} → ${b[0]}`};},"Konversi");}));


/* text extensions */
add("character-counter",()=>textTool(t=>`${t.length} karakter • ${t.replace(/\s/g,"").length} tanpa spasi`,"Hitung"));
add("case-converter",()=>form([{id:"text",label:"Teks",type:"textarea",full:true},{id:"mode",label:"Mode",type:"select",options:["UPPERCASE","lowercase","Title Case","Sentence case"]}],()=>{const t=get("text"),m=get("mode");let o=m==="UPPERCASE"?t.toUpperCase():m==="lowercase"?t.toLowerCase():m==="Title Case"?t.toLowerCase().replace(/\b\p{L}/gu,c=>c.toUpperCase()):t.toLowerCase().replace(/(^|[.!?]\s+)\p{L}/gu,c=>c.toUpperCase());return{value:o,detail:m};},"Ubah"));
add("whitespace-cleaner",()=>textTool(t=>t.split("\n").map(x=>x.trim().replace(/[ \t]+/g," ")).join("\n").replace(/\n{3,}/g,"\n\n")));
add("duplicate-line-remover",()=>textTool(t=>[...new Set(t.split(/\r?\n/))].join("\n")));
add("line-sorter",()=>form([{id:"text",label:"Baris",type:"textarea",full:true},{id:"mode",label:"Urutan",type:"select",options:["A-Z","Z-A","Numerik naik","Numerik turun"]}],()=>{let a=get("text").split(/\r?\n/),m=get("mode");if(m.startsWith("Numerik"))a.sort((x,y)=>(Number(x)||0)-(Number(y)||0));else a.sort((x,y)=>x.localeCompare(y,"id"));if(m==="Z-A"||m==="Numerik turun")a.reverse();return{value:a.join("\n"),detail:`${a.length} baris`};},"Urutkan"));
add("reverse-text",()=>form([{id:"text",label:"Teks",type:"textarea",full:true},{id:"mode",label:"Balik",type:"select",options:["Karakter","Baris"]}],()=>({value:get("mode")==="Baris"?get("text").split(/\r?\n/).reverse().join("\n"):[...get("text")].reverse().join(""),detail:get("mode")}),"Balik"));
add("find-replace",()=>form([{id:"text",label:"Teks",type:"textarea",full:true},{id:"find",label:"Cari",type:"text"},{id:"replace",label:"Ganti dengan",type:"text"}],()=>{const f=get("find");if(!f)throw new Error("Teks pencarian tidak boleh kosong.");const p=get("text").split(f);return{value:p.join(get("replace")),detail:`${p.length-1} penggantian`};},"Ganti Semua"));
add("slug-generator",()=>textTool(t=>t.normalize("NFKD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")));
add("line-counter",()=>form([{id:"text",label:"Teks",type:"textarea",full:true}],()=>{const a=get("text").split(/\r?\n/),blank=a.filter(x=>!x.trim()).length;return{value:`${a.length} baris`,detail:`${a.length-blank} non-kosong • ${blank} kosong`};},"Hitung"));
add("text-frequency",()=>form([{id:"text",label:"Teks",type:"textarea",full:true}],()=>{const w=get("text").toLocaleLowerCase("id").match(/[\p{L}\p{N}]+/gu)||[],m=new Map();w.forEach(x=>m.set(x,(m.get(x)||0)+1));const a=[...m].sort((x,y)=>y[1]-x[1]||x[0].localeCompare(y[0])).slice(0,20);return{value:a.map(([x,n])=>`${x}: ${n}`).join(" • ")||"Tidak ada kata",detail:`${m.size} kata unik`};},"Analisis"));
add("email-extractor",()=>textTool(t=>[...new Set(t.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)||[])].join("\n")));
add("url-extractor",()=>textTool(t=>[...new Set(t.match(/https?:\/\/[^\s<>"']+/gi)||[])].join("\n")));
add("blank-line-remover",()=>textTool(t=>t.split(/\r?\n/).filter(x=>x.trim()).join("\n")));


/* image tools */
function imageForm(extra=""){
 const w=$("toolWorkspace");w.innerHTML=`<div class="tool-form-grid">${field({id:"img",label:"Pilih gambar",type:"file",accept:"image/*",full:true})}${extra}</div><div class="tool-action-row"><button id="imgRun" class="tool-button tool-button-primary" type="button">Proses</button></div><div id="imgWrap" class="image-preview-wrap" hidden><img id="imgPreview" class="image-preview" alt="Preview hasil"><a id="imgDownload" class="tool-button tool-button-secondary" download="arestyx-image.png">Unduh hasil</a></div><div class="tool-result"><span class="tool-result-label">HASIL</span><div id="imgValue" class="tool-result-value">-</div><div id="imgDetail" class="tool-result-detail"></div></div>`;
}
function loadImage(){const f=$("img").files[0];if(!f) return Promise.reject(new Error("Pilih gambar terlebih dahulu."));if(!f.type.startsWith("image/")) return Promise.reject(new Error("File harus berupa gambar."));return new Promise((resolve,reject)=>{const url=URL.createObjectURL(f),im=new Image();im.onload=()=>resolve({file:f,url,im});im.onerror=()=>{URL.revokeObjectURL(url);reject(new Error("Gambar tidak dapat dibaca."));};im.src=url;});}
function blobCanvas(c,type="image/png",q=.9){return new Promise((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error("Gagal membuat output gambar.")),type,q));}
function imageBind(processor){$("imgRun").addEventListener("click",async()=>{try{const r=await processor();$("imgValue").textContent=r.value;$("imgDetail").textContent=r.detail||"";}catch(e){$("imgValue").textContent="Gagal";$("imgDetail").textContent=e.message||String(e);}});}
async function showBlob(blob,name){const u=URL.createObjectURL(blob);$("imgPreview").src=u;$("imgDownload").href=u;$("imgDownload").download=name;$("imgWrap").hidden=false;}
add("image-info",()=>{imageForm();imageBind(async()=>{const {file,url,im}=await loadImage();URL.revokeObjectURL(url);return{value:`${im.naturalWidth} × ${im.naturalHeight}px`,detail:`${file.type||"unknown"} • ${fmt(file.size/1024,2)} KB • rasio ${fmt(im.naturalWidth/im.naturalHeight,4)}:1`};});});
add("image-resizer",()=>{imageForm(field({id:"w",label:"Lebar px",value:800,min:1})+field({id:"h",label:"Tinggi px (0 = otomatis)",value:0,min:0}));imageBind(async()=>{const {file,url,im}=await loadImage();const w=int("w");let h=int("h");if(w<=0)throw new Error("Lebar harus > 0.");if(h<=0)h=Math.round(im.naturalHeight*w/im.naturalWidth);const c=document.createElement("canvas");c.width=w;c.height=h;c.getContext("2d").drawImage(im,0,0,w,h);const type=file.type==="image/jpeg"?"image/jpeg":"image/png",b=await blobCanvas(c,type,.92);await showBlob(b,`arestyx-resized.${type.endsWith("jpeg")?"jpg":"png"}`);URL.revokeObjectURL(url);return{value:`${w} × ${h}px`,detail:`${fmt(b.size/1024,2)} KB`};});});
add("image-compressor",()=>{imageForm(field({id:"q",label:"Kualitas 1–100",value:75,min:1,max:100})+field({id:"type",label:"Format",type:"select",options:[{value:"image/jpeg",label:"JPEG"},{value:"image/webp",label:"WebP"}]}));imageBind(async()=>{const {file,url,im}=await loadImage(),c=document.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext("2d").drawImage(im,0,0);const type=get("type"),q=Math.min(1,Math.max(.01,num("q")/100)),b=await blobCanvas(c,type,q);await showBlob(b,`arestyx-compressed.${type.endsWith("webp")?"webp":"jpg"}`);URL.revokeObjectURL(url);return{value:`${fmt(b.size/1024,2)} KB`,detail:`Ukuran awal ${fmt(file.size/1024,2)} KB`};});});
add("image-format-converter",()=>{imageForm(field({id:"type",label:"Format output",type:"select",options:[{value:"image/png",label:"PNG"},{value:"image/jpeg",label:"JPEG"},{value:"image/webp",label:"WebP"}]}));imageBind(async()=>{const {url,im}=await loadImage(),c=document.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext("2d").drawImage(im,0,0);const type=get("type"),b=await blobCanvas(c,type,.92),ext=type.split("/")[1].replace("jpeg","jpg");await showBlob(b,`arestyx-converted.${ext}`);URL.revokeObjectURL(url);return{value:type,detail:`${fmt(b.size/1024,2)} KB`};});});
add("image-grayscale",()=>{imageForm();imageBind(async()=>{const {url,im}=await loadImage(),c=document.createElement("canvas");c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext("2d");x.drawImage(im,0,0);const d=x.getImageData(0,0,c.width,c.height);for(let i=0;i<d.data.length;i+=4){const g=.299*d.data[i]+.587*d.data[i+1]+.114*d.data[i+2];d.data[i]=d.data[i+1]=d.data[i+2]=g;}x.putImageData(d,0,0);const b=await blobCanvas(c);await showBlob(b,"arestyx-grayscale.png");URL.revokeObjectURL(url);return{value:"Grayscale selesai",detail:`${c.width} × ${c.height}px`};});});
add("image-rotate",()=>{imageForm(field({id:"ang",label:"Sudut",type:"select",options:["90","180","270"]}));imageBind(async()=>{const {url,im}=await loadImage(),deg=Number(get("ang")),swap=deg!==180,c=document.createElement("canvas");c.width=swap?im.naturalHeight:im.naturalWidth;c.height=swap?im.naturalWidth:im.naturalHeight;const x=c.getContext("2d");x.translate(c.width/2,c.height/2);x.rotate(deg*Math.PI/180);x.drawImage(im,-im.naturalWidth/2,-im.naturalHeight/2);const b=await blobCanvas(c);await showBlob(b,"arestyx-rotated.png");URL.revokeObjectURL(url);return{value:`Diputar ${deg}°`,detail:`${c.width} × ${c.height}px`};});});


/* developer tools */
function toB64(s){const bytes=new TextEncoder().encode(s);let b="";bytes.forEach(x=>b+=String.fromCharCode(x));return btoa(b);}
function fromB64(s){const b=atob(s.replace(/\s/g,""));return new TextDecoder().decode(Uint8Array.from(b,c=>c.charCodeAt(0)));}
add("base64-encoder",()=>textTool(toB64,"Encode"));
add("base64-decoder",()=>textTool(t=>{try{return fromB64(t)}catch{throw new Error("Base64 tidak valid.")}},"Decode"));
add("url-encoder",()=>textTool(encodeURIComponent,"Encode"));
add("url-decoder",()=>textTool(t=>{try{return decodeURIComponent(t)}catch{throw new Error("URL encoding tidak valid.")}},"Decode"));
add("json-formatter",()=>textTool(t=>JSON.stringify(JSON.parse(t),null,2),"Format"));
add("json-minifier",()=>textTool(t=>JSON.stringify(JSON.parse(t)),"Minify"));
add("json-validator",()=>form([{id:"text",label:"JSON",type:"textarea",full:true}],()=>{try{JSON.parse(get("text"));return{value:"JSON valid",detail:"Sintaks berhasil diparse."}}catch(e){return{value:"JSON tidak valid",detail:e.message}}},"Validasi"));
add("html-escape",()=>textTool(esc,"Escape"));
add("html-unescape",()=>textTool(t=>{const e=document.createElement("textarea");e.innerHTML=t;return e.value},"Unescape"));
add("query-string-parser",()=>form([{id:"text",label:"URL atau query string",type:"textarea",full:true}],()=>{let s=get("text").trim();if(s.includes("?"))s=s.slice(s.indexOf("?")+1);const p=new URLSearchParams(s),o={};for(const [k,v] of p){if(Object.prototype.hasOwnProperty.call(o,k))o[k]=Array.isArray(o[k])?[...o[k],v]:[o[k],v];else o[k]=v;}return{value:JSON.stringify(o,null,2),detail:`${[...p.keys()].length} parameter`};},"Parse"));
add("jwt-decoder",()=>form([{id:"text",label:"JWT",type:"textarea",full:true}],()=>{const p=get("text").trim().split(".");if(p.length<2)throw new Error("JWT tidak valid.");const dec=s=>JSON.parse(fromB64(s.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(s.length/4)*4,"=")));return{value:JSON.stringify({header:dec(p[0]),payload:dec(p[1])},null,2),detail:"Signature tidak diverifikasi."};},"Decode"));
add("sha256-generator",()=>form([{id:"text",label:"Teks",type:"textarea",full:true}],async()=>{const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(get("text")));return{value:[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join(""),detail:"SHA-256 • Web Crypto"};},"Buat Hash"));
add("unix-timestamp-converter",()=>form([{id:"date",label:"Tanggal & waktu lokal",type:"datetime-local"},{id:"ts",label:"Unix timestamp detik",type:"number"}],()=>{if(get("date")){const ms=new Date(get("date")).getTime();if(!Number.isFinite(ms))throw new Error("Tanggal tidak valid.");return{value:String(Math.floor(ms/1000)),detail:new Date(ms).toISOString()};}if(get("ts")){const n=Number(get("ts"));if(!Number.isFinite(n))throw new Error("Timestamp tidak valid.");const d=new Date(n*1000);return{value:d.toLocaleString("id-ID"),detail:d.toISOString()};}throw new Error("Isi salah satu field.");},"Konversi"));
add("number-base-converter",()=>form([{id:"n",label:"Bilangan",type:"text",value:"255"},{id:"base",label:"Basis asal",type:"select",options:[{value:"2",label:"Biner (2)"},{value:"8",label:"Oktal (8)"},{value:"10",label:"Desimal (10)",selected:true},{value:"16",label:"Heksadesimal (16)"}]}],()=>{const b=Number(get("base")),n=Number.parseInt(get("n").trim(),b);if(!Number.isSafeInteger(n))throw new Error("Bilangan tidak valid atau terlalu besar.");return{value:`BIN ${n.toString(2)}\nOCT ${n.toString(8)}\nDEC ${n}\nHEX ${n.toString(16).toUpperCase()}`,detail:`Basis asal ${b}`};},"Konversi"));
add("hex-rgb-converter",()=>form([{id:"hex",label:"HEX",type:"text",value:"#00eaff"}],()=>{let h=get("hex").trim().replace(/^#/,"");if(h.length===3)h=[...h].map(c=>c+c).join("");if(!/^[0-9a-f]{6}$/i.test(h))throw new Error("HEX harus 3 atau 6 digit.");const n=parseInt(h,16);return{value:`rgb(${n>>16}, ${(n>>8)&255}, ${n&255})`,detail:`#${h.toUpperCase()}`};},"Konversi"));
function ipInt(ip){const p=ip.trim().split(".").map(Number);if(p.length!==4||p.some(n=>!Number.isInteger(n)||n<0||n>255))throw new Error("IPv4 tidak valid.");return (((p[0]<<24)>>>0)+(p[1]<<16)+(p[2]<<8)+p[3])>>>0;}
function intIp(n){n>>>=0;return[n>>>24,(n>>>16)&255,(n>>>8)&255,n&255].join(".");}
add("ipv4-subnet-calculator",()=>form([{id:"ip",label:"IPv4",type:"text",value:"192.168.1.10"},{id:"cidr",label:"CIDR",value:24,min:0,max:32}],()=>{const ip=ipInt(get("ip")),c=int("cidr");if(c<0||c>32)throw new Error("CIDR harus 0–32.");const mask=c===0?0:(0xffffffff<<(32-c))>>>0,net=(ip&mask)>>>0,bc=(net|(~mask>>>0))>>>0,total=2**(32-c),usable=c>=31?(c===32?1:2):Math.max(total-2,0);return{value:`Network ${intIp(net)}/${c}`,detail:`Netmask ${intIp(mask)} • Broadcast ${intIp(bc)} • Host usable ${usable.toLocaleString("id-ID")}`};}));


/* generators */
function randInt(min,max){if(!Number.isSafeInteger(min)||!Number.isSafeInteger(max)||max<min)throw new Error("Rentang tidak valid.");const r=max-min+1;if(r<=0||r>0x100000000)throw new Error("Rentang terlalu besar.");const lim=Math.floor(0x100000000/r)*r,a=new Uint32Array(1);do{crypto.getRandomValues(a)}while(a[0]>=lim);return min+a[0]%r;}
function randChars(chars,len){let out="";for(let i=0;i<len;i++)out+=chars[randInt(0,chars.length-1)];return out;}
add("uuid-generator",()=>form([],()=>({value:crypto.randomUUID(),detail:"UUID v4"}),"Generate"));
add("random-number-generator",()=>form([{id:"min",label:"Minimum",value:1},{id:"max",label:"Maksimum",value:100}],()=>({value:randInt(int("min"),int("max")),detail:"Web Crypto random"}),"Generate"));
add("random-string-generator",()=>form([{id:"len",label:"Panjang",value:16,min:1,max:256},{id:"type",label:"Karakter",type:"select",options:["Alphanumeric","Letters","Hex"]}],()=>{const m=get("type"),chars=m==="Hex"?"0123456789abcdef":m==="Letters"?"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz":"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";return{value:randChars(chars,Math.min(256,Math.max(1,int("len")))),detail:m};},"Generate"));
add("pin-generator",()=>form([{id:"len",label:"Jumlah digit",value:6,min:4,max:12}],()=>({value:randChars("0123456789",Math.min(12,Math.max(4,int("len")))),detail:"PIN acak"}),"Generate"));
const words=["anchor","azure","bravo","cobalt","delta","ember","fjord","galaxy","harbor","indigo","jade","keel","lunar","matrix","nova","ocean","pixel","quartz","radar","signal","tango","ultra","vector","wave","xenon","yonder","zenith"];
add("passphrase-generator",()=>form([{id:"count",label:"Jumlah kata",value:5,min:3,max:10},{id:"sep",label:"Pemisah",type:"select",options:["-","_",".","space"]}],()=>{const c=Math.min(10,Math.max(3,int("count"))),sep=get("sep")==="space"?" ":get("sep");return{value:Array.from({length:c},()=>words[randInt(0,words.length-1)]).join(sep),detail:`${c} kata`};},"Generate"));
add("dice-roller",()=>form([{id:"dice",label:"Jumlah dadu",value:1,min:1,max:20},{id:"sides",label:"Sisi per dadu",value:6,min:2,max:1000}],()=>{const d=Math.min(20,Math.max(1,int("dice"))),s=Math.min(1000,Math.max(2,int("sides"))),r=Array.from({length:d},()=>randInt(1,s));return{value:`${r.join(" + ")} = ${r.reduce((a,b)=>a+b,0)}`,detail:`${d}d${s}`};},"Lempar"));
add("coin-flip",()=>form([],()=>({value:randInt(0,1)?"Kepala":"Ekor",detail:"Web Crypto random"}),"Lempar Koin"));


/* finance tools */
add("loan-calculator",()=>form([{id:"p",label:"Pokok pinjaman",value:10000000,min:0},{id:"rate",label:"Bunga per tahun (%)",value:12,min:0},{id:"months",label:"Tenor (bulan)",value:12,min:1}],()=>{const p=num("p"),n=int("months"),r=num("rate")/1200;if(p<0||n<=0||r<0)throw new Error("Nilai tidak valid.");const pay=r===0?p/n:p*r/(1-(1+r)**(-n));return{value:`Rp ${fmt(pay,2)} / bulan`,detail:`Total Rp ${fmt(pay*n,2)} • bunga Rp ${fmt(pay*n-p,2)}`};},"Hitung","Estimasi matematis; biaya administrasi dan biaya produk finansial tidak dimasukkan."));
add("simple-interest-calculator",()=>form([{id:"p",label:"Pokok",value:1000000},{id:"r",label:"Bunga per tahun (%)",value:10},{id:"t",label:"Waktu (tahun)",value:2}],()=>{const p=num("p"),i=p*num("r")/100*num("t");return{value:`Bunga ${fmt(i,2)}`,detail:`Nilai akhir ${fmt(p+i,2)}`};}));
add("compound-interest-calculator",()=>form([{id:"p",label:"Modal awal",value:1000000},{id:"r",label:"Bunga per tahun (%)",value:10},{id:"t",label:"Tahun",value:5},{id:"n",label:"Compounding per tahun",value:12,min:1}],()=>{const p=num("p"),r=num("r")/100,t=num("t"),n=int("n");if(n<=0)throw new Error("Frekuensi harus > 0.");const a=p*(1+r/n)**(n*t);return{value:fmt(a,2),detail:`Pertumbuhan ${fmt(a-p,2)}`};}));
add("roi-calculator",()=>form([{id:"cost",label:"Biaya investasi",value:1000000},{id:"ret",label:"Nilai akhir/hasil",value:1200000}],()=>{const c=num("cost"),r=num("ret");if(c===0)throw new Error("Biaya tidak boleh 0.");return{value:`${fmt((r-c)/c*100,2)}%`,detail:`Laba/rugi ${fmt(r-c,2)}`};}));
add("profit-margin-calculator",()=>form([{id:"cost",label:"Biaya",value:80000},{id:"sell",label:"Harga jual",value:100000}],()=>{const c=num("cost"),s=num("sell");if(s===0)throw new Error("Harga jual tidak boleh 0.");return{value:`Margin ${fmt((s-c)/s*100,2)}%`,detail:`Laba ${fmt(s-c,2)}`};}));
add("markup-calculator",()=>form([{id:"cost",label:"Biaya",value:100000},{id:"markup",label:"Markup (%)",value:25}],()=>{const c=num("cost"),m=num("markup");return{value:fmt(c*(1+m/100),2),detail:`Tambahan ${fmt(c*m/100,2)}`};}));
add("vat-calculator",()=>form([{id:"amount",label:"Nilai",value:100000},{id:"rate",label:"Pajak (%)",value:11},{id:"mode",label:"Mode",type:"select",options:["Tambah pajak","Nilai sudah termasuk pajak"]}],()=>{const a=num("amount"),r=num("rate")/100;if(r<0)throw new Error("Pajak tidak boleh negatif.");if(get("mode").startsWith("Tambah"))return{value:fmt(a*(1+r),2),detail:`Pajak ${fmt(a*r,2)}`};const base=a/(1+r);return{value:`Dasar ${fmt(base,2)}`,detail:`Pajak ${fmt(a-base,2)}`};}));
add("unit-price-calculator",()=>form([{id:"price",label:"Harga total",value:50000},{id:"qty",label:"Jumlah/berat",value:5}],()=>{const q=num("qty");if(q<=0)throw new Error("Jumlah harus > 0.");return{value:fmt(num("price")/q,4),detail:"Harga per unit"};}));
add("break-even-calculator",()=>form([{id:"fixed",label:"Biaya tetap",value:1000000},{id:"price",label:"Harga jual per unit",value:50000},{id:"variable",label:"Biaya variabel per unit",value:30000}],()=>{const m=num("price")-num("variable");if(m<=0)throw new Error("Harga jual harus lebih besar dari biaya variabel.");const u=Math.ceil(num("fixed")/m);return{value:`${u.toLocaleString("id-ID")} unit`,detail:`Contribution margin ${fmt(m,2)} / unit`};}));
add("savings-goal-calculator",()=>form([{id:"target",label:"Target",value:12000000},{id:"current",label:"Tabungan sekarang",value:0},{id:"months",label:"Waktu (bulan)",value:12,min:1}],()=>{const n=int("months");if(n<=0)throw new Error("Bulan harus > 0.");const gap=Math.max(0,num("target")-num("current"));return{value:fmt(gap/n,2),detail:`Setoran per bulan tanpa asumsi bunga • sisa ${fmt(gap,2)}`};}));
add("cagr-calculator",()=>form([{id:"start",label:"Nilai awal",value:100},{id:"end",label:"Nilai akhir",value:150},{id:"years",label:"Tahun",value:3,min:.01}],()=>{const s=num("start"),e=num("end"),y=num("years");if(s<=0||e<0||y<=0)throw new Error("Nilai harus valid dan tahun > 0.");return{value:`${fmt(((e/s)**(1/y)-1)*100,3)}% / tahun`,detail:"Compound annual growth rate"};}));

add("depreciation-calculator",()=>form([{id:"cost",label:"Harga perolehan",value:10000000},{id:"salvage",label:"Nilai sisa",value:1000000},{id:"years",label:"Umur manfaat (tahun)",value:5,min:1}],()=>{const c=num("cost"),s=num("salvage"),y=num("years");if(y<=0||s>c)throw new Error("Periksa nilai sisa dan umur manfaat.");return{value:fmt((c-s)/y,2),detail:"Depresiasi per tahun metode garis lurus"};}));
add("tip-calculator",()=>form([{id:"bill",label:"Total tagihan",value:200000},{id:"tip",label:"Tip (%)",value:10},{id:"people",label:"Jumlah orang",value:2,min:1}],()=>{const b=num("bill"),t=b*num("tip")/100,p=int("people");if(p<=0)throw new Error("Jumlah orang harus > 0.");return{value:`${fmt((b+t)/p,2)} / orang`,detail:`Tip ${fmt(t,2)} • total ${fmt(b+t,2)}`};}));
add("discount-stack-calculator",()=>form([{id:"price",label:"Harga awal",value:100000},{id:"d1",label:"Diskon 1 (%)",value:20},{id:"d2",label:"Diskon 2 (%)",value:10}],()=>{const p=num("price"),d1=num("d1"),d2=num("d2");if([d1,d2].some(x=>x<0||x>100))throw new Error("Diskon harus 0–100%.");const f=p*(1-d1/100)*(1-d2/100),eff=(1-f/p)*100;return{value:fmt(f,2),detail:`Diskon efektif ${fmt(eff,2)}% • hemat ${fmt(p-f,2)}`};}));

/* Localize shared standalone introductions while preserving their Indonesian source for a reversible toggle. */
(() => {
    const idPattern = /di AREStyx untuk [^.]+\. Proses utama berjalan langsung di browser agar cepat dan mudah digunakan\./g;
    const enText = "at AREStyx. Core processing runs directly in your browser for speed and ease of use.";
    const originals = new WeakMap();
    let queued = false;
    const applyTemplateCopy = () => {
        queued = false;
        const englishActive = document.getElementById("languageButton")?.textContent?.trim() === "ID";
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (englishActive && idPattern.test(node.nodeValue)) {
                idPattern.lastIndex = 0;
                originals.set(node, node.nodeValue);
                node.nodeValue = node.nodeValue.replace(idPattern, enText);
            } else if (!englishActive && originals.has(node) && node.nodeValue.includes(enText)) {
                node.nodeValue = originals.get(node);
            }
            idPattern.lastIndex = 0;
        }
    };
    const schedule = () => { if (!queued) { queued = true; setTimeout(applyTemplateCopy, 0); } };
    const start = () => { new MutationObserver(schedule).observe(document.body, { childList: true, characterData: true, subtree: true }); schedule(); };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(start, 0), { once: true });
    else setTimeout(start, 0);
})();

/* =========================================================
   AREStyx ENGINEERING COMPLETION PATCH
   Append this file to the END of tools/tools-extra.js.

   Purpose:
   - Add the 18 Engineering implementations that are absent
     from the current tools-extra.js source.
   - Export every implementation registered with add() to
     window.AREStyxExtraDatabase before tools.js is loaded.

   IMPORTANT:
   This file is designed to be concatenated into tools-extra.js,
   where add(), form(), num(), int(), list(), get(), fmt(), impl
   and catalog already exist.
========================================================= */

/* ---------- Engineering: electrical ---------- */
add("electrical-power-calculator", () => form([
    { id: "voltage", label: "Tegangan (V)", value: 220, min: 0 },
    { id: "current", label: "Arus (A)", value: 2, min: 0 }
], () => {
    const v = num("voltage");
    const i = num("current");
    if (v < 0 || i < 0) throw new Error("Nilai tidak boleh negatif.");
    const p = v * i;
    return {
        value: `${fmt(p, 4)} W`,
        detail: `P = V × I • ${fmt(p / 1000, 6)} kW`
    };
}, "Hitung"));

add("series-resistance-calculator", () => form([
    {
        id: "resistors",
        label: "Daftar resistansi (Ω)",
        type: "textarea",
        full: true,
        value: "100, 220, 330",
        placeholder: "100, 220, 330"
    }
], () => {
    const values = list(get("resistors"));
    if (values.some(v => v < 0)) throw new Error("Resistansi tidak boleh negatif.");
    const total = values.reduce((sum, v) => sum + v, 0);
    return {
        value: `${fmt(total, 6)} Ω`,
        detail: `${values.length} resistor • Rtotal = R1 + R2 + …`
    };
}, "Hitung"));

add("parallel-resistance-calculator", () => form([
    {
        id: "resistors",
        label: "Daftar resistansi (Ω)",
        type: "textarea",
        full: true,
        value: "100, 220, 330",
        placeholder: "100, 220, 330"
    }
], () => {
    const values = list(get("resistors"));
    if (values.some(v => v < 0)) throw new Error("Resistansi tidak boleh negatif.");
    if (values.some(v => v === 0)) {
        return { value: "0 Ω", detail: "Cabang 0 Ω membuat resistansi ekuivalen 0 Ω." };
    }
    const reciprocal = values.reduce((sum, v) => sum + 1 / v, 0);
    if (!Number.isFinite(reciprocal) || reciprocal <= 0) {
        throw new Error("Daftar resistansi tidak valid.");
    }
    const total = 1 / reciprocal;
    return {
        value: `${fmt(total, 6)} Ω`,
        detail: `${values.length} resistor • 1/Rtotal = Σ(1/R)`
    };
}, "Hitung"));

add("voltage-divider-calculator", () => form([
    { id: "vin", label: "Tegangan (V)", value: 12 },
    { id: "r1", label: "R1 (Ω)", value: 1000, min: 0 },
    { id: "r2", label: "R2 (Ω)", value: 1000, min: 0 }
], () => {
    const vin = num("vin");
    const r1 = num("r1");
    const r2 = num("r2");
    if (r1 < 0 || r2 < 0 || r1 + r2 === 0) {
        throw new Error("R1 + R2 harus lebih besar dari 0.");
    }
    const vout = vin * r2 / (r1 + r2);
    return {
        value: `${fmt(vout, 6)} V`,
        detail: "Vout = Vin × R2 / (R1 + R2)"
    };
}, "Hitung"));

add("battery-runtime-calculator", () => form([
    { id: "capacity", label: "Kapasitas (Ah)", value: 100, min: 0 },
    { id: "load", label: "Arus beban (A)", value: 10, min: 0.000001 },
    { id: "efficiency", label: "Efisiensi (%)", value: 85, min: 1, max: 100 }
], () => {
    const capacity = num("capacity");
    const load = num("load");
    const efficiency = num("efficiency");
    if (capacity < 0 || load <= 0 || efficiency <= 0 || efficiency > 100) {
        throw new Error("Periksa kapasitas, arus beban, dan efisiensi.");
    }
    const hours = capacity * (efficiency / 100) / load;
    return {
        value: `${fmt(hours, 4)} jam`,
        detail: `${fmt(hours * 60, 2)} menit • estimasi ideal dengan faktor efisiensi`
    };
}, "Hitung", "Estimasi sederhana; karakteristik baterai, suhu, umur, C-rate, dan inverter dapat mengubah runtime aktual."));

add("transformer-calculator", () => form([
    { id: "v1", label: "Tegangan primer (V)", value: 220 },
    { id: "n1", label: "Lilitan primer (N1)", value: 1000, min: 0.000001 },
    { id: "n2", label: "Lilitan sekunder (N2)", value: 100, min: 0 }
], () => {
    const v1 = num("v1");
    const n1 = num("n1");
    const n2 = num("n2");
    if (n1 <= 0 || n2 < 0) throw new Error("Jumlah lilitan tidak valid.");
    const v2 = v1 * n2 / n1;
    return {
        value: `${fmt(v2, 6)} V`,
        detail: `V2/V1 = N2/N1 • rasio ${fmt(n1 / Math.max(n2, Number.EPSILON), 6)}:1`
    };
}, "Hitung"));

add("period-frequency-calculator", () => form([
    {
        id: "mode",
        label: "Mode",
        type: "select",
        options: [
            { value: "frequency", label: "Frekuensi → Periode" },
            { value: "period", label: "Periode → Frekuensi" }
        ]
    },
    { id: "value", label: "Nilai", value: 50, min: 0.000000001, step: "any" }
], () => {
    const value = num("value");
    if (value <= 0) throw new Error("Nilai harus lebih besar dari 0.");
    if (get("mode") === "frequency") {
        const period = 1 / value;
        return {
            value: `${fmt(period, 9)} s`,
            detail: `${fmt(period * 1000, 6)} ms • T = 1/f`
        };
    }
    const frequency = 1 / value;
    return {
        value: `${fmt(frequency, 9)} Hz`,
        detail: `f = 1/T`
    };
}, "Konversi"));

add("rpm-rads-converter", () => form([
    {
        id: "mode",
        label: "Mode",
        type: "select",
        options: [
            { value: "rpm", label: "RPM → rad/s" },
            { value: "rads", label: "rad/s → RPM" }
        ]
    },
    { id: "value", label: "Nilai", value: 1500, step: "any" }
], () => {
    const value = num("value");
    if (get("mode") === "rpm") {
        const rads = value * 2 * Math.PI / 60;
        return { value: `${fmt(rads, 8)} rad/s`, detail: "ω = RPM × 2π / 60" };
    }
    const rpm = value * 60 / (2 * Math.PI);
    return { value: `${fmt(rpm, 8)} RPM`, detail: "RPM = ω × 60 / 2π" };
}, "Konversi"));

/* ---------- Engineering: mechanical / marine ---------- */
add("torque-power-calculator", () => form([
    { id: "power", label: "Daya (kW)", value: 100, min: 0 },
    { id: "rpm", label: "RPM", value: 1500, min: 0.000001 }
], () => {
    const power = num("power");
    const rpm = num("rpm");
    if (power < 0 || rpm <= 0) throw new Error("Daya harus ≥ 0 dan RPM harus > 0.");
    const torque = 9550 * power / rpm;
    return {
        value: `${fmt(torque, 6)} N·m`,
        detail: "T ≈ 9550 × P(kW) / RPM"
    };
}, "Hitung"));

add("gear-ratio-calculator", () => form([
    { id: "driver", label: "Gigi penggerak", value: 20, min: 1 },
    { id: "driven", label: "Gigi digerakkan", value: 60, min: 1 },
    { id: "inputRpm", label: "RPM input", value: 1500, min: 0 }
], () => {
    const driver = num("driver");
    const driven = num("driven");
    const input = num("inputRpm");
    if (driver <= 0 || driven <= 0 || input < 0) throw new Error("Nilai gear dan RPM tidak valid.");
    const ratio = driven / driver;
    const output = input / ratio;
    return {
        value: `${fmt(ratio, 6)} : 1`,
        detail: `RPM output ${fmt(output, 4)} • ratio = driven / driver`
    };
}, "Hitung"));

add("hydraulic-power-calculator", () => form([
    { id: "pressure", label: "Tekanan (bar)", value: 150, min: 0 },
    { id: "flow", label: "Debit (L/min)", value: 60, min: 0 },
    { id: "efficiency", label: "Efisiensi (%)", value: 100, min: 1, max: 100 }
], () => {
    const pressure = num("pressure");
    const flow = num("flow");
    const efficiency = num("efficiency");
    if (pressure < 0 || flow < 0 || efficiency <= 0 || efficiency > 100) {
        throw new Error("Nilai tidak valid.");
    }
    const idealKw = pressure * flow / 600;
    const outputKw = idealKw * efficiency / 100;
    return {
        value: `${fmt(outputKw, 6)} kW`,
        detail: `Ideal ${fmt(idealKw, 6)} kW • P = bar × L/min / 600`
    };
}, "Hitung"));

add("pipe-velocity-calculator", () => form([
    { id: "flow", label: "Debit (L/min)", value: 100, min: 0 },
    { id: "diameter", label: "Diameter pipa (mm)", value: 50, min: 0.000001 }
], () => {
    const flowLMin = num("flow");
    const diameterMm = num("diameter");
    if (flowLMin < 0 || diameterMm <= 0) throw new Error("Debit harus ≥ 0 dan diameter harus > 0.");
    const q = flowLMin / 1000 / 60;
    const d = diameterMm / 1000;
    const area = Math.PI * d * d / 4;
    const velocity = q / area;
    return {
        value: `${fmt(velocity, 6)} m/s`,
        detail: `A = ${fmt(area, 9)} m² • v = Q/A`
    };
}, "Hitung"));

add("reynolds-number-calculator", () => form([
    { id: "density", label: "Densitas (kg/m³)", value: 1000, min: 0.000001 },
    { id: "velocity", label: "Kecepatan (m/s)", value: 1, min: 0 },
    { id: "diameter", label: "Diameter (m)", value: 0.05, min: 0.000000001, step: "any" },
    { id: "viscosity", label: "Viskositas dinamis (Pa·s)", value: 0.001, min: 0.000000001, step: "any" }
], () => {
    const rho = num("density");
    const v = num("velocity");
    const d = num("diameter");
    const mu = num("viscosity");
    if (rho <= 0 || v < 0 || d <= 0 || mu <= 0) throw new Error("Nilai tidak valid.");
    const re = rho * v * d / mu;
    let regime = "transisi";
    if (re < 2300) regime = "laminar";
    else if (re > 4000) regime = "turbulen";
    return {
        value: fmt(re, 4),
        detail: `Re = ρvD/μ • perkiraan regime ${regime}`
    };
}, "Hitung", "Batas regime bergantung pada geometri dan kondisi aliran; nilai 2300/4000 adalah pedoman umum untuk aliran internal pipa."));

add("pressure-head-calculator", () => form([
    { id: "pressure", label: "Tekanan (kPa)", value: 100, min: 0 },
    { id: "density", label: "Densitas (kg/m³)", value: 1000, min: 0.000001 }
], () => {
    const pressureKpa = num("pressure");
    const rho = num("density");
    if (pressureKpa < 0 || rho <= 0) throw new Error("Tekanan harus ≥ 0 dan densitas harus > 0.");
    const g = 9.80665;
    const head = pressureKpa * 1000 / (rho * g);
    return {
        value: `${fmt(head, 6)} m`,
        detail: `h = P/(ρg) • g = ${g} m/s²`
    };
}, "Hitung"));

add("specific-gravity-calculator", () => form([
    { id: "density", label: "Densitas (kg/m³)", value: 850, min: 0 }
], () => {
    const density = num("density");
    if (density < 0) throw new Error("Densitas tidak boleh negatif.");
    const sg = density / 1000;
    return {
        value: fmt(sg, 8),
        detail: "SG = ρ / 1000 • water reference = 1000 kg/m³"
    };
}, "Hitung"));

add("api-gravity-calculator", () => form([
    { id: "api", label: "API Gravity (°API)", value: 35, step: "any" }
], () => {
    const api = num("api");
    const denominator = api + 131.5;
    if (denominator <= 0) throw new Error("API gravity berada di luar rentang formula.");
    const sg = 141.5 / denominator;
    const density = sg * 999.016;
    return {
        value: `SG ${fmt(sg, 8)}`,
        detail: `≈ ${fmt(density, 3)} kg/m³ • SG = 141.5 / (API + 131.5)`
    };
}, "Hitung", "Konversi standar menggunakan referensi petroleum 60°F; densitas yang ditampilkan adalah perkiraan dari SG."));

add("propeller-slip-calculator", () => form([
    { id: "pitch", label: "Pitch propeller (m/rev)", value: 3, min: 0 },
    { id: "rpm", label: "RPM", value: 100, min: 0 },
    { id: "minutes", label: "Waktu (menit)", value: 10, min: 0 },
    { id: "actual", label: "Jarak aktual (m)", value: 2500, min: 0 }
], () => {
    const pitch = num("pitch");
    const rpm = num("rpm");
    const minutes = num("minutes");
    const actual = num("actual");
    if ([pitch, rpm, minutes, actual].some(v => v < 0)) throw new Error("Nilai tidak boleh negatif.");
    const theoretical = pitch * rpm * minutes;
    if (theoretical === 0) throw new Error("Jarak teoritis tidak boleh 0.");
    const slip = (theoretical - actual) / theoretical * 100;
    return {
        value: `${fmt(slip, 4)}%`,
        detail: `Jarak teoritis ${fmt(theoretical, 3)} m • apparent slip sederhana`
    };
}, "Hitung", "Apparent slip sederhana; arus, wake, pitch efektif, dan kondisi kapal dapat memengaruhi hasil."));

add("engine-displacement-calculator", () => form([
    { id: "bore", label: "Bore (mm)", value: 150, min: 0.000001 },
    { id: "stroke", label: "Stroke (mm)", value: 180, min: 0.000001 },
    { id: "cylinders", label: "Jumlah silinder", value: 6, min: 1 }
], () => {
    const bore = num("bore");
    const stroke = num("stroke");
    const cylinders = int("cylinders");
    if (bore <= 0 || stroke <= 0 || cylinders <= 0) throw new Error("Bore, stroke, dan silinder harus > 0.");
    const ccPerCylinder = Math.PI / 4 * bore * bore * stroke / 1000;
    const totalCc = ccPerCylinder * cylinders;
    return {
        value: `${fmt(totalCc, 3)} cc`,
        detail: `${fmt(totalCc / 1000, 6)} L • ${fmt(ccPerCylinder, 3)} cc/silinder`
    };
}, "Hitung"));

/* =========================================================
   EXPORT EXTRA DATABASE

   This is the missing registration bridge in the current
   source. tools.js already checks window.AREStyxExtraDatabase
   before initializing a tool.
========================================================= */
window.AREStyxExtraDatabase = Object.fromEntries(
    catalog
        .filter(tool => tool && typeof impl[tool.id] === "function")
        .map(tool => [
            tool.id,
            {
                title: (tool.title && (tool.title.id || tool.title.en)) || tool.id,
                category: String(tool.category || "TOOL").toUpperCase(),
                icon: tool.icon || "⚙",
                description: (tool.description && (tool.description.id || tool.description.en)) || "",
                run: impl[tool.id]
            }
        ])
);
})();
