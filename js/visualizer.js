function main(){
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //console.log('loaded');
    class Bar {
        constructor(x, y, width, height, color){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;  
        }
        update(micInput){
            this.height = micInput*500;
            // this.y++; //moves rectangle on y-axis
            // this.x++; //moves rectangle on X-axis

    
        }
        draw(context){
            // original  context.fillStyle = this.color;
            context.fillStyle = this.color;
            // test context.strokeStyle = this.color;
            // original context.fillRect(this.x, this.y, this.width,  this.height);
            context.fillRect(this.x, this.y, this.width,  this.height);
            // context.beginPath();
            //original context.moveTo(this.x, this.y);
            context.moveTo(this.x, this.y);
            // context.moveTo(this.x, this.height);
            // context.lineTo(this.x, this.y);
            // context.stroke();
        }
    }
    // test // const bar1 = new Bar(10, 10, 100, 200, "blue");

    const microphone = new Microphone();
    let bars = [];
    let barWidth = canvas.width/256;
    function createBars(){
        for (let i=0; i< 256; i++){
            let color = "hsl("+ i*2 + ", 100%, 50%)";
            bars.push(new Bar(i*barWidth, canvas.height/2, 1, 20, color));
        }
    }
    createBars();
    console.log(bars)

    function animate() {
        if (microphone.initialized){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            const samples = microphone.getSamples();
            // console.log(samples)
            // bar1.update();
            // bar1.draw(ctx);
            // generates ausio samples from microphone
            // animate bars based on microphone data
    
            bars.forEach(function(bar, i){
                bar.update(samples[i]);
                bar.draw(ctx);
            });
        }


        // console.log("animate");
        requestAnimationFrame(animate);
    }
    animate();
}

