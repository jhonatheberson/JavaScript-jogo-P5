// ---- limites do canvas ----
var lim_x = 800;
var lim_y = 600;
// ---- posicao inicial do heroi ----
var hero = {
    x: undefined,
    y: undefined,
    img: [],
    tmp: 0,
    estado: undefined,
    imgfogo: [],
    tmpf: 0,
}
// --- bonus ----
var tmp_b, val_b;
var bonus = {
    x: undefined,
    y: undefined,
    img: [],
    tmp: 0,
}
// ---- posicao e velocidade do objeto aleatorio ----
var ast = {
    img: [],
    tmp: [],
    x: [],
    y: [],
    tam: [],
    vel: [],
    pos: [],
}

var lim_ast, vel_min_a, vel_max_a;
var naveI = {
    x: undefined,
    y: undefined,
    //tiro do inimigo
    imgT: [],
    imgF: [],
    tiro: undefined,
    valT: false,
    tmpT: 0,
    xd: undefined,
    yd: undefined,
    //--------------
    life: 100,
    lifeI: [],
    life_tmp: 0,
    force: 20,
    img: [],
    tmp: 0,
    check: true,
}
// ---- tiro -----
var tiro = {
    x: [],
    y: [],
    img: [],
    tmp: [],
    qdt: 10,
    valida: [],
    rec: 0,

}
//---- info tela ----
var vida, pontos, tiros, dificuldade;
//---- estrelas -----
var eX = [];
var eY = [];
var eVel = [];
var eTam = [];
quantE = 80;
//------------------
var Game_est = 0;
var bol = {
    r: 5,
    g: 242,
    b: 60,
    a: 0.3,
    larg: 200,

}
// --- explosoes ----
var explo = {
    img: [],
    x: [],
    y: [],
    vel: [],
    tmp: [],
    valida: [],
    tam: [],
}

function preload(){
    menu = loadSound('musica/musica.mp3');
    for(i = 1; i <= 48; i++){
        explo.img[i - 1] = loadImage("img/explosao/exp/exp ("+i+").png");
    }
    for(i = 0; i <= 31; i++){
        ast.img[i] = loadImage("img/asteroide/ast01/ast ("+i+").png")
    }
    for(i = 0; i <= 7; i++){
        tiro.img[i] = loadImage("img/extra/tiro_fire/tiro ("+i+").png");
    }
    hero.img[0] = loadImage("img/naves/nave/nave_0.png");
    for(i = 1; i <= 20; i++){
        hero.img[-i] = loadImage("img/naves/nave/naved_"+i+".png");
        hero.img[i] = loadImage("img/naves/nave/navee_"+i+".png")
    }
    for(i = 0; i <= 3; i++){
        hero.imgfogo[i] = loadImage("img/naves/fogo ("+i+").png");
    }
    naveI.img[0] = loadImage("img/naves/nave inimiga/nave_0.png");
    for(i = 1; i <= 8; i++){
        naveI.img[i] = loadImage("img/naves/nave inimiga/nave_"+i+".png");
        naveI.img[-i] = loadImage("img/naves/nave inimiga/nave_"+(-i)+".png");
    }
    for(i = 0; i <= 3; i++){
        naveI.imgF[i] = loadImage("img/naves/fogo inverso ("+i+").png");
    }
    for(i = 0; i <= 12; i++){
        naveI.imgT[i] = loadImage("img/extra/missil/tiro ("+i+").png");
    }
    for(i = 0; i <= 4; i++){
        naveI.lifeI[i] = loadImage("img/extra/barra/life ("+i+").png");
    }
    for(i = 0; i <= 9; i++){
        bonus.img[i] = loadImage("img/extra/bonus/bonus_"+i+".png");
    }
}

