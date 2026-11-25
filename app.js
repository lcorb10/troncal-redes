const VZ=(()=>{
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const T=(x,y,s,c='',a='middle')=>`<text x="${x}" y="${y}" text-anchor="${a}" class="${c}">${esc(s)}</text>`;
const B=(x,y,w,h,c='',r=6)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" class="${c}"/>`;
const Ln=(x,y,X,Y,c='')=>`<path d="M${x} ${y}L${X} ${Y}" class="l ${c}"/>`;
const Ar=(x,y,X,Y,c='')=>{const a=Math.atan2(Y-y,X-x),p=(d)=>`${(X-11*Math.cos(a+d)).toFixed(1)} ${(Y-11*Math.sin(a+d)).toFixed(1)}`;return Ln(x,y,X,Y,c)+`<path d="M${p(.45)}L${X} ${Y}L${p(-.45)}" class="l ${c}"/>`};
const wrap=(h,s,alt)=>`<figure class="viz"><svg viewBox="0 0 720 ${h}" role="img" aria-label="${esc(alt).replace(/"/g,'')}">${s}</svg><figcaption>${esc(alt)}</figcaption></figure>`;
// equipos con los símbolos habituales de redes
function dev(k,x,y,l,s=''){let o='';
 if(k=='r')o=`<path d="M${x-34} ${y-10}v20a34 13 0 0 0 68 0v-20" class="dv"/><ellipse cx="${x}" cy="${y-10}" rx="34" ry="13" class="dv"/>`+[[-1,-1],[1,-1],[-1,1],[1,1]].map(([a,b])=>`<path d="M${x+a*6} ${y-10+b*2}L${x+a*20} ${y-10+b*7}" class="dw"/>`).join('');
 if(k=='s')o=`<path d="M${x-38} ${y-8}l10-12h58l-10 12zM${x-38} ${y-8}h58v24h-58zM${x+20} ${y-8}l10-12v24l-10 12z" class="dv"/><path d="M${x-28} ${y}h30m-6-4l6 4l-6 4M${x+10} ${y+9}h-30m6-4l-6 4l6 4" class="dw"/>`;
 if(k=='p')o=`<rect x="${x-23}" y="${y-21}" width="46" height="31" rx="3" class="dv"/><rect x="${x-18}" y="${y-16}" width="36" height="21" class="ds"/><path d="M${x} ${y+10}v7M${x-14} ${y+18}h28" class="dk"/>`;
 if(k=='v')o=`<rect x="${x-17}" y="${y-26}" width="34" height="50" rx="3" class="dv"/><path d="M${x-10} ${y-16}h20M${x-10} ${y-8}h20" class="dw"/><circle cx="${x}" cy="${y+14}" r="3" class="dwf"/>`;
 return o+T(x,y+43,l,'b')+(s?T(x,y+62,s,'m'):'')}
const net=(N,E,alt)=>{const n=N.length,g=720/n,X=i=>g*(i+.5);let o='';E.forEach((e,i)=>{const x=X(i)+38,x2=X(i+1)-40,m=(x+x2)/2,c=(e[2]===0?'bad ':e[2]===1?'good ':'')+({x:'dash',t:'thick',s:'ser'}[e[0]]||'');
 o+=e[0]=='s'?`<path d="M${x} 72H${m+8}L${m-8} 82H${x2}" class="l ${c}"/>`:Ln(x,75,x2,75,c);o+=T(m,40,e[1]||'','m');if(e[2]!==undefined)o+=T(m,62,e[2]?'✓':'✗',e[2]?'g b':'r b')});
 N.forEach((d,i)=>o+=dev(d[0],X(i),75,d[1],d[2]||''));return wrap(160,o,alt)};
const n2=L.n2,ip=n=>[24,16,8,0].map(s=>n>>>s&255).join('.');
const range=(a,p,M,alt)=>{const s=n2(a),z=2**(32-p),e=s+z-1;const out=q=>{const k=n2(q[0]);return k<s||k>e?0:1};M=[...M].sort((a,b)=>out(a)-out(b));const h=40+M.length*34,y=h+6;let o='';
 M.forEach((m,i)=>{const v=n2(m[0]),inn=v>=s&&v<=e,my=30+i*34,x=inn?(v==s?110:v==e?610:130+460*(v-s)/z):(v<s?52:668),c=m[2]?'g':'r';o+=Ln(x,my+6,x,inn?y:my+14,c=='g'?'good':'bad')+`<circle cx="${x}" cy="${my+6}" r="5" class="${c}f"/>`;const left=x>400;o+=T(left?x-12:x+12,my+11,(m[2]?'✓ ':'✗ ')+m[0]+' '+m[1],c,left?'end':'start')});
 o+=B(110,y,500,30,'on',4)+B(96,y,14,30,'rd',0)+B(610,y,14,30,'rd',0)+T(360,y+21,'hosts '+ip(s+1)+' a '+ip(e-1),'inv b')+T(103,y+52,'red '+a+' /'+p,'m','start')+T(617,y+52,'broadcast '+ip(e),'m','end');return wrap(y+66,o,alt)};
const mask=(p,alt)=>{let o='';for(let i=0;i<32;i++){const x=40+i*19+Math.floor(i/8)*12;o+=B(x,30,17,34,i<p?'on':'off',3)+T(x+8.5,53,i<p?1:0,i<p?'inv b':'b')}for(let k=0;k<4;k++){const b=Math.min(8,Math.max(0,p-8*k));o+=T(40+k*164+74,96,256-2**(8-b),'b big')}return wrap(116,o+T(40,20,'/'+p+' = '+p+' unos seguidos','m','start'),alt)};
const OS=['Física','Enlace','Red','Transporte','Sesión','Presentación','Aplicación'],PD=['bits','trama','paquete','segmento','datos','datos','datos'];
const osi=(hl,note,alt)=>{let o='';for(let i=7;i>0;i--){const y=12+(7-i)*36,on=hl.includes(i);o+=B(40,y,270,31,on?'on':'off')+T(58,y+21,i+'  '+OS[i-1],on?'inv b':'','start')+T(296,y+21,PD[i-1],on?'inv':'m','end')}note.forEach((t,i)=>o+=T(345,64+i*32,t,i?'':'b','start'));return wrap(270,o,alt)};
const encap=(alt,hl='')=>{const R=[['Datos',['Datos']],['Segmento',['TCP','Datos']],['Paquete',['IP','TCP','Datos']],['Trama',['MAC','IP','TCP','Datos','CRC']]];let o='';R.forEach((r,i)=>{o+=T(30,40+i*50,r[0],'b','start');let x=360-r[1].indexOf('Datos')*76;r[1].forEach(b=>{const w=b=='Datos'?150:74;o+=B(x,18+i*50,w,34,b==hl||(!hl&&b==r[1][0]&&i)?'on':'off')+T(x+w/2,41+i*50,b,b==hl||(!hl&&b==r[1][0]&&i)?'inv b':'');x+=w+2})});return wrap(220,o,alt)};
const frame=(hl,alt)=>{const F=[['Preámbulo',7],['SFD',1],['MAC destino',6],['MAC origen',6],['Tipo',2],['Datos','46–1500'],['CRC',4]],w=[92,50,118,112,60,150,60];let x=36,o='';F.forEach((f,i)=>{const on=hl.includes(i);o+=B(x,24,w[i],50,on?'on':'off',3)+T(x+w[i]/2,54,f[0],on?'inv b':'')+T(x+w[i]/2,98,f[1]+' B','m');x+=w[i]+1});return wrap(114,o,alt)};
const COLS=['c1','c2','c3','c4','c5','c6'];
const blocks=(tot,A,alt)=>{const hy=A.some(b=>b[2]);let x=40,o='';A.forEach((b,i)=>{const w=Math.max(34,640*b[1]/tot);o+=B(x,40,w-3,56,b[2]?'on':hy?'c5':COLS[i%6],3)+(w>80?T(x+w/2,74,b[0].split(' ')[0],'inv b'):'');o+=B(48,118+i*28,16,16,b[2]?'on':hy?'c5':COLS[i%6],3)+T(72,131+i*28,b[0]+': '+b[3],b[2]?'b':'','start');x+=w});return wrap(134+A.length*28,o+T(40,24,'La torta completa: '+tot+' direcciones','m','start'),alt)};
const need=(A,cap,alt)=>{let o='';A.forEach((a,i)=>{const y=20+i*38,w=430*a[1]/cap;o+=T(130,y+20,a[0],'','end')+B(145,y,430,28,'off',4)+B(145,y,Math.max(6,Math.min(430,w)),28,a[1]<=cap?'on':'rd',4)+T(590,y+20,a[1]+' de '+cap,'b','start')});return wrap(28+A.length*38,o,alt)};
const tab=(Ls,hl,alt)=>{let o=B(20,10,680,Ls.length*28+20,'con');Ls.forEach((l,i)=>{if(hl.includes(i))o+=B(26,18+i*28,668,26,'hl',4);o+=T(38,36+i*28,l,'mono'+(hl.includes(i)?' b':''),'start')});return wrap(Ls.length*28+42,o,alt)};
const clsI=s=>{const a=+s.split('.')[0],b=+s.split('.')[1];return a==127?['loopback','no']:a==0?['reservada','no']:a<128?['A',a==10?'privada':'pública']:a<192?['B',a==172&&b>15&&b<32?'privada':'pública']:a<224?['C',a==192&&b==168?'privada':'pública']:a<240?['D','multicast']:['E','reservada']};
const ips=(A,ok,alt)=>{let o=T(60,26,'Dirección','m','start')+T(290,26,'Clase','m','start')+T(390,26,'Tipo','m','start')+T(520,26,'Máscara','m','start');A.forEach((a,i)=>{const[c,t]=clsI(a),pf=+(a.split('/')[1]||0),df={A:8,B:16,C:24}[c],y=38+i*36,on=ok.includes(i);o+=B(36,y,650,32,on?'hl':'off',4)+T(50,y+22,a,'mono'+(on?' b':''),'start')+T(290,y+22,c,'','start')+T(390,y+22,t,'','start')+T(520,y+22,pf&&df&&c!='loopback'?(pf==df?'la de su clase':'sin clase (CIDR)'):'','','start')+(on?T(670,y+22,'✓','g b'):'')});return wrap(48+A.length*36,o,alt)};
const seq=(a,b,M,alt)=>{let o=dev(a[0],110,44,a[1])+dev(b[0],610,44,b[1]);const h=110+M.length*46;o+=Ln(110,100,110,h,'dash')+Ln(610,100,610,h,'dash');M.forEach((m,i)=>{const y=134+i*46;o+=m[0]>0?Ar(120,y,600,y,m[2]||''):Ar(600,y,120,y,m[2]||'');o+=T(360,y-8,m[1],'')});return wrap(h+14,o,alt)};
const chan=(k,n,hl,alt)=>{let o='';for(let i=0;i<n;i++){const c=COLS[i%6];o+=k=='tdm'?B(50+i*620/n,30,620/n-4,90,i==hl?'on':'off',3)+T(50+(i+.5)*620/n,82,i+1,i==hl?'inv b':''):B(50,20+i*110/n,620,110/n-3,c,3)}return wrap(160,o+T(360,150,k=='tdm'?'el tiempo avanza hacia la derecha':k=='fdm'?'cada banda es una frecuencia, todas a la vez':'cada banda es un color de luz, todas a la vez','m'),alt)};
const calc=(S,alt)=>{const n=S.length,w=(680-(n-1)*34)/n;let o='';S.forEach((s,i)=>{const x=20+i*(w+34),last=i==n-1;o+=B(x,24,w,84,last?'on':'off',8);s.split('|').forEach((t,j,a)=>o+=T(x+w/2,72+(j-(a.length-1)/2)*24,t,last?'inv b':j?'':'b'));if(!last)o+=Ar(x+w+6,66,x+w+28,66)});return wrap(126,o,alt)};
const cmp=(S,hl,alt)=>{const n=S.length,w=(680-(n-1)*20)/n;let o='';S.forEach((s,i)=>{const x=20+i*(w+20),on=hl.includes(i);o+=B(x,24,w,84,on?'on':'off',8);s.split('|').forEach((t,j,a)=>o+=T(x+w/2,72+(j-(a.length-1)/2)*24,t,on?'inv b':j?'':'b'))});return wrap(126,o,alt)};
const sw=(alt)=>{const P=[[360,50,'PC4 puerto 1'],[560,130,'PC3 puerto 2'],[360,225,'PC2 puerto 3'],[160,130,'PC1 puerto 4']];let o='';P.forEach((p,i)=>{o+=i==3?Ar(200,130,318,130,'thick bad'):i==0?Ar(360,115,360,100,'good'):i==1?Ar(395,130,522,130,'good'):Ar(360,152,360,196,'good')});o+=dev('s',362,132,'');P.forEach((p,i)=>o+=dev('p',p[0],p[1]-(i==0?16:0),p[2]));o+=T(250,118,'entra','r b')+T(460,118,'sale','g b');return wrap(285,o,alt)};
const vlan=(ok,vs,alt)=>{let o='';const s=[190,530];o+=Ln(190,60,530,60,'thick '+(ok?'good':'bad'))+T(360,38,ok?'troncal 802.1Q':'troncal contra acceso','b '+(ok?'g':'r'))+T(360,92,ok?'VLAN '+vs.join(', '):'✗',ok?'m':'r b');s.forEach((x,j)=>{vs.forEach((v,i)=>{const X=x+(i-(vs.length-1)/2)*100;o+=Ln(x,66,X,166,COLS[i]+'l')+dev('p',X,180,'VLAN '+v)});o+=dev('s',x,60,'')+T(x,24,'SW'+(j+1),'b')});return wrap(240,o,alt)};
const roas=(A,hl,alt)=>{let o=Ln(110,110,290,110,'thick')+dev('s',110,110,'Switch')+dev('r',300,110,'Router')+T(200,92,'troncal','m');A.forEach((a,i)=>{const y=30+i*56,on=hl.includes(i);o+=Ln(338,104,380,y+20,on?'good':'')+B(380,y,325,44,on?'on':'off')+T(394,y+18,a[0]+', VLAN '+a[1],on?'inv b':'b','start')+T(394,y+37,a[2],on?'inv':'m','start')});return wrap(Math.max(180,40+A.length*56),o,alt)};
const star=(c,A,alt,k='r')=>{let o='';const n=A.length;A.forEach((a,i)=>{const x=720*(i+.5)/n;o+=Ln(360,50,x,140)+B(x-105,140,210,54,COLS[i%6])+T(x,163,a[0],'inv b')+T(x,184,a[1]||'','inv')});return wrap(210,o+(k?dev(k,360,44,''):'')+T(k?420:360,36,c,'b',k?'start':'middle'),alt)};
const hops=(N,alt)=>{let g=720/N.length,o='';N.forEach((n,i)=>{const x=g*(i+.5);if(i<N.length-1)o+=Ar(x+38,60,x+g-40,60,'good')+T(x+g/2,44,'salto '+(i+1),'m');o+=dev('r',x,60,n)});return wrap(120,o,alt)};
const refr=(alt)=>{let o='';o+=Ar(150,60,320,60)+Ar(400,60,570,60)+dev('p',110,60,'Origen')+dev('r',360,60,'Router')+dev('v',610,60,'Destino');[[40,'trama 1'],[400,'trama 2']].forEach(([x,t],i)=>{o+=T(x+140,142,t,'b')+B(x,152,280,30,i?'on':'c2')+T(x+140,172,i?'MAC nueva: G0/1 al siguiente':'MAC: origen a router','inv')+B(x,186,280,30,'off')+T(x+140,206,'IP origen e IP destino: iguales','')});return wrap(228,o,alt)};
const fiber=(m,alt)=>{let o='';[['Monomodo, 9 µm',6,m==0,60],['Multimodo, 50 o 62,5 µm',32,m==1,160]].forEach(f=>{o+=T(40,f[3]-34,f[0],f[2]?'b':'','start')+B(40,f[3]-24,640,50,'off',4)+B(40,f[3]-f[1]/2,640,f[1],f[2]?'on':'c5',0);o+=f[1]<10?Ln(40,f[3],680,f[3],'ray'):`<path d="M40 ${f[3]}L120 ${f[3]-14}L220 ${f[3]+14}L320 ${f[3]-14}L420 ${f[3]+14}L520 ${f[3]-14}L620 ${f[3]+14}L680 ${f[3]}" class="l ray"/>`;if(f[2])o+=T(680,f[3]-34,'✓','g b','end')});return wrap(200,o,alt)};
const conn=(hl,alt)=>{let o='';[['SC','cuadrado, se empuja',`<rect x="-30" y="-28" width="60" height="56" rx="3" class="dv"/><circle r="6" class="dwf"/>`],['LC','pequeño, con pestaña',`<rect x="-16" y="-20" width="32" height="40" rx="2" class="dv"/><path d="M0-20v-12" class="dk"/><circle r="4" class="dwf"/>`],['ST','redondo, bayoneta',`<circle r="28" class="dv"/><path d="M-34 0h12M22 0h12" class="dk"/><circle r="5" class="dwf"/>`],['FC','redondo, rosca',`<circle r="28" class="dv"/><circle r="21" class="dw"/><circle r="15" class="dw"/><circle r="5" class="dwf"/>`]].forEach((c,i)=>{const x=90+i*180;o+=(c[0]==hl?B(x-80,8,160,136,'hl'):'')+`<g transform="translate(${x} 58)">${c[2]}</g>`+T(x,112,c[0],'b')+T(x,132,c[1],'m')});return wrap(154,o,alt)};
const csma=alt=>{let o=T(40,26,'canal','m','start')+B(40,34,320,40,'rd',3)+T(200,60,'ocupado','inv b')+B(362,34,320,40,'off',3)+T(522,60,'libre','b')+T(40,104,'el nodo','m','start');for(let i=0;i<14;i++)o+=Ar(52+i*23,132,52+i*23,112);for(let i=0;i<4;i++)o+=B(364+i*80,110,74,30,i==2?'on':'off',3)+T(401+i*80,130,i==2?'transmite':'espera',i==2?'inv b':'m');return wrap(190,o+T(200,170,'escucha continua','b')+T(522,170,'decide por ranuras, probabilidad p','b'),alt)};
const bits=(a,alt)=>{let o='';[...a].forEach((c,i)=>o+=c==' '?'':B(30+i*36,30,32,46,c=='1'?'on':'off',4)+T(46+i*36,60,c,c=='1'?'inv b':'b'));return wrap(96,o,alt)};
return{cmp,net,range,mask,osi,encap,frame,blocks,need,tab,ips,seq,chan,calc,sw,vlan,roas,star,hops,refr,fiber,conn,csma,bits}})();
const VM=(()=>{const{cmp,net,range,mask,osi,encap,frame,blocks,need,tab,ips,seq,chan,calc,sw,vlan,roas,star,hops,refr,fiber,conn,csma}=VZ;
const lat=h=>blocks(8192,[['Brasil',4096,h==0,'4000 hosts, /20'],['Argentina',2048,h==1,'2000 hosts, /21, 255.255.248.0'],['Colombia',1024,h==2,'1000 hosts, /22, 255.255.252.0'],['Paraguay',512,h==3,'500 hosts, /23'],['Libre',512,0,'sobra']],'10.31.0.0 /19 repartida de mayor a menor');
const lan26=()=>range('192.168.1.0',26,[['192.168.1.1','PC1',1],['192.168.1.2','PC2',1],['192.168.1.3','serviría, pero con máscara /26',1],['192.168.1.255','está fuera',0]],'PC3 necesita una IP de esta barra y la máscara 255.255.255.192');
const four=()=>blocks(256,[['A',128,0,'192.168.0.128 /25, pide 100 y hay 126'],['B',64,0,'192.168.0.0 /26, pide 50 y hay 62'],['C',32,0,'192.168.0.96 /27, pide 25 y hay 30'],['D',4,0,'192.168.0.80 /30, pide 2 y hay 2']],'Todas caben y ninguna se solapa');
const cab=()=>net([['p','PC'],['s','Switch'],['r','Router'],['r','Router']],[['d','1 directo',1],['d','2 directo',1],['x','3 cruzado',1]],'Equipos distintos: directo. Equipos iguales: cruzado');
const need100=()=>need([['25 hosts',25],['50 hosts',50],['75 hosts',75],['100 hosts',100]],254,'Con /24 hay 254 direcciones: todas las subredes caben');
const flow=()=>seq(['p','Emisor'],['p','Receptor'],[[1,'trama 1'],[-1,'ACK 1','good'],[1,'trama 2'],[-1,'ACK 2','good']],'Parada y espera: una trama, una confirmación');
const buf=()=>seq(['p','Emisor rápido'],['p','Receptor lento'],[[1,'tramas'],[-1,'espera, mi buffer está lleno','bad'],[-1,'ya tengo espacio, sigue','good']],'El control de flujo cuida el buffer del receptor');
const llc=()=>cmp(['LLC|servicio a red|flujo, errores','MAC|acceso al medio'],[1],'La capa de enlace se divide en dos: el acceso al medio es de MAC');
const pub=(a,i,t)=>ips(a,i,t);
const arp=()=>seq(['p','PC1 10.0.0.2'],['p','PC2 10.0.0.1'],[[1,'ARP: ¿quién tiene 10.0.0.1? (broadcast)'],[-1,'ARP: yo, esta es mi MAC','good'],[1,'ping (trae la MAC de PC1)'],[-1,'respuesta al ping','good']],'PC2 aprende la MAC de PC1 por el tráfico que recibe. La máscara nunca viaja');
const dhcp=h=>seq(['p','PC sin IP'],['v','Servidor DHCP'],[[1,'Discover: 0.0.0.0 a 255.255.255.255',h==0?'good':''],[-1,'Offer: te ofrezco una IP'],[1,'Request: la quiero',h==1?'good':''],[-1,'ACK: es tuya']],'Las cuatro etapas de DHCP');
const tb=()=>star('Tabla de enrutamiento',[['Conectadas','letra C'],['Estáticas','letra S'],['Dinámicas','R, O, D']],'La tabla se llena de varias fuentes');
const pa=range;
const f=[need100,
()=>range('192.168.1.16',28,[['192.168.1.17','gateway',1],['192.168.1.22','host nuevo',1],['192.168.1.44','está fuera',0],['192.168.1.11','está fuera',0]],'La subred de la VLAN 1 es 192.168.1.16 /28'),
()=>roas([['Fa0/1.1',1,'192.168.1.32 a .63'],['Fa0/1.2',2,'192.168.1.64 a .95: aquí cae .85'],['Fa0/1.3',3,'192.168.1.96 a .127']],[1],'192.168.1.85 pertenece a la segunda subred'),
()=>vlan(0,[10,20,30],'Un extremo es troncal y el otro acceso: las VLAN no pasan'),()=>vlan(1,[10,20],'Estado trunking: pasan varias VLAN por el mismo cable'),()=>vlan(1,[40,50],'El troncal une la misma VLAN entre dos switches'),
()=>roas([['Fa3/0/0 física',' ninguna','sin IP, subdividida'],['Fa3/0/0.3',3,'dot1q (802.1Q), 192.168.187.1 /24']],[1],'La IP va en la subinterfaz, no en la física'),
()=>roas([['Subinterfaz .10',10,'gateway VLAN 10'],['Subinterfaz .20',20,'gateway VLAN 20'],['Subinterfaz .30',30,'gateway VLAN 30']],[],'Un solo cable para todas: barato, pero lo comparten'),
()=>tab(['SW1(config)# no vlan 5','SW1(config)# interface range fast 0/16-23','SW1(config-if-range)# switchport access vlan 2'],[0,2],'Borra la VLAN y reasigna sus puertos'),
()=>star('R1',[['172.16.0.0 /16','Giga 0/0'],['10.10.40.0 /24','Giga 0/1'],['192.168.1.252 /30','Serial 0/0/0']],'Tres redes conectadas: al menos tres entradas'),
()=>net([['s','172.16.0.0 /16'],['r','R1','.253'],['r','R2','.254'],['s','10.10.40.0 /24']],[['d',''],['s','siguiente salto'],['d','']],'Desde R2, para llegar a 172.16.0.0 se sale hacia .253'),
()=>tab(['R  172.16.0.0/25   [120/1] via 192.168.1.1','R  172.16.0.128/25 [120/1] via 192.168.1.1','         [distancia administrativa / métrica]'],[0,1],'Llegan subredes con su máscara: RIPv2 sin resumen'),
()=>blocks(256,[['.0',64,0,'primera, 192.168.1.0 /26'],['.64',64,1,'segunda, 192.168.1.64 /26'],['.128',64,0,'tercera'],['.192',64,0,'cuarta']],'Un /24 partido en cuatro iguales'),
()=>range('10.10.92.0',23,[['10.10.92.1','PC0',1],['10.10.93.254','HG',1]],'Los dos están en la misma red: lo que se ve está bien'),tb,()=>lat(1),
()=>tab(['DHCP habilitado . . . . . . : sí','Dirección IPv4 . . . . . . . : 192.168.1.14 (Preferido)','Puerta de enlace . . . . . . : 192.168.1.1','Servidores DNS . . . . . . . : 200.21.200.80'],[0,2],'Dinámica, router 192.168.1.1 y sin máscara de los DNS'),()=>lat(2),
()=>hops(['R1','R2','R3','R4'],'Métrica 3: la red está a tres saltos, no en el vecino'),
()=>net([['p','PC1'],['s','S1'],['r','R1'],['r','R2'],['v','Servidor']],[['d','ARP',1],['d','ARP',1],['s','no cruza',0],['d','']],'Responde R1 con la MAC de su G0/0'),()=>refr('Cambia la trama, no el paquete'),
()=>range('172.30.40.0',22,[['172.30.40.255','es un host',0],['172.30.43.255','el broadcast real',1]],'El broadcast de la VLAN 100 no está en las opciones'),
()=>calc(['Switch C3560','ip routing','router rip','Switch|capa 3'],'Si enruta, es de capa 3'),
()=>tab(['Destino: 192.168.1.16','C 192.168.1.0/30  cubre .0 a .3','C 192.168.1.4/30  cubre .4 a .7','Gateway of last resort is not set'],[3],'Ninguna línea lo contiene y no hay ruta por defecto: se descarta'),
cab,()=>mask(25,'El último octeto tiene un solo uno: 128'),lan26,four,()=>sw('Destino desconocido: sale por todos menos por donde entró'),
()=>range('192.168.1.240',30,[['192.168.1.241','el vecino (via)',1],['192.168.1.242','R2, la última',1]],'Un /30 solo tiene dos hosts'),()=>hops(['R1','R2','R3'],'RIP cuenta saltos: menos es mejor. 120 es otra cosa')];
const p=[()=>flow(),
()=>pa('10.1.0.0',16,[['10.1.1.0','host',1],['10.1.0.255','host',1],['10.0.1.255','otra red',0],['10.1.255.255','broadcast',0]],'Solo .0.0 y .255.255 son especiales'),
()=>ips(['172.32.1.240/16','100.254.0.1/24','192.186.4.100/24','127.0.0.1/8'],[],'Ninguna es privada'),()=>conn('SC','Reconoce el conector por su forma'),
()=>ips(['10.0.255.255','0.0.0.1','127.0.0.2'],[0],'3.4.275.0 no existe: un octeto llega hasta 255'),
()=>range('10.0.0.0',16,[['10.0.0.1','A: primer host',1],['10.0.255.254','último host',1]],'Primer host es la red más uno'),
()=>range('10.0.0.0',16,[['10.0.0.255','host válido',1]],'Privada y con /16 en lugar de /8'),cab,()=>mask(16,'Dos octetos llenos: 255.255.0.0'),
()=>cmp(['Estática|FDM, TDM, WDM','Dinámica|CSMA/CD, ALOHA'],[1],'CSMA/CD compite por el canal: es dinámica'),
()=>ips(['172.16.1.0/16','192.168.100.0/24','10.0.255.0/8','172.25.4.0/16','10.0.255.0/24'],[4],'Privada, sin clase y con los bits de host en cero'),
()=>csma('Portadora: escuchar antes de hablar'),
()=>net([['p','PC0'],['s','SW1'],['s','SW2'],['p','PC1']],[['d','directo',1],['d','directo',0],['d','directo',1]],'Entre switches hacía falta cruzado'),
()=>net([['p','PC0'],['s','SW1'],['s','SW2']],[['x','cruzado',0],['x','cruzado',1]],'Primero la capa física: PC a switch va directo'),llc,
()=>range('172.31.0.0',16,[['172.31.6.0','PC1, host válido',1],['172.31.5.1','PC2, pero con máscara /24',0]],'PC2 tiene la máscara errada'),()=>dhcp(1),()=>dhcp(0),
()=>ips(['172.42.16.253','4.100.25.201','10.10.40.1','8.3.2.1','192.180.14.85'],[2],'Solo una está en un rango privado'),()=>mask(25,'/25 termina en 128'),lan26,four,
()=>calc(['1. Prefijo|más largo','2. Menor|distancia','3. Menor|métrica','Ruta|elegida'],'El orden en que decide el router'),
()=>range('10.1.0.0',16,[['10.1.0.255','host',0],['10.1.255.255','broadcast real',1]],'Broadcast: todos los bits de host en uno'),()=>lat(1),()=>fiber(0,'Larga distancia: un solo camino de luz'),
()=>net([['p','PC1'],['s','SW2'],['s','SW3'],['p','PC2']],[['d','directo',1],['x','cruzado',1],['d','directo',1]],'Ese camino está completo'),
()=>calc(['0A0C','4 dígitos|hexadecimales','4 × 4|16 bits','Grado 16'],'Bits redundantes = grado del polinomio'),()=>csma('Continua mientras está ocupado, ranurada cuando queda libre'),
()=>calc(['10110|datos','1011000|dos ceros','÷ 110|resto 10','1011010|se envía'],'CRC con un generador de grado 2'),
()=>calc(['Hexadecimal|0–9 y A–F','H5|tiene una H','No es|válida'],'Una MAC son 6 bytes hexadecimales'),()=>net([['s','SW1'],['s','SW2']],[['d','fibra, puertos Giga: cascada']],'Stacking usa cables especiales de apilamiento'),
()=>frame([2,3],'Primero destino, después origen'),()=>ips(['10.0.0.1','172.16.0.1','192.168.1.1','224.0.0.5','240.0.0.1'],[0,1,2],'A, B y C son para redes y equipos'),buf,
()=>cmp(['Horizontal|UTP 90 m','Backbone|fibra o UTP voz'],[0],'Los 90 metros son del cableado horizontal'),
()=>range('192.168.1.0',24,[['192.168.1.1','servidor',1],['192.168.1.2','inicio del pool',1]],'El pool empieza en la primera libre'),
()=>ips(['8.4.3.10/8','10.3.4.100/16','185.44.8.200/16','192.168.1.4/24'],[1],'CIDR: máscara distinta a la de su clase'),()=>frame([6],'CRC de 4 bytes = 32 bits = grado 32'),
()=>ips(['192.168.1.1/24','172.16.3.31/24','192.186.4.5/24','172.15.1.100/24'],[2],'Clase C y fuera de 192.168'),
()=>range('10.0.0.0',16,[['10.0.0.1','PC-1',1],['10.0.255.254','PC-6',1],['10.0.255.255','SRV-WEB, es el broadcast',0]],'Un equipo no puede usar el broadcast'),
()=>calc(['UTP|Cat 5e','100 MHz|4 pares','1000 Mbps'],'Cat 5e soporta Gigabit hasta 100 m'),
()=>range('10.0.0.0',16,[['10.0.255.254','B: último host',1]],'Último host es el broadcast menos uno'),
()=>range('192.168.0.0',24,[['192.168.0.254','PC1',1],['192.168.0.1','PC3, máscara /16',0],['192.168.1.0','PC2, otra red',0]],'Solo PC1 cumple IP y máscara'),need100,
()=>net([['p','PC'],['s','SW1'],['s','SW2'],['v','Servidor']],[['d','1 directo',1],['x','2 cruzado',1],['d','3 directo',1]],'Iguales: cruzado. Distintos: directo'),
()=>need([['/24',254],['600 hosts',600],['/22',1022]],1022,'600 hosts no caben en un /24. En un /16 sobran'),()=>fiber(1,'Cable naranja: multimodo'),
()=>ips(['192.186.1.0/24','10.0.0.0/24','215.45.38.0/24','172.15.1.0/24'],[1],'Una LAN interna usa direcciones privadas'),
()=>calc(['11000000|192','10101010|170','192.170|no es 192.168','Clase C|pública'],'De binario a decimal, octeto por octeto'),
()=>net([['p','PC-1','192.168.1.x'],['s','Switch'],['p','Destino','192.168.2.2']],[['d',''],['d','falta router',0]],'Redes distintas sin router no se hablan'),
()=>ips(['210.15.61.255','10.0.0.1','172.32.0.1','192.168.0.1','192.168.254.254'],[2],'210.15.61.255 es pública, pero es el broadcast de su /24'),
()=>calc(['224.0.0.200|clase D','01-00-5E|MAC multicast','Multicast'],'Un grupo, no un solo equipo'),buf,()=>net([['r','R1'],['r','R2']],[['s','punto a punto: nadie compite']],'Dos extremos, sin contención'),
()=>calc(['100 Mbps|× 800 ns','80 bits','÷ 8','10 bytes'],'Velocidad por tiempo'),
()=>ips(['9.4.100.200','127.1.1.1','192.186.100.150','172.31.254.255'],[3],'172.16 a 172.31 es privado'),
()=>ips(['10.1.0.1/8','8.3.5.4/16','172.17.255.254/24','192.168.100.100/24','191.200.100.4/16'],[2],'Privada y sin clase a la vez'),arp,arp];
const O=(h,n,a)=>()=>osi(h,n,a);
const ctl=(k,b,t)=>()=>calc([k,'a bytes|'+t,'menos|'+b,(t-b)+' bytes'],'Total enviado menos información');
const q=[()=>chan('wdm',5,0,'WDM: varios colores de luz en una fibra'),ctl('33,6 Kbps|× 2 s',8192,8400),ctl('49,8 Kbps|× 2 s',12288,12450),ctl('67,2 Kbps|× 3 s',24576,25200),
()=>calc(['8 clientes|8x','+ (x+2)²','+ 8x²','9x²+12x+4','(3x+2)²'],'Suma de todas las velocidades'),()=>calc(['10 clientes|10x','+ 3x²','+ (x+5)²','4x²+20x+25','(2x+5)²'],'Suma de todas las velocidades'),
O([4,5],['Segmento = H4 + D4','D4 viene de la capa 5'],'Cada capa transporta la unidad de la de arriba'),()=>star('Bus lineal',[['PC','mismo cable'],['PC','mismo cable'],['PC','mismo cable']],'Todos comparten un medio: es difusión',''),
O([5],['Control de diálogo','es un servicio de Sesión'],'No es un aspecto de diseño general'),O([2],['Enlace aísla','el hardware de las de arriba'],'Si cambia el hardware, arriba no se nota'),O([3],['Datagramas','cada paquete va por su cuenta'],'La capa de red entrega paquetes independientes'),
()=>frame([2,3],'La MAC está en la trama'),O([2],['La MAC es de Enlace','no de Física'],'La capa física solo mueve bits'),()=>encap('Cada capa agrega su encabezado'),()=>chan('fdm',6,0,'Espectro ensanchado reparte la señal en muchas frecuencias'),
O([5],['Puntos de sincronismo'],'Los pone la capa de sesión'),O([3],['El paquete','define la fragmentación'],'La red ajusta el tamaño al camino'),()=>seq(['p','UDP'],['p','Destino'],[[1,'mensaje 1'],[1,'mensaje 2']],'Sin conexión: mensajes aislados y sin confirmación'),
O([5],['Turnos y diálogo'],'Quién habla y cuándo'),O([5],['syn + H5'],'El encabezado H5 es de sesión'),()=>net([['p','A'],['s','guarda'],['s','reenvía'],['p','B']],[['d','paquete'],['d','paquete'],['d','paquete']],'No se reserva camino: no hay nada que liberar'),
()=>cmp(['Capa N+1','SAP','Capa N'],[1],'El SAP es la puerta entre capas vecinas'),()=>net([['p','PC0','half-duplex'],['s','SW'],['p','PC1','full-duplex']],[['d','por turnos'],['d','a la vez']],'Half-duplex no envía y recibe al mismo tiempo'),
()=>chan('fdm',4,0,'Cada servicio solo usa su banda'),()=>chan('fdm',4,0,'Suma de bandas = total del enlace'),()=>chan('tdm',10,0,'Esperas los otros 9 turnos: 9 × 15 = 135 ms'),
()=>seq(['p','Cliente'],['v','Servidor'],[[1,'solicitud'],[-1,'respuesta','good']],'Cliente y servidor'),()=>conn('SC','Cuadrado: SC'),()=>calc(['7 chips','2⁷','128'],'La fórmula que usa el curso'),O([4],['TPDU = segmento'],'La unidad de transporte'),
()=>net([['p','Autónomo'],['s','Red'],['p','Autónomo']],[['d',''],['d','']],'Cada equipo procesa por sí mismo'),tb,
()=>cmp(['Conmutación|circuitos, paquetes','Multiplexación|FDM, TDM, WDM'],[1],'FDM comparte el medio, no conmuta'),()=>star('Un solo medio',[['PC'],['PC'],['PC']],'Sin caminos alternos no hay rutas que elegir',''),
()=>hops(['A','B','C'],'Circuito virtual: todo sigue el mismo camino'),()=>calc(['8 hex|32 bits','32 ÷ 4|8 s','2⁴','16 niveles'],'4 bits por símbolo son 16 estados'),O([7],['FTP'],'FTP es de aplicación'),O([2],['Clave del curso: Enlace','X.25 lo hacía en Red'],'Frame Relay y ATM trabajan en capa 2'),
()=>chan('wdm',5,0,'Luz por fibra: guiado y no eléctrico'),()=>fiber(0,'La clave dice 10 µm, que es monomodo. El color naranja sugeriría multimodo'),()=>calc(['Asíncrono|10N','Síncrono|8N + 16','2N = 16','N = 8'],'Se igualan los dos tiempos'),
()=>cmp(['1. Establecer|se reserva','2. Transferir|se usa','3. Liberar|se suelta'],[0,1],'El recurso es tuyo en las dos primeras'),O([6],['Cifrado','HTTPS con TLS'],'En OSI el cifrado es de presentación'),()=>calc(['Entra luz','Impurezas|la absorben','Sale|menos luz'],'Absorción: la suciedad se come la luz'),
()=>chan('tdm',10,0,'En tu turno usas todo el enlace: 12 000 bits en 15 ms = 800 Kbps'),()=>seq(['p','TCP'],['v','Destino'],[[1,'SYN'],[-1,'SYN + ACK','good'],[1,'ACK']],'TCP abre una conexión antes de enviar'),
()=>seq(['p','A'],['p','B'],[[1,'hola'],[-1,'hola, te escucho','good']],'Protocolo: reglas que ambos respetan'),()=>calc(['10|Mbps','BASE|banda base','2|185 m'],'10BASE2 llega a 185 metros'),O([1,2,3],['Física, Enlace y Red'],'La subred interna son las tres de abajo'),O([3],['Punto a punto','necesita enrutar'],'La capa de red es delgada solo en difusión'),O([4],['De programa a programa','de extremo a extremo'],'Transporte')];
const LV={r1:()=>cmp(['Datagramas|cada paquete por su cuenta','Circuito virtual|todos por el mismo camino'],[0],'Internet e IP usan datagramas'),r2:()=>encap('Datos, segmento, paquete y trama'),r3:()=>calc(['200.40.96.175|/27','delta|32','subred|.160','host|.15'],'Separar red, subred y host'),r4:()=>net([['p','Host A'],['r','R1'],['r','R2'],['p','Host B']],[['d','directa'],['s','indirecta'],['d','directa']],'Entre redes el paquete salta de router en router'),r5:()=>tab(['C le envía a A:   A 2   B 4   C 0   D ∞   E 4','A suma 2:        A 4   B 6   C 2   D ∞   E 6','Tabla vieja de A: A 0   B 5   C 2   D 3   E ∞','Tabla nueva de A: A 0   B 5   C 2   D 3   E 6 vía C'],[3],'Se queda con el menor costo de cada fila'),t15:()=>tab(['O    10.39.8.0/23 [110/2] via 10.39.10.1, GigabitEthernet0/1','     110 = distancia administrativa (cuánto se confía)','     2   = costo, la métrica de OSPF (1 + 1)'],[0],'Así se ve una ruta aprendida por OSPF'),p14:()=>net([['p','PC0','10.39.0.1'],['s','SW-CORE'],['r','HQ-CORE','.2'],['r','BRANCH','.1'],['s','SW-BRANCH'],['p','PC1','10.39.8.1']],[['d','/21'],['d','Gig0/0'],['x','/30'],['d','Gig0/0'],['d','/23']],'PC0 llega a PC1 cruzando dos routers que hablan OSPF'),t1:()=>encap('Los datos bajan y cada capa los envuelve'),t2:cab,t3:()=>sw('Destino desconocido: el switch inunda'),t4:flow,t5:()=>mask(26,'/26 son 26 unos'),t6:()=>range('192.168.1.64',27,[['192.168.1.85','tu IP',1]],'La red al inicio, el broadcast al final'),t7:()=>ips(['10.5.0.1/16','172.20.1.1/16','192.168.1.1/24','192.186.1.1/24','224.0.0.1'],[],'Mira el primer octeto y luego el segundo'),t8:()=>lat(-1),t9:arp,t10:()=>dhcp(-1),t11:()=>hops(['R1','R2','R3'],'En cada router se decide de nuevo'),t12:tb,t13:()=>vlan(1,[10,20],'Dos VLAN por un mismo troncal'),t14:()=>roas([['Fa0/0.2',2,'gateway 192.168.1.62'],['Fa0/0.5',5,'gateway 192.168.1.174']],[],'Una subinterfaz por VLAN'),
p1:()=>net([['p','PC'],['s','2950-24'],['r','1841'],['r','1841']],[['d','directo'],['d','directo'],['s','serial DCE']],'Los equipos y sus cables'),p2:()=>calc(['Router>','enable|Router#','conf t|(config)#','interface|(config-if)#'],'Cada comando te lleva un nivel adentro'),p3:()=>blocks(256,[['Ventas',64,0,'.0 /26'],['Operaciones',64,0,'.64 /26'],['CallCenter',32,0,'.128 /27'],['Sistemas',16,0,'.160 /28'],['WAN',4,0,'.176 /30'],['Libre',76,0,'sobra']],'El /24 del taller repartido'),p4:()=>tab(['VLAN Name      Status    Ports','2    Ventas    active    Fa0/1 a Fa0/15','5    Sistemas  active    Fa0/16 a Fa0/23'],[1,2],'Resumen de lo que debes ver con show vlan brief'),p5:()=>net([['p','VLAN 2'],['s','SW1'],['r','R1']],[['d','acceso'],['t','troncal 2,5']],'Acceso hacia el PC, troncal hacia el router'),p6:()=>roas([['Fa0/0.2',2,'192.168.1.62 /26'],['Fa0/0.5',5,'192.168.1.174 /28']],[],'Cada VLAN con su gateway'),p7:()=>net([['r','R1 DCE','.177'],['r','R2 DTE','.178']],[['s','clock rate solo en R1']],'192.168.1.176 /30'),p8:()=>net([['s','Ventas'],['r','R1','.177'],['r','R2','.178'],['s','Operaciones']],[['d',''],['s','ida por .178, vuelta por .177'],['d','']],'Cada router necesita saber volver'),p9:()=>seq(['r','R1'],['r','R2'],[[1,'conozco 192.168.50.128 y 10.10.92.0'],[-1,'conozco 192.168.150.0 y 192.168.200.192','good']],'Los routers se cuentan sus redes'),p10:()=>calc(['1. PC a|gateway','2. PC a otra|VLAN','3. Router a|router','4. PC a PC|remoto'],'Prueba de lo cercano a lo lejano'),p11:()=>calc(['Cable','VLAN y|troncal','IP y|máscara','Rutas'],'Busca de abajo hacia arriba'),p12:()=>calc(['Lee','Escribe','Corrige','Repite'],'La memoria se entrena escribiendo'),p13:()=>hops(['R1','R2','R3'],'RIP entre R1 y R2, estático con R3')};
return{f,p,q,LV}})();
const vis=(b,n)=>'<h4 class="vt">Míralo</h4>'+VM[b][n]();
const TEORIA=[
{id:'t1',title:'Qué es una red y qué son las capas',goal:'Entender cómo viaja un mensaje y qué hace cada capa.',html:`
<div class="idea"><b>Imagínalo así.</b> Envías una carta. Tú escribes el mensaje, lo metes en un sobre, el correo lo mete en una bolsa y un camión lo lleva. Nadie del camión lee tu carta. Cada uno hace solo su trabajo.</div>
<p>Una <b>red</b> es un grupo de equipos autónomos conectados para compartir información. Como es un problema grande, se divide en <b>capas</b>. Cada capa le da un servicio a la de arriba.</p>
<table><tr><th>N.º</th><th>Capa OSI</th><th>Qué hace</th><th>Su unidad</th></tr><tr><td>7</td><td>Aplicación</td><td>Servicios al usuario: web, correo, FTP</td><td>Datos</td></tr><tr><td>6</td><td>Presentación</td><td>Formato, cifrado y compresión</td><td>Datos</td></tr><tr><td>5</td><td>Sesión</td><td>Diálogo, turnos y puntos de sincronismo</td><td>Datos</td></tr><tr><td>4</td><td>Transporte</td><td>De programa a programa: TCP y UDP</td><td>Segmento</td></tr><tr><td>3</td><td>Red</td><td>Direcciones IP y elegir la ruta</td><td>Paquete</td></tr><tr><td>2</td><td>Enlace</td><td>Entregar al equipo vecino con direcciones MAC</td><td>Trama</td></tr><tr><td>1</td><td>Física</td><td>Bits por el cable, voltajes, conectores</td><td>Bits</td></tr></table>
<h3>Encapsulamiento</h3><p>Al bajar, cada capa agrega su encabezado: los datos entran en un segmento, el segmento en un paquete y el paquete en una trama. Al llegar se quitan en orden contrario.</p>
<p><b>TCP</b> es orientado a conexión: confirma que llegó. <b>UDP</b> no: envía y ya. TCP/IP une las capas 5, 6 y 7 en una sola.</p>
<h3>Conmutación y multiplexación</h3><ul><li><b>Circuitos:</b> se reserva un camino durante el establecimiento y la transferencia.</li><li><b>Paquetes:</b> no se reserva nada. Cada nodo guarda y reenvía.</li><li><b>FDM</b> reparte por frecuencia, <b>TDM</b> por turnos de tiempo y <b>WDM</b> por color de luz en la fibra.</li></ul>
<div class="ej"><b>Ejemplo TDM.</b> 10 servicios y turnos de 15 ms. Después de tu turno hablan los otros 9: esperas 9 × 15 = 135 ms.</div>
<div class="err"><b>Error común.</b> Poner la MAC en el paquete. La IP va en el paquete y la MAC en la trama.</div>`,
ck:[['¿En qué unidad va la dirección MAC?',['Paquete','Trama','Segmento'],1,'La MAC es de la capa de enlace, cuya unidad es la trama.'],['¿Qué capa maneja turnos y puntos de sincronismo?',['Transporte','Sesión','Presentación'],1,'La capa de sesión controla el diálogo.']],f:[],p:[],all1:true},
{id:'t2',title:'Cables, fibra y conexiones físicas',goal:'Saber qué cable va entre cada par de equipos.',html:`
<div class="idea"><b>Imagínalo así.</b> Dos personas hablando por tubos: la boca de una debe dar al oído de la otra. Si ambas tienen la boca del mismo lado, hay que cruzar los tubos.</div>
<p>Los PC y los routers transmiten por los mismos hilos. Los switches lo hacen por los contrarios. Por eso:</p>
<table><tr><th>Conexión</th><th>Cable UTP</th></tr><tr><td>PC con switch</td><td>Directo</td></tr><tr><td>Switch con router</td><td>Directo</td></tr><tr><td>Switch con switch</td><td>Cruzado</td></tr><tr><td>PC con PC, router con router, PC con router</td><td>Cruzado</td></tr><tr><td>Router con router por WAN</td><td>Serial (DCE y DTE)</td></tr></table>
<p>En Packet Tracer la línea continua es directo y la discontinua es cruzado.</p>
<h3>Cobre y fibra</h3><ul><li>UTP Cat 5e llega a 1000 Mbps y 100 m. En cableado horizontal son 90 m más cordones.</li><li><b>Monomodo:</b> núcleo de unos 9 µm, larga distancia, suele ser amarilla.</li><li><b>Multimodo:</b> núcleo de 50 o 62,5 µm, distancia corta, suele ser naranja.</li><li>Conector SC: cuadrado. LC: pequeño. ST: bayoneta. FC: rosca.</li><li>Cascada: unir switches por puertos normales. Stacking: con cables especiales de apilamiento.</li></ul>
<div class="ej"><b>Ejemplo.</b> PC — switch — router — router: 1 directo, 2 directo, 3 cruzado.</div>
<div class="err"><b>Error común.</b> Revisar las IP cuando el cable está mal. Primero se revisa la capa física.</div>`,
ck:[['¿Qué cable une dos switches 2950?',['Directo','Cruzado','Serial'],1,'Son equipos del mismo tipo.'],['¿Qué fibra usas para 100 km?',['Monomodo','Multimodo'],0,'Tiene baja atenuación y no sufre dispersión modal.']],f:[24],p:[3,7,12,13,25,26,31,35,41,45,47]},
{id:'t3',title:'El switch, la MAC y la trama',goal:'Predecir por qué puerto sale una trama.',html:`
<div class="idea"><b>Imagínalo así.</b> El switch es un portero nuevo. Cuando alguien entra, anota su cara y su puerta. Si no sabe dónde vive alguien, pregunta en todas las puertas menos en la de quien llama.</div>
<p>La <b>MAC</b> es la dirección de fábrica de la tarjeta: 6 bytes en hexadecimal, de 0 a 9 y de A a F. Si ves una H, no es válida.</p>
<h3>Qué hace el switch</h3><ol><li>Aprende: guarda la <b>MAC de origen</b> y el puerto por donde entró.</li><li>Busca la <b>MAC de destino</b>.</li><li>Si la conoce, envía solo por ese puerto.</li><li>Si no la conoce, o es broadcast, <b>inunda</b>: todos los puertos menos el de entrada.</li></ol>
<h3>Trama Ethernet, en orden</h3><table><tr><th>Preámbulo</th><th>SFD</th><th>MAC destino</th><th>MAC origen</th><th>Tipo</th><th>Datos</th><th>CRC</th></tr><tr><td>7</td><td>1</td><td>6</td><td>6</td><td>2</td><td>46–1500</td><td>4 bytes</td></tr></table>
<p>Broadcast es FF-FF-FF-FF-FF-FF. Multicast IPv4 empieza por 01-00-5E.</p>
<div class="ej"><b>Ejemplo del parcial.</b> PC1 está en el puerto 4 y envía a PC3, que no está en la tabla. El switch reenvía por 1, 2 y 3: todos menos el 4.</div>
<div class="err"><b>Error común.</b> Creer que descarta lo que no conoce. Lo inunda.</div>`,
ck:[['MAC de destino desconocida. ¿Qué hace el switch?',['Descarta','Inunda todos menos el de entrada','Inunda todos'],1,'Nunca devuelve la trama por donde llegó.'],['¿Qué MAC aprende?',['La de origen','La de destino'],0,'La de origen le dice quién está en ese puerto.']],f:[28],p:[30,32,52]},
{id:'t4',title:'Errores, control de flujo y acceso al medio',goal:'Distinguir LLC de MAC y calcular un CRC.',html:`
<div class="idea"><b>Imagínalo así.</b> Dictas un número y al final dices la suma. Si la otra persona suma distinto, sabe que oyó mal. Y si escribe lento, te pide que esperes.</div>
<p>La capa de enlace tiene dos partes. <b>LLC:</b> servicio a la capa de red, entramado, control de errores y control de flujo. <b>MAC:</b> decide quién usa el medio.</p>
<h3>Control de flujo</h3><p>Protege el buffer del <b>receptor</b>. <b>Parada y espera:</b> una trama y esperas el ACK. <b>Ventana deslizante:</b> varias tramas antes del ACK.</p>
<h3>CRC paso a paso</h3><p>El CRC tiene tantos bits como el <b>grado</b> del polinomio. Ethernet usa 32. Datos 10110, generador 110 (grado 2):</p><ol><li>Agrega 2 ceros: 1011000.</li><li>Divide entre 110 con XOR: iguales da 0, distintos da 1.</li><li>El resto es 10.</li><li>Transmites 10110 + 10 = <b>1011010</b>.</li></ol>
<h3>Ráfaga de error</h3><p>Bits dañados = velocidad × tiempo. 100 Mbps × 800 ns = 80 bits = 10 bytes.</p>
<h3>Acceso al medio</h3><ul><li>Estático: FDM, TDM, WDM.</li><li>Dinámico: ALOHA, CSMA, CSMA/CD. <b>Portadora</b> es escuchar el canal antes de hablar.</li><li>Las WAN punto a punto no compiten por el medio.</li></ul>
<div class="err"><b>Error común.</b> Decir que el control de flujo cuida al transmisor. Cuida al receptor.</div>`,
ck:[['¿Qué NO hace LLC?',['Control de flujo','Control de acceso al medio','Entramado'],1,'El acceso al medio es de la subcapa MAC.'],['Un polinomio de grado 16 genera…',['8 bits','16 bits','32 bits'],1,'Los bits redundantes son iguales al grado.']],f:[],p:[0,4,9,11,14,27,28,29,34,38,53,54,55].filter(x=>x!=4)},
{id:'t5',title:'La dirección IP y la máscara',goal:'Leer una IP y pasar de /n a decimal.',html:`
<div class="idea"><b>Imagínalo así.</b> La IP es como calle y número de casa. La máscara dice hasta dónde llega el nombre de la calle y dónde empieza el número.</div>
<p>Una IP tiene 32 bits, en 4 grupos de 8 (octetos). Cada octeto va de 0 a 255, así que 275 no existe.</p>
<h3>De binario a decimal</h3><p>Cada posición vale: <b>128, 64, 32, 16, 8, 4, 2, 1</b>. Suma donde hay un 1.</p><div class="ej"><b>Ejemplo.</b> 11000000 = 128 + 64 = 192.</div>
<h3>La máscara</h3><p>/n son n unos seguidos. Los unos marcan la red y los ceros el host.</p><table><tr><th>Unos en el octeto</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th></tr><tr><td>Vale</td><td>128</td><td>192</td><td>224</td><td>240</td><td>248</td><td>252</td><td>254</td><td>255</td></tr></table>
<div class="ej"><b>Ejemplo.</b> /25 = 8 + 8 + 8 + 1: 255.255.255.<b>128</b>. Y /21 = 8 + 8 + 5: 255.255.<b>248</b>.0.</div>
<div class="err"><b>Error común.</b> Confundir /21 con /22. Cuenta siempre los unos que sobran después de 16 o 24.</div>`,
ck:[['/26 en decimal es…',['255.255.255.128','255.255.255.192','255.255.255.224'],1,'24 + 2 unos: 128 + 64 = 192.'],['/16 es…',['255.255.0.0','255.0.0.0'],0,'Dos octetos completos en 1.']],f:[25],p:[8,19]},
{id:'t6',title:'Red, primer host, último host y broadcast',goal:'Sacar el rango de cualquier subred.',html:`
<div class="idea"><b>Imagínalo así.</b> Una calle con casas numeradas. El primer número es el nombre de la calle y el último es el megáfono para hablarles a todas. Nadie vive en esos dos.</div>
<h3>Receta</h3><ol><li>Mira el octeto donde la máscara no es 255 ni 0.</li><li>Bloque = 256 − ese número.</li><li>Red: el múltiplo del bloque que no pasa de tu IP.</li><li>Broadcast: la siguiente red menos 1.</li><li>Primer host: red + 1. Último host: broadcast − 1.</li></ol>
<div class="ej"><b>Ejemplo 1.</b> 192.168.1.85 /27. Máscara .224, bloque 32. Múltiplos: 0, 32, <b>64</b>, 96. Red .64, primero .65, último .94, broadcast .95.</div>
<div class="ej"><b>Ejemplo 2.</b> 10.10.93.254 /23. Máscara 255.255.254.0, bloque 2 en el tercer octeto. Red 10.10.<b>92</b>.0, broadcast 10.10.<b>93</b>.255. Por eso 10.10.93.254 y 10.10.92.1 son de la misma red.</div>
<p>Hosts útiles = 2<sup>bits de host</sup> − 2. Dos equipos se hablan sin router solo si están en la misma red, con la misma máscara.</p>
<div class="err"><b>Error común.</b> Creer que .255 siempre es broadcast. En 10.0.0.0/16, 10.0.0.255 es un host normal.</div>`,
ck:[['Red de 192.168.1.22 /28',['192.168.1.0','192.168.1.16','192.168.1.20'],1,'Bloque 16: múltiplos 0, 16, 32.'],['Broadcast de 172.30.40.0 /22',['172.30.40.255','172.30.43.255','172.30.44.0'],1,'Bloque 4 en el tercer octeto: la siguiente red es 44.0.']],f:[26],p:[1,5,15,20,23,40,42,43,50]},
{id:'r3',title:'Subnetting como lo enseña el profesor',goal:'Calcular subredes con bits robados, 2^k − 2 y el método del delta.',html:`
<div class="idea"><b>Imagínalo así.</b> Tienes un edificio (la red) y quieres dividirlo en apartamentos (subredes). Le quitas bits a la parte de host, es decir, "robas" bits, y con ellos numeras los apartamentos. Cuantos más bits robas, más apartamentos, pero más pequeños.</div>
<p><b>RFC 950:</b> las subredes son redes dentro de una red, creadas al dividir el campo de host. Ventajas: más flexibilidad, mejor uso de las direcciones, más organización y control, y dominios de broadcast más pequeños.</p>
<h3>Bits robados y fórmulas</h3>
<ul><li>Los bits robados (<b>k</b>) forman un <b>campo de subred</b> entre la red y el host, y crean una máscara nueva.</li><li>Subredes utilizables = <b>2<sup>k</sup> − 2</b>.</li><li>Hosts por subred = <b>2<sup>h</sup> − 2</b>, donde h son los bits de host que quedan.</li><li>Una clase C admite robar de 2 a 6 bits y una clase B de 2 a 14.</li></ul>
<p>¿Por qué el −2 en las subredes? Con el criterio clásico del profesor, la subred de puros ceros y la de puros unos <b>no se usan</b>. Por eso dice que 255.255.255.0 sobre una clase B da 254 subredes y no 256.</p>
<div class="err"><b>Ojo con el criterio.</b> Si la pregunta dice "subredes <b>utilizables</b>", usa 2<sup>k</sup> − 2, que es como lo enseña el profesor. En VLSM la diapositiva dice que el total es 2<sup>n</sup>, porque ahí sí se usan todas. El examen final de 2025 no mostraba clave en la de las 4 subredes y por eso tu guía acepta las dos.</div>
<h3>Ejemplo clase C: 192.168.1.0 /24 con 6 subredes</h3>
<p>2<sup>k</sup> − 2 ≥ 6, así que k = 3. Máscara /27 = 255.255.255.224. Los ID de subred van de 32 en 32: 0, 32, 64, 96, 128, 160, 192, 224. Sin la primera (0) ni la última (224) quedan 6 utilizables, de 32 a 192, cada una con 30 hosts.</p>
<h3>El método del delta</h3>
<ol><li>Mira los bits de host de la máscara y pásalos a decimal: ese es el <b>delta</b> (el tamaño del bloque).</li><li>Primer ID de subred = la red original + delta.</li><li>Los siguientes: suma el delta una y otra vez.</li></ol>
<div class="ej"><b>Ejemplo del profesor.</b> 200.100.50.0 con 255.255.255.224. La máscara termina en 11100000, delta = 100000 = 32. Subredes: 200.100.50.32, .64, .96, .128, .160 y .192.</div>
<h3>Separar red, subred y host</h3>
<div class="ej"><b>200.40.96.175 /27 (255.255.255.224).</b> Es clase C, así que la red es <b>200.40.96.0</b>. 175 en bloques de 32 cae en 160, así que la subred es <b>0.0.0.160</b> y el host es 175 − 160 = <b>0.0.0.15</b>.</div>
<div class="ej"><b>172.20.100.45 /21 (255.255.248.0).</b> Es clase B, así que la red es <b>172.20.0.0</b>. En el tercer octeto el bloque es 8 y 100 cae en 96, así que la subred es <b>0.0.96.0</b>. El host es lo que sobra: 100 − 96 = 4, así que <b>0.0.4.45</b>.</div>
<h3>Ejemplo clase B: 180.10.0.0 /16 con 120 subredes</h3>
<p>2<sup>k</sup> − 2 ≥ 120, así que k = 7. Máscara /23 = 255.255.254.0. Los ID van de 2 en 2 en el tercer octeto, de 2 a 252, sin contar el 0 ni el 254.</p>
<table><tr><th>Primera subred utilizable</th><th>Valor</th></tr><tr><td>Dirección de subred</td><td>180.10.2.0</td></tr><tr><td>Primera dirección</td><td>180.10.2.1</td></tr><tr><td>Última dirección</td><td>180.10.3.254</td></tr><tr><td>Broadcast</td><td>180.10.3.255</td></tr><tr><td>Máscara</td><td>255.255.254.0</td></tr></table>
<div class="ej"><b>Test de la diapositiva.</b> En 180.10.2.0 /23 son válidas para host: <b>180.10.2.255</b>, <b>180.10.3.0</b> y <b>180.10.3.1</b>, todas con 255.255.254.0. Las que traen 255.255.255.0 tienen la máscara errada, y 180.10.3.255 es el broadcast.</div>
<h3>El ejercicio de la última diapositiva</h3>
<p>223.85.14.13 con 255.255.255.248, o sea /29. Es clase C, así que se robaron 5 bits y quedan 3 de host.</p>
<table><tr><th>Pregunta</th><th>Respuesta</th></tr><tr><td>Subredes utilizables</td><td>2<sup>5</sup> − 2 = <b>30</b></td></tr><tr><td>Hosts por subred</td><td>2<sup>3</sup> − 2 = <b>6</b></td></tr><tr><td>Subred de esta IP</td><td>Bloques de 8: 13 cae en 8, así que <b>223.85.14.8</b></td></tr><tr><td>Número de esa subred</td><td>8 ÷ 8 = <b>subred utilizable 1</b></td></tr><tr><td>Subred utilizable 25</td><td>25 × 8 = 200, así que <b>223.85.14.200</b></td></tr><tr><td>Broadcast de la subred 13</td><td>13 × 8 = 104 y su broadcast es 104 + 7, así que <b>223.85.14.111</b></td></tr></table>`,
ck:[['Bits robados para 6 subredes utilizables en una clase C',['2','3','4'],1,'2³ − 2 = 6.'],['Delta de 255.255.255.224',['16','32','64'],1,'Quedan 5 bits de host: 2⁵ = 32.'],['Subred de 200.40.96.175 /27',['0.0.0.128','0.0.0.160','0.0.0.175'],1,'175 cae en el bloque que empieza en 160.'],['¿180.10.3.0 /23 es válida para un host?',['Sí','No'],0,'La red es 180.10.2.0 y llega hasta 180.10.3.255.'],['Hosts por subred con /29',['6','8','30'],0,'2³ − 2.']],f:[],p:[]},
{id:'t7',title:'Clases, IP privadas y CIDR',goal:'Clasificar una IP en segundos.',html:`
<div class="idea"><b>Imagínalo así.</b> Las IP privadas son como las extensiones de una oficina: sirven adentro, y la misma extensión existe en otras oficinas. Las públicas son números de teléfono únicos.</div>
<table><tr><th>Clase</th><th>Primer octeto</th><th>Máscara por defecto</th><th>Privadas (RFC 1918)</th></tr><tr><td>A</td><td>1–126</td><td>/8</td><td>10.0.0.0 a 10.255.255.255</td></tr><tr><td>B</td><td>128–191</td><td>/16</td><td>172.16.0.0 a 172.31.255.255</td></tr><tr><td>C</td><td>192–223</td><td>/24</td><td>192.168.0.0 a 192.168.255.255</td></tr><tr><td>D</td><td>224–239</td><td colspan="2">Multicast</td></tr><tr><td>E</td><td>240–255</td><td colspan="2">Reservada</td></tr></table>
<p>127.x.x.x es loopback. <b>RFC 1519 (CIDR)</b> permite usar una máscara distinta a la de la clase.</p>
<h3>Pregunta típica: ¿cumple RFC 1918 y 1519?</h3><ol><li>¿Es privada?</li><li>¿La máscara es diferente a la de su clase?</li><li>Si piden una subred, ¿los bits de host están en 0?</li></ol>
<div class="ej"><b>Ejemplo.</b> 172.17.255.254 /24: privada y clase B con /24. Cumple. 192.168.100.100 /24: privada, pero es la máscara de su clase. No cumple la 1519.</div>
<div class="err"><b>Error común.</b> Leer rápido: 192.<b>186</b> y 172.<b>32</b> son públicas.</div>`,
ck:[['¿Cuál es privada?',['172.32.0.1','172.31.254.255','192.186.4.5'],1,'El rango llega hasta 172.31.255.255.'],['¿Cuál usa CIDR?',['10.3.4.100 /16','8.4.3.10 /8'],0,'Es clase A con /16 en lugar de /8.']],f:[],p:[2,4,6,10,18,33,37,39,46,48,49,51,56,57]},
{id:'t8',title:'VLSM desde cero',goal:'Repartir una red en subredes de distinto tamaño.',html:`
<div class="idea"><b>Imagínalo así.</b> Partes una torta para grupos de distinto tamaño. Primero cortas el pedazo grande. Si empiezas por los pequeños, el grande ya no cabe.</div>
<h3>Los 5 pasos</h3><ol><li>Ordena de mayor a menor. Un enlace entre routers necesita 2 hosts.</li><li>Busca n con 2<sup>n</sup> − 2 ≥ hosts.</li><li>Prefijo = 32 − n.</li><li>Empieza en la red base.</li><li>La siguiente red = red anterior + 2<sup>n</sup>.</li></ol>
<table><tr><th>Hosts hasta</th><th>2</th><th>6</th><th>14</th><th>30</th><th>62</th><th>126</th><th>254</th><th>510</th><th>1022</th><th>2046</th><th>4094</th></tr><tr><td>Prefijo</td><td>/30</td><td>/29</td><td>/28</td><td>/27</td><td>/26</td><td>/25</td><td>/24</td><td>/23</td><td>/22</td><td>/21</td><td>/20</td></tr></table>
<div class="ej"><b>Ejemplo del parcial.</b> 10.31.0.0 /19. Brasil 4000: /20, 10.31.0.0. Argentina 2000: <b>/21</b>, 10.31.16.0. Colombia 1000: <b>/22</b>, 10.31.24.0. Paraguay 500: /23, 10.31.28.0.</div>
<div class="err"><b>Error común.</b> Olvidar el −2. Para 128 hosts no alcanza /25, que da 126.</div><h3>Practica hasta no fallar</h3><div data-w="vlsm"></div>`,
ck:[['60 hosts necesitan…',['/27','/26','/25'],1,'2⁶ − 2 = 62.'],['Segunda subred de 192.168.1.0/24 partida en 4',['192.168.1.64 /26','192.168.1.128 /26'],0,'Bloques de 64: .0, .64, .128, .192.']],f:[0,12,15,17,27],p:[21,24,44]},
{id:'r2',title:'El paquete IP, la MTU y la fragmentación',goal:'Conocer los campos del paquete IP y por qué se fragmenta.',html:`
<div class="idea"><b>Imagínalo así.</b> El paquete IP es un sobre. Por fuera lleva remitente, destinatario y unas casillas de control. Si el sobre no cabe por la ranura de un buzón (la MTU), se parte en varios sobres numerados y se vuelven a juntar al llegar.</div>
<p>IP es el protocolo principal de la capa 3. Según el profesor tiene dos responsabilidades:</p>
<ol><li>Entregar datagramas <b>sin conexión</b> y con el <b>mejor esfuerzo</b>: no garantiza que lleguen ni en orden.</li><li><b>Fragmentar y reensamblar</b> para pasar por enlaces con MTU distintas.</li></ol>
<h3>Los campos del encabezado</h3>
<table><tr><th>Campo</th><th>Para qué sirve</th></tr><tr><td>Versión</td><td>4 en IPv4</td></tr><tr><td>IHL</td><td>Largo del encabezado. Mínimo 20 bytes</td></tr><tr><td>Tipo de servicio</td><td>Prioridad y cómo tratar el paquete</td></tr><tr><td>Longitud total</td><td>Encabezado más datos</td></tr><tr><td>Identificación</td><td>Todos los fragmentos de un mismo paquete llevan el mismo número</td></tr><tr><td>Banderas</td><td>No fragmentar (DF) y más fragmentos (MF)</td></tr><tr><td>Desplazamiento del fragmento</td><td>Dónde va este trozo dentro del original, en bloques de 8 bytes</td></tr><tr><td>Tiempo de vida (TTL)</td><td>Baja 1 en cada router. Si llega a 0 el paquete se descarta, así nada da vueltas para siempre</td></tr><tr><td>Protocolo</td><td>A quién entregar los datos arriba: TCP, UDP o ICMP</td></tr><tr><td>Suma de verificación del encabezado</td><td>Detecta errores solo en el encabezado</td></tr><tr><td>IP origen y destino</td><td>32 bits cada una</td></tr><tr><td>Opciones y relleno</td><td>Opcionales. El relleno completa múltiplos de 32 bits</td></tr></table>
<p><b>Tipo de servicio</b> según la diapositiva: 3 bits de <b>prioridad</b> y los bits <b>D</b> (pide retardo bajo), <b>T</b> (pide alto rendimiento) y <b>R</b> (pide alta confiabilidad). El último bit no se usa.</p>
<h3>Encapsulación</h3>
<p>El mensaje (datos) baja a transporte y se vuelve <b>segmento</b>. En red se le pone el encabezado IP y se vuelve <b>paquete</b>. En enlace se envuelve en una <b>trama</b> con encabezado y cola, y en física sale como <b>bits</b>.</p>
<h3>MTU y fragmentación</h3>
<p>La <b>MTU</b> (unidad máxima de transferencia) es el paquete más grande que cabe en una trama de esa red. En Ethernet es 1500 bytes.</p>
<p>En el ejemplo del profesor, la Red 1 y la Red 3 tienen MTU 1500 y la Red 2 en medio solo 620. Un paquete de 1500 no cabe por la Red 2, así que el router lo <b>fragmenta</b>:</p>
<ul><li>Cada fragmento lleva su propio encabezado IP y la <b>misma identificación</b>.</li><li>Todos menos el último llevan la bandera <b>MF = 1</b>.</li><li>El <b>desplazamiento</b> indica su posición en bloques de 8 bytes.</li><li>El <b>destino final</b> los reensambla, no el router siguiente.</li></ul>
<div class="ej"><b>Ejemplo.</b> Paquete de 1500 bytes: 20 de encabezado y 1480 de datos. Por la MTU 620 caben 600 bytes de datos por fragmento, que es múltiplo de 8. Quedan tres fragmentos con 600, 600 y 280 bytes de datos, y desplazamientos 0, 75 y 150 (600 ÷ 8 = 75).</div>
<div class="err"><b>Error común.</b> Pensar que el TTL es un tiempo en segundos. En la práctica es un contador de saltos: cada router le resta 1.</div>`,
ck:[['Campo que evita que un paquete dé vueltas eternamente',['Protocolo','TTL','Identificación'],1,'Cada router le resta 1 y en 0 se descarta.'],['¿Quién reensambla los fragmentos?',['El siguiente router','El destino final'],1,'Los routers solo fragmentan.'],['Los fragmentos de un mismo paquete comparten…',['La identificación','El desplazamiento'],0,'El desplazamiento cambia en cada uno.'],['IP ofrece una entrega…',['Con conexión y confirmada','Sin conexión, de mejor esfuerzo'],1,'La confiabilidad la pone TCP.'],['MTU típica de Ethernet',['620','1500','64'],1,'1500 bytes.']],f:[],p:[]},
{id:'t9',title:'ARP y la puerta de enlace',goal:'Saber qué MAC recibe el PC.',html:`
<div class="idea"><b>Imagínalo así.</b> Sabes el nombre de alguien (IP), pero necesitas su cara (MAC) para entregarle el paquete. Gritas: ¿quién es 10.0.0.1? Y esa persona responde.</div>
<p><b>ARP</b> averigua la MAC a partir de una IP de tu red. La pregunta es broadcast y la respuesta unicast. El broadcast no cruza routers.</p>
<h3>Qué hace un PC antes de enviar</h3><ol><li>Compara con su máscara si el destino está en su red.</li><li>Si está, hace ARP por el destino.</li><li>Si no, hace ARP por su <b>gateway</b>, que es el router.</li></ol>
<div class="ej"><b>Ejemplo del parcial.</b> PC1 y File_server1 están en redes distintas. PC1 recibe la MAC de <b>G0/0 de R1</b>.</div>
<p><code>arp -a</code> muestra IP y MAC. No muestra máscaras: para eso es <code>ipconfig</code>.</p>
<div class="err"><b>Error común.</b> Esperar la MAC del servidor remoto. Nunca sale de su red.</div><h3>Míralo salto a salto</h3><div data-w="net"></div>`,
ck:[['Destino en otra red: ARP por…',['El destino','El gateway'],1,'El ARP no atraviesa routers.'],['¿arp -a muestra la máscara?',['Sí','No'],1,'Solo IP, MAC y tipo.']],f:[19],p:[58,59]},
{id:'t10',title:'DHCP e ipconfig',goal:'Entender cómo un PC recibe su IP.',html:`
<div class="idea"><b>Imagínalo así.</b> Llegas a un hotel y pides habitación. Te ofrecen una, la aceptas y te dan la llave por unos días.</div>
<ol><li><b>Discover:</b> el PC busca servidores. Origen 0.0.0.0, destino 255.255.255.255.</li><li><b>Offer:</b> el servidor ofrece una IP.</li><li><b>Request:</b> el PC la pide.</li><li><b>ACK:</b> el servidor confirma.</li></ol><p>El servidor identifica al PC por su MAC (CHADDR). Para recuperar una IP anterior al reiniciar, el Request va por broadcast. Para renovar una vigente, por unicast.</p>
<h3>Leer ipconfig /all</h3><ul><li>DHCP habilitado: sí. Entonces es <b>dinámica</b>.</li><li>“Preferido” es solo el estado.</li><li>Puerta de enlace = router.</li><li>La máscara de los DNS no aparece.</li></ul>
<div class="ej"><b>Ejemplo.</b> Servidor en 192.168.1.1 /24: el pool puede empezar en 192.168.1.2.</div>`,
ck:[['Origen del DHCPDISCOVER',['0.0.0.0','255.255.255.255','192.168.1.1'],0,'El PC aún no tiene IP.']],f:[16],p:[16,17,36]},
{id:'r1',title:'La capa de red: diseño, funciones y algoritmos',goal:'Saber qué hace la capa 3 y cómo se elige una ruta.',html:`
<div class="idea"><b>Imagínalo así.</b> La capa física mueve bits por un cable y la de enlace lleva tramas al vecino. La capa de red es el servicio de correos: pone la dirección lógica (IP) en cada paquete y decide por qué camino mandarlo hasta otra red.</div>
<p>La capa de red es la <b>capa 3</b> del modelo OSI, encima de enlace y física. Su unidad de datos es el <b>paquete</b> y su equipo típico es el <b>router</b>.</p>
<h3>Funciones de la capa de red</h3>
<ol><li>Darle servicios a la capa de transporte.</li><li><b>Direccionamiento lógico</b> (las direcciones IP).</li><li><b>Enrutamiento</b> de paquetes: elegir el camino.</li><li><b>Control de congestión</b>.</li><li><b>Interconexión de redes</b> distintas.</li></ol>
<h3>Aspectos de diseño</h3>
<p><b>Conmutación de paquetes de almacenamiento y reenvío.</b> El router recibe el paquete <b>completo</b>, lo guarda, revisa que llegó bien y luego lo reenvía al siguiente router. Así salta de router en router hasta el destino.</p>
<p>La capa de red puede ofrecer dos tipos de servicio a la capa de transporte:</p>
<table><tr><th></th><th>No orientado a la conexión (datagramas)</th><th>Orientado a la conexión (circuitos virtuales)</th></tr><tr><td>Antes de enviar</td><td>No se establece nada</td><td>Se establece la ruta (el circuito)</td></tr><tr><td>Dirección en cada paquete</td><td>Origen y destino completos</td><td>Un número corto de circuito virtual</td></tr><tr><td>Camino</td><td>Cada paquete se enruta solo y puede ir por otro lado</td><td>Todos siguen el mismo camino</td></tr><tr><td>El router guarda estado</td><td>No</td><td>Sí, de cada circuito</td></tr><tr><td>Si se cae un router</td><td>Solo se pierden los paquetes que tenía</td><td>Se caen todos los circuitos que pasaban por él</td></tr><tr><td>Calidad de servicio y congestión</td><td>Más difícil de controlar</td><td>Más fácil, se reservan recursos</td></tr><tr><td>Ejemplo</td><td>IP, Internet</td><td>ATM, MPLS</td></tr></table>
<h3>Algoritmos de enrutamiento</h3>
<p>Responden a dos preguntas: ¿qué ruta usamos? y ¿cuál es la mejor?</p>
<ul><li><b>No adaptativos</b> (estáticos): la ruta se calcula de antemano y no cambia sola. Ejemplo: las rutas estáticas.</li><li><b>Adaptativos</b> (dinámicos): cambian la ruta si cambia la topología o el tráfico. Ejemplo: RIP y OSPF.</li></ul>
<p><b>Principio de optimización.</b> Si el router J está en la ruta óptima de M a B, la ruta óptima de J a B es ese mismo tramo. Por eso todas las rutas óptimas hacia un destino forman un árbol: el <b>árbol sumidero</b>.</p>
<p><b>Ruta más corta.</b> La red se dibuja como un grafo: los nodos son routers y cada enlace tiene un peso (distancia, retardo o costo). El algoritmo de <b>Dijkstra</b> marca cada nodo con (distancia, nodo anterior), empieza en el origen, toma siempre el nodo tentativo de menor distancia, lo vuelve permanente y sigue hasta llegar al destino. Es el que usa OSPF.</p>
<p><b>Inundación.</b> Cada paquete se reenvía por <b>todas</b> las líneas menos por la que llegó. Siempre encuentra el camino y es muy robusto, pero genera muchísimos duplicados. Se controla con un contador de saltos o un número de secuencia. Los protocolos de estado de enlace la usan para repartir sus LSP.</p>
<p>Otros que nombra el profesor: estado de enlace, <b>jerárquico</b> (la red se divide en regiones, como las áreas de OSPF), por <b>difusión</b> (a todos), por <b>multidifusión</b> (a un grupo), para hosts móviles y en redes ad hoc.</p>
<h3>Congestión, fluctuación y calidad del servicio</h3>
<p><b>Congestión:</b> cuando hay demasiados paquetes, el desempeño cae en picada. En la gráfica de la diapositiva, la línea perfecta sube hasta la capacidad máxima, la deseable se acerca y la congestionada se desploma.</p>
<p>Principios de control: <b>monitorear</b> el sistema para detectar cuándo y dónde hay congestión, <b>pasar esa información</b> a quien pueda actuar y <b>ajustar</b> la operación para corregirla.</p>
<p><b>Fluctuación o jitter:</b> la variación en el retardo de los paquetes. Para voz y video importa más que el retardo mismo.</p>
<p><b>Calidad del servicio (QoS):</b> asegurar a cada flujo lo que necesita en confiabilidad, retardo, jitter y ancho de banda. Incluye la <b>convergencia</b> (voz, video y datos en la misma red), los <b>servicios diferenciados</b> (clases de prioridad) y la <b>conmutación de etiquetas MPLS</b>.</p>
<h3>Protocolos de comunicaciones</h3>
<ul><li>Se diseñan por capas y pueden ser propietarios o abiertos.</li><li><b>Orientados a la conexión:</b> entregan de X a Y por una ruta determinada.</li><li><b>Sin conexión:</b> entregan de X a Y por cualquier trayecto disponible.</li><li>Pilas antiguas: <b>IPX/SPX</b> (Novell) y <b>NetBEUI</b> (Microsoft). El estándar hoy es <b>TCP/IP</b>.</li></ul>
<div class="err"><b>Error común.</b> Pensar que IP es orientado a la conexión. IP entrega datagramas sin conexión y con el mejor esfuerzo. Quien asegura la entrega es TCP, en la capa de transporte.</div>`,
ck:[['Un router recibe el paquete completo y luego lo reenvía. Eso es…',['Inundación','Almacenamiento y reenvío','Circuito virtual'],1,'Lo guarda entero, lo revisa y lo reenvía.'],['En datagramas, cada paquete…',['Sigue el mismo camino','Se enruta por su cuenta'],1,'Lleva la dirección completa y puede tomar otra ruta.'],['RIP y OSPF son algoritmos…',['No adaptativos','Adaptativos'],1,'Cambian la ruta cuando cambia la red.'],['Reenviar por todas las líneas menos la de llegada es…',['Inundación','Difusión jerárquica'],0,'Genera duplicados, pero siempre llega.'],['La variación del retardo se llama…',['Congestión','Jitter o fluctuación'],1,'Importa en voz y video.']],f:[],p:[]},
{id:'t11',title:'El router y su tabla',goal:'Elegir la interfaz de salida leyendo show ip route.',html:`
<div class="idea"><b>Imagínalo así.</b> Un cruce con letreros. El router lee el destino, busca el letrero más exacto y toma ese camino. Si no hay letrero, devuelve el carro a la nada.</div>
<pre>C  192.168.1.0/30 is directly connected, Serial0/0/0
R  172.16.0.0/26 [120/1] via 192.168.1.1, Serial0/0/0</pre>
<table><tr><th>Letra</th><th>Origen</th><th>Distancia administrativa</th></tr><tr><td>C / L</td><td>Conectada / IP propia</td><td>0</td></tr><tr><td>S</td><td>Estática</td><td>1</td></tr><tr><td>D</td><td>EIGRP</td><td>90</td></tr><tr><td>O</td><td>OSPF</td><td>110</td></tr><tr><td>R</td><td>RIP</td><td>120</td></tr></table>
<h3>Cómo decide</h3><ol><li>El prefijo más largo que contenga el destino.</li><li>Si empatan, la menor distancia administrativa.</li><li>Luego la menor métrica.</li><li>Si nada coincide y no hay ruta por defecto, descarta.</li></ol><p>Después arma una <b>trama nueva</b>: cambian las MAC, no las IP.</p>
<div class="ej"><b>Ejemplo del parcial.</b> Destino 192.168.1.16, con solo .0/30 y .4/30 en la tabla y sin gateway of last resort: <b>inalcanzable</b>.</div>
<div class="err"><b>Error común.</b> Leer [120/3] al revés. 120 es la distancia administrativa y 3 la métrica.</div>`,
ck:[['En [120/3], la métrica es…',['120','3'],1,'El segundo número es la métrica.'],['Tras decidir la salida, el router…',['Cambia la IP destino','Crea una trama nueva'],1,'Solo cambia la capa 2.']],f:[9,14,20,23,29],p:[22]},
{id:'r4',title:'Cómo reenvía un router los paquetes',goal:'Entender la entrega directa e indirecta y armar tablas de enrutamiento.',html:`
<div class="idea"><b>Imagínalo así.</b> El router es un cruce con letreros. Mira la dirección de destino del paquete, busca en su tabla qué letrero le corresponde y lo manda por esa salida al siguiente cruce.</div>
<p>Un <b>enrutador</b> es un equipo de capa 3 que elige rutas, filtra y prioriza tráfico, habla varios protocolos a la vez y conecta redes de distintos tipos y velocidades. Tiene interfaces de red (Ethernet) y seriales.</p>
<h3>Las dos funciones del enrutamiento</h3>
<ol><li><b>Determinación del camino:</b> elegir el mejor camino según la <b>deseabilidad</b> de cada ruta, que se mide con <b>métricas</b>.</li><li><b>Conmutación del camino:</b> mover el paquete. El origen lo dirige a la MAC del router más cercano con la IP del destino final. El router mira la IP de destino: si no sabe llegar, lo <b>descarta</b>. Si sabe, <b>cambia la MAC de destino</b> por la del siguiente salto y lo envía.</li></ol>
<h3>Métricas</h3>
<p>Las más usadas: <b>longitud del camino</b>, confiabilidad, retardo, ancho de banda, carga y costo. La longitud del camino puede medirse de dos formas:</p>
<ul><li><b>Costo del camino:</b> un valor que el administrador asigna a cada enlace. Se suman los de todo el camino. Así trabaja OSPF.</li><li><b>Cantidad de saltos:</b> cuántos routers atraviesa. Así trabaja RIP.</li></ul>
<h3>Entrega directa e indirecta</h3>
<ul><li><b>Directa:</b> el destino está en la misma red física que el emisor.</li><li><b>Indirecta:</b> está en otra red y el paquete va de router en router hasta uno conectado a la red del destino, que hace la entrega directa final.</li></ul>
<h3>Técnicas de reenvío</h3>
<table><tr><th>Técnica</th><th>Qué guarda la tabla</th></tr><tr><td>Método del camino</td><td>La ruta completa (R1, R2, host B)</td></tr><tr><td><b>Método del siguiente salto</b></td><td>Solo el próximo router (R1). Es el que se usa</td></tr><tr><td>Específico de la estación</td><td>Una fila por cada host (A, B, C, D)</td></tr><tr><td><b>Específico de la red</b></td><td>Una fila por red (N2). Mucho más corta</td></tr><tr><td><b>Por defecto</b></td><td>Una ruta 0.0.0.0 para "cualquier otra red"</td></tr></table>
<p>Con direccionamiento <b>sin clase</b> la tabla necesita al menos <b>cuatro columnas</b>: máscara (/n), dirección de red, siguiente salto e interfaz. El router saca la IP de destino, busca en la tabla y entrega a ARP el siguiente salto y la interfaz.</p>
<p><b>Agregación de direcciones:</b> sin clase la tabla crece y la búsqueda se vuelve lenta, así que varias redes contiguas se resumen en una sola entrada. Si dos entradas coinciden, gana la de <b>prefijo más largo</b>.</p>
<h3>Tabla de enrutamiento</h3>
<p>Asocia cada destino con su siguiente salto y la métrica. Cuando llega un paquete, el router revisa la IP de destino. Si la red no está en la tabla, <b>desecha</b> el paquete. Si está, lo encola en la interfaz que toca y lo envía al siguiente salto. Puede ser <b>estática</b> (entradas manuales) o <b>dinámica</b> (la llena un protocolo).</p>
<h3>Ruta estática</h3>
<pre>Router(config)# ip route RED MÁSCARA {IP-siguiente-salto | interfaz-de-salida}</pre>
<div class="ej"><b>Ejercicio de la diapositiva.</b> R1 tiene 10.1.0.0/16 y 192.168.1.0/24. R2 tiene 172.16.0.0/16 y 192.168.2.0/24. Los une 192.168.254.0/24: R1 es .1 y R2 es .2. Cada router necesita ruta a las dos redes del otro:
<pre>R1(config)# ip route 172.16.0.0 255.255.0.0 192.168.254.2
R1(config)# ip route 192.168.2.0 255.255.255.0 192.168.254.2
R2(config)# ip route 10.1.0.0 255.255.0.0 192.168.254.1
R2(config)# ip route 192.168.1.0 255.255.255.0 192.168.254.1</pre></div>
<h3>Intradominio e interdominio</h3>
<p>Internet es tan grande que se divide en <b>sistemas autónomos (AS)</b>, cada uno con una sola administración. Dentro de un AS se usa enrutamiento <b>intradominio</b>: vector distancia (RIP) o estado de enlace (OSPF). Entre AS se usa <b>interdominio</b>: vector de ruta (BGP).</p>
<p><b>Convergencia:</b> el tiempo que tardan todos los routers en conocer un cambio. Hay protocolos de convergencia rápida y lenta.</p>
<div class="err"><b>Error común.</b> Creer que el router cambia la IP de destino. Cambia la MAC de destino en cada salto. Las IP de origen y destino viajan intactas.</div>`,
ck:[['Destino en la misma red física: entrega…',['Directa','Indirecta'],0,'No hace falta router.'],['Si la red destino no está en la tabla y no hay ruta por defecto…',['Inunda','Descarta el paquete'],1,'Así lo dice la diapositiva.'],['¿Qué cambia el router en cada salto?',['La IP de destino','La MAC de destino'],1,'La IP se mantiene de punta a punta.'],['Columnas mínimas de una tabla sin clase',['2','4'],1,'Máscara, red, siguiente salto e interfaz.'],['Entre sistemas autónomos se usa…',['RIP','OSPF','BGP'],2,'Es interdominio, de vector de ruta.']],f:[],p:[]},
{id:'t12',title:'Rutas estáticas, RIP y estado de enlace',goal:'Comparar las formas de llenar la tabla.',html:`
<div class="idea"><b>Imagínalo así.</b> Estático: tú dibujas el mapa a mano. Vector distancia: le crees a tu vecino. Estado de enlace: cada quien cuenta sus calles y todos arman el mapa completo.</div>
<p>Ruta estática: <code>ip route RED MÁSCARA SIGUIENTE_SALTO</code>. El siguiente salto es la IP del vecino.</p>
<table><tr><th></th><th>Vector distancia (RIP)</th><th>Estado de enlace (OSPF)</th></tr><tr><td>Qué envía</td><td>Su tabla</td><td>Estado de sus enlaces (LSP)</td></tr><tr><td>A quién</td><td>Vecinos</td><td>Todos, por inundación</td></tr><tr><td>Cuándo</td><td>Periódico y al cambiar</td><td>Al cambiar y periódico</td></tr><tr><td>Algoritmo</td><td>Bellman-Ford</td><td>Dijkstra</td></tr></table>
<h3>RIP</h3><ul><li>Su métrica, o deseabilidad, son los <b>saltos</b>. Máximo 15.</li><li>RIPv1 no envía máscara. RIPv2 sí.</li><li><code>no auto-summary</code> evita resumir a la clase.</li></ul>
<div class="ej"><b>Ejemplo.</b> Si ves 172.16.0.0/25 y 172.16.0.128/25 con R, entonces hay RIPv2 y el vecino usa no auto-summary.</div>
<p><b>Intradominio:</b> dentro de un sistema autónomo. <b>Interdominio:</b> entre sistemas autónomos. <b>Convergencia:</b> el tiempo en que todos conocen un cambio.</p>
<div class="err"><b>Error común.</b> Decir que la deseabilidad de RIP es 120. Eso es su distancia administrativa.</div>`,
ck:[['Métrica de RIP',['120','Saltos','Ancho de banda'],1,'Cuenta routers hasta el destino.'],['Dijkstra se usa en…',['Vector distancia','Estado de enlace'],1,'Trabaja con la topología completa.']],f:[10,11,18,22,30],p:[]},
{id:'r5',title:'Vector distancia paso a paso',goal:'Actualizar una tabla de vector distancia y explicar la cuenta a infinito.',html:`
<div class="idea"><b>Imagínalo así.</b> Cada router solo conoce a sus vecinos. Les cuenta "yo llego a tal sitio con tanto", ellos suman lo que les cuesta llegar hasta él y se quedan con lo más barato.</div>
<p>En vector distancia, el camino de menor costo es el de <b>mínima distancia</b>. Cada nodo mantiene un vector (tabla) con la distancia mínima a cada nodo y el <b>siguiente salto</b>. Envía toda su tabla, o gran parte, pero <b>solo a sus vecinos</b>.</p>
<p>La red de la diapositiva: A–B cuesta 5, A–C 2, A–D 3, C–B 4, C–E 4 y B–E 3.</p>
<h3>1. Inicialización</h3>
<p>Cada nodo solo conoce la distancia a sus <b>vecinos inmediatos</b>. Los demás quedan en <b>infinito (∞)</b>. La tabla de A empieza así: A 0, B 5, C 2, D 3, E ∞.</p>
<h3>2. Compartir</h3>
<p>Los vecinos se intercambian las <b>dos primeras columnas</b> (destino y costo). No hace falta la tercera, porque el siguiente salto es quien envía. C le manda a A: A 2, B 4, C 0, D ∞, E 4.</p>
<h3>3. Actualizar</h3>
<ol><li>El receptor <b>suma</b> el costo hasta el emisor a cada valor recibido. A suma 2 a lo de C: A 4, B 6, C 2, D ∞, E 6, todo vía C.</li><li>Compara fila por fila con su tabla vieja:<ul><li>Si el siguiente nodo es distinto, se queda con el <b>menor costo</b>. Si empatan, deja la primera.</li><li>Si el siguiente nodo es el mismo, toma la fila nueva, porque el camino viejo ya no existe.</li></ul></li></ol>
<div class="ej"><b>Resultado.</b> La nueva tabla de A queda A 0, B 5, C 2, D 3 y <b>E 6 vía C</b>. A aprendió a llegar a E gracias a C.</div>
<h3>4. ¿Cuándo compartir?</h3>
<ul><li><b>Periódica:</b> cada cierto tiempo, según el protocolo. RIP lo hace cada 30 segundos.</li><li><b>Disparada:</b> cuando cambia la tabla, porque llegó una tabla nueva de un vecino o porque se cayó un enlace y una distancia pasó a infinito.</li></ul>
<h3>El problema: inestabilidad y cuenta a infinito</h3>
<p>Hay tres nodos en línea: X, A y B. A llega a X con costo 2 y B llega con 6, a través de A. Se cae el enlace A–X y A pone X en ∞.</p>
<ul><li>Si A avisa a B de inmediato, todo bien.</li><li>Si <b>B envía su tabla antes</b>, A cree que B sabe llegar a X y anota X = 6 + 4 = 10 vía B. Luego B suma: 14 vía A. Y así.</li><li>El costo sube poco a poco hasta infinito. Mientras tanto, A cree que se llega por B y B que por A: los paquetes rebotan entre los dos. Es un <b>bucle</b>.</li></ul>
<p><b>Soluciones</b>, que el profesor deja para investigar:</p>
<ul><li><b>Definir infinito</b> como un número pequeño. En RIP es 16, así que la cuenta termina pronto.</li><li><b>Horizonte dividido</b> (split horizon): no anunciarle una ruta al vecino del que la aprendiste. B no le diría a A que llega a X, porque lo aprendió de A.</li><li><b>Horizonte dividido con retorno envenenado</b> (poison reverse): sí se la anuncia, pero con costo infinito, para dejar claro que por ahí no se llega.</li></ul>
<h3>RIP según el profesor</h3>
<ul><li>Intradominio, dentro de un sistema autónomo.</li><li>Distancia administrativa <b>120</b>.</li><li>Métrica: número de saltos. <b>Infinito = 16</b>, así que como máximo hay 15 saltos.</li><li>Envía la <b>tabla completa cada 30 segundos</b>.</li></ul>
<div class="err"><b>Error común.</b> Pensar que en vector distancia cada router conoce toda la red. Solo conoce lo que le cuentan sus vecinos. El que conoce la topología completa es el estado de enlace.</div>`,
ck:[['En vector distancia, la tabla se envía…',['A todos los routers','Solo a los vecinos'],1,'Por eso se dice que el router le cree al vecino.'],['A recibe de C: E 4. A–C cuesta 2. A anota E en…',['4','6','2'],1,'4 + 2, vía C.'],['¿Qué columnas se comparten?',['Destino y costo','Las tres'],0,'El siguiente salto es el emisor.'],['No anunciar una ruta al vecino del que se aprendió es…',['Horizonte dividido','Retorno envenenado'],0,'Split horizon.'],['Infinito en RIP vale…',['15','16','120'],1,'Por eso el máximo son 15 saltos.']],f:[],p:[]},
{id:'t15',title:'OSPF desde cero',goal:'Explicar qué hace OSPF y leer sus rutas.',html:`
<div class="idea"><b>Imagínalo así.</b> RIP es preguntarle el camino al vecino y creerle. OSPF es que cada router reparta un dibujo de sus calles, todos junten los dibujos en un mapa completo y cada uno calcule solo el camino más corto.</div>
<p><b>OSPF</b> (Open Shortest Path First, primero la ruta más corta) es un protocolo de enrutamiento <b>dinámico</b> de <b>estado de enlace</b>. Es un estándar abierto, no exclusivo de Cisco, y funciona dentro de un sistema autónomo, así que es <b>intradominio</b>.</p>
<h3>Cómo trabaja, en 4 pasos</h3>
<ol><li><b>Saluda.</b> Cada router envía paquetes <b>Hello</b> por sus interfaces, cada 10 segundos en Ethernet. Quien responde con los mismos datos (área, máscara, tiempos) se vuelve su <b>vecino</b>.</li><li><b>Reparte su estado.</b> Cada router anuncia sus enlaces en <b>LSA</b> (anuncios de estado de enlace) y los inunda a toda el área.</li><li><b>Arma el mapa.</b> Todos guardan la misma base de datos, la <b>LSDB</b>, que es el mapa completo de la red.</li><li><b>Calcula.</b> Con el algoritmo de <b>Dijkstra</b> (SPF) cada router saca el camino de menor costo y lo pone en su tabla con la letra <b>O</b>.</li></ol>
<p>Cuando los vecinos ya tienen el mismo mapa quedan en estado <b>FULL</b>. Después solo se envían cambios, no la tabla completa cada 30 segundos como en RIP.</p>
<h3>Los números que preguntan</h3>
<table><tr><th>Concepto</th><th>OSPF</th><th>RIP</th></tr><tr><td>Tipo</td><td>Estado de enlace</td><td>Vector distancia</td></tr><tr><td>Algoritmo</td><td>Dijkstra (SPF)</td><td>Bellman-Ford</td></tr><tr><td>Métrica</td><td><b>Costo</b> (según ancho de banda)</td><td>Saltos, máximo 15</td></tr><tr><td>Distancia administrativa</td><td><b>110</b></td><td>120</td></tr><tr><td>Letra en la tabla</td><td>O</td><td>R</td></tr><tr><td>Envía máscara (VLSM)</td><td>Sí, siempre</td><td>Solo v2</td></tr><tr><td>Qué envía</td><td>Estado de sus enlaces, al cambiar</td><td>Su tabla, cada 30 s</td></tr><tr><td>Converge</td><td>Rápido</td><td>Lento</td></tr></table>
<p><b>Costo</b> = 100 Mbps ÷ ancho de banda de la interfaz, sin decimales y como mínimo 1. Fast Ethernet y Gigabit valen 1, Ethernet de 10 Mbps vale 10 y un serial T1 de 1,544 Mbps vale 64. El costo de una ruta es la <b>suma</b> de las interfaces de salida hasta el destino, y gana el menor.</p>
<p>Si dos protocolos conocen la misma red, gana la menor distancia administrativa: <b>OSPF (110) le gana a RIP (120)</b>, pero pierde contra una estática (1).</p>
<h3>Áreas y router-id</h3>
<ul><li>OSPF divide redes grandes en <b>áreas</b>. El <b>área 0</b> es el backbone y todas las demás se conectan a ella. En una red pequeña todo va en el área 0.</li><li>El <b>router-id</b> es la cédula del router, escrito como una IP (1.1.1.1). Si no lo pones, toma la IP más alta de una loopback o, si no hay, de una interfaz activa.</li></ul>
<h3>Cómo lo explica el profesor: estado de enlace</h3>
<p>En estado de enlace cada router envía actualizaciones <b>a todos los routers</b> de la red, pero solo la parte que describe <b>sus propios enlaces</b>. Al principio nadie conoce la topología, pero cada nodo sabe el tipo, la condición (activo o inactivo) y el costo de sus enlaces. Juntando lo que sabe cada uno, todos obtienen la <b>topología completa</b>.</p>
<p>Para construir la tabla de menor costo hay 4 acciones:</p>
<ol><li>Cada nodo crea su <b>paquete de estado de enlace (LSP)</b>.</li><li>Los LSP se <b>diseminan</b> a todos los routers por <b>inundación</b>, de forma eficiente y fiable.</li><li>Cada nodo forma su <b>árbol de camino más corto</b> con Dijkstra.</li><li>Con ese árbol calcula su <b>tabla de enrutamiento</b>.</li></ol>
<p><b>Cómo se crea el LSP:</b></p>
<ol type="a"><li><b>Descubrir a los vecinos:</b> al encenderse, el router manda un paquete <b>HELLO</b> por cada línea punto a punto y el del otro extremo responde con su dirección única.</li><li><b>Medir el costo de la línea:</b> envía un paquete especial <b>ECO</b> (ECHO) que el otro devuelve de inmediato. Mide el tiempo de ida y vuelta y lo <b>divide entre dos</b> para tener el retardo. Repite varias veces y promedia.</li><li><b>Armar el LSP</b> con la <b>identidad y lista de vecinos</b> (para dibujar la topología), el <b>número de secuencia</b> (para distinguir los LSP nuevos de los viejos) y la <b>edad</b> (para que los viejos no se queden para siempre).</li></ol>
<p><b>Cuándo se genera un LSP:</b> cuando cambia la topología, un enlace o sus propiedades, y también de forma periódica, cada una a dos horas, para borrar información vieja.</p>
<h3>OSPF en la diapositiva del profesor</h3>
<ul><li>Lo desarrolló el <b>IETF</b> para <b>reemplazar a RIP</b>.</li><li>Distancia administrativa <b>110</b>.</li><li>Usa <b>Dijkstra</b> para la mejor ruta.</li><li>Es <b>classless</b>: soporta <b>VLSM y CIDR</b>.</li><li>No intercambia tablas en intervalos fijos. Actualiza cuando <b>cambia la topología</b>.</li><li>Es de los más usados en la industria.</li><li>Usa <b>wildcard</b> y <b>áreas</b> (grupos de routers que intercambian información de enrutamiento).</li></ul>
<table><tr><th>Interfaz</th><th>Cálculo</th><th>Costo</th></tr><tr><td>10 Gigabit Ethernet</td><td>100 000 000 ÷ 10 000 000 000</td><td>1</td></tr><tr><td>Gigabit Ethernet</td><td>100 000 000 ÷ 1 000 000 000</td><td>1</td></tr><tr><td>Fast Ethernet</td><td>100 000 000 ÷ 100 000 000</td><td>1</td></tr><tr><td>Ethernet 10 Mbps</td><td>100 000 000 ÷ 10 000 000</td><td>10</td></tr><tr><td>Serial 1,544 Mbps</td><td>100 000 000 ÷ 1 544 000</td><td>64</td></tr><tr><td>Serial 128 kbps</td><td>100 000 000 ÷ 128 000</td><td>781</td></tr><tr><td>Serial 64 kbps</td><td>100 000 000 ÷ 64 000</td><td>1562</td></tr></table>
<div class="ej"><b>Pregunta tipo.</b> Una ruta pasa por dos seriales de 1,544 Mbps y una Fast Ethernet. Su costo es 64 + 64 + 1 = <b>129</b>. Otra ruta pasa por diez Fast Ethernet: costo 10. OSPF elige la de <b>10</b>, aunque tenga más saltos. RIP habría elegido la de 3 saltos.</div>
<h3>La configuración</h3>
<pre>router ospf 1
 router-id 1.1.1.1
 network 10.39.0.0 0.0.7.255 area 0
 network 10.39.10.0 0.0.0.3 area 0
 passive-interface GigabitEthernet0/0</pre>
<ul><li>El <b>1</b> de <code>router ospf 1</code> es el número de proceso. Es local, no tiene que coincidir con el vecino.</li><li><code>network</code> lleva <b>wildcard</b>, la máscara al revés: 255.255.255.255 menos la máscara. /21 da 0.0.7.255, /23 da 0.0.1.255, /24 da 0.0.0.255 y /30 da 0.0.0.3.</li><li>A diferencia de RIP, aquí la red se escribe <b>sin clase</b>, con su wildcard exacta.</li><li><code>passive-interface</code> anuncia la red pero no envía Hello hacia los PC.</li></ul>
<div class="ej"><b>Ejemplo.</b> En HQ-CORE aparece <code>O 10.39.8.0/23 [110/2] via 10.39.10.1</code>. O es OSPF, 110 su distancia administrativa, 2 el costo (1 del enlace Gigabit más 1 de la LAN de BRANCH) y 10.39.10.1 el vecino BRANCH.</div>
<div class="err"><b>Error común.</b> Decir que la métrica de OSPF son los saltos o que es 110. Los saltos son de RIP y 110 es la distancia administrativa. La métrica de OSPF es el <b>costo</b>.</div>
<div class="err"><b>Otro error.</b> Escribir la máscara en el network de OSPF. Si pones <code>network 10.39.0.0 255.255.248.0 area 0</code>, el router lo toma como wildcard y anuncia otra cosa. Va <b>0.0.7.255</b>.</div>`,
ck:[['La métrica de OSPF es…',['Los saltos','El costo','110'],1,'Se calcula con el ancho de banda. 110 es su distancia administrativa.'],['Algoritmo que usa OSPF',['Bellman-Ford','Dijkstra'],1,'Calcula el camino más corto sobre el mapa completo.'],['Si RIP y OSPF conocen la misma red, la tabla usa…',['RIP','OSPF'],1,'110 es menor que 120: OSPF es más confiable.'],['Wildcard de una /23',['255.255.254.0','0.0.1.255','0.0.0.255'],1,'255.255.255.255 menos 255.255.254.0.'],['Estado de dos vecinos que ya comparten el mapa',['FULL','DOWN','INIT'],0,'FULL indica adyacencia completa.'],['El área obligatoria y central se llama…',['Área 1','Área 0'],1,'Es el backbone.']],f:[11,14,18,30],p:[]},
{id:'t13',title:'VLAN, acceso y troncal',goal:'Saber cuándo se necesita troncal y cuándo router.',html:`
<div class="idea"><b>Imagínalo así.</b> Un edificio con pisos separados: Ventas y Sistemas comparten edificio, pero no se oyen. El ascensor que pasa por todos los pisos es el troncal.</div>
<p>Una <b>VLAN</b> divide un switch en varios switches lógicos. Cada VLAN es un dominio de broadcast y una subred.</p>
<table><tr><th>Puerto</th><th>Lleva</th><th>Va hacia</th></tr><tr><td>Access</td><td>Una VLAN, sin etiqueta</td><td>PC</td></tr><tr><td>Trunk</td><td>Varias VLAN, con etiqueta 802.1Q</td><td>Otro switch o el router</td></tr></table>
<ul><li>Misma VLAN en dos switches: <b>troncal</b>.</li><li>VLAN distintas: <b>capa 3</b>.</li><li>Los dos extremos del enlace deben ser troncales.</li><li>VLAN nativa: viaja sin etiqueta, por defecto la 1.</li><li>Borrar: <code>no vlan 5</code> y reasignar sus puertos.</li></ul>
<div class="ej"><b>Ejemplo del parcial.</b> SW1 está en trunk y SW2 en access VLAN 20. Solución: poner SW2 en troncal.</div>
<h3>Lo que añaden las diapositivas</h3>
<ul><li>Una VLAN es una agrupación <b>lógica</b> de equipos por función, departamento o aplicación, sin importar dónde estén físicamente. Se configura por software en el switch.</li><li>Funciona en capa 2, y la comunicación entre VLAN distintas necesita enrutamiento de <b>capa 3</b>.</li><li>Controla los broadcasts y aumenta la seguridad, porque define quién habla con quién.</li></ul>
<table><tr><th>Tipo</th><th>Cómo se asigna</th></tr><tr><td>Estática por puerto</td><td>Cada puerto del switch pertenece a una VLAN. Es segura y fácil, pero si el equipo cambia de puerto hay que reconfigurar</td></tr><tr><td>Estática por MAC</td><td>Según la MAC del equipo. Más flexible: no depende del puerto</td></tr><tr><td>Dinámica</td><td>Una aplicación central asigna la VLAN por MAC, dirección lógica o protocolo</td></tr></table>
<p><b>Rangos:</b> el normal va de <b>1 a 1005</b> (las 1002 a 1005 son para Token Ring y FDDI) y el extendido de <b>1006 a 4094</b>, para proveedores de servicio.</p>
<p><b>IEEE 802.1Q (dot1Q):</b> la modificación de Ethernet que etiqueta cada trama con su VLAN, para que varias VLAN compartan el mismo cable sin mezclarse. Eso es el <b>trunking</b>.</p>
<div class="err"><b>Error común.</b> Leer “Native vlan 1” como si solo pasara una VLAN. Mira “Vlans allowed”.</div>`,
ck:[['Misma VLAN, dos switches: necesitas…',['Router','Troncal'],1,'El router solo hace falta entre VLAN distintas.'],['Para borrar la VLAN 5',['erase vlan 5','no vlan 5'],1,'Se niega el comando que la creó.']],f:[3,4,5,8],p:[]},
{id:'t14',title:'Router-on-a-stick',goal:'Comunicar VLAN con un solo cable al router.',html:`
<div class="idea"><b>Imagínalo así.</b> Un traductor con una sola puerta atiende varios pisos. Cada piso tiene su ventanilla: esa ventanilla es una subinterfaz.</div>
<pre>interface fast 0/0.2
 encapsulation dot1q 2
 ip address 192.168.1.62 255.255.255.192
interface fast 0/0
 no shutdown</pre>
<ul><li>El número de <code>dot1q</code> debe ser la VLAN.</li><li>La IP de la subinterfaz es el gateway de esa VLAN.</li><li>La interfaz física no lleva IP, pero sí <code>no shutdown</code>.</li><li>El enlace con el switch es <b>troncal</b>.</li><li>Ventaja: económico y escalable. Desventaja: las VLAN comparten un enlace y es más difícil de diagnosticar.</li></ul>
<div class="ej"><b>Ejemplo 1.</b> Fa0/1.1 tiene 192.168.1.17 /28. Un host nuevo de la VLAN 1 va entre .18 y .30: <b>.22</b>.</div><div class="ej"><b>Ejemplo 2.</b> Destino 192.168.1.85 con /27: está en .64, la red de <b>Fa0/1.2</b>.</div>
<div class="err"><b>Error común.</b> Pensar que el número de la subinterfaz manda. Fa0/0.10 con dot1q 100 sirve a la VLAN 100.</div>`,
ck:[['¿Dónde va la IP del gateway?',['Interfaz física','Subinterfaz'],1,'Una por cada VLAN.'],['Enlace router–switch',['Acceso','Troncal'],1,'Debe llevar varias VLAN.']],f:[1,2,6,7,13,21],p:[]}
];
const PRACTICA=[
{id:'p1',title:'Conoce Packet Tracer y arma los equipos',goal:'Colocar routers, switches, PC y cables sin dudar.',html:`
<div class="idea"><b>Imagínalo así.</b> Antes de cocinar sacas los ingredientes. Aquí sacas equipos y cables. Nada funciona todavía.</div>
<ol><li>Abajo a la izquierda elige <b>Routers</b> y arrastra un 1841 por cada router.</li><li>En <b>Switches</b>, arrastra un 2950-24. En <b>End Devices</b>, los PC.</li><li>Pon el módulo serial: clic en el router, pestaña <b>Physical</b>, <b>apágalo</b> con el interruptor, arrastra <b>WIC-2T</b> a la ranura y enciéndelo.</li><li>Elige <b>Connections</b>, el rayo.</li><li>Cable negro continuo (Straight-Through): PC con switch y switch con router.</li><li>Cable rojo con reloj (<b>Serial DCE</b>): haz clic <b>primero</b> en el router que será DCE.</li><li>Conecta Fa0/24 del switch con Fa0/0 del router.</li></ol>
<div class="ej"><b>Qué deberías ver.</b> Los PC en verde tras unos 30 segundos. El enlace al router en rojo: es normal, su puerto está apagado.</div>
<div class="err"><b>Error común.</b> Usar el cable automático. Elige tú el cable y el puerto.</div>`,ck:[['¿Qué haces antes de poner el WIC-2T?',['Encender el router','Apagar el router'],1,'Con el router encendido no deja insertar módulos.'],['Con el cable Serial DCE, el DCE es…',['El primer router en que haces clic','El segundo'],0,'El reloj queda en ese extremo.']]},
{id:'p2',title:'Los modos de la consola',goal:'Moverte por la CLI sin perderte.',html:`
<div class="idea"><b>Imagínalo así.</b> Entras a un edificio, luego a la oficina y luego a un cajón. Cada cosa se hace en su lugar.</div>
<table><tr><th>Ves</th><th>Dónde estás</th><th>Cómo llegas</th></tr><tr><td><code>Router&gt;</code></td><td>Usuario</td><td>Al abrir. Si pregunta por el diálogo inicial, responde no</td></tr><tr><td><code>Router#</code></td><td>Privilegiado: aquí van los show</td><td>enable</td></tr><tr><td><code>Router(config)#</code></td><td>Configuración global</td><td>configure terminal</td></tr><tr><td><code>Router(config-if)#</code></td><td>Una interfaz</td><td>interface fast 0/0</td></tr></table>
<p><code>exit</code> sube un nivel. <code>end</code> vuelve a <code>#</code>. <code>Tab</code> completa y <code>?</code> muestra ayuda. Para borrar algo, escribe <code>no</code> delante.</p>
<pre>enable
configure terminal
hostname R1
no ip domain-lookup
end
copy running-config startup-config</pre><div class="ej"><b>Truco.</b> <code>no ip domain-lookup</code> evita la espera cuando escribes mal un comando.</div>
<div class="err"><b>Error común.</b> Escribir show en <code>(config)#</code>. Sal con end, o usa <code>do show</code>.</div>`,ck:[['¿Dónde se escribe show ip route?',['Router#','Router(config)#'],0,'Es un comando del modo privilegiado.']]},
{id:'p3',title:'Planifica con VLSM en papel',goal:'Tener la tabla completa antes de tocar un equipo.',html:`
<div class="idea"><b>Imagínalo así.</b> El plano antes de la casa. Si la tabla está mal, todo lo demás estará mal.</div>
<p>Por cada subred escribe: red, máscara, IP del PC (primer host), gateway (último host). Así lo pide el profesor.</p>
<table><tr><th>Subred</th><th>Red</th><th>Máscara</th><th>PC</th><th>Gateway</th></tr><tr><td>Ventas, 60</td><td>192.168.1.0 /26</td><td>255.255.255.192</td><td>.1</td><td>.62</td></tr><tr><td>Operaciones, 60</td><td>192.168.1.64 /26</td><td>255.255.255.192</td><td>.65</td><td>.126</td></tr><tr><td>Call Center, 30</td><td>192.168.1.128 /27</td><td>255.255.255.224</td><td>.129</td><td>.158</td></tr><tr><td>Sistemas, 10</td><td>192.168.1.160 /28</td><td>255.255.255.240</td><td>.161</td><td>.174</td></tr><tr><td>R1–R2, 2</td><td>192.168.1.176 /30</td><td>255.255.255.252</td><td>.177 R1</td><td>.178 R2</td></tr></table>
<div class="err"><b>Error común.</b> Asignar en el orden de la tabla del enunciado. Ordena siempre de mayor a menor.</div><p>Entrena con el generador de la lección <a href="#l/t8">VLSM desde cero</a>.</p>`,ck:[['¿Qué subred se asigna primero?',['La primera del enunciado','La que necesita más hosts'],1,'De mayor a menor para no solaparse.']]},
{id:'p4',title:'Crea las VLAN y asigna puertos',goal:'Dejar cada PC en su VLAN.',html:`
<div class="idea"><b>Imagínalo así.</b> Primero creas los pisos del edificio. Después dices qué puertas son de cada piso.</div>
<pre>vlan 2
 name Ventas
vlan 5
 name Sistemas
 exit
interface range fast 0/1-15
 switchport mode access
 switchport access vlan 2
 exit
interface range fast 0/16-23
 switchport mode access
 switchport access vlan 5</pre><ul><li><code>vlan 2</code> la crea y <code>name</code> le pone nombre.</li><li><code>interface range</code> configura varios puertos a la vez.</li><li><code>mode access</code>: este puerto es para un PC.</li><li><code>access vlan 2</code>: pertenece a la VLAN 2.</li></ul>
<p><b>Comprueba:</b> <code>show vlan brief</code>. Cada puerto debe salir en su VLAN.</p>
<div class="err"><b>Error común.</b> Conectar el PC a un puerto de otra VLAN.</div>`,ck:[['¿Cómo verificas las VLAN?',['show vlan brief','show ip route'],0,'Muestra VLAN, nombres y puertos.']]},
{id:'p5',title:'Configura el troncal',goal:'Que el switch lleve sus VLAN al router.',html:`
<div class="idea"><b>Imagínalo así.</b> Pones el ascensor y dices en qué pisos puede parar.</div>
<pre>interface fast 0/24
 switchport mode trunk
 switchport trunk allowed vlan 2,5</pre><p>En el final de 2025 piden los puertos 23 y 24:</p><pre>interface range fast 0/23-24
 switchport mode trunk
 switchport trunk allowed vlan 50,100</pre>
<p><b>Comprueba:</b> <code>show interfaces trunk</code>. Solo aparece cuando el enlace está activo, así que enciende primero el router.</p>
<div class="err"><b>Error común.</b> Poner espacios en la lista. Es <code>2,5</code>, sin espacio.</div>`,ck:[['El puerto hacia el router va en modo…',['access','trunk'],1,'Lleva varias VLAN.']]},
{id:'p6',title:'Subinterfaces en el router',goal:'Dar gateway a cada VLAN.',html:`
<div class="idea"><b>Imagínalo así.</b> Una ventanilla por cada piso, todas en la misma puerta.</div>
<pre>interface fast 0/0.2
 encapsulation dot1q 2
 ip address 192.168.1.62 255.255.255.192
 exit
interface fast 0/0.5
 encapsulation dot1q 5
 ip address 192.168.1.174 255.255.255.240
 exit
interface fast 0/0
 no shutdown</pre><ol><li>Primero <code>encapsulation</code>.</li><li>Después la IP: último host de la subred.</li><li>Al final enciende la interfaz física.</li></ol>
<p>Si la red <b>no tiene VLAN</b>, como SW3 en el final, la IP va directo en <code>fast 0/0</code>.</p>
<p><b>Comprueba:</b> <code>show ip interface brief</code>: up/up. Luego haz ping del PC a su gateway.</p>
<div class="err"><b>Error común.</b> Olvidar <code>no shutdown</code> en Fa0/0 física.</div>`,ck:[['¿Qué va primero?',['ip address','encapsulation dot1q'],1,'IOS no acepta la IP sin encapsulación.']]},
{id:'p7',title:'El enlace serial entre routers',goal:'Conectar dos routers por WAN.',html:`
<div class="idea"><b>Imagínalo así.</b> Dos personas marchando: una marca el ritmo. Esa es el DCE.</div>
<div class="two"><div><b>R1, DCE</b><pre>interface serial 0/0/0
 clock rate 72000
 ip address 192.168.1.177 255.255.255.252
 no shutdown</pre></div><div><b>R2, DTE</b><pre>interface serial 0/0/0
 ip address 192.168.1.178 255.255.255.252
 no shutdown</pre></div></div><ul><li>Solo el DCE lleva <code>clock rate</code>. Usa el valor del enunciado: 72000 en el taller, 64000 en el final de 2025.</li><li>No hay gateway en el enlace: cada router toma una de las dos IP.</li></ul>
<p><b>Comprueba:</b> los dos puntos en verde y ping entre routers. Para saber quién es DCE: <code>show controllers serial 0/0/0</code>.</p>
<div class="err"><b>Error común.</b> Hacer no shutdown en un solo lado.</div>`,ck:[['clock rate va en…',['DCE','DTE','Ambos'],0,'El DCE marca el reloj.']]},
{id:'p8',title:'Rutas estáticas',goal:'Enseñarle al router las redes lejanas.',html:`
<div class="idea"><b>Imagínalo así.</b> Pegas una nota: para ir a Operaciones, pregúntale a R2.</div>
<pre>R1(config)# ip route 192.168.1.64 255.255.255.192 192.168.1.178
R1(config)# ip route 192.168.1.128 255.255.255.224 192.168.1.178</pre><pre>R2(config)# ip route 192.168.1.0 255.255.255.192 192.168.1.177
R2(config)# ip route 192.168.1.160 255.255.255.240 192.168.1.177</pre><ol><li>Haz una lista de las redes que este router <b>no</b> toca.</li><li>Una ruta por cada una, con su máscara.</li><li>El siguiente salto es la IP del <b>otro</b> router.</li><li>Repite en el otro: si no hay regreso, el ping falla.</li></ol>
<p><b>Comprueba:</b> <code>show ip route</code>, líneas con S.</p><div class="err"><b>Error común.</b> Usar tu propia IP como siguiente salto.</div>`,ck:[['En R1, el siguiente salto es…',['192.168.1.177 (R1)','192.168.1.178 (R2)'],1,'Siempre el vecino.']]},
{id:'p9',title:'RIP versión 2',goal:'Que los routers se enseñen las rutas solos.',html:`
<div class="idea"><b>Imagínalo así.</b> En lugar de pegar notas, los routers conversan y se cuentan qué redes conocen.</div>
<pre>router rip
 version 2
 no auto-summary
 network 192.168.50.0
 network 10.0.0.0
 network 192.168.254.0</pre><ol><li>Lista las redes <b>conectadas</b> a este router que participan en RIP.</li><li>Escríbelas <b>con clase</b>: 10.10.92.0/23 se vuelve 10.0.0.0 y 192.168.50.128/26 se vuelve 192.168.50.0.</li><li>Incluye la WAN entre los routers RIP.</li><li>Haz lo mismo en el otro router.</li></ol>
<h3>RIP y estático juntos</h3><p>R3 no habla RIP. R2 llega con ruta estática. Para que R1 también llegue a Pregrado, ponle una estática hacia R2. Otra opción es <code>redistribute static</code> en R2, dentro de router rip.</p>
<p><b>Comprueba:</b> espera unos segundos y busca la R en <code>show ip route</code>. También <code>show ip protocols</code>.</p>
<div class="err"><b>Error común.</b> Anunciar redes remotas. Solo van las propias.</div>`,ck:[['10.10.92.0/23 en network se escribe…',['10.10.92.0','10.0.0.0'],1,'RIP usa la red con clase: A es /8.'],['¿R1 anuncia la red de R2?',['Sí','No'],1,'Cada router anuncia sus conectadas.']]},
{id:'p14',title:'El laboratorio del I+D con OSPF',goal:'Montar dos redes VLSM unidas por OSPF y probarlas.',html:`
<div class="idea"><b>Qué se pidió.</b> Dos barrios de computadores: HQ-CORE con 2000 equipos y BRANCH con 500. Cada uno tiene su switch y su router 1941. Los dos routers se unen con un cable y usan OSPF para enseñarse sus redes, así PC0 llega a PC1 sin escribir rutas a mano. Red base: <b>10.39.0.0</b>.</div>
<h3>1. VLSM, de mayor a menor</h3>
<table><tr><th>Red</th><th>Necesita</th><th>Bloque</th><th>Prefijo</th><th>Máscara</th><th>Wildcard</th></tr><tr><td>HQ-CORE</td><td>2000</td><td>2048 (2046 útiles)</td><td>/21</td><td>255.255.248.0</td><td>0.0.7.255</td></tr><tr><td>BRANCH</td><td>500</td><td>512 (510 útiles)</td><td>/23</td><td>255.255.254.0</td><td>0.0.1.255</td></tr><tr><td>Enlace</td><td>2</td><td>4 (2 útiles)</td><td>/30</td><td>255.255.255.252</td><td>0.0.0.3</td></tr></table>
<table><tr><th>Subred</th><th>Red</th><th>Primer host</th><th>Último host</th><th>Broadcast</th></tr><tr><td>HQ-CORE</td><td>10.39.0.0</td><td>10.39.0.1</td><td>10.39.7.254</td><td>10.39.7.255</td></tr><tr><td>BRANCH</td><td>10.39.8.0</td><td>10.39.8.1</td><td>10.39.9.254</td><td>10.39.9.255</td></tr><tr><td>Enlace</td><td>10.39.10.0</td><td>10.39.10.1</td><td>10.39.10.2</td><td>10.39.10.3</td></tr></table>
<p>El /21 ocupa 8 bloques del tercer octeto (256 − 248 = 8), del 0 al 7. BRANCH empieza en el 8 y ocupa 2 (256 − 254 = 2), el 8 y el 9. El enlace empieza en 10.39.10.0.</p>
<h3>2. Direcciones de cada equipo</h3>
<table><tr><th>Equipo</th><th>Interfaz</th><th>IP</th><th>Máscara</th><th>Gateway</th></tr><tr><td>HQ-CORE</td><td>Gig0/0 (al switch)</td><td>10.39.7.254</td><td>255.255.248.0</td><td>—</td></tr><tr><td>HQ-CORE</td><td>Gig0/1 (a BRANCH)</td><td>10.39.10.2</td><td>255.255.255.252</td><td>—</td></tr><tr><td>BRANCH</td><td>Gig0/0 (al switch)</td><td>10.39.9.254</td><td>255.255.254.0</td><td>—</td></tr><tr><td>BRANCH</td><td>Gig0/1 (a HQ-CORE)</td><td>10.39.10.1</td><td>255.255.255.252</td><td>—</td></tr><tr><td>PC0</td><td>NIC</td><td>10.39.0.1</td><td>255.255.248.0</td><td>10.39.7.254</td></tr><tr><td>PC1</td><td>NIC</td><td>10.39.8.1</td><td>255.255.254.0</td><td>10.39.9.254</td></tr></table>
<p>Los routers toman el último host de su red y los PC el primero. En el /30 solo hay .1 y .2, así que HQ-CORE toma la última (.2) y BRANCH la otra (.1).</p>
<h3>3. Cables</h3>
<ul><li>Router a router (Gig0/1 con Gig0/1): <b>cruzado</b>, porque son equipos iguales.</li><li>Router a switch y PC a switch: <b>directo</b>.</li></ul>
<h3>4. HQ-CORE</h3>
<pre>enable
configure terminal
hostname HQ-CORE
no ip domain-lookup
interface GigabitEthernet0/0
 description LAN HQ-CORE (2000 hosts)
 ip address 10.39.7.254 255.255.248.0
 no shutdown
interface GigabitEthernet0/1
 description Enlace a BRANCH
 ip address 10.39.10.2 255.255.255.252
 no shutdown
router ospf 1
 router-id 1.1.1.1
 network 10.39.0.0 0.0.7.255 area 0
 network 10.39.10.0 0.0.0.3 area 0
 passive-interface GigabitEthernet0/0
end
copy running-config startup-config</pre>
<h3>5. BRANCH</h3>
<pre>enable
configure terminal
hostname BRANCH
no ip domain-lookup
interface GigabitEthernet0/0
 description LAN BRANCH (500 hosts)
 ip address 10.39.9.254 255.255.254.0
 no shutdown
interface GigabitEthernet0/1
 description Enlace a HQ-CORE
 ip address 10.39.10.1 255.255.255.252
 no shutdown
router ospf 1
 router-id 2.2.2.2
 network 10.39.8.0 0.0.1.255 area 0
 network 10.39.10.0 0.0.0.3 area 0
 passive-interface GigabitEthernet0/0
end
copy running-config startup-config</pre>
<p>Cada router anuncia solo <b>sus</b> redes: la LAN propia y el enlace. Los switches no necesitan VLAN, todo va en la VLAN 1. Solo se les pone nombre con <code>hostname</code>.</p>
<p>Al terminar el segundo router aparece algo como <code>%OSPF-5-ADJCHG: Process 1, Nbr 1.1.1.1 on GigabitEthernet0/1 from LOADING to FULL</code>. Significa que ya son vecinos y compartieron el mapa.</p>
<h3>6. Comprobar</h3>
<table><tr><th>Comando</th><th>Qué debe salir</th></tr><tr><td><code>show ip interface brief</code></td><td>Gig0/0 y Gig0/1 con su IP y en up / up</td></tr><tr><td><code>show ip ospf neighbor</code></td><td>El otro router (1.1.1.1 o 2.2.2.2) en estado FULL</td></tr><tr><td><code>show ip route</code></td><td>En HQ-CORE: <code>O 10.39.8.0/23 [110/2] via 10.39.10.1</code>. En BRANCH: <code>O 10.39.0.0/21 [110/2] via 10.39.10.2</code></td></tr><tr><td><code>show ip protocols</code></td><td>OSPF 1, su router-id y las redes anunciadas</td></tr></table>
<table><tr><th>Desde</th><th>Ping</th><th>Prueba</th></tr><tr><td>PC0</td><td>10.39.7.254</td><td>Llega a su router</td></tr><tr><td>PC1</td><td>10.39.9.254</td><td>Llega a su router</td></tr><tr><td>PC0</td><td>10.39.8.1</td><td>Cruza los dos routers gracias a OSPF</td></tr><tr><td>PC1</td><td>10.39.0.1</td><td>Y de vuelta</td></tr></table>
<figure><img src="img/ospf-ping.png" alt="Ping de PC0 a PC1 en Packet Tracer con TTL 126 y ping a su gateway con TTL 255" style="max-width:100%"><figcaption class="mut">El ping real de la simulación. El primero se pierde mientras se resuelve ARP. TTL 126 = 128 − 2: el paquete pasó por los dos routers.</figcaption></figure>
<h3>7. Si algo falla</h3>
<table><tr><th>Síntoma</th><th>Causa probable</th></tr><tr><td>Interfaz administratively down</td><td>Faltó <code>no shutdown</code></td></tr><tr><td><code>show ip ospf neighbor</code> vacío</td><td>El /30 con IP o máscara distinta en un lado, o el network del enlace mal escrito</td></tr><tr><td>Hay vecino pero no aparece la O</td><td>La LAN no se anunció o su wildcard está mal</td></tr><tr><td>Ping a routers sí, al otro PC no</td><td>Falta el gateway en el PC. En equipos reales, el firewall de Windows</td></tr></table>
<p><a class="btn" href="packet-tracer/lab-ospf-id.pkt">Descargar la simulación en Packet Tracer</a></p>`,
ck:[['Wildcard para anunciar HQ-CORE (/21)',['0.0.7.255','255.255.248.0','0.0.0.255'],0,'255.255.255.255 − 255.255.248.0.'],['¿BRANCH anuncia la red de HQ-CORE?',['Sí','No'],1,'Cada router anuncia solo sus redes conectadas. La otra la aprende por OSPF.'],['Cable entre HQ-CORE y BRANCH',['Directo','Cruzado'],1,'Equipos iguales: cruzado.'],['¿Qué hace passive-interface Gig0/0?',['Apaga la interfaz','Anuncia la red pero no envía Hello a los PC','Borra la ruta'],1,'La LAN sigue en OSPF, pero sin vecinos de ese lado.'],['En [110/2], el 2 es…',['La distancia administrativa','El costo','Los saltos'],1,'Gigabit vale 1: enlace 1 + LAN 1.']]},
{id:'p10',title:'Configura los PC, prueba y guarda',goal:'Cerrar la red y no perder puntos.',html:`
<div class="idea"><b>Imagínalo así.</b> Antes de entregar la casa, pruebas cada luz empezando por la más cercana.</div>
<p>PC, pestaña <b>Desktop</b>, <b>IP Configuration</b>: primera IP, máscara y gateway (último host).</p>
<h3>Prueba en este orden</h3><ol><li>PC a su gateway.</li><li>PC a otro PC de otra VLAN del mismo router.</li><li>Router a router.</li><li>PC a PC remotos.</li></ol><p>El primer ping puede perder un paquete por ARP. Repítelo.</p>
<h3>Guarda en cada router y switch</h3><pre>copy running-config startup-config</pre><p>Enter para confirmar. Revisa los hostname y guarda el archivo con el nombre pedido. En 2025 era <code>ef-Userid.pkt</code>.</p>
<div class="err"><b>Error común.</b> Guardar el archivo sin guardar las configuraciones. Son cosas distintas.</div>`,ck:[['El primer ping que pruebas',['Al PC más lejano','Al gateway'],1,'Así aíslas el problema por partes.']]},
{id:'p11',title:'Diagnostica fallas',goal:'Encontrar el error en menos de 3 minutos.',html:`
<div class="idea"><b>Imagínalo así.</b> Un médico no adivina: mira el síntoma y pide el examen correcto.</div>
<table><tr><th>Síntoma</th><th>Causa probable</th><th>Mira</th></tr><tr><td>PC no llega a su gateway</td><td>Puerto en otra VLAN, VLAN no permitida, IP o máscara mal</td><td>show vlan brief, show interfaces trunk</td></tr><tr><td>Router–switch en rojo</td><td>Falta no shutdown en Fa0/0</td><td>show ip interface brief</td></tr><tr><td>Llega al gateway, no a otra VLAN</td><td>dot1q mal o gateway del otro PC mal</td><td>show running-config</td></tr><tr><td>Serial caído</td><td>Sin clock rate o un lado apagado</td><td>show controllers serial 0/0/0</td></tr><tr><td>Routers se ven, PC remotos no</td><td>Falta ruta de ida o de vuelta</td><td>show ip route</td></tr><tr><td>No aparece la R</td><td>Falta network, o RIP en un solo router</td><td>show ip protocols</td></tr><tr><td>overlaps with…</td><td>Subredes solapadas</td><td>Tu tabla VLSM</td></tr></table>
<div class="ej"><b>Ejercicio.</b> Pide a alguien que dañe una cosa de tu red y encuéntrala con los show.</div>`,ck:[['Los routers se ven, los PC no. Miras…',['show vlan brief','show ip route'],1,'Suele faltar una ruta.']]},
{id:'p12',title:'Dictado de comandos',goal:'Escribir todos los comandos de memoria.',html:`<p>Lee la instrucción y escribe el comando. Acepta abreviaturas como <code>conf t</code> o <code>no shut</code>.</p><div data-w="drill"></div>`,ck:[]},
{id:'p13',title:'El final de 2025, paso a paso',goal:'Resolver un examen real con todo lo anterior.',html:`
<div class="idea"><b>El orden que más puntos asegura:</b> equipos, direcciones, VLAN, troncales, subinterfaces, seriales, rutas, PC, pruebas y guardar.</div>
<table><tr><th>Minuto</th><th>Haz</th></tr><tr><td>0–8</td><td>Tabla en papel: máscara, primer y último host de las 7 redes</td></tr><tr><td>8–18</td><td>Equipos, WIC-2T, cables y nombres</td></tr><tr><td>18–28</td><td>SW1 y SW2: VLAN, puertos, troncales 23 y 24</td></tr><tr><td>28–40</td><td>Subinterfaces y seriales con clock rate 64000</td></tr><tr><td>40–48</td><td>RIP en R1 y R2, estáticas en los tres</td></tr><tr><td>48–52</td><td>PC</td></tr><tr><td>52–60</td><td>Pings y guardar todo</td></tr></table>
<p>Los minutos son una sugerencia mía. El enunciado no dice cuánto dura.</p>
<p><a class="btn p" href="#enunciado/final">Abrir el final de 2025</a></p>`,ck:[]}
];

