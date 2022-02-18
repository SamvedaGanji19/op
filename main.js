video="";
Status="";
Objects=[];
 
 

 function setup(){
canvas=createCanvas(480,380);
canvas.center();
video=createCapture(VIDEO);
video.size(480,380);
video.hide();
 }
 function start(){
     objectDetector=ml5.objectDetector("cocossd",modelLoaded);
     document.getElementById("status").innerHTML="status: detecting objects";
     Object_name=document.getElementById("Object_name").value;
 }
 function modelLoaded(){
     console.log("Model Loaded!");
 Status=true;
 }
 function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        Objects=results;
    }
}
function draw(){
    image(video,0,0,480,380);
    if(Status !=""){
   
       objectDetector.detect(video,gotResult);
      for(i=0; i<Objects.length;i++){
          document.getElementById("status").innerHTML="Status: Object Detected";
      
          fill("#000080");
          percent=floor(Objects[i].confidence*100);
          text(Objects[i].label +""+ percent+"%",Objects[i].x+15,Objects[i].y+15);
          noFill();
          stroke("#f97a96");
          rect(Objects[i].x,Objects[i].y,Objects[i].width,Objects[i].height);
          if(objects[i].label==Object_name){
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("Object").innerHTML=Object_name+" found";
              synth=window.speechSynthesis;
              utterThis=new SpeechSynthesisUtterance(object_name+"Found");
              synth.speak(utterThis);
          }
          else{
            document.getElementById("Object").innerHTML=Object_name+" Not found";   
          }
    }
    }
   }
