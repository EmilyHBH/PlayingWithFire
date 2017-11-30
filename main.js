var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
const BLOCKSIZE = 30;
var layout = [];
var asfalt=document.getElementById("asfaltPng");
var boks=document.getElementById("boksPng");
var concrete=document.getElementById("concretePng");

generateLevel(15);

/* Generate size of game */
function generateLevel(x, y = x){
    /* Tar både x og y størrelse som parametre.
    *  Om en y verdi ikke blir oppgitt, får den x verdien (kvadratisk oppsett) */
    canvas.width = BLOCKSIZE * x;
    canvas.height = BLOCKSIZE * y;
    bane(x, y);
}
function bane(kol, rad){
    /* Lager array som har blokkene, bane layouten */
    for(let i = 0; i < kol * rad; i++){
        let x = Math.floor(i/rad),
        y = i - (x * rad),
        blockType;

        // Stein block, risse rundt banen
        if(x === 0 || x === kol -1 || y === 0 || y === rad -1 || (x % 2 === 0 && y % 2 === 0)){
         blockType = 1;
        } else {
         blockType = 2; //TODO: generer random type
        }
        let block = {"x":x, "y":y, "z":blockType};
        layout.push(block);
    }
    createBlocks(kol, rad);
}
function createBlocks(kol, rad){
   // Stein blokker
   for(let i = 0; i < layout.length; i++){
    	if(layout[i].z === 1){
            c.drawImage(concrete,CordX(layout[i].x),CordY(layout[i].y));
      	}
   }
}
function CordX(x){
	return x*BLOCKSIZE;
}
function CordY(y){
	return y*BLOCKSIZE;
}