const $=i=>document.getElementById(i),ipn=o=>[24,16,8,0].map(s=>o>>>s&255).join('.'),mask=p=>ipn(p?(-1<<(32-p))>>>0:0);
if($('mt'))$('mt').innerHTML=[30,29,28,27,26,25,24,23,22,21,20,19].map(p=>`<tr class="mono"><td>/${p}</td><td>${mask(p)}</td><td>${2**(32-p)}</td><td>${2**(32-p)-2}</td><td>${ipn(2**(32-p)-1)}</td></tr>`).join('');
const R=n=>Math.floor(Math.random()*n),sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=R(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
let ex;
function mk(){const ps=[[25,27,28,30],[26,26,27,28,30],[26,27,27,28,30],[25,26,28,30],[26,26,27,27,30]][R(5)],b=R(254)+1;let o=0;const nm=sh(['Ventas','Sistemas','Operaciones','Call Center','CRM']);
const s=ps.map((p,i)=>{const c=2**(32-p),lo=c/2-1,x={n:p==30?'R1–R2':nm[i],p,h:p==30?2:lo+R(c-2-lo+1),o};o+=c;return x});ex={b,s,v:sh(s)};
$('vt').innerHTML=`<p>Red base <b class="mono">192.168.${b}.0 /24</b>. Escribe red y prefijo, de mayor a menor subred.</p><div class="sc"><table><thead><tr><th>Subred</th><th>Hosts</th><th>Red/prefijo</th></tr></thead><tbody>${ex.v.map((x,i)=>`<tr><td>${x.n}</td><td>${x.h}</td><td><input class="mono" id="v${i}" aria-label="Red de ${x.n}" placeholder="192.168.${b}.0/26"> <span id="w${i}"></span></td></tr>`).join('')}</tbody></table></div>`;$('vr').innerHTML=''}
$('vc').onclick=()=>{const used={};let g=0;ex.v.forEach((x,i)=>{const t=$('v'+i).value.replace(/\s/g,''),ok=ex.s.some(y=>y.p==x.p&&t==`192.168.${ex.b}.${y.o}/${y.p}`)&&!used[t];used[t]=1;g+=ok;$('w'+i).className=ok?'ok':'bad';$('w'+i).textContent=ok?'Bien':'Revisa'});$('vr').textContent=`${g} de ${ex.v.length} correctas`};
$('vs').onclick=()=>$('vr').innerHTML='<div class="sc"><table><thead><tr><th>Subred</th><th>Red</th><th>Máscara</th><th>Primer</th><th>Último</th><th>Broadcast</th></tr></thead><tbody class="mono">'+ex.s.map(x=>{const e=x.o+2**(32-x.p)-1;return `<tr><td>${x.n}</td><td>192.168.${ex.b}.${x.o}/${x.p}</td><td>${mask(x.p)}</td><td>.${x.o+1}</td><td>.${e-1}</td><td>.${e}</td></tr>`}).join('')+'</tbody></table></div>';
$('vn').onclick=mk;mk();
const C=[['Entrar a modo privilegiado','enable'],['Entrar a configuración global','configure terminal'],['Poner nombre SW1','hostname SW1'],['Crear la VLAN 25','vlan 25'],['Ponerle nombre Operaciones a la VLAN','name Operaciones'],['Entrar a los puertos 1 a 15 a la vez','interface range fastethernet 0/1-15'],['Poner los puertos en modo acceso','switchport mode access'],['Asignar los puertos a la VLAN 2','switchport access vlan 2'],['Entrar al puerto 24','interface fastethernet 0/24'],['Poner el puerto como troncal','switchport mode trunk'],['Permitir solo VLAN 2 y 5 en el troncal','switchport trunk allowed vlan 2,5'],['Crear la subinterfaz 2 de Fa0/0','interface fastethernet 0/0.2'],['Asociar la subinterfaz a la VLAN 2','encapsulation dot1q 2'],['Asignar 192.168.1.62 /26','ip address 192.168.1.62 255.255.255.192'],['Asignar 192.168.1.174 /28','ip address 192.168.1.174 255.255.255.240'],['Encender la interfaz','no shutdown'],['Entrar a la serial 0/0/0','interface serial 0/0/0'],['Poner reloj de 72000 (DCE)','clock rate 72000'],['Asignar 192.168.1.177 /30','ip address 192.168.1.177 255.255.255.252'],['Ruta a 192.168.1.64/26 por 192.168.1.178','ip route 192.168.1.64 255.255.255.192 192.168.1.178'],['Ruta a 192.168.1.128/27 por 192.168.1.178','ip route 192.168.1.128 255.255.255.224 192.168.1.178'],['R2: ruta a Sistemas 192.168.1.160/28 por 192.168.1.177','ip route 192.168.1.160 255.255.255.240 192.168.1.177'],['Ver las VLAN y sus puertos','show vlan brief'],['Ver los troncales','show interfaces trunk'],['Ver la tabla de enrutamiento','show ip route'],['Ver IP y estado de las interfaces','show ip interface brief'],['Eliminar la VLAN 5','no vlan 5'],['Entrar a configurar RIP','router rip'],['Usar RIP versión 2','version 2'],['Evitar el resumen automático','no auto-summary'],['Anunciar 10.10.92.0/23 en RIP','network 10.0.0.0'],['Anunciar 192.168.50.128/26 en RIP','network 192.168.50.0'],['Ver qué anuncia RIP','show ip protocols'],['Encender OSPF con el proceso 1','router ospf 1'],['Ponerle router-id 1.1.1.1','router-id 1.1.1.1'],['OSPF: anunciar 10.39.0.0/21 en el área 0','network 10.39.0.0 0.0.7.255 area 0'],['OSPF: anunciar el enlace 10.39.10.0/30 en el área 0','network 10.39.10.0 0.0.0.3 area 0'],['No enviar Hello de OSPF hacia los PC de Gig0/0','passive-interface gigabitethernet 0/0'],['Ver los vecinos OSPF','show ip ospf neighbor'],['Guardar la configuración','copy running-config startup-config']];
const tok=s=>s.toLowerCase().trim().replace(/\b(fa[a-z]*|s|se[a-z]*|gi[a-z]*)(\d)/g,'$1 $2').replace(/\s*([,-])\s*(?=\d)/g,'$1').split(/\s+/);
function match(t,e){const a=tok(t),b=tok(e);return a.length==b.length&&b.every((w,i)=>a[i]==w||(/^[a-z-]+$/.test(w)&&a[i].length>=(/serial|fast|terminal/.test(w)?1:2)&&w.startsWith(a[i])))}
let d=0,dg=0,dt=0,dk=false;
function dr(){dk=false;$('dq').innerHTML='<b>'+C[d][0]+'</b>';$('di').value='';$('dr').textContent='';$('ds').textContent=`${d+1} de ${C.length} · ${dg} bien de ${dt}`}
$('df').onsubmit=e=>{e.preventDefault();const ok=match($('di').value,C[d][1]);if(!dk){dt++;dg+=ok;dk=true}$('dr').innerHTML=`<span class="${ok?'ok':'bad'}">${ok?'Bien':'No'}</span> <code>${C[d][1]}</code>`;$('ds').textContent=`${d+1} de ${C.length} · ${dg} bien de ${dt}`};
$('dn').onclick=()=>{d=(d+1)%C.length;dr();$('di').focus()};dr();
let bk='f',ord,qi=0,sel=[],done=false,st={};try{st=JSON.parse(localStorage.finalRedes||'{}')}catch(e){}
function load(a){ord=a||DATA[bk].map((_,i)=>i);qi=0;show()}
function show(){sel=[];done=false;const q=DATA[bk][ord[qi]],m=q.type=='multi';const v=Object.keys(st).filter(k=>k[0]==bk);
$('q').innerHTML=`<p class="mut">${qi+1} de ${ord.length} · aciertos guardados ${v.filter(k=>st[k]).length} de ${v.length} respondidas</p>${stem(q)}${m?`<p class="mut">Marca ${q.a.length}.</p>`:''}<div id="os">${q.type=='text'?'<input id="qt" class="mono" aria-label="Respuesta">':q.opts.map((o,i)=>`<button class="opt" data-i="${i}" aria-pressed="false"><b>${String.fromCharCode(65+i)}</b><span>${o}</span></button>`).join('')}</div><div id="qr" aria-live="polite"></div><div class="row"><button id="qb">Anterior</button><button class="p" id="qc">Responder</button><button id="qx">Siguiente</button></div>`;
$('os').querySelectorAll('.opt').forEach(b=>b.onclick=()=>{if(done)return;const i=+b.dataset.i;sel=m?(sel.includes(i)?sel.filter(x=>x!=i):[...sel,i]):[i];$('os').querySelectorAll('.opt').forEach(x=>{const s=sel.includes(+x.dataset.i);x.classList.toggle('sel',s);x.setAttribute('aria-pressed',s)})});
$('qb').onclick=()=>{qi=(qi+ord.length-1)%ord.length;show()};$('qx').onclick=()=>{qi=(qi+1)%ord.length;show()};
$('qc').onclick=()=>{if(done)return;const tx=q.type=='text';if(!tx&&!sel.length){$('qr').textContent='Elige una opción.';return}done=true;const A=[].concat(q.a),ok=tx?$('qt').value.trim()==q.a:m?A.length==sel.length&&A.every(x=>sel.includes(x)):A.includes(sel[0])||(q.alt||[]).includes(sel[0]);
st[bk+ord[qi]]=ok?1:0;try{localStorage.finalRedes=JSON.stringify(st)}catch(e){}
if(!tx)$('os').querySelectorAll('.opt').forEach(x=>{const i=+x.dataset.i;if(A.includes(i)||(q.alt||[]).includes(i))x.classList.add('good');else if(sel.includes(i))x.classList.add('no')});
$('qr').innerHTML=`<p class="${ok?'ok':'bad'}">${ok?'Correcta':'Incorrecta'}${tx?' · '+q.a:''}</p><p>${q.expl}</p>${vis(bk,ord[qi])}${q.cap?`<details open><summary>Captura real completa</summary><img class="full" src="${q.cap.src}" alt="Captura completa de la pregunta"></details>`:''}${q.flag?`<p class="warn">Aviso: ${q.flag}</p>`:''}`}}
$('bank').onchange=e=>{bk=e.target.value;load()};$('rnd').onclick=()=>load(sh(DATA[bk].map((_,i)=>i)));
$('miss').onclick=()=>{const f=DATA[bk].map((_,i)=>i).filter(i=>st[bk+i]===0);f.length?load(f):$('qr').textContent='No tienes falladas en este banco.'};load();

function stem(q){const k=q.cap;if(!k)return q.html+(q.img?'<p><img alt="Figura de la pregunta" src="'+DATA.img[q.img]+'"></p>':'')+(q.html2||'');const r=k.w/(k.h*(k.b-k.t));return (q.lead||'')+'<div class="cap" style="max-width:'+Math.min(760,k.w>k.h?760:520)+'px;aspect-ratio:'+r.toFixed(4)+'"><img alt="Captura real del enunciado" src="'+k.src+'" style="margin-top:-'+(k.t*k.h/k.w*100).toFixed(2)+'%"></div>'+(k.b==1?q.html2||'':'')}
const ALL=[...TEORIA,...PRACTICA],BN={f:'Examen Final',p:'Parcial 2',q:'Parcial 1'};
let done2={};try{done2=JSON.parse(localStorage.troncalLec||'{}')}catch(e){}
const saveL=()=>{try{localStorage.troncalLec=JSON.stringify(done2)}catch(e){}};
const trackOf=id=>id[0]=='t'?TEORIA:PRACTICA,cnt=T=>T.filter(l=>done2[l.id]).length,nextOf=T=>T.find(l=>!done2[l.id])||T[0];
const home={};['vlsm','net','drill'].forEach(w=>home[w]=$('w-'+w));
function card(T,id,t,d){const n=nextOf(T),c=cnt(T);return `<article class="track"><h2>${t}</h2><p>${d}</p><p class="mut">${c} de ${T.length} lecciones terminadas</p><div class="bar"><i style="transform:scaleX(${c/T.length})"></i></div><div class="row"><a class="btn p" href="#l/${n.id}">${c==T.length?'Repasar':c?'Continuar':'Empezar'}</a><a class="btn" href="#${id}">Ver temario</a></div></article>`}
function toc(T,cur){return '<ol class="toc">'+T.map(l=>`<li class="${done2[l.id]?'dn':''}"><a href="#l/${l.id}" ${l.id==cur?'aria-current="page"':''}><span class="tick" aria-hidden="true">${done2[l.id]?'✓':T.indexOf(l)+1}</span><span>${l.title}${done2[l.id]?'<span class="vh"> (terminada)</span>':''}</span></a></li>`).join('')+'</ol>'}
function related(l){const r=[];(l.f||[]).forEach(i=>r.push(['f',i]));(l.p||[]).forEach(i=>r.push(['p',i]));if(l.all1)DATA.q.forEach((_,i)=>r.push(['q',i]));return r}
function lesson(id){const l=ALL.find(x=>x.id==id)||TEORIA[0],T=trackOf(l.id),i=T.indexOf(l),r=related(l),v=$('lec');
 Object.values(home).forEach(n=>$('park').append(n));
 v.innerHTML=`<div class="course"><aside class="out"><p><b>${T==TEORIA?'Teoría':'Práctica'}</b></p>${toc(T,l.id)}${T==TEORIA?'<a href="#preguntas">Todas las preguntas</a>':'<a href="#practica">Enunciados</a>'}</aside><article class="les"><p class="mut">Lección ${i+1} de ${T.length}</p><h1>${l.title}</h1><p class="goal">${l.goal}</p>${l.html.replace('</div>',()=>'</div>'+VM.LV[l.id]()).replace(/<table>/g,'<div class="sc"><table>').replace(/<\/table>/g,'</table></div>')}${l.ck.length?'<h2>Comprueba que entendiste</h2>'+l.ck.map((c,k)=>`<fieldset class="ck" data-k="${k}"><legend>${c[0]}</legend>${c[1].map((o,j)=>`<button type="button" class="opt" data-j="${j}">${o}</button>`).join('')}<p aria-live="polite"></p></fieldset>`).join(''):''}${r.length?`<h2>Así lo preguntan en el parcial</h2><p>${r.length} preguntas de este tema. Intenta responder antes de abrir la respuesta.</p>${r.map(([b,n])=>qa(b,n,false)).join('')}`:''}<div class="row end">${i?`<a class="btn" href="#l/${T[i-1].id}">Anterior</a>`:''}<button class="p" id="fin">${i<T.length-1?'Terminé, siguiente lección':T==TEORIA?'Terminé, ver todas las preguntas':'Terminé, ver enunciados'}</button></div></article></div>`;
 v.querySelectorAll('[data-w]').forEach(s=>s.append(home[s.dataset.w]));
 v.querySelectorAll('.ck').forEach(f=>f.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const c=l.ck[f.dataset.k],ok=+b.dataset.j==c[2];f.querySelectorAll('.opt').forEach(x=>x.classList.remove('good','no'));b.classList.add(ok?'good':'no');f.querySelector('p').innerHTML=`<span class="${ok?'ok':'bad'}">${ok?'Correcto.':'Todavía no.'}</span> ${ok?c[3]:'Vuelve a leer la explicación e intenta otra.'}`}));
 $('fin').onclick=()=>{done2[l.id]=1;saveL();location.hash=i<T.length-1?'#l/'+T[i+1].id:T==TEORIA?'#preguntas':'#practica'}}
