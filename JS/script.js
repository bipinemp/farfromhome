   

   let add = document.getElementById('traveler-plus');
   let sub = document.getElementById('traveler-minus');
   let intt = document.getElementById('number');
   let trav =document.getElementById('travelerchange'); 


   let integer = 1;

   add.addEventListener('click',function(){

    integer=integer+1;
    if (integer > 1) {
        trav.innerHTML = "Travellers&nbsp;&nbsp;&nbsp;";
    }
    intt.innerHTML = integer;
    return intt;
   })




   sub.addEventListener('click',function(){

    if (integer>1) 

    {
    integer=integer-1;
    if (integer <2) {
        trav.innerHTML = "Traveller&nbsp;&nbsp;&nbsp;";
    }
    intt.innerHTML = integer;    
    return intt;
    }
    
    else

    {
    return false;
    }

   })
 
   
   function popup(){
    document.getElementById('homelogin').style.top='1vh';
   }
   function popdown(){
    document.getElementById('homelogin').style.top='-220%';
   }

   // For scrolling effect on navigaion var

   window.addEventListener("scroll",function(){
    var header = document.getElementById("home-navbar");
    header.classList.toggle("sticky",window.scrollY >10);
   })

    // For hamburger menu onclick effect

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