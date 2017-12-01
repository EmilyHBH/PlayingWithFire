var canvas1 = document.querySelector("canvas#one");
var c1 = canvas1.getContext("2d");
var canvas2 = document.querySelector("canvas#two");
var c2 = canvas2.getContext("2d");
const BLOCKSIZE = 30;
var layout = [];
var asfalt=document.getElementById("asfaltPng");
var boks=document.getElementById("boxPng");
var concrete=document.getElementById("concretePng");
var pl1f = document.querySelector("#spiller1-flytt");
var pl1s = document.querySelector("#spiller1-stille");
var pl2f = document.querySelector("#spiller2-flytt");
var pl2s = document.querySelector("#spiller2-stille");
var kol = 0;
var rad = 0;
var p1x, p1y, p2x, p2y, p3x, p3y, p4x, p4y;
var moveEnabled=true;

var keyCodes = {"player1":{"s":83, "w":87,"a":65,"d":68,"space":32},
                "player2":{"ad":40,"au":38,"al":37,"ar":39,"fn":220}};
var playerInfo = {  "player1": {"liv":3,"fart":5,"bomber":1,"lyn":1},
                    "player2": {"liv":3,"fart":5,"bomber":1,"lyn":1},
                    "player3": {"liv":3,"fart":5,"bomber":1,"lyn":1},
                    "player4": {"liv":3,"fart":5,"bomber":1,"lyn":1}   };

window.onload = function(){
    generateLevel(15);
    window.onkeydown = move;
}

/* Player Movements */
function move(evt){
	if(moveEnabled===true){
        // Denne sjekker om player 1 tastatur er trykket. 
        // Sender da hvilken tast gjennom parametre til p1Move funksjonen  
        for(var x in keyCodes.player1){
            if(evt.which == keyCodes.player1[x]){
                p1Move(x);
            }
        }
	}
    this.onkeyup = function(){
        //console.log("Released");
    }
}
function p1Move(dir){
	c2.clearRect(p1x, p1y, BLOCKSIZE, BLOCKSIZE);

	//Trenger en praktisk måte å endre på pxx/pxy så det både huskes og flyttes med mindre enn en rute av gangen.
    switch(dir){
        case "s":
            p1y += (BLOCKSIZE / 5);
            break;
        case "w":
            p1y -= (BLOCKSIZE / 5);
            break;
        case "d":
            p1x += (BLOCKSIZE / 5);
            break;
        case "a":
            p1x -= (BLOCKSIZE / 5);
            break;
        
        default:
            break;
    }
    // 5-tallet brukt her er placeholder for spillerens fart.
    // Vi må også lage den algoritmen for å beregne speed basert på sko-powerup
    // Men det tar vi senere x.x
    
    c2.drawImage(pl1f,p1x,p1y);

	//En annen ting er det at jeg tror ikke vi trenger "requestAnimationFrame()" i det hele tatt med den løsningen vi har her, men jeg er ikke sikker så jeg vet ikke om jeg vil satse på det.

	//c2.drawImage();
}
/* Generate size of game */
function generateLevel(x, y = x){
    kol = x;
    rad = y;
    /* Tar både x og y størrelse som parametre.
    *  Om en y verdi ikke blir oppgitt, får den x verdien (kvadratisk oppsett) */
    canvas1.width = BLOCKSIZE * x;
    canvas1.height = BLOCKSIZE * y;
    canvas2.width = BLOCKSIZE * x;
    canvas2.height = BLOCKSIZE * y;
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
    placePlayers();
}
function createBlocks(){
   // Stein blokker
   for(let i = 0; i < layout.length; i++){
    	if(layout[i].z === 1){
            c1.drawImage(concrete,layout[i].xCord,layout[i].yCord);
      	} else if(layout[i].z === 3){
            c1.drawImage(asfalt,layout[i].xCord,layout[i].yCord);
        }else if(layout[i].z === 2){
            c1.drawImage(boks,layout[i].xCord,layout[i].yCord);            
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
function placePlayers(players = 4){     
    // TODO: lagre var et sted med antall players, som blir send i parametre
    p1x = layout[1].xCord;
    p1y = layout[kol +1].yCord;
    p2x = layout[kol -2].xCord;
    p2y = layout[kol +1].yCord;
    p3x = layout[1].xCord;
    p3y = layout[layout.length - rad - 1].yCord;
    p4x = layout[kol -2].xCord;
    p4y = layout[layout.length - rad - 1].yCord;
    
    c2.drawImage(pl1s,p1x,p1y);
    c2.drawImage(pl2s,p2x,p2y);
        
    if(players >= 3)
        c2.drawImage(pl2s,p3x,p3y);
    if(players === 4)
        c2.drawImage(pl1s,p4x,p4y);
    
    /* Brukes i funksjon til å 'redraw' */    
    //c2.clearRect(0,0,canvas2.width, canvas2.height);
}
function CordX(x){
	return x*BLOCKSIZE;
};
function CordY(y){
	return y*BLOCKSIZE;
}