function qa(b,n,open){const q=DATA[b][n],A=[].concat(q.a);const ans=q.type=='text'?`<p class="ans">Respuesta: <b>${q.a}</b></p>`:'<ul class="ol">'+q.opts.map((o,j)=>`<li class="${A.includes(j)?'yes':''}">${A.includes(j)?'<b class="ok">Correcta</b> ':(q.alt||[]).includes(j)?'<b class="warn">También defendible</b> ':''}${o}</li>`).join('')+'</ul>';
 const ops=q.type=='text'?'':'<ul class="ol pre">'+q.opts.map(o=>`<li>${o}</li>`).join('')+'</ul>';
 return `<article class="qa"><p class="mut">${BN[b]}, pregunta ${n+1}</p><div class="stem">${stem(q)}</div>${open?'':ops}<details ${open?'open':''}><summary>${open?'Respuesta y porqué':'Ver respuesta y porqué'}</summary>${ans}<p><b>Por qué.</b> ${q.expl}</p>${vis(b,n)}${q.flag?`<p class="warn"><b>Aviso.</b> ${q.flag}</p>`:''}${q.cap?`<details><summary>Captura original</summary><img class="full" loading="lazy" src="${q.cap.src}" alt="Captura original de la pregunta"></details>`:''}</details></article>`}
