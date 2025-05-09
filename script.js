let boxes=document.querySelectorAll(".btn");
let restbtn=document.querySelector(".btn2");
let nsg=document.querySelector("#mg");
let nsg2=document.querySelector(".msg");



let turnO=true;

const reSet=()=>{
    turnO=true;
    enablBoxes();
    nsg2.classList.add("hide");
}
const winPatern=[
    [0,1,2],[ 3,4,5],[6,7,8],[0,3,6],[0,4,8],
    [2,4,6],[1,4,7],[2,5,8]
];

boxes.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turnO===true){
        btn.innerText="O";
        turnO=false;
    
        }else{
            btn.innerText="X";
            turnO=true;
        }
        btn.disabled="true";
        checkWinner();
        
     })

});
const disablBoxes=() =>{
    for(box of boxes){
        box.disabled=true;
    }
}

const enablBoxes=() =>{
    for(box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const shoWinner=(val1) =>{
    mg.innerText=`Congratulations our winner is ${val1}`;
    nsg2.classList.remove("hide");

};

const checkWinner= ()=>{

    for(let patern of winPatern){
        let val1=boxes[patern[0]].innerText;
        let val2=boxes[patern[1]].innerText;
        let val3=boxes[patern[2]].innerText;
    
    if(val1 != "" && val2 != "" && val3 != ""){
        if(val1 === val2 && val2 === val3){
            console.log("WINNER");
            shoWinner(val1);
            disablBoxes();

         
            
        }
    }
}
};

restbtn.addEventListener("click", reSet);