function setup() {
	createCanvas(lim_x, lim_y);
	frameRate(60);
  somexplo = loadSound('musica/esplosao.mp3');
  somtiro = loadSound('musica/missil.mp3');
  sombonus = loadSound('musica/bonus.mp3');
  menu.setVolume(0.3);
  menu.play();




// ---- criar os vetores para as estrelas aleatórias ----
	for(i = 0; i < quantE; ++i){
		eX[i] = random(0, lim_x);
		eY[i] = random(0, lim_y);
		eVel[i] = random(0.1, 2);
		eTam[i] = random(1, 4);
	}
}
function draw() {
    imageMode(CENTER);
    //---- tela inicial-----
    if(Game_est == 0){
        clear();
        click();
        background(0);
        textAlign(CENTER);
        strokeWeight(2);
        stroke(bol.r, bol.g, bol.b + 20);
        textSize(90);
        text("~ STAR FORCE ~", (lim_x/2), (100));
        fill("rgba("+bol.r+", "+bol.g+", "+bol.b+", "+bol.a+")");
        ellipse(lim_x/2, lim_y/2, bol.larg, bol.larg);
        textSize(40);
	    textStyle(BOLD);
	    textFont('Helvetica');
        fill('white');
        text("Play", (lim_x/2), (lim_y/2) + 10);
    }
    //----- game -----
    if(Game_est == 1){

    clear();
    // ------ nivel -----
    Game_nivel();
    // ---- Chamando as movimentações do heroi ----
    acoes_hero();
    // --------------------------------------------
    background(0);
    // ---- Chamando as estrelas ----
    estrelas();
    //-----------------------------------
    noStroke();
    //inimigo
    inimigo();
    if(naveI.check){
        image(naveI.img[naveI.tmp], naveI.x, naveI.y, 56, 90);
    }
    if(naveI.valT){
        image(naveI.imgT[naveI.tmpT], naveI.xd, naveI.yd, 15, 32);
        image(naveI.imgF[hero.tmpf], naveI.xd + 1, naveI.yd - 16, 15, 24);
    }
    for(i = 0; i < lim_ast; ++i){
    image(ast.img[ast.tmp[i]], ast.x[i], ast.y[i], ast.tam[i], ast.tam[i]);
    }
    //--- tiro ---
    for(i = 1; i <= 10; i++){
    if(tiro.valida[i]){image(tiro.img[tiro.tmp[i]], tiro.x[i], tiro.y[i], 40, 40);}

    }
    // ------hero--------
    image(hero.img[hero.tmp], hero.x, hero.y, 60, 60);
    image(hero.imgfogo[hero.tmpf], hero.x + 12, hero.y+ 41, 20, 30);
    image(hero.imgfogo[hero.tmpf], hero.x - 14, hero.y+ 41, 20, 30);

    //movimentação do meteoro
    for(i = 0; i < lim_ast; ++i){
    if((ast.y[i] <= lim_y + (ast.tam[i]/2))){
            ast.y[i] += ast.vel[i];
            colisao(ast.x[i], ast.y[i], ast.tam[i]/2, "ast");
        }    else {
            reset_obj(ast.pos[i]);
        }
    }
    // --- explosoes ----
    for(i = 0; i <= 8; i++){
    if(explo.valida[i]){image(explo.img[explo.tmp[i]], explo.x[i], explo.y[i], explo.tam[i], explo.tam[i]);}
    }
    // ----- bonus -----
    bonus_life()
    fill('yellow');
    if(!val_b){image(bonus.img[bonus.tmp],bonus.x, bonus.y, 50, 54);}
    colisao(bonus.x, bonus.y, 25,"bonus");

    //---- chamando as animaçoes ativas ---
    executa_animacao();

    //informações na tela
    fill('rgb(91, 85, 113)');
	textAlign(LEFT);
	textSize(20);
	textStyle(BOLD);
	textFont('Helvetica');
	fill('white');
	text("Vida: "+vida, 5, 50);
    if(naveI.check){image(naveI.lifeI[naveI.life_tmp], lim_x - 71, 19, 142, 38);}
    // ----- Tela de perdedor ----
    if(vida == -1){
        Game_est = 2;
    }
    // ---------------------------
	text("Pontos: "+pontos, 5, 70);
	text("Level: "+dificuldade, 5, 90);
    //------------------------
    }
    //------tela perdedor ---
    if(Game_est == 2){
        clear();
        background(0);
        textAlign(CENTER);
        textSize(60);
        textStyle(BOLD);
        textFont('Helvetica');
        fill('white');
        text("Você perdeu", (lim_x/2), (lim_y/2));
        textSize(30);
        text("Pontos "+pontos, (lim_x/2), (lim_y/2) + 50);
        textSize(10);
        text("Press ENTER", (lim_x/2), (lim_y/2) + 100);
        click();
    }
    if(Game_est == 3){
        clear();
        background(0);
        textAlign(CENTER);
        textSize(60);
        textStyle(BOLD);
        textFont('Helvetica');
        fill('white');
        text("Parabéns, Você Venceu!", (lim_x/2), (lim_y/2));
        textSize(30);
        text("Pontos "+pontos, (lim_x/2), (lim_y/2) + 50);
        textSize(10);
        text("Press ENTER", (lim_x/2), (lim_y/2) + 100);
        click();
    }
}

