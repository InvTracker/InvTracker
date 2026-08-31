/* InvenTrack — app.js */
/* ─────────────────────────────────────────────────────────── */

const menuItems=[
    {id:'biryani',name:'Chicken Biryani',emoji:'\u{1F372}',price:185,cat:'Mains',stock:25,status:'available'},
    {id:'vegbiryani',name:'Veg Biryani',emoji:'\u{1F35A}',price:150,cat:'Mains',stock:18,status:'available'},
    {id:'dosa',name:'Masala Dosa',emoji:'\u{1FAD3}',price:90,cat:'Mains',stock:18,status:'available'},
    {id:'burger',name:'Burger',emoji:'\u{1F354}',price:70,cat:'Snacks',stock:5,status:'low'},
    {id:'sandwich',name:'Veg Sandwich',emoji:'\u{1F96A}',price:60,cat:'Snacks',stock:22,status:'available'},
    {id:'pizza',name:'Pizza Slice',emoji:'\u{1F355}',price:120,cat:'Snacks',stock:0,status:'out'},
    {id:'fries',name:'Fries',emoji:'\u{1F35F}',price:55,cat:'Snacks',stock:7,status:'low'},
    {id:'coldcoffee',name:'Cold Coffee',emoji:'\u{1F964}',price:45,cat:'Beverages',stock:31,status:'available'},
    {id:'buttermilk',name:'Buttermilk',emoji:'\u{1F95B}',price:25,cat:'Beverages',stock:40,status:'available'},
    {id:'coke',name:'Coke',emoji:'\u{1F9C3}',price:40,cat:'Beverages',stock:26,status:'available'},
    {id:'gulabjamun',name:'Gulab Jamun',emoji:'\u{1F36E}',price:30,cat:'Desserts',stock:16,status:'available'},
  ];
  const recommended=['burger','coke','fries','gulabjamun'];
  const stages=['Placed','Preparing','Ready','Picked up'];
  let cart={},stageIndex=1,feedbackStars=0;
  let orders=[
    {icon:'\u{1F372}',title:'Chicken Biryani',when:'Today, 1:04 PM',amt:185,status:'In progress',live:true},
    {icon:'\u{1F96A}',title:'Veg Sandwich + Coffee',when:'Yesterday, 4:40 PM',amt:95,status:'Delivered'},
    {icon:'\u{1F355}',title:'Margherita Slice',when:'Mon, 12:52 PM',amt:120,status:'Delivered'},
    {icon:'\u{1F964}',title:'Cold Coffee',when:'Mon, 9:15 AM',amt:45,status:'Delivered'},
  ];
  let currentUser=null;
  let loggedIn=false;
  const $=(sel,el=document)=>el.querySelector(sel);
  const $$=(sel,el=document)=>Array.from(el.querySelectorAll(sel));
  function toast(msg){const w=$('#toastWrap');const t=document.createElement('div');t.className='toast';t.textContent=msg;w.appendChild(t);setTimeout(()=>t.remove(),2500);}
  function initials(n){return n ? (n.trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase()||'ST') : 'GU';}
  function sbHTML(s){const m={available:'AVAIL',low:'LOW',out:'OUT'};return '<span class="status-badge '+s+'">'+m[s]+'</span>';}
  function gc(s){return s==='available'?'var(--fresh)':s==='low'?'var(--low)':'var(--alert)';}
  function gw(it){return Math.max(3,Math.min(100,Math.round(it.stock/40*100)));}
  function renderAccount(){
    if(!loggedIn||!currentUser){
      $('#sideAvatar').textContent='GU';
      $('#sideName').textContent='Guest Student';
      $('#sideRole').textContent='Log in / Sign up';
      if($('#accountPanel')) $('#accountPanel').style.display='none';
      if($('#authPanel')) $('#authPanel').style.display='block';
      return;
    }
    if($('#accountPanel')) $('#accountPanel').style.display='block';
    if($('#authPanel')) $('#authPanel').style.display='none';
    $('#sideAvatar').textContent=initials(currentUser.name);
    $('#sideName').textContent=currentUser.name;
    $('#sideRole').textContent=currentUser.year+' \u00B7 CSE';
    $('#accName').textContent=currentUser.name;
    $('#accYear').textContent=currentUser.year;
    $('#accRoll').textContent=currentUser.rollNo;
    $('#accStudentId').textContent=currentUser.studentId;
    $('#accPhone').textContent=currentUser.phone;
  }
  function login(){loggedIn=true;$('#accountPanel').style.display='block';$('#authPanel').style.display='none';renderAccount();switchPage('home');toast('Welcome back, '+currentUser.name.split(' ')[0]+'!');}
  function logout(){loggedIn=false;$('#accountPanel').style.display='none';$('#authPanel').style.display='block';$('#loginStudentId').value='';$('#loginPhone').value='';$('#loginError').classList.remove('show');switchPage('settings');toast('Logged out');}
  function renderCounterStrip(){$('#counterStrip').innerHTML=menuItems.slice(0,6).map(it=>'<div class="counter-item"><div class="counter-meta"><span class="counter-name">'+it.name+'</span>'+sbHTML(it.status)+'</div><div class="stock-count">'+it.stock+' servings left</div><div class="gauge"><span style="width:'+gw(it)+'%;background:'+gc(it.status)+'"></span></div></div>').join('');}
  function recCardHTML(it){const d=it.status==='out';return '<div class="rec-card"><div class="rec-img">'+it.emoji+'</div><div class="rec-body"><div class="rec-name">'+it.name+'</div><div class="rec-tag">'+(it.status==='low'?'Only '+it.stock+' left today':it.status==='out'?'Currently out of stock':'Pairs with your usual')+'</div><div class="rec-row"><span class="rec-price mono">\u20B9'+it.price+'</span><button class="add-btn" data-add="'+it.id+'"'+(d?' disabled':'')+'>+</button></div></div></div>';}
  function renderRecGrids(){$('#homeRecGrid').innerHTML=recommended.map(id=>recCardHTML(menuItems.find(m=>m.id===id))).join('');$('#foryouGrid').innerHTML=menuItems.filter(m=>m.status!=='out').map(recCardHTML).join('');}
  let activeCat='All';
  function renderFilterRow(){const cats=['All',...new Set(menuItems.map(m=>m.cat))];$('#filterRow').innerHTML=cats.map(c=>'<button class="filter-chip '+(c===activeCat?'active':'')+'" data-cat="'+c+'">'+c+'</button>').join('');}
  function renderMenuGrid(query=''){const q=query.trim().toLowerCase();const items=menuItems.filter(m=>(activeCat==='All'||m.cat===activeCat)&&m.name.toLowerCase().includes(q));$('#menuGrid').innerHTML=items.map(it=>{const d=it.status==='out';return '<div class="menu-card"><div class="menu-emoji">'+it.emoji+'</div><div class="menu-info"><div class="mn">'+it.name+'</div><div class="mc">'+it.cat+'</div><div class="mrow"><span class="rec-price mono">\u20B9'+it.price+'</span><div style="display:flex;align-items:center;gap:8px;">'+sbHTML(it.status)+'<button class="add-btn" data-add="'+it.id+'"'+(d?' disabled':'')+'>+</button></div></div></div></div>';}).join('')||'<div class="empty-state"><div class="em">\uD83D\uDD0D</div>No items match your search.</div>';}
  function cartCount(){return Object.values(cart).reduce((a,b)=>a+b,0);}
  function cartTotal(){return Object.entries(cart).reduce((s,[id,q])=>s+menuItems.find(m=>m.id===id).price*q,0);}
  function addToCart(id,btn){cart[id]=(cart[id]||0)+1;updateCartUI();toast('Added '+menuItems.find(m=>m.id===id).name+' to cart');if(btn){btn.classList.add('added');btn.textContent='\u2713';setTimeout(()=>{btn.classList.remove('added');btn.textContent='+';},700);}}
  function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];updateCartUI();renderCartPage();}
  function removeFromCart(id){delete cart[id];updateCartUI();renderCartPage();}
  function updateCartUI(){const n=cartCount();const b=$('#cartBadge');b.textContent=n;b.classList.toggle('hide',n===0);$('#quickCartSub').textContent=n===0?'Cart is empty':n+' item'+(n>1?'s':'')+' waiting';$('#checkoutBtn').disabled=n===0;}
  function renderCartPage(){const ids=Object.keys(cart);const n=cartCount();$('#cartSub').textContent=n+' item'+(n!==1?'s':'');if(!ids.length){$('#cartList').innerHTML='<div class="empty-state"><div class="em">\uD83D\uDED2</div>Your cart is empty.<br><button class="mini-btn" style="margin-top:12px;" data-goto="menu">Browse menu</button></div>';}else{$('#cartList').innerHTML=ids.map(id=>{const it=menuItems.find(m=>m.id===id);return '<div class="cart-line"><div class="menu-emoji">'+it.emoji+'</div><div class="stub-info"><div class="t">'+it.name+'</div><div class="s mono">\u20B9'+it.price+' each</div></div><div class="qty-ctrl"><button data-dec="'+id+'">\u2212</button><span>'+cart[id]+'</span><button data-inc="'+id+'">+</button></div><button class="remove-x" data-remove="'+id+'">\u2715</button></div>';}).join('');}const sub=cartTotal(),pk=ids.length?10:0;$('#sumSubtotal').textContent='\u20B9'+sub;$('#sumPacking').textContent='\u20B9'+pk;$('#sumTotal').textContent='\u20B9'+(sub+pk);}
  function placeOrder(){const n=cartCount();if(!n)return;const total=cartTotal()+10;const names=Object.keys(cart).map(id=>menuItems.find(m=>m.id===id).name).join(' + ');const emoji=menuItems.find(m=>m.id===Object.keys(cart)[0]).emoji;orders.forEach(o=>{if(o.live){o.live=false;o.status='Delivered';}});orders.unshift({icon:emoji,title:names,when:'Just now',amt:total,status:'In progress',live:true});stageIndex=0;$('#ticketTitle').textContent=names;$('#ticketDesc').textContent='Placed just now \u00B7 Counter 2';$('#ticketPaid').textContent='\u20B9'+total;$('#queueNo').textContent='#A-0'+(43+Math.floor(Math.random()*9));renderStepper();cart={};updateCartUI();renderCartPage();renderOrderLists();toast('Order placed! Track it from Home.');switchPage('home');}
  function renderStepper(){$$('#stepper .step').forEach((el,i)=>{el.classList.remove('done','now');if(i<stageIndex)el.classList.add('done');else if(i===stageIndex)el.classList.add('now');});const em=['~12 min to ready','~7 min to ready','Ready \u2014 head to Counter 2','Order complete'];$('#etaPill').textContent=em[stageIndex];const done=stageIndex>=stages.length-1;$('#advanceBtn').disabled=done;$('#advanceBtn').textContent=done?'Picked up \u2713':'Mark "'+stages[stageIndex+1]+'" \u2192';if(orders[0]&&orders[0].live){orders[0].status=stageIndex>=3?'Delivered':'In progress';if(stageIndex>=3)orders[0].live=false;renderOrderLists();}}
  function advanceStage(){if(stageIndex<stages.length-1){stageIndex++;renderStepper();toast('Status updated: '+stages[stageIndex]);}}
  function orderRowHTML(o,full){const sc=o.status==='Delivered'?'done':'progress';return '<div class="stub-list-item"><div class="stub-icon">'+o.icon+'</div><div class="stub-info"><div class="t">'+o.title+'</div><div class="s">'+o.when+'</div></div><div><div class="stub-amt mono">\u20B9'+o.amt+'</div><div class="stub-status '+sc+'">'+o.status+'</div></div>'+(full?'<div class="stub-actions"><button class="mini-btn" data-track="1">Track</button></div>':'')+'</div>';}
  function renderOrderLists(){$('#homeOrderList').innerHTML=orders.slice(0,4).map(o=>orderRowHTML(o,false)).join('');$('#ordersFullList').innerHTML=orders.map(o=>orderRowHTML(o,true)).join('');}
  const pageTitles={home:'Home',menu:'Menu',cart:'Cart',orders:'Orders',spending:'Spending',foryou:'For you',feedback:'Feedback',settings:'Settings'};
  function switchPage(p){const t=$('#page-'+p);if(!t)return;$$('.page').forEach(pg=>pg.classList.remove('active'));t.classList.add('active');$$('.nav-item[data-page]').forEach(n=>n.classList.toggle('active',n.dataset.page===p));$('#pageTitle').textContent=pageTitles[p]||'';window.scrollTo({top:0,behavior:'smooth'});}
  /* Theme toggle — removes data-theme attr for light mode, sets "kitchen" for dark */
  $('#themeToggle').addEventListener('click',e=>{const btn=e.target.closest('button[data-mode]');if(!btn)return;btn.dataset.mode==='kitchen'?document.body.setAttribute('data-theme','kitchen'):document.body.removeAttribute('data-theme');$$('#themeToggle button[data-mode]').forEach(b=>b.classList.toggle('on',b===btn));});
  $('#bellBtn').addEventListener('click',e=>{e.stopPropagation();$('#notifPanel').classList.toggle('open');$('#bellDot').classList.add('hide');});
  $('#searchInput').addEventListener('input',e=>{switchPage('menu');renderMenuGrid(e.target.value);});
  $$('.auth-tab').forEach(tab=>tab.addEventListener('click',()=>{$$('.auth-tab').forEach(t=>t.classList.toggle('active',t===tab));const il=tab.dataset.tab==='login';$('#loginForm').style.display=il?'block':'none';$('#signupForm').style.display=il?'none':'block';}));
  $('#loginSubmit').addEventListener('click',()=>{const id=$('#loginStudentId').value.trim(),ph=$('#loginPhone').value.trim();if(!id||!ph){$('#loginError').classList.add('show');return;}$('#loginError').classList.remove('show');currentUser={name:'Nivedita',year:'2nd year',rollNo:'2503A52924',studentId:id,phone:ph};login();});
  $('#signupSubmit').addEventListener('click',()=>{const nm=$('#suName').value.trim(),rl=$('#suRoll').value.trim(),yr=$('#suYear').value,si=$('#suStudentId').value.trim(),ph=$('#suPhone').value.trim();if(!nm||!rl||!si||!ph){$('#signupError').classList.add('show');return;}$('#signupError').classList.remove('show');currentUser={name:nm,year:yr,rollNo:rl,studentId:si,phone:ph};login();});
  $('#logoutNavBtn').addEventListener('click',logout);
  $('#logoutSettingsBtn').addEventListener('click',logout);
  document.addEventListener('click',e=>{
    const nb=e.target.closest('.nav-item[data-page]');if(nb){switchPage(nb.dataset.page);return;}
    const gb=e.target.closest('[data-goto]');if(gb){switchPage(gb.dataset.goto);return;}
    const ab=e.target.closest('[data-add]');if(ab){addToCart(ab.dataset.add,ab);return;}
    const ib=e.target.closest('[data-inc]');if(ib){changeQty(ib.dataset.inc,1);return;}
    const db=e.target.closest('[data-dec]');if(db){changeQty(db.dataset.dec,-1);return;}
    const rb=e.target.closest('[data-remove]');if(rb){removeFromCart(rb.dataset.remove);return;}
    if(e.target.closest('#checkoutBtn')){placeOrder();return;}
    if(e.target.closest('#advanceBtn')){advanceStage();return;}
    if(e.target.closest('[data-track]')){switchPage('home');return;}
    const ch=e.target.closest('.filter-chip');if(ch){activeCat=ch.dataset.cat;renderFilterRow();renderMenuGrid($('#searchInput').value);return;}
    const st=e.target.closest('.star');if(st){feedbackStars=parseInt(st.dataset.v,10);$$('.star').forEach(s=>s.classList.toggle('on',parseInt(s.dataset.v,10)<=feedbackStars));return;}
    if(e.target.closest('#submitFeedback')){if(!feedbackStars){toast('Pick a star rating first');return;}toast('Thanks \u2014 feedback submitted!');$('#feedbackText').value='';feedbackStars=0;$$('.star').forEach(s=>s.classList.remove('on'));return;}
    const sw=e.target.closest('.switch');if(sw){sw.classList.toggle('on');return;}
    if(!e.target.closest('#bellBtn'))$('#notifPanel').classList.remove('open');
  });
  renderCounterStrip();renderRecGrids();renderFilterRow();renderMenuGrid();renderOrderLists();updateCartUI();renderCartPage();renderStepper();renderAccount();
