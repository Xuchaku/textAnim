let cnv = document.querySelector("#cnv");
const width = window.innerWidth, height = window.innerHeight;
let ctx = cnv.getContext("2d");
let gradient = ctx.createLinearGradient(width/2, height/2, width, height/2);
let mtrx = [];
let step = 0;
let s = 0;
let oldSt = 0;
let globalMinWidth = Infinity;
function loop(){
   ctx.clearRect(width/2,height/2-100,width/2,900);
   oldSt = step;
   for(let i =0;i<mtrx.length;i++){
        for(let j = 0;j<mtrx[i].length;j++){
            mtrx[i][j][4] -= Math.cos(step)*0.7;
            ctx.beginPath();
            ctx.fillStyle = "rgb("+mtrx[i][j][0]+","+mtrx[i][j][1]+","+mtrx[i][j][2]+")";
            /*mtrx[i][j][0] = (mtrx[i][j][0] + 1) % 256;
            mtrx[i][j][1] = (mtrx[i][j][1] + 1) % 256;
            mtrx[i][j][2] = (mtrx[i][j][2] + 1) % 256;*/
            ctx.fillRect(mtrx[i][j][3],mtrx[i][j][4],1,1);
            ctx.closePath();
            step+=s;

        }
    }
    step += s;
   /*if((oldSt % Math.round(width/2 - globalMinWidth)) == (step % Math.round(width/2 - globalMinWidth))){
       console.log("heere")
   }*/

    requestAnimationFrame(loop);
}
function init(){
    let imgData;
    let m = 0;
    let localMinWidth = 0;

    cnv.width = width;
    cnv.height = height;
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "magenta");
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,width+1, height+1);
    ctx.fillStyle = gradient;
    ctx.textBaseline="top";
    ctx.font="100px Georgia";
    //let elem = document.querySelector("img");
    //ctx.drawImage(elem, width/2, height/2,400, 100)
    ctx.fillText("BORIS",width/2, height/2);

    for(let j = height/2;j < height/2 + 100;j++){
        for(let i = width - 1; i > width/2;i--){

            imgData = ctx.getImageData(i, j, 1, 1);
           // console.log(imgData.data[0], imgData.data[1], imgData.data[2]);
            if(imgData.data[0] == 255 && imgData.data[1] == 255 && imgData.data[2] == 255){
                localMinWidth++;
                //console.log("here")
            }
            else{
                break;
            }

        }

        if(localMinWidth < globalMinWidth){
            globalMinWidth = localMinWidth;
        }
        localMinWidth=0;
    }
    //console.log(Math.round(width/2 - globalMinWidth));
    //console.log(width/2, width-globalMinWidth, width/2 - globalMinWidth);
    //s = 2*Math.PI/(154);
    s = 8*Math.PI/(Math.round(width/2 - globalMinWidth));

    for(let j = height/2;j< height/2 + 100;j++){
        mtrx[m] = [];
        for(let i = width/2; i < width - globalMinWidth;i++){
            imgData = ctx.getImageData(i, j, 1, 1);
            mtrx[m].push([imgData.data[0], imgData.data[1], imgData.data[2], i , j]);
        }
        m++;
    }
    /*console.log(mtrx);
    for(let i = 0;i<mtrx.length;i++){
        for(let j = 0;j<mtrx[i].length;j++){
            ctx.beginPath()
            ctx.fillStyle = "rgb("+mtrx[i][j][0]+","+mtrx[i][j][1]+","+mtrx[i][j][2]+")";
            ctx.fillRect(mtrx[i][j][3]-500,mtrx[i][j][4],1,1);
            ctx.closePath();
        }
    }*/
    requestAnimationFrame(loop);
}
document.onclick = loop;
init();