const TP={};TEORIA.forEach(l=>related(l).forEach(([b,n])=>TP[b+n]=l.id));
$('ft').innerHTML='<option value="">Todos los temas</option>'+TEORIA.map(l=>`<option value="${l.id}">${l.title}</option>`).join('');
function listQ(){const b=$('fb').value,t=$('ft').value,s=$('fs').value.toLowerCase(),o=$('fo').checked,out=[];['f','p','q'].forEach(k=>{if(b&&b!=k)return;DATA[k].forEach((q,n)=>{if(t&&TP[k+n]!=t)return;if(s&&!(q.html+(q.html2||'')+(q.opts||[]).join(' ')+q.expl+(q.txt||'')).toLowerCase().includes(s))return;out.push(qa(k,n,o))})});$('fl').innerHTML=out.join('')||'<p>Ninguna pregunta coincide. Cambia el filtro.</p>';$('fc').textContent=out.length+' preguntas'}
['fb','ft','fo'].forEach(i=>$(i).onchange=listQ);let ti;$('fs').oninput=()=>{clearTimeout(ti);ti=setTimeout(listQ,200)};
function showLab(id){const l=L.LABS.find(x=>x.id==id)||L.LABS[0];$('enu').innerHTML=`<p><a href="#practica">Volver a Práctica</a></p><h1>${l.title}</h1><p class="mut">${l.src}</p><div class="row"><a class="btn" href="enunciados/${l.file}.pdf" target="_blank">Abrir PDF</a><button id="tm">Iniciar ${l.min} minutos</button><span id="tc" class="mono" role="timer"></span></div>${l.id=='final'?'<details class="box"><summary>Ver las fotos del enunciado real</summary><div class="photos"><img src="img/final-2025-1.jpg" alt="Primera hoja del examen final de mayo de 2025"><img src="img/final-2025-2.jpg" alt="Segunda hoja del examen"></div></details>':''}${L.statement(l)}<details class="box"><summary>Ver solución completa</summary>${L.solution(l)}</details>`;
 $('tm').onclick=()=>{clearInterval(window.tk);const end=Date.now()+l.min*6e4,f=()=>{const t=$('tc'),s=Math.max(0,Math.round((end-Date.now())/1e3));if(!t)return clearInterval(window.tk);t.textContent=s?Math.floor(s/60)+':'+String(s%60).padStart(2,'0'):'Tiempo. Verifica tus pings.';if(!s)clearInterval(window.tk)};f();window.tk=setInterval(f,1e3)}}