function acoes_hero(){
    // ---- movimento do Heroi ----
    if (keyIsDown(LEFT_ARROW)){
        if(hero.tmp < 20){
            hero.tmp++;
        }
		if(hero.x > + 25){

		hero.x += - 5;
		}
	}
	if (keyIsDown(RIGHT_ARROW)){
        if(hero.tmp > -20){
            hero.tmp--;
        }

		if(hero.x < lim_x - 25){
		hero.x += 5;
		}
	}
	if (keyIsDown(UP_ARROW)) {
		if (hero.y > + 25){
		hero.y += - 3;
		}
	}
	if (keyIsDown(DOWN_ARROW)) {
		if (hero.y < lim_y - 25){
		hero.y += 3;
		}
	}
    // ---- Fim do movimento do Heroi ----
    // ---- tiro  ----
    if(tiro.rec > 0){tiro.rec--;}
    if(keyIsDown(65) && tiro.qdt != 0 && tiro.rec == 0){
        for(i = 1, test = false; test == false && i <= 10; i++){
        if(!tiro.valida[i]){
            tiro.x[i] = hero.x;
            tiro.y[i] = hero.y;
            tiro.valida[i] = true;
            tiro.rec = 10;
            tiro.qdt--;
            test = true;
            somtiro.setVolume(0.1);
            somtiro.play()

            }
        }

    }
    for(i = 1; i <= 10; i++){
        if(tiro.valida[i]){
            tiro.y[i] += -6;

        }
        if(tiro.y[i] < -30){
            tiro.valida[i] = false;
            tiro.x[i] = undefined;
            tiro.y[i] = undefined;
            tiro.qdt++;

        }
    }
}

function reset(){
    //--- reseta posicao----
    hero.x = lim_x/2;
    hero.y = lim_y - 40;
}
function reset_obj(i){
    // --- reseta a posição do quadrado vermelho ----
    ast.tam[i] = random(50, 100);
	ast.x[i] = random(ast.tam[i]/2, lim_x - (ast.tam[i]/2));
	ast.y[i] = - ast.tam[i];
    ast.vel[i] = random(vel_min_a, vel_max_a);
    ast.tmp[i] = parseInt(random(0, 31));
}

function colisao(m, n , raio, tipo){
    //----colisao com o objeto -----
    distH = dist(m, n, hero.x, hero.y + 15)
    if(distH <= raio + 25){
            if(tipo == "ast"){
            //exprosao da nave com asteroid
            explo.x[7] = hero.x;
            explo.y[7] = hero.y;
            explo.vel[7] = 0;
            explo.tam[7] = 150;
            explo.tmp[7] = 0;
            explo.valida[7] = true;
            somexplo.setVolume(0.3);
            somexplo.play()
            reset();
            reset_obj(ast.pos[i]);
            vida --;
            }
            if(tipo == "bonus"){
            vida++;
            val_b = true;
            bonus.x = undefined;
            bonus.y = undefined;
            sombonus.setVolume(0.6);
            sombonus.play()
            }

       }
    //-----colisao do tiro com o objeto -----
    if(tipo == "ast"){
    for(j = 1; j <= 10; j++){
    distT = dist(m, n, tiro.x[j], tiro.y[j])
    if(distT <= raio){
            //--- chamando posição da animação ---
            animacao(ast.x[i], ast.y[i], ast.vel[i], ast.tam[i], explo)
            somexplo.setVolume(0.3);
            somexplo.play()
            // resetando objeto
            reset_obj(ast.pos[i]);
            tiro.valida[j] = false;
            tiro.x[j] = undefined;
            tiro.y[j] = undefined;
            tiro.qdt++;
            pontos++;

       }
    }
    }
    if(tipo == "missil"){
        distMX = dist(m, 0, hero.x, 0);
        distMY = dist(0, n, 0, hero.y);
        if(distMX - 20 < raio && distMY - 20 < 3.4*raio){
            explo.x[7] = hero.x;
            explo.y[7] = hero.y;
            explo.vel[7] = 0;
            explo.tam[7] = 150;
            explo.tmp[7] = 0;
            explo.valida[7] = true;
            naveI.valT = false;
            naveI.xd = undefined;
            naveI.yd = undefined;
            somexplo.setVolume(0.3);
            somexplo.play()
            vida--;
            reset();
        }
    }
    //tiro com nave inimiga
    if(tipo == "naveI"){
        for(i = 1; i <= 10; i++){
            distNX = dist(m, 0, tiro.x[i], 0);
            distNY = dist(0, n, 0, tiro.y[i]);
            if(distNX < raio && distNY < 1.6*raio){

                naveI.life += -naveI.force;

                tiro.valida[i] = false;
                tiro.x[i] = undefined;
                tiro.y[i] = undefined;
                tiro.qdt++;

                if(naveI.life <= 0){
                    explo.x[8] = naveI.x;
                    explo.y[8] = naveI.y;
                    explo.vel[8] = 4;
                    explo.tam[8] = 160;
                    explo.tmp[8] = 0;
                    explo.valida[8] = true;
                    somexplo.setVolume(0.3);
                    somexplo.play()
                }
            }
        }
    }
}
function estrelas(){
		// ---- desenhando as estrelas ----
	for(i = 0; i < quantE; ++i){
		rect(eX[i], eY[i], eTam[i], eTam[i]);
	}
	//movimentação
	for(i = 0; i < quantE; ++i){
		eY[i] += eVel[i];
		if(eY[i] >= lim_y){
			eY[i] = random(0);
		}
	}
}

