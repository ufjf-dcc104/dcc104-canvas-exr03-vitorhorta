function Enemy(){
    this.hp = 1;
    this.dano = 20;
    this.pontos = 0;
    this.sprite = new Sprite();
    this.x = 0;
    this.y = 30;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.ay = 0.0;
    this.sprite.vy = 0.0;
    this.sprite.vx = -60.0;
    this.shots = [];
    this.colisionResolver = null;
}


Enemy.prototype.desenhar = function(ctx){this.sprite.desenhar(ctx)};
Enemy.prototype.desenharImg = function(ctx, img){this.sprite.desenharImg(ctx, img)};
Enemy.prototype.mover = function(dt){this.sprite.mover(dt)};

Enemy.prototype.moverAng = function(dt){this.sprite.moverAng(dt)};

Enemy.prototype.colidiuCom = function(alvo){this.sprite.colidiuCom(alvo)};

Enemy.prototype.perseguir = function (alvo, dt) {this.sprite.perseguir(alvo, dt)};
Enemy.prototype.perseguirAng = function (alvo, dt){this.sprite.perseguirAng(alvo, dt)};

Enemy.prototype.resolveColision = function (alvo){
    this.colisionResolver.resolveColision(this,alvo);
};