import {SHEET_CSV_URL, FORM_EMBED_URL, CONTACT_EMAIL} from './config.js';


const mission = 'We exist to empower local real estate investors to build lasting wealth with integrity, purpose, and a Christ-centered commitment to making a positive difference in their communities.';
const vision = 'We aim to be a Christ-centered community for local real estate investors, providing education, support, resources, mentorship, and accountability so they grow in wealth, character, and impact, all to the glory of God.';
const page = document.body.dataset.page || 'home';
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const links = [['home','Home','/'],['about','About','/about'],['events','Events','/events'],['trainings','Trainings','/trainings'],['survey','Survey','/survey'],['contact','Contact','/contact']];
const root = document.querySelector('#app');
root.innerHTML = `<header><div class="wrap nav"><a href="/" class="brand"><img class="brand-logo" src="/CCINA%20Logo.jpg" alt="CCINA official logo"><span class="brand-name">Christ Centered Investors’ Network<br><small>Austin, Texas</small></span></a><nav aria-label="Main navigation">${links.map(([id,name,url])=>`<a href="${url}" ${id===page?'aria-current="page"':''}>${name}</a>`).join('')}</nav></div></header><main id="main"></main><footer><div class="wrap footrow"><span>CCINA · Faith, integrity, community and real estate education.</span><span>Christ Centered Investors’ Network Austin</span></div></footer>`;
const main = document.querySelector('#main');
const hero = (heading,subtitle) => `<section class="hero"><div class="wrap"><div class="eyebrow">Christ Centered Investors’ Network Austin</div><h1>${heading}</h1><p class="lead">${subtitle}</p></div></section>`;
const card = (heading,body) => `<article class="card"><h2>${heading}</h2><p>${esc(body)}</p></article>`;
const formatDate = (date) => new Date(date+'T12:00:00').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'});
const isHoliday = (e) => e.date === '2026-12-07' && /ornament gifting/i.test(e.title);
const eventCard = (e) => `<article class="card event ${isHoliday(e)?'holiday':''}"><span class="pill">${isHoliday(e)?'Special holiday gathering':esc(e.type||'Event')}</span><h3>${esc(e.title)}</h3><p><strong>${esc(formatDate(e.date))}</strong> · ${esc(e.time||'Time to be confirmed')}</p><p>${esc(e.location||'Location to be confirmed')}</p><p class="muted">${esc(e.description||'')}</p></article>`;
if (page === 'home') {
 main.innerHTML = hero('Where faith meets the future of investing.','A distinguished community of investors building knowledge, meaningful connections, and lasting impact.')+`<section><div class="wrap grid">${card('Our mission',mission)}${card('Our vision',vision)}</div></section><section class="soft"><div class="wrap"><div class="section-head"><h2>Upcoming CCINA events</h2><a class="btn secondary" href="/events">Full calendar</a></div><div id="upcoming" class="grid three"></div></div></section><section><div class="wrap"><h2>Help shape our community</h2><p>Your feedback helps guide CCINA events and education.</p><a class="btn" href="/survey">Take the survey</a></div></section>`;
}
if (page === 'trainings') {
 main.innerHTML = hero('Invest in your knowledge.','Practical real estate education rooted in integrity, stewardship, and community.') + '<section class="wrap training-intro"><div class="eyebrow">THE CCINA LEARNING EXPERIENCE</div><h2>Learn the craft. Lead with conviction.</h2><p class="lead">Thoughtful education and a community committed to your growth.</p><div class="grid three training-grid"><article class="card"><span class="training-no">01</span><h3>Investor Foundations</h3><p>Understand investment fundamentals, risk, and thoughtful decision-making.</p></article><article class="card"><span class="training-no">02</span><h3>Deal Analysis & Strategy</h3><p>Explore underwriting, acquisitions, financing, and real estate strategies.</p></article><article class="card"><span class="training-no">03</span><h3>Faith, Leadership & Legacy</h3><p>Build with purpose through stewardship, accountability, and ethical leadership.</p></article></div></section><section class="dark-panel"><div class="wrap section-head"><div><div class="eyebrow">UPCOMING OPPORTUNITIES</div><h2>Grow alongside fellow investors.</h2><p>Training dates will be announced as confirmed.</p></div><a class="btn" href="/events">Explore the calendar</a></div></section>';
}
if (page === 'about') {
 main.innerHTML = hero('About CCINA','Investing with integrity, learning together, and making a positive difference.')+`<section><div class="wrap grid">${card('Our mission',mission)}${card('Our vision',vision)}</div></section><section class="soft"><div class="wrap grid three">${card('Education','Practical real estate learning for every stage of the journey.')}${card('Mentorship','Accountability, shared resources, and encouragement.')}${card('Community','Relationships centered on service, faith, and integrity.')}</div></section>`;
}
if (page === 'events') {
 main.innerHTML = hero('CCINA events calendar','Browse our education sessions, networking gatherings, and social events.')+`<section><div class="wrap"><div id="special"></div><div class="calendar-controls"><div><button id="prev" aria-label="Previous month">‹</button> <strong id="month-title"></strong> <button id="next" aria-label="Next month">›</button></div><label>Event type <select id="type-filter"><option value="All">All event types</option></select></label></div><div id="calendar" class="calendar" role="grid" aria-label="Monthly event calendar"></div><h2 style="margin-top:42px">Events this month</h2><div id="events-list" class="list"></div></div></section>`;
}
if (page === 'survey') {
 main.innerHTML = hero('CCINA member survey','Tell us what is working and what would help your investing journey.')+`<section><div class="wrap"><h2>Share your feedback</h2><div id="survey-frame"></div></div></section>`;
 const frame = document.querySelector('#survey-frame');
 if (FORM_EMBED_URL && /^https:\/\/(forms\.gle\/|docs\.google\.com\/forms\/)/.test(FORM_EMBED_URL)) {
  const link=document.createElement('a'); link.href=FORM_EMBED_URL; link.target='_blank'; link.rel='noopener noreferrer'; link.className='btn'; link.textContent='Open the CCINA survey';
  const note=document.createElement('p'); note.className='muted'; note.textContent='The survey opens securely in a new tab.';
  frame.append(link,note);

 } else frame.innerHTML='<div class="notice">The member survey is being connected. Please check back soon.</div>';
}
if (page === 'contact') {
 main.innerHTML = hero('Connect with CCINA','Find events, learn together, and build relationships with other local investors.')+`<section><div class="wrap grid">${card('Meet us at an event','Visit our calendar for confirmed event details and locations.')}<article class="card"><h2>Get in touch</h2><p id="contact-detail"></p><a class="btn" href="/events">View events</a></article></div></section>`;
 const detail=document.querySelector('#contact-detail');
 if(CONTACT_EMAIL){const a=document.createElement('a');a.href='mailto:'+CONTACT_EMAIL;a.textContent=CONTACT_EMAIL;detail.append(a);}
 else detail.textContent='Contact information will be posted here soon.';
}
function parseCSV(input) {
 const rows=[];let row=[],field='',quoted=false;
 for(let i=0;i<input.length;i++){const c=input[i];
  if(c==='"'){if(quoted && input[i+1]==='"'){field+='"';i++;}else quoted=!quoted;}
  else if(c===',' && !quoted){row.push(field);field='';}
  else if((c==='\n'||c==='\r') && !quoted){if(c==='\r'&&input[i+1]==='\n')i++;row.push(field);field='';if(row.some(x=>x.trim()))rows.push(row);row=[];}
  else field+=c;
 }
 row.push(field);if(row.some(x=>x.trim()))rows.push(row);
 const headers=(rows.shift()||[]).map(x=>x.trim().toLowerCase());
 return rows.map(r=>Object.fromEntries(headers.map((h,i)=>[h,(r[i]||'').trim()]))).filter(e=>e.title && /^\d{4}-\d{2}-\d{2}$/.test(e.date||'')).sort((a,b)=>a.date.localeCompare(b.date));
}
async function getEvents() {
 if(!SHEET_CSV_URL)return null;
 try {const url=new URL(SHEET_CSV_URL);if(url.protocol!=='https:')return null;const response=await fetch(url.toString(),{cache:'no-store'});if(!response.ok)return null;return parseCSV(await response.text());} catch {return null;}
}
const staticEvents = [{date:'2026-11-02',title:'CCINA Investor Social',type:'Social',time:'7:00 PM – 8:00 PM',location:'Location to be confirmed',description:'Connect with fellow CCINA real estate investors.'},{date:'2026-11-20',title:'CCINA Meetup in Dallas with CCC Members',type:'Meetup',time:'All day',location:'Dallas, Texas — venue to be confirmed',description:'CCINA meetup with CCC members in Dallas.'},{date:'2026-12-07',title:'CCINA Social and Ornament Gifting',type:'Social',time:'Time to be confirmed',location:'Location to be confirmed',description:'A CCINA community gathering. Details will be shared when confirmed.'}];
const events = (await getEvents()) ?? staticEvents;
if (page === 'home') {
 const upcoming=document.querySelector('#upcoming');
 {const today=new Date().toLocaleDateString('en-CA',{timeZone:'America/Chicago'});upcoming.innerHTML=events.filter(e=>e.date>=today).slice(0,3).map(eventCard).join('')||'<p>No upcoming events are currently listed.</p>';}
}
if (page === 'events') {
 const cal=document.querySelector('#calendar'),list=document.querySelector('#events-list'),filter=document.querySelector('#type-filter');
 const types=[...new Set((events||[]).map(e=>e.type).filter(Boolean))].sort();
 for(const type of types){const option=document.createElement('option');option.value=type;option.textContent=type;filter.append(option);}
 const view=new Date();view.setDate(1);
 const special=(events||[]).find(isHoliday);
 if(special)document.querySelector('#special').innerHTML='<h2>Featured gathering</h2>'+eventCard(special);

 function renderCalendar(){
  const year=view.getFullYear(),month=view.getMonth(),first=new Date(year,month,1).getDay(),days=new Date(year,month+1,0).getDate();
  const selected=(events||[]).filter(e=>filter.value==='All'||e.type===filter.value);
  document.querySelector('#month-title').textContent=view.toLocaleDateString('en-US',{month:'long',year:'numeric'});
  cal.innerHTML=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="weekday" role="columnheader">${d}</div>`).join('');
  for(let i=0;i<Math.ceil((first+days)/7)*7;i++){
   const day=i-first+1,valid=day>0&&day<=days;
   const key=year+'-'+String(month+1).padStart(2,'0')+'-'+String(day).padStart(2,'0');
   const cell=document.createElement('div');cell.className='day'+(valid?'':' other');cell.setAttribute('role','gridcell');
   if(valid){const num=document.createElement('span');num.className='day-number';num.textContent=day;cell.append(num);
    for(const e of selected.filter(x=>x.date===key)){const a=document.createElement('a');a.href='#events-list';a.className='cal-event'+(isHoliday(e)?' holiday':'');a.textContent=(isHoliday(e)?'🎄 ':'')+e.title;cell.append(a);}
   }cal.append(cell);
  }
  const prefix=year+'-'+String(month+1).padStart(2,'0');
  list.innerHTML=selected.filter(e=>e.date.startsWith(prefix)).map(eventCard).join('')||'<p class="muted">No events listed for this month.</p>';
 }
 document.querySelector('#prev').addEventListener('click',()=>{view.setMonth(view.getMonth()-1);renderCalendar();});
 document.querySelector('#next').addEventListener('click',()=>{view.setMonth(view.getMonth()+1);renderCalendar();});
 filter.addEventListener('change',renderCalendar);renderCalendar();
}