const PAGES=['inicio','teoria','practica','lec','enu','preguntas','simulacro','video'];
function route(){let[a,b]=(location.hash.slice(1)||'inicio').split('/');let pg=a=='l'?'lec':a=='enunciado'?'enu':PAGES.includes(a)?a:'inicio';
 PAGES.forEach(p=>$(p).hidden=p!=pg);
 if(pg=='lec')lesson(b);if(pg=='enu')showLab(b);if(pg=='preguntas')listQ();if(pg=='video')VID(b);else{const vp=$('vplayer');if(vp&&!vp.paused)vp.pause()}
 if(pg=='inicio')$('tracks').innerHTML=card(TEORIA,'teoria','Teoría',TEORIA.length+' temas explicados desde cero, cada uno con las preguntas del parcial que le corresponden.')+card(PRACTICA,'practica','Práctica','Cisco Packet Tracer de principio a fin, hasta resolver un final real.');
 if(pg=='teoria')$('tt').innerHTML=toc(TEORIA);if(pg=='practica')$('tp').innerHTML=toc(PRACTICA);
 const tab=pg=='lec'?(b&&b[0]=='p'?'practica':'teoria'):pg=='enu'?'practica':pg;document.querySelectorAll('.top nav a').forEach(x=>x.getAttribute('href')=='#'+tab?x.setAttribute('aria-current','page'):x.removeAttribute('aria-current'));scrollTo(0,0)}