function click(){
    if(Game_est == 0){
    var d = dist(mouseX, mouseY, lim_x/2, lim_y/2);
    if(d < (bol.larg)/2){
        bol.r = 255;
        bol.g = 1;
        bol.b = 1;
        bol.a = 0.2;
        bol.larg = 210;

        if(mouseIsPressed){
            if(mouseButton == LEFT){
                // --- Parametros iniciais do jogo ----
                Game_est = 1;
                //status do hero
                pontos = 0;
                vida = 3;
                tiros = 0;
                dificuldade = 1;
                //bonus
                tmp_b = 500;
                val_b = true;
                bonus.x = undefined;
                bonus.y = undefined;
                //asteroides
                vel_max_a = 4;
                vel_min_a = 3;
                for(i = 0; i < 6; ++i){
                ast.pos[i] = i;
                ast.tam[i] = random(50, 100);
                ast.x[i] = random(0, lim_x - ast.tam[i]);
                ast.y[i] = - ast.tam[i];
                ast.vel[i] = random(vel_min_a, vel_max_a);
                ast.tmp[i] = parseInt(random(0, 31));
	            }
                lim_ast = 3;

                //heroi
                hero.x = lim_x/2;
                hero.y = lim_y - 40;
                //inimigo
                naveI.check = true;
                naveI.x = undefined;
                naveI.y = undefined;
                naveI.force = 20;
                naveI.life = 100;
                naveI.valT = true;
                naveI.xd = undefined;
                naveI.yd = undefined;
                //explosoes
                for(i = 0; i <= 8; i++){
                explo.x[i] = undefined;
                explo.y[i] = undefined;
                explo.vel[i] = undefined;
                explo.tmp[i] = undefined;
                explo.valida[i] = false;
                }
                //tiros do heroi
                for(i = 1; i <= 10; i++){
                tiro.valida[i] = false;
                tiro.x[i] = undefined;
                tiro.y[i] = undefined;
                }
                tiro.qdt = 10;
            }
        }
    } else {
        bol.r = 4;
        bol.g = 242;
        bol.b = 60;
        bol.a = 0.3;
        bol.larg = 200;
    }
    }
    if(Game_est == 2 || Game_est == 3){
        if(keyIsDown(13)){
                Game_est = 0;
        }
    }
}
function Game_nivel(){
    switch(pontos){
        case 20:
            naveI.life = 100;
            naveI.force = 8;
            naveI.check = true;
            dificuldade = 2;
            vel_max_a = 6;
            lim_ast = 4;
            break;
        case 40:
            naveI.life = 100;
            naveI.check = true;
            naveI.force = 6;
            dificuldade = 3;
            vel_min_a = 4;
            break;
        case 60:
            naveI.life = 100;
            naveI.check = true;
            naveI.force = 4;
            dificuldade = 4;
            lim_ast = 5;
            break;
        case 80:
            naveI.life = 100;
            naveI.check = true;
            naveI.force = 2;
            dificuldade = 5;
            vel_max_a = 8;
            break;
        case 100:
            naveI.life = 100;
            naveI.check = true;
            naveI.force = 1;
            dificuldade = 6;
            vel_max_a = 10;
            vel_min_a = 6;
            lim_ast = 6;
            break;
    }
    if(pontos > 100 && pontos <= 200 && !naveI.check){
            naveI.life = 100;
            naveI.force = 0.5;
            naveI.check = true;
    } else if(pontos > 200 && !naveI.check){
        Game_est = 3;
    }
}

function bonus_life(){
    if(frameCount%tmp_b == 0 && val_b){
        bonus.x = random(0, lim_x - 15);
        bonus.y = random(0, -100);
        val_b = false;
    }
    if(!val_b){
        bonus.y += 3;
    }
    if(bonus.y > lim_y + 15){
        val_b = true;
    }
}

