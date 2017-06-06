function Shot(){
    this.sprite = new Sprite();
    this.player = null;
}


Shot.prototype.desenhar = function(ctx){this.sprite.desenhar(ctx)};

Shot.prototype.desenharImg = function(ctx, img){
    this.sprite.desenharImg(ctx, img);
};

Shot.prototype.mover = function(dt){
    this.sprite.mover(dt);
};

Shot.prototype.moverAng = function(dt){this.sprite.moverAng(dt)};

Shot.prototype.colidiuCom = function(alvo){
    this.sprite.colidiuCom(alvo);
};

Shot.prototype.perseguir = function (alvo, dt) {this.sprite.perseguir(alvo, dt)};
Shot.prototype.perseguirAng = function (alvo, dt){this.sprite.perseguirAng(alvo, dt)};


Shot.prototype.resolveColision = function (alvo){
    if(alvo == this.player) {
        return
    }
    var key = "boom";
    if (al && key) al.play(key);
    this.player.receberPontos(alvo.pontos);
    this.player.removeShot(this);
};
