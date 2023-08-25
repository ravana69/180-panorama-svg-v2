gsap.set('#container', {perspective:1000}); //lower number exagerates the 'spheriness'

let stageH = gsap.getProperty('#container', 'height'),
    mouse = {x:0.5, y:0.5}, // not pixels! these track position as a percentage of stage width/height
    pov = { x:0.5, y:0.5, speed:0.03 },
    auto = true;

const n = 16, //number of divs
      c = document.getElementById('container');

for (let i=0; i<n; i++){  
  let b = document.createElement('div');  
  b.classList.add('box');
  c.appendChild(b);
  
  gsap.set(b, {
    left:'50%',
  	top:'50%',
    xPercent:-50,
    yPercent:-50,
    color:'#fff',
    z:1200,
  	width:250,
	  height:1125,
    scaleX:-1, //flip horizontally
    rotationY:-89+i/n*-360+90,
    transformOrigin:String("50% 50% -626%"), //adjust 3rd percentage to remove space between divs
    backgroundImage:'url(https://assets.codepen.io/721952/pano2.svg)',
    backgroundPosition:i*-250+'px 0px', //offset should match width
  });  
}

window.onresize = (e)=>{ 
  stageH = gsap.getProperty('#container', 'height');
  gsap.to('.box', {y:0});
}

c.onmousemove = (e)=>{
  auto = false;
  gsap.killTweensOf(mouse);
  mouse.x = e.clientX/window.innerWidth;
  mouse.y = e.clientY/window.innerHeight;
}

c.onmouseleave = ()=>{ auto=true; }

setAutoX();
function setAutoX(){
  if (auto) gsap.to(mouse, {duration:5, x:gsap.utils.random(0.45,0.55), ease:'sine.in'});
  gsap.delayedCall(gsap.utils.random(3,5), setAutoX);
}

setAutoY();
function setAutoY(){
  if (auto) gsap.to(mouse, {duration:6, y:gsap.utils.random(0,1), ease:'sine.in'});
  gsap.delayedCall(gsap.utils.random(4,6), setAutoY);
}


gsap.ticker.add(()=> {  
  pov.x += (mouse.x - pov.x) * pov.speed;
  pov.y += (mouse.y - pov.y) * pov.speed;
  gsap.set('.box', {rotationY:(i)=>-89+i/n*-360+180*pov.x, y:(Math.abs(1000-stageH)/2)-(Math.abs(1000-stageH))*pov.y });
});