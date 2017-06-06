var event = new CustomEvent("playerDies", { "detail": "Example of an event" });

function Player(){
    this.hp = 100;
    this.sprite = new Sprite();
    this.vidas = 3;
    this.pontos = 0;
    this.x = 40;
    this.y = 10;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.ay = 300.0;
    this.sprite.vy = 0.0;
    this.shots = [];
    this.cooldown = 0;
    this.colisionObservable = null;
    this.alive = true;
}


Player.prototype.desenhar = function(ctx){this.sprite.desenhar(ctx)};

Player.prototype.desenharImg = function(ctx, img){
    this.sprite.desenharImg(ctx, img);
    for (var i = 0; i < this.shots.length; i++) {
        this.shots[i].desenharImg(ctx, this.imageLib.images[this.shots[i].sprite.imgkey]);
    }
};

Player.prototype.mover = function(dt){
    this.sprite.mover(dt);
    this.moverTiros(dt);
    if(this.cooldown>0) {
        this.cooldown -= dt;
    } else {
        this.cooldown = 0;
    }
};
Player.prototype.moverTiros = function(dt){
    for (var i = this.shots.length - 1; i >= 0; i--) {
        this.shots[i].moverAng(dt);
        if (
            this.shots[i].sprite.x > 3000 ||
            this.shots[i].sprite.x < -3000 ||
            this.shots[i].sprite.y > 3000 ||
            this.shots[i].sprite.y < -3000
        ) {
            this.shots.splice(i, 1);
        }
    }
};

Player.prototype.moverAng = function(dt){this.sprite.moverAng(dt)};

Player.prototype.colidiuCom = function(alvo){
    this.sprite.colidiuCom(alvo);
};

Player.prototype.perseguir = function (alvo, dt) {this.sprite.perseguir(alvo, dt)};
Player.prototype.perseguirAng = function (alvo, dt){this.sprite.perseguirAng(alvo, dt)};

Player.prototype.removeShot = function (shot){
    x = this.shots.indexOf(shot);
    this.colisionObservable.remove(shot);
    this.shots = this.shots.splice(x, 1);
};

Player.prototype.fire = function (audiolib, key, vol){
    if(player.cooldown>0) return;
    var tiro = new Shot();
    tiro.sprite.x = player.sprite.x;
    tiro.sprite.y = player.sprite.y;
    tiro.sprite.angle = player.sprite.angle;
    tiro.sprite.am = 100;
    tiro.sprite.width = 8;
    tiro.sprite.height = 16;
    tiro.sprite.imgkey = "shot";
    this.shots.push(tiro);
    this.colisionObservable.add(tiro);
    tiro.player = this;
    player.cooldown = 1;
    if(audiolib && key) audiolib.play(key,vol);
}

Player.prototype.die = function() {
    this.alive = false;
    document.dispatchEvent(event);
};

Player.prototype.receberPontos = function (pontos) {
    this.pontos += pontos;
}

Player.prototype.receberDano = function (dano) {
    this.die();
}


Player.prototype.resolveColision = function (alvo){
    if (alvo instanceof Shot) return;
    this.receberDano(alvo.dano);
    this.receberPontos(alvo.pontos);
};

Player.prototype.jump = function(){
    this.sprite.vy = -120;
}

addEventListener("keydown", function(e){
    switch (e.keyCode) {
        case 32:
            player.jump();
            break;
        case 37:
            // player.sprite.ax = -100;
            break;
        case 38:
            // player.sprite.ay = -100;
            break;
        case 39:
            // player.sprite.ax = +100;
            break;
        case 40:
            // player.sprite.ay = +100;
            break;
        default:
    }
});
addEventListener("keyup", function(e){
    switch (e.keyCode) {
        case 37:
            // player.sprite.ax = 0;
            break;
        case 38:
            // player.sprite.ay = 0;
            break;
        case 39:
            // player.sprite.ax = 0;
            break;
        case 40:
            // player.sprite.ay = 0;
            break;
        default:
    }
});
