$(function() {
    var healthPoints;
    var enemyHealthPoints;

    var rocketDamages;
    var enemyRocketDamages;

    var timeRemain;
    var enemyTimeRemain;

    var wordsObject;
    var word;


    $.ajax({
        type: "POST",
        url: "./dictionary/wordsToArray.php",
        success: function(msg){
            wordsObject = jQuery.parseJSON(msg);
            startGame();
        }
    });

    function startGame(){
        newParty();

        //On focus sur le champ input
        $("#wordField").focus();
        $(document).click(function(){
            $("#wordField").focus();
        });

        //On compare si le mot entré correspond au mot demandé
        $(document).keypress(function(e){
            if(e.which == 13){ //si touche entrée pressée
                var inputWord = $('#wordField').val().toUpperCase();
                $('#wordField').val("");
                if(inputWord === word){
                    console.log('bon');
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
        }
        else{
            enemyRocketDamages = 500;
        }
    }

    function initTime(enemy){
        if(typeof(enemy)==='undefined'){
            timeRemain = 30;
            $('#playerTime').html(timeRemain);
        }
        else{
            enemyTimeRemain = 30;
            $('#enemyTime').html(enemyTimeRemain);
        }
    }


    //argument enemy à ne préciser que si c'est une roquette ennemie, sinon laisser vide
    function newRocket(enemy){
        if(typeof(enemy)==='undefined'){ //si il n'y a pas d'arguments alors roquette joueur humain
            initDamages();
            initTime();
        }
        else{
            initDamages(enemy);
            initTime(enemy);
        }
    }

    function generateWord(begin,end){
        var wordLength = Math.floor(Math.random() * (end - begin + 1)) + begin;
        word = wordsObject[wordLength][Math.floor(Math.random()*wordsObject[wordLength].length)];
        $('#word').html(word);
    }

    function getDamages(healthPoints,enemyRocketDamages){
        healthPoints = healthPoints - enemyRocketDamages;
    }

    function makeDamages(enemyHealthPoints, rocketDamages){
        enemyHealthPoints = enemyHealthPoints - rocketDamages;
    }



});