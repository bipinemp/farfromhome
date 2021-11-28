function popup() {
    document.getElementById("homelogin").style.top = "1vh";
  }
  function popdown() {
    document.getElementById("homelogin").style.top = "-220%";
  }

// For scrolling effect on navigaion var

window.addEventListener("scroll",function(){
var header = document.getElementById("home-navbar");
header.classList.toggle("sticky",window.scrollY >10);
})

let ham = document.querySelector(".hamburger");
let h1 = document.querySelector(".ham1");
let h2 = document.querySelector(".ham2");
let h3 = document.querySelector(".ham3");
let nav = document.getElementById("home-nav-active");



function hambur(){
    ham.classList.toggle("ham-active");

   if(nav.style.height == "95vh"){
   nav.style.height = "0vh";
   }
   else{
   nav.style.height = "95vh";
   }
}