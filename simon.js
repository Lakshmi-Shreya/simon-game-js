var colors=["blue","red","green","yellow"];
var gamePattern=[];
var userClickedBtns=[];
$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");

   userClickedBtns.push(userChosenColor);

   playSound(userChosenColor);
   animation(userChosenColor);
   check(userClickedBtns.length-1);
});
function playSound(musiccolor){
    var audio=new Audio("sounds/"+musiccolor+".mp3");
    audio.play();
}
function animation(currentcolor){
    $("#"+currentcolor).addClass("clicked");
    setTimeout(function(){
        $("#"+currentcolor).removeClass("clicked");
    },100);
}
var started=false;
var level=0;
$(document).keydown(function(){
    if(!started)
    {
        $("#firstline").text("Level - "+level);
        sequence();
        started=true;
    }
});

function sequence(){
    userClickedBtns=[];
    level++;
    $("#firstline").text("Level - "+level);
    var randomNum=Math.floor(Math.random()*4);
    var chosenRandomColor=colors[randomNum];
    gamePattern.push(chosenRandomColor);
   
    $("#"+chosenRandomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(chosenRandomColor);
    animation(chosenRandomColor);

//     $("#"+chosenRandomColor).click(function(){ 
//         var audio=new Audio("sounds/"+chosenRandomColor+".mp3");
//     audio.play();
// }); this code when audio for random color has to be played but since google doesnt like to play sound whenever page is reloaded we have added click function indicating upon clicking the chosen color btn the audio associated to it gets played only. refer Qand A of 193 or194 or195 for details.
}
function check(verify){
    if(gamePattern[verify]===userClickedBtns[verify]){
       
       if(gamePattern.length===userClickedBtns.length){
           setTimeout(function(){
            sequence();  
           },1000);

        
        }
    }
    else {
        $("#firstline").text("Game Over");

        var sound=new Audio("sounds/wrong.mp3");
        sound.play();
        $(".bg").addClass("wrong");
        setTimeout(function(){
             $(".bg").removeClass("wrong");
            
        },200);
          restart();
       
    }
}
function restart(){
    started=false;
    level=0;
    gamePattern=[];
}

