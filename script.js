let screen = document.getElementById("screen");
let clear = document.getElementById("ce");
let eqto = document.getElementById('eqto');
let final = ""
let giff = document.getElementById('giff');
giff.style.height = "0px";
let boom = new Audio("src/white_tee.mp3");
boom.volume = 0.6;
boom.loop=true;


clear.addEventListener("click", ()=>{
    screen.innerText="0";
    final = "";
    boom.pause();
    giff.style.height="0px";
    dottog=false;
});




eqto.addEventListener("click",()=>{
    if(final=="0"){return;}
    else{
        let result = eval(final);
        if(!Number.isFinite(result)){
            giff.style.height="156px";
            boom.currentTime=0;
            boom.play();
            console.log("Caught you BBG. Press Delete to Continue!")
            return;
        }
        screen.innerText=result;
        final = screen.innerText;
        if(Number.isInteger(Number(result))){dottog=false;}
        else{dottog=true;}
    }
})

let buttons = document.getElementsByClassName("num");
for (let btn of buttons){
    btn.addEventListener("click", ()=>{
        if(screen.innerText=="0"){
            screen.innerText=btn.innerText;
        }
        else{
            screen.innerText+=btn.innerText;
        }
        final+=btn.innerText;
        screen.scrollLeft = screen.scrollWidth;
    });
}

//backspace implementation
document.getElementById("backsp").addEventListener("click",()=>{
    if(screen.innerText=="0"){return;}
    else if(screen.innerText.length == "1"){
        screen.innerText="0";
    }
    else{
        let char = screen.innerText.slice(-1);
        if(char=="."){dottog = false;}
        screen.innerText=screen.innerText.slice(0,-1);
    }
    final = final.slice(0,-1);
});

//decimal implementation
let dot = document.getElementById("dot");
let dottog = false;
dot.addEventListener("click", ()=>{
    if(dottog == false){
        screen.innerText+=".";
        screen.scrollLeft = screen.scrollWidth;
        final += ".";
        dottog = true;
    }
});

//operator issue
let ops = ["+", "-","×", "÷"];
document.getElementById("mn").addEventListener("click", ()=>{
    if(ops.includes(screen.innerText.slice(-1))){
        screen.innerText=screen.innerText.slice(0,-1)+"-";
        final = final.slice(0,-1)+"-";
    }
    else{
        screen.innerText+="-";
        final+="-";
    }
    screen.scrollLeft = screen.scrollWidth;
    dottog = false;
});
document.getElementById("pl").addEventListener("click", ()=>{
    if(ops.includes(screen.innerText.slice(-1))){
        screen.innerText=screen.innerText.slice(0,-1)+"+";
        final=final.slice(0,-1)+"+";
    }
    else{
        screen.innerText+="+";
        final+="+";
    }
    screen.scrollLeft = screen.scrollWidth;
    dottog = false;
});
document.getElementById("pd").addEventListener("click", ()=>{
    if(ops.includes(screen.innerText.slice(-1))){
        screen.innerText=screen.innerText.slice(0,-1)+"×";
        final = final.slice(0,-1)+"*";
    }
    else{
        screen.innerText+="×";
        final+="*";
    }
    screen.scrollLeft = screen.scrollWidth;
    dottog = false;
});
document.getElementById("dv").addEventListener("click", ()=>{
    if(ops.includes(screen.innerText.slice(-1))){
        screen.innerText=screen.innerText.slice(0,-1)+"÷";
        final = final.slice(0,-1)+"/";
    }
    else{
        screen.innerText+="÷";
        final+="/";
    }
    screen.scrollLeft = screen.scrollWidth;
    dottog = false;
});


//plmin implementation
    function plusminus() {
    for (let i = screen.innerText.length - 1; i >= 0; i--) {
        if (screen.innerText[i] == "+") {
            screen.innerText = screen.innerText.slice(0, i) + "-" + screen.innerText.slice(i + 1);
            final = final.slice(0, i) + "-" + final.slice(i + 1);
            return;
        }
        else if (screen.innerText[i] == "-") {
            screen.innerText = screen.innerText.slice(0, i) + "+" + screen.innerText.slice(i + 1);
            final = final.slice(0, i) + "+" + final.slice(i + 1);
            return;
        }
    }
    if (screen.innerText[0] == "-") {
        screen.innerText = screen.innerText.slice(1);
        final = final.slice(1);
    }
    else {
        screen.innerText = "-" + screen.innerText;
        final = "-" + final;
    }
}
document.getElementById("plmn").addEventListener("click", plusminus);

//keypress implementation
document.addEventListener("keydown", (e)=>{
    console.log(e.key);
    if(e.key=="Backspace"){
        document.getElementById("backsp").click();
        return;
    }
    else if(e.key=="Delete"){
        clear.click();
    }
    else if(e.key=="Enter"){
        eqto.click();
        return;
    }
    else if(e.key=="."){
        dot.click();
        return;
    }
    else if(e.key=="-"){
        document.getElementById("mn").click();
        return;
    }
    else if(e.key=="+"){
        document.getElementById("pl").click();
        return;
    }
    else if(e.key=="*"){
        document.getElementById("pd").click();
        return;
    }
    else if(e.key=="/"){
        document.getElementById("dv").click();
        return;
    }
    let kbtn = document.getElementById(e.key);
    if(kbtn){
        kbtn.click();
    }
});



//draggable
const box = document.getElementById("baseb");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  box.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - box.offsetLeft;
    offsetY = e.clientY - box.offsetTop;
    box.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      box.style.left = (e.clientX - offsetX) + "px";
      box.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    box.style.cursor = "grab";
  });