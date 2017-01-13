/**
 * Created by seyi adeleke on 8/18/2016.
 */
$(document).ready(function(){
    var pomodoroTime = 25;
    var breakTime = 5;
    var pomodoroTimer = document.getElementById("pomodoro-count");
    var breakTimer = document.getElementById("break-timer");
    var isPaused = false;
    var timeInterval;
    var display = $("#timer");
    var displayMinutes = $("#minutes");
    var displaySeconds = $("#seconds");

    var i;
    var audio = new Audio('http://soundbible.com/grab.php?id=1377&type=mp3');

    // button controls
    $("#work-minus-btn").click(function(){
        pomodoroTime--;
        if(pomodoroTime <= 1){
            pomodoroTime = 1;
        }
        pomodoroTimer.innerHTML =  pomodoroTime;
        minutes.innerHTML = pomodoroTime;
    });
    $("#work-plus-btn").click(function(){
        pomodoroTime++;
        if(pomodoroTime >= 60){
            pomodoroTime = 60;
        }
        pomodoroTimer.innerHTML =  pomodoroTime;
        minutes.innerHTML = pomodoroTime;
    });
    $("#break-minus-btn").click(function(){
        breakTime--;
        if(breakTime <=1){
            breakTime = 1;
        }
        breakTimer.innerHTML = breakTime;
    });
    $("#break-plus-btn").click(function(){
         breakTime++;
        if(breakTime >=60){
            breakTime = 60;
        }
        breakTimer.innerHTML = breakTime;
    });
    $(".start-pomodoro").click(function() {
        $("#work-minus-btn, #work-plus-btn").attr("disabled",true);
        $(".pause-pomodoro").attr("disabled",false);
        $(".stop-pomodoro").attr("disabled", false);
         isPaused = false;
         startPomodoro();
    });
    $(".stop-pomodoro").click(function(){
        stopPomodoro();
    }).attr("disabled",true);;

    //fix


    // timer functions
    function startTimer(duration){
        timeInterval = setInterval(function(){
            if(!isPaused) {
                var timer = getTimeLeft(duration);
                display.text(("0" + timer.minutes).slice(-2) + ":" + ("0" + timer.seconds).slice(-2));
                if (timer.total <= 0) { //If timer reaches zero, stop the timer and reset the clock
                    clearInterval(timeInterval);
                    if (i === 0) {

                        startBreak();
                    }

                    else if (i === 1) {
                        startPomodoro();
                    }
                }
            }
        },1000);
    }
    function getTimeLeft(end) {
        var total =  Date.parse(end) - Date.parse(new Date());
        var seconds = Math.floor((total/1000) % 60);
        var minutes = Math.floor((total/1000/60) % 60);
        return {
            "total": total,
            "minutes": minutes,
            "seconds": seconds
        };
    }
    function startPomodoro(){
        beep();
        $("#break-minus-btn, #break-plus-btn").attr("disabled",false);
        $("#work-minus-btn, #work-plus-btn").attr("disabled",true);
        $(".start-pomodoro").attr('disabled',true);
        $("#timer-status").text("WORK");
        var endTime = new Date(Date.parse(new Date()) + (pomodoroTime * 60 * 1000));
        startTimer(endTime);
        i = 0;
    }
    function startBreak(){
	   
        beep();
        $("#break-minus-btn, #break-plus-btn").attr("disabled",true);
        $("#work-minus-btn, #work-plus-btn").attr("disabled",false);

        $("#timer-status").text("BREAK");
        var endTime = new Date(Date.parse(new Date()) + breakTime *60 *1000);
        startTimer(endTime);
        i= 1;
    }
    function stopPomodoro(){
        $("#work-minus-btn, #work-plus-btn").attr("disabled",false);
        $("#break-minus-btn, #break-plus-btn").attr("disabled",false);
        $(".start-pomodoro").attr('disabled',false);
        clearInterval(timeInterval);
        $("#timer-status").text("Timer Stopped");
    }
    function beep() {
        audio.play();
    }

});