const officialStories=[
{id:"unpowered",title:"UNPOWERED",tag:"SCI-FI • MYSTERY",desc:"The story that started the journey.",inkitt:"https://www.inkitt.com/stories/1791590"},
{id:"world-beyond",title:"UNPOWERED: THE WORLD BEYOND",tag:"SCI-FI • ADVENTURE",desc:"The journey continues beyond what Anish and Sid thought they knew.",inkitt:"https://www.inkitt.com/stories/1886546"}];

const seedPosts=[
{u:"StoryFan27",id:"#A7K92",text:"The Storyverse design is seriously cool. Can't wait for the next chapter!",time:"Today"},
{u:"MysteryReader",id:"#Q3L18",text:"I have a theory about what is really going on in The World Beyond...",time:"Today"},
{u:"NINJA",id:"#NINJA",role:"HOST • AUTHOR",text:"Welcome to the Storyverse. Keep the theories coming!",time:"Pinned"}
];

function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toast(msg){const t=document.querySelector("#toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
function renderStories(){
 const grid=document.querySelector("#storyGrid");if(!grid)return;
 grid.innerHTML=officialStories.map((s,i)=>`<article class="story-card ${i===0?"featured-card":""}">
 <div class="story-orb"></div><span class="tag">${s.tag}</span><h2>${s.title}</h2><p>${s.desc}</p>
 <div class="card-actions"><a class="button" href="${s.inkitt}" target="_blank" rel="noopener">READ ON INKITT →</a><a class="smalllink" href="${s.id==="unpowered"?"stories/unpowered.html":"stories/unpowered-world-beyond.html"}">VIEW EXTRAS</a></div></article>`).join("");
}
function renderPosts(){
 const box=document.querySelector("#postList");if(!box)return;
 const posts=JSON.parse(localStorage.getItem("ninjaPosts")||"[]");
 box.innerHTML=[...seedPosts,...posts].map(p=>`<article class="post"><div class="avatar">${esc(p.u[0])}</div><div><div class="posthead"><b>${esc(p.u)}</b><span>${esc(p.id)}</span>${p.role?`<em>${esc(p.role)}</em>`:""}<small>${esc(p.time)}</small></div><p>${esc(p.text)}</p><div class="react">♥ <span>Like</span> &nbsp; • &nbsp; Reply</div></div></article>`).join("");
}
function initCommunity(){
 const f=document.querySelector("#opinionForm");if(!f)return;
 f.addEventListener("submit",e=>{e.preventDefault();const d=Object.fromEntries(new FormData(f));const p=JSON.parse(localStorage.getItem("ninjaPosts")||"[]");p.unshift({u:d.username,id:d.uid,text:d.text,time:"Just now"});localStorage.setItem("ninjaPosts",JSON.stringify(p));f.reset();renderPosts();toast("Posted to your local Storyverse preview.");});
 renderPosts();
}
function initSearch(){
 const i=document.querySelector("#storySearch");if(!i)return;
 i.addEventListener("input",()=>{const q=i.value.toLowerCase();document.querySelectorAll(".story-card").forEach(c=>c.style.display=c.textContent.toLowerCase().includes(q)?"":"none")});
}
document.addEventListener("DOMContentLoaded",()=>{renderStories();initSearch();initCommunity()});
