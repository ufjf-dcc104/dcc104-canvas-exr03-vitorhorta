function ColisionObservable() {
    this.bodies = [];
}

ColisionObservable.prototype.add = function(obj){
    this.bodies.push(obj);
}

ColisionObservable.prototype.remove = function(obj){
    x = this.bodies.indexOf(obj);
    console.log(x);
    this.bodies.splice(x, 1);
}

ColisionObservable.prototype.checkColisions = function(){
    for (var i = 0; i < this.bodies.length; i++){
        for (var j = i+1; j < this.bodies.length; j++){
            if(this.bodies[i].sprite.colidiuCom(this.bodies[j].sprite)){
                body1 = this.bodies[i];
                body2 = this.bodies[j];
                body1.resolveColision(body2);
                body2.resolveColision(body1);
            }
        }
    }
}