function animacao(posX, posY, velO, tamO, anim){
    anim.x[i] = posX;
    anim.y[i] = posY;
    anim.vel[i] = velO;
    anim.tam[i] = tamO;
    anim.tmp[i] = 0;
    anim.valida[i] = true;
}

function executa_animacao(){
    // animação da explosao
    for(i = 0; i <= 8; i++){
    if(explo.tmp[i] < 47){
        explo.tmp[i]++;
        explo.y[i] += explo.vel[i];
    } else {
        explo.x[i] = undefined;
        explo.y[i] = undefined;
        explo.vel[i] = undefined;
        explo.tmp[i] = undefined;
        explo.valida[i] = false;
        }
    }
    // animação do asteroide
    if(frameCount%3 == 0){
    for(i = 0; i <= lim_ast; i++){
        if(ast.tmp[i] < 31){
            ast.tmp[i]++;
        } else {
            ast.tmp[i] = 0;
        }
      }
    }
    // animação do tiro
    if(frameCount%3 == 0){
    for(i = 1; i <= 10; i++){
        if(tiro.tmp[i] < 7 && tiro.valida[i]){
            tiro.tmp[i]++;
        } else {
            tiro.tmp[i] = 0;
        }
    }
    }
    if(hero.tmp > 0 && !keyIsDown(LEFT_ARROW)){
        hero.tmp--;
    }
    if(hero.tmp < 0 && !keyIsDown(RIGHT_ARROW)){
        hero.tmp++;
    }
    if(frameCount%3 == 0){
    if(hero.tmpf < 3){
        hero.tmpf++;
    } else {
        hero.tmpf = 0;
    }
    }
    if(!val_b && frameCount%6 == 0){
        if(bonus.tmp < 9){
            bonus.tmp++;
        } else {
            bonus.tmp = 0;
        }
    }
}

function inimigo(){
    if(naveI.check && naveI.x == undefined && naveI.y == undefined){
        naveI.x = random(19, lim_x -19);
        naveI.y = -45;
    }
    if(naveI.check){
    if(naveI.y < 50){
        naveI.y++;
    }
    if(naveI.x < hero.x && !(naveI.x > hero.x-3 && naveI.x < hero.x+3)){
        if(naveI.tmp >= 0) {naveI.x += 3;}
        if(naveI.tmp < 8 && frameCount%3 == 0) {naveI.tmp++;}
    } else if (naveI.x > hero.x && !(naveI.x > hero.x-3 && naveI.x < hero.x+3)){
        if(naveI.tmp <= 0){naveI.x += -3;}
        if(naveI.tmp > -8 && frameCount%3 == 0) {naveI.tmp--;}
    }
    if(naveI.x > hero.x-3 && naveI.x < hero.x+3){
        if(naveI.tmp < 0){
            naveI.tmp++;
        } else if(naveI.tmp > 0){
            naveI.tmp--;
        }
        if(!naveI.valT){
            naveI.valT = true;
            naveI.xd = naveI.x;
            naveI.yd = naveI.y;
        }
    }
    }
    if(naveI.valT){
        if(naveI.yd < lim_y + 4){
            naveI.yd += 5;
            if(naveI.x < hero.x && !(naveI.x > hero.x-3 && naveI.x < hero.x+3)){
                if(naveI.yd <= hero.y){naveI.xd += 1.5;}
            } else if(naveI.x > hero.x && !(naveI.x > hero.x-3 && naveI.x < hero.x+3)){
                if(naveI.yd <= hero.y){naveI.xd -= 1.5;}
            }
            } else {
            naveI.valT = false;
            naveI.xd = undefined;
            naveI.yd = undefined;
            }
            if(frameCount%5 == 0){
            if(naveI.tmpT < 12){
                naveI.tmpT++;
            } else {
                naveI.tmpT = 0;
                }
            }
        colisao(naveI.xd, naveI.yd, 7, "missil");

        }
    if(naveI.life <= 0){
        naveI.check = false;
        naveI.x = undefined;
        naveI.y = undefined;
    }

    if(naveI.life <= 20){
        naveI.life_tmp = 4;
    } else if(naveI.life <= 40){
        naveI.life_tmp = 3;
    } else if(naveI.life <= 60){
        naveI.life_tmp = 2;
    } else if(naveI.life <= 80){
        naveI.life_tmp = 1;
    } else if(naveI.life <= 100){
        naveI.life_tmp = 0;
    }
    colisao(naveI.x, naveI.y, 28, "naveI");
}