$('lablist').innerHTML=L.LABS.map(l=>`<div class="lab"><div><h3 style="margin:0">${l.title}</h3><p class="mut">${l.src}. ${l.min} minutos.</p></div><div class="row"><a class="btn p" href="#enunciado/${l.id}">Abrir enunciado</a><a class="btn" href="enunciados/${l.file}.pdf" target="_blank">PDF</a></div></div>`).join('');
document.addEventListener('click',async e=>{const b=e.target.closest('.copy');if(!b)return;const t=b.closest('.cfg').querySelector('pre').textContent;try{await navigator.clipboard.writeText(t)}catch(_){const x=document.createElement('textarea');x.value=t;document.body.append(x);x.select();document.execCommand('copy');x.remove()}b.textContent='Copiado';setTimeout(()=>b.textContent='Copiar',1500)});
// Organización visual: módulos, iconos y pasos que se abren uno a uno
const IC={prof:'M3 4h18v12H3zM8 20h8M12 16v4M7 8h6M7 11h10',r1:'M12 3v4M5 10h14M5 10v4M19 10v4M12 7v3M3 14h4v4H3zM17 14h4v4h-4zM10 14h4v4h-4zM12 10v4',r2:'M4 6h16v12H4zM4 9h16M8 6v3M12 6v3',r3:'M4 4h16v16H4zM12 4v16M4 12h16',r4:'M4 12h12M12 7l5 5l-5 5M18 5v14',r5:'M5 6h5v4H5zM14 6h5v4h-5zM9 16h6v4H9zM10 8h4M8 10l3 6M16 10l-3 6',t15:'M5 5h4v4H5zM15 5h4v4h-4zM10 15h4v4h-4zM9 7h6M7 9l4 6M17 9l-4 6',p14:'M3 9h5v6H3zM16 9h5v6h-5zM8 12h8M12 4v4M12 16v4',t1:'M4 5h16v4H4zM4 10.5h16v4H4zM4 16h16v4H4z',t2:'M9 3h6v5H9zM10 8v4a2 2 0 0 0 4 0V8M12 14v3a4 4 0 0 1-8 0',t3:'M3 8h18v9H3zM6 11h5m-2-2l2 2l-2 2M18 14h-5m2-2l-2 2l2 2',t4:'M12 3l8 3v6c0 5-4 8-8 9c-4-1-8-4-8-9V6zM8.5 12l2.5 2.5l4.5-5',t5:'M3 6h18v12H3zM9 6v12M15 6v12M6 10v4M12 10v4M18 10v4',t6:'M3 12h18M3 8v8M21 8v8M9 10v4M15 10v4',t7:'M12 11V7a4 4 0 0 1 8 0M4 11h13v10H4zM10.5 15v2',t8:'M12 3a9 9 0 1 0 9 9h-9zM15 3v6h6a7 7 0 0 0-6-6z',t9:'M4 9v6h4l6 5V4L8 9zM17 9a4 4 0 0 1 0 6M19.5 6a8 8 0 0 1 0 12',t10:'M8 3h8v18H8zM13 12h.5M3 12h5M5 9l3 3l-3 3',t11:'M12 3v18M12 5h7l2 2.5L19 10h-7M12 12H5l-2 2.5L5 17h7',t12:'M5 19a2 2 0 1 0 0-4a2 2 0 0 0 0 4zM19 9a2 2 0 1 0 0-4a2 2 0 0 0 0 4zM7 17h6a4 4 0 0 0 0-8h-1a2 2 0 0 1 0-4h5',t13:'M3 4h8v7H3zM13 4h8v7h-8zM3 13h8v7H3zM13 13h8v7h-8z',t14:'M3 12h7M10 12c5 0 4-7 10-7M10 12h10M10 12c5 0 4 7 10 7',
p1:'M4 8l8-5l8 5v9l-8 5l-8-5zM4 8l8 5l8-5M12 13v9',p2:'M3 4h18v16H3zM7 9l3 3l-3 3M12.5 15H17',p3:'M5 3h14v18H5zM8 8h8M8 12h8M8 16h4',p4:'M12 3v5M5 21v-5M19 21v-5M12 21v-5M5 16v-3h14v3M9 8h6v5H9z',p5:'M3 9h18M3 15h18M7 6l-4 3l4 3M17 12l4 3l-4 3',p6:'M4 4h16v6H4zM6 10v10M12 10v10M18 10v10',p7:'M13 2L5 13h6l-1 9l8-12h-6z',p8:'M12 22s7-7 7-12a7 7 0 0 0-14 0c0 5 7 12 7 12zM12 12a2 2 0 1 0 0-4a2 2 0 0 0 0 4z',p9:'M4 5h11v8H9l-5 4zM9 16h5l6 4V9h-2',p10:'M5 3h12l3 3v15H5zM8 3v6h8V3M8 21v-7h9v7',p11:'M10 17a7 7 0 1 0 0-14a7 7 0 0 0 0 14zM15 15l6 6M7 10h2l1-3l2 6l1-3h1',p12:'M2 6h20v12H2zM6 10h.5M10 10h.5M14 10h.5M18 10h.5M7 14h10',p13:'M6 3v18M6 4h13l-3 4.5L19 13H6',
idea:'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c1 1 1 2 1 2.500h6c0-.5 0-1.500 1-2.500A6 6 0 0 0 12 3z',exp:'M4 5c3-1.500 6-1 8 1c2-2 5-2.500 8-1v14c-3-1.500-6-1-8 1c-2-2-5-2.500-8-1zM12 6v14',err:'M12 3L2 20h20zM12 9v5M12 17v.5',ck:'M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18zM8 12l3 3l5-6',qs:'M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18zM9.500 9.500a2.500 2.500 0 1 1 3.500 2.300c-.7.4-1 .9-1 1.700M12 17v.3',all:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z'};
const ico=(k,c='')=>`<svg class="ic ${c}" viewBox="0 0 24 24" aria-hidden="true"><path d="${IC[k]}"/></svg>`;
const MODS=[['Fundamentos','Cómo viaja un mensaje','m1',['t1','t2']],['Capa de enlace','Switches, tramas y errores','m2',['t3','t4']],['Direcciones IP','De la máscara a VLSM','m3',['t5','t6','r3','t7','t8']],['El paquete y los equipos','IP, ARP y DHCP','m4',['r2','t9','t10']],['Enrutamiento','El camino entre redes','m5',['r1','t11','r4','t12','r5','t15']],['VLAN','Separar y volver a unir','m6',['t13','t14']],
['Prepararte','Equipos, consola y plano','m1',['p1','p2','p3']],['El switch','VLAN y troncales','m2',['p4','p5']],['El router','Gateways y enlace serial','m3',['p6','p7']],['Las rutas','Estáticas y RIP','m4',['p8','p9','p14']],['Cerrar bien','Probar, guardar y reparar','m5',['p10','p11']],['Dominarlo','Memoria y examen real','m6',['p12','p13']]];
const DK={intro:'Introducción',fis1:'Capa Física I',fis2:'Capa Física II',enl1:'Capa de Enlace I',enl2:'Capa de Enlace II',rintro:'Capa de Red, Intro',rip:'Capa de Red, Direccionamiento IP',rsub:'Capa de Red, Subnetting y VLSM',renr:'Capa de Red, Enrutamiento',rvlan:'Capa de Red, VLAN'};
const rg=(a,b)=>Array.from({length:b-a+1},(_,i)=>a+i);
const SL={t1:[['intro',rg(9,28)],['rintro',[2,14,15,16,17]]],t2:[['fis1',rg(1,41)],['fis2',rg(1,51)]],t3:[['enl2',rg(9,46)]],t4:[['enl1',rg(1,31)],['enl2',rg(1,8)]],
t5:[['rip',rg(1,10)]],t6:[['rsub',[7,8,10,11,17,20]]],r3:[['rsub',rg(1,20)],['rsub',[30]]],t7:[['rip',rg(8,14)]],t8:[['rsub',rg(21,30)]],
r2:[['rip',rg(21,26)]],t9:[['rip',rg(27,32)]],t10:[['rip',rg(15,20)]],
r1:[['rintro',rg(1,17)]],t11:[['renr',[1,2,3,4,5,6,7,25,26]]],r4:[['renr',rg(8,33)]],t12:[['renr',[21,22,23,27,28,29,30,31,32,33,53,54]]],r5:[['renr',rg(34,54)]],t15:[['renr',rg(55,67)]],
t13:[['rvlan',rg(1,12)]],t14:[['rvlan',[11,12,13,14]]],
p3:[['rsub',[28,29]]],p4:[['rvlan',[12]]],p5:[['rvlan',[11,12]]],p6:[['rvlan',[13]]],p8:[['renr',[21,22,23,24]]],p9:[['renr',[53,54]]],p14:[['renr',[66,67]]],p10:[['rip',[16,17,20]]]};
const pad=n=>String(n).padStart(3,'0');
const gal=id=>{const G=SL[id];return '<p>Estas son las diapositivas reales de clase que corresponden a este tema. Toca una para verla en grande.</p>'+G.map(([d,ns])=>'<h4 class="vt">'+DK[d]+'</h4><div class="gal">'+ns.map(n=>'<a href="diapos/'+d+'/'+pad(n)+'.jpg" target="_blank" rel="noopener"><img loading="lazy" src="diapos/'+d+'/'+pad(n)+'.jpg" alt="Diapositiva '+n+' de '+DK[d]+'"><span>Diapositiva '+n+'</span></a>').join('')+'</div>').join('')};
const nsl=id=>(SL[id]||[]).reduce((a,g)=>a+g[1].length,0);
const modOf=id=>MODS.find(m=>m[3].includes(id)),lec=id=>ALL.find(l=>l.id==id);
function toc(T,cur){const M=MODS.filter(m=>T.some(l=>l.id==m[3][0]));
 if(cur)return M.map(m=>{const on=m[3].includes(cur);return `<details class="sm ${m[2]}" name="sm" ${on?'open':''}><summary>${m[0]}<span class="mut">${m[3].filter(x=>done2[x]).length}/${m[3].length}</span></summary>${m[3].map(id=>`<a href="#l/${id}" ${id==cur?'aria-current="page"':''}>${ico(id)}<span>${lec(id).title}</span>${done2[id]?'<b class="ok">✓<span class="vh"> terminada</span></b>':''}</a>`).join('')}</details>`}).join('');
 return '<div class="mods">'+M.map((m,mi)=>`<section class="mod ${m[2]}${m[3].length>2||mi==M.length-1?' wide':''}"><header><h2>${m[0]}</h2><p>${m[1]}</p></header><div class="cards">${m[3].map(id=>{const l=lec(id),n=related(l).length;return `<a class="tc" href="#l/${id}"><span class="art">${ico(id)}${done2[id]?'<span class="badge">Terminada</span>':''}</span><b>${l.title}</b><span class="mut">${l.goal}</span>${n?`<span class="mut num">${n} preguntas de parcial</span>`:''}</a>`}).join('')}</div></section>`).join('')+'</div>'}
function card(T,id,t,d){const n=nextOf(T),c=cnt(T),M=MODS.filter(m=>T.some(l=>l.id==m[3][0]));return `<article class="track"><div class="strip">${M.map(m=>`<span class="${m[2]}">${ico(m[3][0])}</span>`).join('')}</div><h2>${t}</h2><p>${d}</p><p class="mut">${c} de ${T.length} temas terminados</p><div class="bar"><i style="transform:scaleX(${c/T.length})"></i></div><div class="row"><a class="btn p" href="#l/${n.id}">${c==T.length?'Repasar':c?'Continuar':'Empezar'}</a><a class="btn" href="#${id}">Ver temas</a></div></article>`}
const strip=h=>{const d=document.createElement('div');d.innerHTML=(h||'').split('<').join(' <');return d.textContent.replace(/\s+/g,' ').replace(/ ([.,:;?])/g,'$1').trim()};
const QT={f4:'¿Qué indica show interface trunk?',f6:'¿Qué tres afirmaciones son ciertas de esta configuración?',f9:'¿Cuántas entradas tiene al menos la tabla de R1?',f11:'¿Qué dos hechos de RIP muestra show ip route?',f13:'PC0 no llega a HG: ¿cuál es la causa?',f16:'Leer ipconfig: asignación, router y DNS',f18:'¿Qué enunciado sobre la línea [120/3] es falso?',f22:'Switch C3560 con ip routing y router rip',f25:'¿Qué máscara decimal es /25?',f27:'¿Es correcta esta asignación VLSM?',f28:'¿Qué hace el switch con una trama de destino desconocido?',f29:'¿Cuál es la IP de R2 en Serial0/1/0?',f30:'La deseabilidad del protocolo RIP',p5:'Primer host de 10.0.0.0 /16',p17:'DHCP Discover: ¿son correctas las IP origen y destino?',p19:'¿Qué máscara decimal es /25?',p21:'¿Es correcta esta asignación VLSM?',p27:'¿Qué polinomio generó este CRC?',p28:'CSMA persistente-p: ¿continuo o ranurado?',p32:'¿Qué campos faltan en la trama?',p38:'Grado del polinomio CRC en Ethernet',p42:'Último host de 10.0.0.0 /16',p50:'¿Tiene éxito el ping a 192.168.2.2?',p52:'Trama hacia 224.0.0.200: ¿es unicast?',p58:'ping y arp -a: ¿qué afirmación es falsa?',p59:'¿Por qué aparece PC1 en la tabla ARP de PC2?',q6:'¿Qué podemos afirmar de esta PDU?',q13:'¿Cómo se llama agregar encabezados capa a capa?',q18:'¿Qué capa controla los turnos del diálogo?',q19:'¿Qué capa inserta los puntos syn?',q22:'¿Qué enunciado de esta topología es falso?',q27:'¿Qué tipo de conector óptico es?'};
function qTitle(b,n){if(QT[b+n])return QT[b+n];const q=DATA[b][n],a=strip(q.html),z=strip(q.html2);let t=(a+' '+z).trim();if(/10\.31\.0\.0/.test(t))return 'VLSM de Cisco System: máscara de '+(/Argentina\s*\?/.test(t)?'Argentina':'Colombia');
 const pr=t.match(/¿[^?]{25,}\?/);if(pr&&t.length>110)t=pr[0];t=(t.replace(/^(Consulte|Analice|Analiza|Observe|Observa) [^.:]*[.:]\s*/,'')||a).trim();t=t.charAt(0)=='¿'?'¿'+t.charAt(1).toUpperCase()+t.slice(2):t;if(!t)t=VZtitle(b,n);return t.length>150?t.slice(0,147).replace(/\s\S*$/,'')+'…':t}
function VZtitle(b,n){return 'Sobre la imagen: '+lec(TP[b+n]).title.toLowerCase()}
const qrow=(b,n,mode,g)=>`<details class="qr ${modOf(TP[b+n])[2]}" data-b="${b}" data-n="${n}" data-m="${mode}" ${g?`name="${g}"`:''}><summary>${ico(TP[b+n])}<span><b>${qTitle(b,n)}</b><span class="mut">${BN[b]}, pregunta ${n+1}</span></span></summary><div class="qin"></div></details>`;
document.addEventListener('toggle',e=>{const d=e.target;if(d.matches&&d.matches('.qr')&&d.open&&!d.dataset.ok){d.dataset.ok=1;d.querySelector('.qin').innerHTML=qa(d.dataset.b,+d.dataset.n,d.dataset.m=='1')}},true);
function steps(l){const d=document.createElement('div'),S=[];d.innerHTML=l.html.replace(/<table>/g,'<div class="sc"><table>').replace(/<\/table>/g,'</table></div>');let c=null;const add=(k,t)=>{c={k,t,h:''};S.push(c)};
 [...d.children].forEach(n=>{if(n.matches('.idea')){add('idea','La idea en sencillo');c.h+=n.outerHTML+VM.LV[l.id]();return}if(n.matches('.err')){add('err','El error común');c.h+=n.outerHTML;return}if(n.matches('h3')){add('exp',n.textContent);return}if(!c||c.k=='idea')add('exp','Cómo funciona');c.h+=n.outerHTML});return S}
function lesson(id){const l=lec(id)||TEORIA[0],T=trackOf(l.id),i=T.indexOf(l),r=related(l),v=$('lec'),m=modOf(l.id);Object.values(home).forEach(n=>$('park').append(n));const S=steps(l);if(SL[l.id])S.push({k:'prof',t:'Así lo explicó tu profesor ('+nsl(l.id)+' diapositivas)',h:gal(l.id)});
 if(l.ck.length)S.push({k:'ck',t:'Comprueba que entendiste',h:l.ck.map((c,k)=>`<fieldset class="ck" data-k="${k}"><legend>${c[0]}</legend>${c[1].map((o,j)=>`<button type="button" class="opt" data-j="${j}">${o}</button>`).join('')}<p aria-live="polite"></p></fieldset>`).join('')});
 if(r.length)S.push({k:'qs',t:`Preguntas del parcial (${r.length})`,h:'<p>Abre una, piensa tu respuesta y luego mírala.</p>'+r.map(([b,n])=>qrow(b,n,0,'')).join('')});
 v.innerHTML=`<div class="course"><aside class="out"><p><a href="#${T==TEORIA?'teoria':'practica'}">${T==TEORIA?'Todos los temas de teoría':'Todos los temas de práctica'}</a></p>${toc(T,l.id)}</aside><article class="les ${m[2]}"><header class="lh"><span class="art">${ico(l.id)}</span><div><p class="mut">${m[0]}, tema ${i+1} de ${T.length}</p><h1>${l.title}</h1><p class="goal">${l.goal}</p></div></header><div class="row"><button type="button" id="oa">Abrir todos los pasos</button></div><div class="steps">${S.map((s,k)=>`<details class="st k-${s.k}" ${k?'':'open'}><summary><span class="si">${ico(s.k)}</span><span>${s.t}</span></summary><div class="sb">${s.h}${k<S.length-1?`<button type="button" class="nx p">Seguir con: ${S[k+1].t}</button>`:''}</div></details>`).join('')}</div><div class="row end">${i?`<a class="btn" href="#l/${T[i-1].id}">Tema anterior</a>`:''}<button class="p" id="fin">${i<T.length-1?'Terminé, siguiente tema':T==TEORIA?'Terminé, ver todas las preguntas':'Terminé, ver enunciados'}</button></div></article></div>`;
 v.querySelectorAll('[data-w]').forEach(s=>s.append(home[s.dataset.w]));
 const D=[...v.querySelectorAll('.st')];v.querySelectorAll('.nx').forEach((b,k)=>b.onclick=()=>{D[k].classList.add('seen');D[k+1].open=true;D[k+1].scrollIntoView({block:'start'});D[k+1].querySelector('summary').focus({preventScroll:true})});
 v.querySelectorAll('.ck').forEach(f=>f.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{const c=l.ck[f.dataset.k],ok=+b.dataset.j==c[2];f.querySelectorAll('.opt').forEach(x=>x.classList.remove('good','no'));b.classList.add(ok?'good':'no');f.querySelector('p').innerHTML=`<span class="${ok?'ok':'bad'}">${ok?'Correcto.':'Todavía no.'}</span> ${ok?c[3]:'Vuelve a leer la explicación e intenta otra.'}`}));
 $('oa').onclick=()=>{const o=D.some(x=>!x.open);D.forEach(x=>x.open=o);$('oa').textContent=o?'Cerrar todos los pasos':'Abrir todos los pasos'};$('fin').onclick=()=>{done2[l.id]=1;saveL();location.hash=i<T.length-1?'#l/'+T[i+1].id:T==TEORIA?'#preguntas':'#practica'}}
