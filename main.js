var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
const BLOCKSIZE = 30;
var layout = [];
var asfalt=document.getElementById("asfaltPng");
var boks=document.getElementById("boksPng");
var concrete=document.getElementById("concretePng");

generateLevel(20);

/* Generate size of game */
function generateLevel(x, y = x){
   /* Tar både x og y størrelse som parametre.
   *  Om en y verdi ikke blir oppgitt, får den x verdien (kvadratisk oppsett) */
   canvas.width = BLOCKSIZE * x;
   canvas.height = BLOCKSIZE * y;
   bane(x, y);
}
function bane(kol, rad){
   for(let i = 0; i < kol * rad; i++){
      let x = Math.floor(i/rad),
      y = i - (x * rad),
      blockType = 1;
      let block = {"x":x, "y":y, "z":blockType};
      layout.push(block);
   }
   console.log(layout);
   stoneBlock();
}
function stoneBlocks(){
   
}