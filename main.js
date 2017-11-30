var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
const BLOCKSIZE = 30;
var layout = [];
var asfalt=document.getElementById("asfaltPng");
var boks=document.getElementById("boxPng");
var concrete=document.getElementById("concretePng");
var kol = 0;
var rad = 0;

window.onload = function(){
    generateLevel(19);
}

/* Generate size of game */
function generateLevel(x, y = x){
    kol = x;
    rad = y;
    /* Tar både x og y størrelse som parametre.
    *  Om en y verdi ikke blir oppgitt, får den x verdien (kvadratisk oppsett) */
    canvas.width = BLOCKSIZE * x;
    canvas.height = BLOCKSIZE * y;
    bane(x, y);
}
function bane(){
    /* Lager array som har blokkene, bane layouten */
    for(let i = 0; i < kol * rad; i++){
        let y = Math.floor(i/rad),
        x = i - (y * rad),
        blockType;

        // Stein block, risse rundt banen
        if(x === 0 || x === kol -1 || y === 0 || y === rad -1 || (x % 2 === 0 && y % 2 === 0)){
            blockType = 1;
        } else {
            blockType = tonne(x,y);
        }
        let block = {"x":x, "y":y, "z":blockType, "xCord":CordX(x), "yCord": CordY(y)};
        layout.push(block);
    }
    createBlocks();
}
function createBlocks(){
   // Stein blokker
   for(let i = 0; i < layout.length; i++){
    	if(layout[i].z === 1){
            c.drawImage(concrete,layout[i].xCord,layout[i].yCord);
      	} else if(layout[i].z === 3){
            c.drawImage(asfalt,layout[i].xCord,layout[i].yCord);
        }else if(layout[i].z === 2){
            c.drawImage(boks,layout[i].xCord,layout[i].yCord);            
        }
   }
}
function tonne(x,y){
    if((y == 1 && x <= 3) || (y == 1 && x >= rad -4) ||
    (y == kol-2 && x <= 3) || (y == kol-2 && x >= rad -4) ||
    (x == 1 && y <= 3) || (x == 1 && y >= kol -4) ||
    (x == rad-2 && y <= 3) || (x == rad-2 && y >= kol -4)){
        block = 3;
    }
    else {
        let prosent = Math.floor(30+ 450/kol);
        let done = Math.floor(Math.random() * 100);
        block = done > prosent ? 3 : 2;
    }
    return block;
}
function CordX(x){
	return x*BLOCKSIZE;
}
function CordY(y){
	return y*BLOCKSIZE;
}