function qcard(b,n){const q=DATA[b][n],A=[].concat(q.a),al=q.alt||[],tx=q.type=='text';
 const ops=tx?'<p class="o2"><span class="hid">La respuesta se escribe</span><b class="shw ok">Respuesta: '+q.a+'</b></p>':'<ol class="o2" type="A">'+q.opts.map((o,j)=>'<li class="'+(A.includes(j)?'yes':al.includes(j)?'alt':'')+'"><span>'+o+'</span>'+(A.includes(j)?'<b class="shw tagc">✓ Correcta</b>':al.includes(j)?'<b class="shw taga">También defendible</b>':'')+'</li>').join('')+'</ol>';
 return '<article class="qc '+modOf(TP[b+n])[2]+'" data-b="'+b+'" data-n="'+n+'"><p class="mut">'+BN[b]+', pregunta '+(n+1)+'</p><div class="stem">'+stem(q)+'</div>'+(A.length>1&&!tx?'<p class="mut">Son '+A.length+' respuestas correctas.</p>':'')+ops+'<div class="row"><button type="button" class="rv" aria-expanded="false">Mostrar respuesta</button></div><details class="shw why"><summary>Por qué y gráfico</summary><div></div></details></article>'}
function reveal(c,on){c.classList.toggle('rev',on);const r=c.querySelector('.rv');r.textContent=on?'Ocultar respuesta':'Mostrar respuesta';r.setAttribute('aria-expanded',on)}
document.addEventListener('click',e=>{const r=e.target.closest('.rv');if(r){const c=r.closest('.qc');reveal(c,!c.classList.contains('rev'))}});
document.addEventListener('toggle',e=>{const d=e.target;if(d.matches&&d.matches('.why')&&d.open){const x=d.querySelector('div'),c=d.closest('.qc');if(!x.innerHTML){const q=DATA[c.dataset.b][+c.dataset.n];x.innerHTML='<p>'+q.expl+'</p>'+(q.flag?'<p class="warn"><b>Aviso.</b> '+q.flag+'</p>':'')+vis(c.dataset.b,+c.dataset.n)+(q.cap?'<details><summary>Captura original</summary><img class="full" src="'+q.cap.src+'" alt="Captura original de la pregunta"></details>':'')}}},true);
function listQ(e){if(e&&e.target&&e.target.id=='fo'){$('fl').querySelectorAll('.qc').forEach(c=>reveal(c,$('fo').checked));return}
 const b=$('fb').value,t=$('ft').value,s=$('fs').value.toLowerCase(),out=[];['f','p','q'].forEach(k=>{if(b&&b!=k)return;DATA[k].forEach((q,n)=>{if(t&&TP[k+n]!=t)return;if(s&&!(qTitle(k,n)+(q.html||'')+(q.html2||'')+(q.opts||[]).join(' ')+q.expl).toLowerCase().includes(s))return;out.push(qcard(k,n))})});
 $('fl').innerHTML=out.join('')||'<p>Ninguna pregunta coincide. Cambia el filtro.</p>';$('fc').textContent=out.length+' preguntas';if($('fo').checked)$('fl').querySelectorAll('.qc').forEach(c=>reveal(c,true))}
