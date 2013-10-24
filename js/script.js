/* $(function() { */
    var healthPoints;
    var enemyHealthPoints;

    var rocketDamages;
    var enemyRocketDamages;

    var timeRemain;
    var enemyTimeRemain;

    var timer;
    var enemyTimer;

    var wordsObject;
    var word;

    var end=false;


    $.ajax({
        type: "POST",
        url: "./dictionary/wordsToArray.php",
        success: function(msg){
            wordsObject = jQuery.parseJSON(msg);
/*             startGame(); */
        }
    });

    function startGame(){
        newParty();
        
        $("#start").fadeOut(600);
        $("#logo").css("top","20px");
        $("#player").css("display","block");
        $("#ennemy").css("display","block");
        $("#word").css("display","block");
        $("#wordField").css("display","block");

        //On focus sur le champ input
        $("#wordField").focus();
        $(document).click(function(){
            $("#wordField").focus();
        });
        $('#wordField').bind('paste', function (e) {
            e.preventDefault();
        });

        //On compare si le mot entré correspond au mot demandé
        $(document).keypress(function(e){
            if(e.which == 13 && end===false){ //si touche entrée pressée
                var inputWord = $('#wordField').val().toUpperCase();
                $('#wordField').val("");
                if(inputWord === word){
                    console.log('bon');
                    addRocketDamages(10);
                    generateWord(3,15);
                }
                else{
                    console.log('mauvais');
                }
            }
        })
    }

    function newParty(){
        initHP();
        initHP('enemy');
        generateWord(3,15);
        newRocket();
        newRocket('enemy');
    }

    function initHP(enemy){
        if(typeof(enemy)==='undefined'){
            healthPoints = 1000;
            $('#playerHP').html(healthPoints);
        }
        else{
            enemyHealthPoints = 1000;
            $('#enemyHP').html(enemyHealthPoints);
        }
    }

    function initDamages(enemy){
        if(typeof(enemy)==='undefined'){
            rocketDamages = 500;
            $('#playerDamages').html(rocketDamages);
        }
        else{
            enemyRocketDamages = 500;
            $('#enemyDamages').html(enemyRocketDamages);
        }
    }

    function initTime(enemy){
        if(typeof(enemy)==='undefined'){
            timeRemain = 30;
            //$('#playerTime').html(timeRemain);
            $(function() {
                $(".playerTime")
                    .val(timeRemain)
                    .trigger('change')
                    .knob({
                        'readOnly' : true,
                        'min':0,
                        'max':30
                    });
            });
        }
        else{
            enemyTimeRemain = 30;
            $('#enemyTime').html(enemyTimeRemain);
        }
    }


    //argument enemy à ne préciser que si c'est un= missile ennemi, sinon laisser vide
    function newRocket(enemy){
        if (end === false){
            initDamages(enemy);
            initTime(enemy);
            launchRocket(enemy);
        }
    }

    function generateWord(begin,end){
        var wordLength = Math.floor(Math.random() * (end - begin + 1)) + begin;
        word = wordsObject[wordLength][Math.floor(Math.random()*wordsObject[wordLength].length)];
        $('#word').html(word);
    }

    //defilement du temps restant
    function launchRocket(enemy){
        if(typeof(enemy)==='undefined'){
            timer = setInterval (function(){
                soustractTime(1);
            },1000);
        }
        else{
            enemyTimer = setInterval (function(){
                soustractTime(1,enemy);
            },1000);
        }
    }

    function soustractTime(time,enemy){
        if(typeof(enemy)==='undefined'){
            timeRemain -= time;
            //$('#playerTime').html(timeRemain);
            $(function() {
                $(".playerTime")
                    .val(timeRemain)
                    .trigger('change')
                    .knob({
                        'readOnly' : true,
                        'min':0,
                        'max':30
                    });
            });
            if (timeRemain <= 0){
                clearInterval(timer);
                makeDamages(enemyHealthPoints,rocketDamages);
                newRocket();
            }
        }
        else{
            enemyTimeRemain -= time;
            $('#enemyTime').html(enemyTimeRemain);
            if (enemyTimeRemain <= 0){
                clearInterval(enemyTimer);
                getDamages(healthPoints,enemyRocketDamages);
                newRocket(enemy);
            }
        }
    }

    function addRocketDamages(damages){
        rocketDamages += damages;
        $('#playerDamages').html(rocketDamages);
    }

    function getDamages(hp,enemyRocketDamages){
        healthPoints = hp - enemyRocketDamages;
        if(healthPoints <= 0){
            end=true;
            $('#playerHP').html(0);
            endGame();
        }
        else{
            $('#playerHP').html(healthPoints);
        }
    }

    function makeDamages(enemyHP, rocketDamages){
        enemyHealthPoints = enemyHP - rocketDamages;
        if(enemyHealthPoints <= 0){
            end=true;
            $('#enemyHP').html(0);
            endGame();
        }
        else{
            $('#enemyHP').html(enemyHealthPoints);
        }
    }

    function endGame(){
        clearInterval(timer);
        clearInterval(enemyTimer);
        word="";
        $('#word').html(word);
        $('#wordField').attr('readonly','readonly');
    }


/* }); */