class Bola{
    constructor(x, y){
        this.x = x
        this.y = y
        this.radio =10
    }
    
    dibujar(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2)
        ctx.fill()
        ctx.closePath()
    }
    
}