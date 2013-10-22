$(function() {
    var healthPoints;
    var enemyHealthPoints;

    var rocketDamages;
    var enemyRocketDamages;

    var timeRemain;
    var enemyTimeRemain;

    var word;

    function initHP(hp){
        hp = 1000;
    }

    function initDamages(damages){
        damages = 500;
    }

    function initTime(time){
        time = 30;
    }

    function newRocket(player){

    }

    function newParty(){
        initHP(healthPoints);
        initHP(enemyHealthPoints);
        initDamages(rocketDamages);
        initDamages(enemyRocketDamages);
        initTime(timeRemain);
        initTime(enemyTimeRemain);
    }

    function getDamages(healthPoints,enemyRocketDamages){
        healthPoints = healthPoints - enemyRocketDamages;
    }

    function makeDamages(enemyHealthPoints, rocketDamages){
        enemyHealthPoints = enemyHealthPoints - rocketDamages;
    }

});