// Ping interactivo sobre la topología del final
const FL=L.LABS[1],G=L.graph(FL);$('net').innerHTML=L.topo(FL,'live');
const pcs=FL.nets.map(n=>`<option>${n.pc}</option>`).join('');$('po').innerHTML=pcs;$('pd').innerHTML=pcs;$('pd').value='PC4';
function path(a,b){const q=[[a]],seen={[a]:1};while(q.length){const p=q.shift(),c=p[p.length-1];if(c==b)return p;G.ed.forEach(([x,y])=>{const n=x==c?y:y==c?x:0;if(n&&!seen[n]){seen[n]=1;q.push([...p,n])}})}}
$('pg').onclick=()=>{const a=$('po').value,b=$('pd').value,h=$('hops');if(a==b){h.innerHTML='<p>Elige dos PC distintos.</p>';return}
 const p=path(a,b),A=G.nd[a].net,B=G.nd[b].net,o=[];o.push(`${a} (${L.first(A)}) compara redes: ${b} (${L.first(B)}) está en otra subred. Pregunta por ARP la MAC de su gateway, ${L.last(A)}.`);
 p.slice(1,-1).forEach((n,i)=>{const prev=p[i],nx=p[i+2];if(n[0]=='S'){const down=prev[0]=='P',net=down?A:B;o.push(net.vlan?(down?`${n} recibe por un puerto access y etiqueta la trama con VLAN ${net.vlan} en el troncal.`:`${n} lee la etiqueta VLAN ${net.vlan} del troncal y entrega la trama sin etiqueta.`):`${n} conmuta la trama sin etiquetas.`)}
  else{const r=+n[1],how=B.r==r?`red conectada (C) por Fa0/0${B.vlan?'.'+B.vlan:''}`:FL.rip.includes(r)&&FL.rip.includes(B.r)?'ruta RIP (R)':'ruta estática (S)';o.push(`${n} busca ${B.ip}/${B.p}: ${how}. Arma una trama nueva hacia ${nx}. Las IP no cambian.`)}});
 o.push(`${b} recibe el ping. La respuesta necesita su propia ruta de regreso.`);h.innerHTML='<ol>'+o.map(x=>`<li>${x}</li>`).join('')+'</ol>';
 const k=$('pk');if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;k.getAnimations().forEach(x=>x.cancel());k.animate(p.map((n,i)=>({transform:`translate(${G.nd[n].x}px,${G.nd[n].y}px)`,opacity:i==p.length-1?0:1})),{duration:p.length*420,easing:'linear'})};

const TH=$('th');function setT(t){document.documentElement.dataset.theme=t;TH.textContent=t=='dark'?'Fondo blanco':'Fondo negro';try{localStorage.troncalFondo=t}catch(e){}}
let t0='light';try{t0=localStorage.troncalFondo||'light'}catch(e){}setT(t0);TH.onclick=()=>setT(document.documentElement.dataset.theme=='dark'?'light':'dark');
// Video por capítulos
const VCAPS=['Intro','Qué es una red','La capa física','El switch y la MAC','Errores y acceso al medio','La dirección IP','Red, hosts y broadcast','Clases, privadas y CIDR','VLSM','ARP y la puerta de enlace','DHCP','El router y su tabla','Estáticas, RIP y OSPF','VLAN','Router-on-a-stick','Taller VLAN','El final de mayo de 2025','Dos simulacros','Cuando no funciona','Las 31 preguntas'];
let vcur=-1;
function VID(b){const p=$('vplayer');if(!$('vcaps').children.length){$('vcaps').innerHTML=VCAPS.map((t,i)=>'<button type="button" data-i="'+i+'"><b>'+String(i).padStart(2,'0')+'</b><span>'+t+'</span></button>').join('');$('vcaps').onclick=e=>{const x=e.target.closest('button');if(x){location.hash='#video/'+x.dataset.i}};p.onended=()=>{if(vcur<VCAPS.length-1)location.hash='#video/'+(vcur+1)}}
 const i=Math.max(0,Math.min(VCAPS.length-1,parseInt(b)||0));if(i!=vcur){const auto=vcur>=0;vcur=i;p.src='video/c'+String(i).padStart(2,'0')+'.mp4';if(auto)p.play().catch(()=>{})}
 $('vtit').textContent='Capítulo '+i+': '+VCAPS[i];[...$('vcaps').children].forEach((x,k)=>x.classList.toggle('on',k==i))}
addEventListener('hashchange',route);route();history.scrollRestoration='manual';addEventListener('load',()=>setTimeout(()=>scrollTo(0,0)));

// Visor de diapositivas en la misma página
(()=>{const v=document.createElement('div');v.id='vis';v.hidden=true;v.setAttribute('role','dialog');v.setAttribute('aria-modal','true');v.setAttribute('aria-label','Diapositiva');
v.innerHTML='<div class="vbar"><span id="sv-vcap"></span><button type="button" id="sv-vx" aria-label="Cerrar">✕ Cerrar</button></div><div class="vstage"><button type="button" class="vnav" id="sv-vp" aria-label="Anterior">‹</button><img id="sv-vimg" alt=""><button type="button" class="vnav" id="sv-vn" aria-label="Siguiente">›</button></div><div class="vfoot"><button type="button" id="sv-vp2">‹ Anterior</button><span id="sv-vnum"></span><button type="button" id="sv-vn2">Siguiente ›</button></div>';
document.body.append(v);let L=[],k=0,back=null;const q=i=>document.getElementById(i);
const show=()=>{const a=L[k];q('sv-vimg').src=a.href;q('sv-vimg').alt=a.querySelector('img').alt;q('sv-vcap').textContent=a.querySelector('img').alt;q('sv-vnum').textContent=(k+1)+' de '+L.length;q('sv-vp').disabled=q('sv-vp2').disabled=k==0;q('sv-vn').disabled=q('sv-vn2').disabled=k==L.length-1;if(L[k+1]){const p=new Image();p.src=L[k+1].href}};
const go=d=>{const n=k+d;if(n>=0&&n<L.length){k=n;show()}};
const close=()=>{v.hidden=true;document.body.classList.remove('nosc');if(back)back.focus()};
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.gal a');if(!a)return;e.preventDefault();L=[...a.closest('.sb').querySelectorAll('.gal a')];k=L.indexOf(a);back=a;v.hidden=false;document.body.classList.add('nosc');show();q('sv-vx').focus()});
q('sv-vx').onclick=close;q('sv-vp').onclick=q('sv-vp2').onclick=()=>go(-1);q('sv-vn').onclick=q('sv-vn2').onclick=()=>go(1);
v.addEventListener('click',e=>{if(e.target==v||e.target.classList.contains('vstage'))close()});
document.addEventListener('keydown',e=>{if(v.hidden)return;if(e.key=='Escape')close();else if(e.key=='ArrowLeft')go(-1);else if(e.key=='ArrowRight')go(1)});
let x0=null;v.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});v.addEventListener('touchend',e=>{if(x0==null)return;const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>50)go(d<0?1:-1);x0=null});
window.addEventListener('hashchange',()=>{if(!v.hidden)close()});})();
// Zoom del visor: ruedita, arrastrar, doble clic y botones
(()=>{const v=document.getElementById('vis'),im=document.getElementById('sv-vimg'),bar=v.querySelector('.vbar');if(!im)return;
const z=document.createElement('span');z.className='vz';z.innerHTML='<button type="button" id="sv-zm" aria-label="Alejar">−</button><span id="sv-zp">100%</span><button type="button" id="sv-zM" aria-label="Acercar">+</button><button type="button" id="sv-z0">Ajustar</button>';bar.insertBefore(z,bar.lastChild);
let s=1,x=0,y=0,drag=null;const ap=()=>{im.style.transform=`translate(${x}px,${y}px) scale(${s})`;document.getElementById('sv-zp').textContent=Math.round(s*100)+'%';im.style.cursor=s>1?(drag?'grabbing':'grab'):'zoom-in'};
const zoomAt=(ns,cx,cy)=>{ns=Math.min(6,Math.max(1,ns));const r=im.getBoundingClientRect(),ox=r.left+r.width/2,oy=r.top+r.height/2;const k=ns/s;x+=(cx-ox)*(1-k);y+=(cy-oy)*(1-k);s=ns;if(s==1){x=0;y=0}ap()};
const ctr=()=>{const r=im.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
const reset=()=>{s=1;x=0;y=0;ap()};
new MutationObserver(reset).observe(im,{attributes:true,attributeFilter:['src']});
v.addEventListener('wheel',e=>{if(v.hidden)return;e.preventDefault();zoomAt(s*(e.deltaY<0?1.2:1/1.2),e.clientX,e.clientY)},{passive:false});
im.addEventListener('dblclick',e=>{s>1?reset():zoomAt(2.5,e.clientX,e.clientY)});
im.addEventListener('pointerdown',e=>{if(s<=1)return;e.preventDefault();drag={px:e.clientX,py:e.clientY,x,y};im.setPointerCapture(e.pointerId);ap()});
im.addEventListener('pointermove',e=>{if(!drag)return;x=drag.x+e.clientX-drag.px;y=drag.y+e.clientY-drag.py;ap()});
im.addEventListener('pointerup',()=>{drag=null;ap()});im.draggable=false;
document.getElementById('sv-zM').onclick=()=>zoomAt(s*1.4,...ctr());document.getElementById('sv-zm').onclick=()=>zoomAt(s/1.4,...ctr());document.getElementById('sv-z0').onclick=reset;
document.addEventListener('keydown',e=>{if(v.hidden)return;if(e.key=='+'||e.key=='=')zoomAt(s*1.4,...ctr());else if(e.key=='-')zoomAt(s/1.4,...ctr());else if(e.key=='0')reset()});
v.addEventListener('touchstart',e=>{if(s>1)e.stopPropagation()},{capture:true,passive:true});v.addEventListener('touchend',e=>{if(s>1)e.stopImmediatePropagation()},{capture:true});
ap()})();

