(function(g){
const n2=s=>s.split('.').reduce((a,b)=>a*256+ +b,0)>>>0, ip=n=>[24,16,8,0].map(s=>n>>>s&255).join('.');
const mask=p=>ip((-1<<(32-p))>>>0), first=x=>ip(n2(x.ip)+1), last=x=>ip(n2(x.ip)+2**(32-x.p)-2), bc=x=>ip(n2(x.ip)+2**(32-x.p)-1);
const cls=s=>{const o=s.split('.');return +o[0]<128?o[0]+'.0.0.0':+o[0]<192?o[0]+'.'+o[1]+'.0.0':o.slice(0,3).join('.')+'.0'};
const N=(name,hosts,ipa,p,vlan,r,ports,pc)=>({name,hosts,ip:ipa,p,vlan,r,ports,pc});
const LABS=[
{id:'taller',file:'1-taller-vlan',title:'Taller VLAN de clase',src:'Enunciado del profesor, NRC 2434',base:'192.168.1.0 /24',given:false,
 nets:[N('Ventas',60,'192.168.1.0',26,2,1,'1-15','PC0'),N('Sistemas',10,'192.168.1.160',28,5,1,'16-23','PC1'),N('Operaciones',60,'192.168.1.64',26,25,2,'1-10','PC2'),N('CallCenter',30,'192.168.1.128',27,50,2,'11-23','PC3')],
 wans:[{a:1,b:2,ip:'192.168.1.176',p:30}],clk:72000,trunk:'24',rip:[],min:25,
 rules:['Aplica VLSM a 192.168.1.0 /24 con los nodos de la tabla.','El puerto 24 de cada switch es troncal y solo permite sus VLAN.','Enrutamiento estático entre R1 y R2 con IP del siguiente salto.','Gateway: última dirección de host. PC: primera dirección de host.','R1 es el DCE, con reloj de 72000.']},
{id:'final',file:'2-final-mayo-2025',title:'Examen final de mayo de 2025',src:'Enunciado real del componente práctico',given:true,
 nets:[N('Admisiones',62,'192.168.50.128',26,50,1,'1-10','PC0'),N('Sistemas',510,'10.10.92.0',23,100,1,'11-22','PC1'),N('Registro',126,'192.168.150.0',25,150,2,'1-16','PC2'),N('Decanatura',30,'192.168.200.192',27,200,2,'17-22','PC3'),N('Pregrado',2046,'10.10.64.0',21,0,3,'','PC4')],
 wans:[{a:1,b:2,ip:'192.168.254.252',p:30},{a:2,b:3,ip:'192.168.2.252',p:30}],clk:64000,trunk:'23-24',rip:[1,2],min:60,
 rules:['RIP versión 2 entre R1 y R2. Enrutamiento estático con R3, con IP del siguiente salto.','En SW1 y SW2 los puertos 23 y 24 son troncales y permiten las VLAN necesarias. SW3 no tiene VLAN.','Los DCE (R1 hacia R2 y R2 hacia R3) tienen reloj de 64000 bps.','Routers: última dirección de host. PC: primera dirección de host.','Todos los nodos deben comunicarse entre sí.','Configura los hostname y guarda la configuración.','Archivo: ef-Userid.pkt, con tu nombre corto del correo.']},
{id:'sim1',file:'3-simulacro-campus',title:'Simulacro Campus',src:'Práctica creada para ti',base:'172.20.16.0 /22',given:false,
 nets:[N('Biblioteca',200,'172.20.16.0',24,10,1,'1-12','PC0'),N('Laboratorios',120,'172.20.17.0',25,20,1,'13-22','PC1'),N('Docentes',60,'172.20.17.128',26,30,2,'1-8','PC2'),N('Invitados',28,'172.20.17.192',27,40,2,'9-22','PC3')],
 wans:[{a:1,b:2,ip:'172.20.17.224',p:30}],clk:64000,trunk:'24',rip:[],min:30,
 rules:['Aplica VLSM a 172.20.16.0 /22, de la subred mayor a la menor.','El puerto 24 de cada switch es troncal.','Enrutamiento estático con IP del siguiente salto.','Gateway: última dirección de host. PC: primera dirección de host.','R1 es el DCE, con reloj de 64000.']},
{id:'sim2',file:'4-simulacro-empresa',title:'Simulacro Empresa',src:'Práctica creada para ti, con la forma del final',base:'10.50.0.0 /20',given:false,
 nets:[N('Ventas',1000,'10.50.0.0',22,15,1,'1-10','PC0'),N('Soporte',500,'10.50.4.0',23,25,1,'11-22','PC1'),N('Contabilidad',250,'10.50.6.0',24,35,2,'1-16','PC2'),N('Gerencia',100,'10.50.7.0',25,45,2,'17-22','PC3'),N('Bodega',50,'10.50.7.128',26,0,3,'','PC4')],
 wans:[{a:1,b:2,ip:'10.50.7.192',p:30},{a:2,b:3,ip:'10.50.7.196',p:30}],clk:64000,trunk:'23-24',rip:[1,2],min:60,
 rules:['Aplica VLSM a 10.50.0.0 /20. El enlace R1–R2 se asigna antes que R2–R3.','RIP versión 2 entre R1 y R2. Estático con R3.','Puertos 23 y 24 troncales en SW1 y SW2. SW3 sin VLAN.','Routers: última dirección de host. PC: primera dirección de host.','R1 y R2 son DCE de sus enlaces, con reloj de 64000.','Guarda todas las configuraciones.']}];
const COL=['#3f7de8','#dc6f1c','#2a9a5c','#a4714a','#7c879c'];
const nr=l=>Math.max(...l.nets.map(n=>n.r));
function sw(l,i){const v=l.nets.filter(n=>n.r==i&&n.vlan),o=['enable','configure terminal','hostname SW'+i];
 v.forEach(n=>o.push('vlan '+n.vlan,' name '+n.name));if(v.length)o.push(' exit');
 v.forEach(n=>o.push('interface range fast 0/'+n.ports,' switchport mode access',' switchport access vlan '+n.vlan,' exit'));
 if(v.length)o.push('interface '+(l.trunk.includes('-')?'range ':'')+'fast 0/'+l.trunk,' switchport mode trunk',' switchport trunk allowed vlan '+v.map(n=>n.vlan).join(','),' exit');
 o.push('end','copy running-config startup-config');return o.join('\n')}
function wanIp(w,r){return r==w.a?first(w):last(w)}
function serials(l,r){return l.wans.filter(w=>w.a==r||w.b==r).map((w,i)=>({w,port:'0/0/'+i,ip:wanIp(w,r),peer:r==w.a?w.b:w.a,dce:r==w.a}))}
function rt(l,r){const o=['enable','configure terminal','hostname R'+r],mine=l.nets.filter(n=>n.r==r);
 mine.forEach(n=>{if(n.vlan)o.push('interface fast 0/0.'+n.vlan,' encapsulation dot1q '+n.vlan,' ip address '+last(n)+' '+mask(n.p),' exit')});
 o.push('interface fast 0/0');mine.filter(n=>!n.vlan).forEach(n=>o.push(' ip address '+last(n)+' '+mask(n.p)));o.push(' no shutdown',' exit');
 serials(l,r).forEach(s=>{o.push('interface serial '+s.port);if(s.dce)o.push(' clock rate '+l.clk);o.push(' ip address '+s.ip+' '+mask(s.w.p),' no shutdown',' exit')});
 if(l.rip.includes(r)){const ns=mine.map(n=>n.ip).concat(l.wans.filter(w=>l.rip.includes(w.a)&&l.rip.includes(w.b)&&(w.a==r||w.b==r)).map(w=>w.ip));
  o.push('router rip',' version 2',' no auto-summary',...[...new Set(ns.map(cls))].map(x=>' network '+x),' exit')}
 l.nets.filter(n=>n.r!=r&&!(l.rip.includes(r)&&l.rip.includes(n.r))).forEach(n=>{const s=serials(l,r),h=s.find(x=>n.r>r?x.peer>r:x.peer<r);o.push('ip route '+n.ip+' '+mask(n.p)+' '+wanIp(h.w,h.peer))});
 o.push('end','copy running-config startup-config');return o.join('\n')}
function graph(l){const k=nr(l),W=k*300,nd={},ed=[];
 for(let r=1;r<=k;r++){const cx=W*(r-.5)/k;nd['R'+r]={x:cx,y:50};nd['SW'+r]={x:cx,y:155};ed.push(['R'+r,'SW'+r,'trunk']);
  const ps=l.nets.filter(n=>n.r==r);ps.forEach((n,i)=>{nd[n.pc]={x:cx+(i-(ps.length-1)/2)*140,y:265,net:n,c:COL[l.nets.indexOf(n)]};ed.push(['SW'+r,n.pc,'pc'])})}
 l.wans.forEach(w=>ed.push(['R'+w.a,'R'+w.b,'wan',w]));return{nd,ed,W}}
function topo(l,id,hide){const{nd,ed,W}=graph(l);let s=`<svg ${id?`id="${id}"`:''} class="topo" viewBox="0 0 ${W} 345" role="img" aria-label="Topología: ${l.title}">`;
 ed.forEach(([a,b,t,w])=>{const A=nd[a],B=nd[b];if(t=='wan'){const m=(A.x+B.x)/2;s+=`<path d="M${A.x} 50H${m+8}L${m-8} 62H${B.x}" class="ln wan" fill="none"/><text x="${m}" y="34" text-anchor="middle" class="s">${hide?'WAN':w.ip+' /'+w.p}</text><text x="${A.x+46}" y="82" class="s">DCE</text>`}
  else s+=`<path d="M${A.x} ${A.y}L${B.x} ${B.y}" class="ln ${t}" fill="none" ${t=='pc'?`style="stroke:${B.c}"`:''}/>`});
 for(const k in nd){const n=nd[k],R=k[0]=='R',P=k[0]=='P',w=P?96:R?76:88,h=P?42:40;s+=`<g class="nd"><rect x="${n.x-w/2}" y="${n.y-h/2}" width="${w}" height="${h}" rx="${R?20:5}" ${P?`style="stroke:${n.c}"`:''}/><text x="${n.x}" y="${n.y+5}" text-anchor="middle">${k}</text></g>`;
  if(P)s+=`<text x="${n.x}" y="308" text-anchor="middle" class="s">${n.net.name}</text><text x="${n.x}" y="326" text-anchor="middle" class="s">${n.net.vlan?'VLAN '+n.net.vlan:'Sin VLAN'}</text>`}
 return s+(id?'<circle id="pk" class="pk" r="9" cx="0" cy="0"/>':'')+'</svg>'}
function tbl(h,r){return '<div class="sc"><table><thead><tr>'+h.map(x=>`<th>${x}</th>`).join('')+'</tr></thead><tbody>'+r.map(x=>'<tr>'+x.map(y=>`<td>${y}</td>`).join('')+'</tr>').join('')+'</tbody></table></div>'}
function wanLabel(l,w){return l.rip.includes(w.a)&&l.rip.includes(w.b)?'RIP v2':'Estático'}
function statement(l){return `<p>Implementa esta red en Cisco Packet Tracer Student 6.2. ${l.base?`Red base: <b>${l.base}</b>.`:''} Tiempo objetivo: ${l.min} minutos.</p><div class="sc">${topo(l,'',!l.given)}</div>`+
 tbl(['Subred','VLAN','Switch y puertos','PC',l.given?'Red':'Hosts'],l.nets.map(n=>[n.name,n.vlan||'Sin VLAN','SW'+n.r+(n.ports?' ('+n.ports+')':''),n.pc,l.given?n.ip+' /'+n.p:n.hosts]).concat(l.wans.map(w=>['R'+w.a+'–R'+w.b,'','WAN, '+wanLabel(l,w),'',l.given?w.ip+' /'+w.p:2])))+
 '<p>Equipos: routers 1841 con WIC-2T y switches 2950-24.</p><ul>'+l.rules.map(x=>`<li>${x}</li>`).join('')+'</ul>'}
function solution(l){const all=l.nets.map(n=>({...n,lab:n.name})).concat(l.wans.map(w=>({...w,lab:'R'+w.a+'–R'+w.b})));let s='<h3>Direccionamiento</h3>'+tbl(['Subred','Red','Máscara','Primer host','Último host','Broadcast'],all.map(n=>[n.lab,n.ip+' /'+n.p,mask(n.p),first(n),last(n),bc(n)]))+'<h3>PC</h3>'+tbl(['PC','IP','Máscara','Gateway'],l.nets.map(n=>[n.pc,first(n),mask(n.p),last(n)]));
 const C=(t,x)=>`<div class="cfg"><div class="ch"><b>${t}</b><button class="copy" type="button">Copiar</button></div><pre>${x}</pre></div>`;s+='<h3>Comandos</h3><div class="two">';
 for(let r=1;r<=nr(l);r++)s+=C('SW'+r,sw(l,r))+C('R'+r,rt(l,r));s+='</div><p class="mut">Los puertos seriales son un ejemplo: confirma los tuyos con show ip interface brief. Conecta Fa0/24 del switch a Fa0/0 del router. El reloj va en el extremo DCE. Al guardar, confirma con Enter.</p>';
 if(l.rip.length)s+='<p>R1 alcanza la red de R3 con una ruta estática hacia R2. Otra opción es quitarla y usar <code>redistribute static</code> dentro de <code>router rip</code> en R2. R3 necesita una ruta de regreso a cada VLAN.</p>';
 return s+'<h3>Verifica</h3><ol><li>Cada PC a su gateway.</li><li>PC a PC dentro del mismo router.</li><li>Router a router por el serial.</li><li>PC0 a todos los PC remotos.</li><li><code>show ip route</code> en cada router.</li></ol>'}
g.L={LABS,graph,topo,statement,solution,sw,rt,first,last,mask,n2,nr};
})(typeof window!='undefined'?window:globalThis);
