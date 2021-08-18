//  JQUERY書くときはこう書く
$(function(){

//// 1.グローバル変数////

//自分の出し手
let myHand = 0;
//COMの出し手
let comHand = 0;
// 自分の点数
let myScore = 15;
// COMの点数
let comScore = 15;

// 勝敗決定 1 勝ち 2 あいこ 3 負け
let isJudged = 0;

//ゲーム判定フラグ
let isGameOver = false;

//じゃんけん画像の配列
const jankenImg = [null,"img/1.png", "img/2.png", "img/3.png"];
//じゃんけんの勝利数
let victory = 0;

//// 2.イベントハンドラの割り当て////

//ページの読み込みが完了したとき実行する関数
    //

//スタートボタン
$("#strtbtn").click(function () { 

    //スコアリセット
    resetScore();
    //スコアの表示
    updateScore();
    //ゲージの表示
    updateGuage();
    //音楽再生
    const music = new Audio('media/start.mp3');
    music.play();
    $("#result").text("ぐー、ちょき、ぱ−をえらんでね");
    shuffleImageTimer();
});

//グーボタン
$("#guu").click(function () { 
    if (isGameOver == false){
    myHand = 1;
    // my Hand変更
    $("#myHand").html('<img src="img/1.png">');
    //COMの出して決める
    computer();
    //勝敗判定
    judgement1();
    doJankenProcess();
}   else {
    doReset();
}
});

// チョキボタン
$("#choki").click(function () { 
    if (isGameOver == false){
    myHand = 2;
    // my Hand変更
    $("#myHand").html('<img src="img/2.png">');
    //COMの出して決める
    computer();
    //勝敗判定
    judgement2();
    doJankenProcess();
    } else {
        doReset();
    }
});

//パーボタン
$("#pa").click(function () { 
  if (isGameOver == false){  
    myHand = 3;
    // my Hand変更
    $("#myHand").html('<img src="img/3.png">');
    //COMの出して決める
    computer();
    //勝敗判定
    judgement3();
    //じゃんけん処理
    doJankenProcess();
  } else {
    doReset();  
  }
});

//リセットボタン
$("#resetbtn").click(function () { 
    doReset();
});

// new modalVideo();
 $('.popup-youtube').magnificPopup({
        disableOn:700,
        type:'iframe',
        iframe:{
            patterns:{
                index:'youtube.com',
                id:'',
                src:'https:'
            },
        },
        mainClass:'mfp-fade',
        removalDelay:200,
        // preloader:false,

        fixedContentPos:false
});



//// 3.まとめ関数　/////

//じゃんけんの処理まとめ関数

function doJankenProcess(){
    //勝敗の表示
    showResult();
    // //マイナススコア
    minusScore();
    //スコアの表示
    updateScore();
    //ゲージの表示
    updateGuage();
    //ゲーム終了判定
    gameOverJudge();
    // //デバッグ関数
    // debug();
}

function doReset(){
    resetScore();
    location.reload();
}



//// 4.ゲーム関数////

//じゃんけん画像をシャッフルする
let i = 1;
let num = 0;
function shuffleImageTimer(){
    setInterval(function(){
        if(i === jankenImg.length){
            i = 1;
        }
        if (num === jankenImg.length){
            num = 1;
        }
        num = Math.floor(Math.random() *3)+1;
        $("#myHandImg").attr('src',jankenImg[i]);
        $("#comHandImg").attr('src',jankenImg[num]);
        i++;
    },250);
};    


//COMの出してを決めて、ComHand表示する
function computer() {
    // COMの出してを決める
    comHand = Math.floor(Math.random()*3) + 1;
    console.log('computer comHand:' + comHand);
    // COMHANDの画像を表示する
    if(comHand === 1){
    $("#comHand").html('<img src="img/1.png" alt="グー">'); 
    } 
    if(comHand === 2){
    $("#comHand").html('<img src="img/2.png" alt="グー">'); 
    } 
    if (comHand ===3){
    $("#comHand").html('<img src="img/3.png" alt="グー">');   
    }
};


// じゃんけんグー1
    //勝敗判定(COM2,3)
function judgement1(){
    //COMもグー
    if (comHand === 1){
        isJudged = 2; //あいこ
    //COMがチョキ
    } else if (comHand === 2){
        isJudged = 1; //勝ち
        comScore = comScore - 2;
    //COMがパー
    } else if (comHand === 3){
        isJudged = 3; //負け
        myScore = myScore -2;
    }
}

//じゃんけんチョキ2
 //勝敗判定(COM1,3)
 function judgement2(){
    //COMがグー
    if (comHand == 1){
        isJudged = 3; //負け
        myScore = myScore - 3;      
        //COMがチョキ
    } else if (comHand == 2){
        isJudged = 2; //あいこ
    //COMがパー
    } else if (comHand == 3){
        isJudged = 1; //勝ち
        comScore = comScore - 3;
    }

}

//じゃんけんパー3
 //勝敗判定(COM1,2)
 function judgement3(){
    //COMがグー
    if (comHand == 1){
        isJudged = 1; //勝ち
        comScore = comScore - 4;
        //COMがチョキ
    } else if (comHand == 2){
        isJudged = 3; //負け
        myScore = myScore - 4;      
    //COMがパー
    } else if (comHand == 3){
        isJudged = 2; //あいこ
    }
}

//スコア表示
function updateScore(){
    //MyScoreの更新
    $("#myScore").text(myScore);
    $("#comScore").text(comScore);
}

//ゲージの更新
function updateGuage(){
    //自分のゲージ
    let myPercentage = (myScore /15) * 100;
    let comPercentage = (comScore /15) * 100;
    $("#currentMyValue").width(myPercentage + '%');
    $("#currentComValue").width(comPercentage + '%');
    //  30%切ったらGuage の色を変える
    if (myScore <= 5){
        $("#currentMyValue").css({
            "background-color": "red"            
        });
    } 
    if (comScore <= 5){
        $("#currentComValue").css({
           "background-color" : "red"       
        });
    }
    
}

//勝敗表示
function showResult(){
    if (isJudged === 1){
        $("#result").text("かった！サニーのこうげき！");
            //音楽再生
        const music = new Audio('media/mixkit-tile-game-reveal-960.wav');
         music.play();
    } else if (isJudged === 2){
        $("#result").text("あいこ！もういっかい！");
        const music = new Audio('media/mixkit-correct-positive-notification-957.wav');
        music.play(); 
    } else if (isJudged === 3){
        $("#result").text("まけた！！クラスケのこうげき！");
        //音楽再生
        const music = new Audio('media/mixkit-wrong-answer-fail-notification-946.wav');
         music.play();
    }
}

//勝敗決定
function gameOverJudge(){
    //プレイヤーの勝利
    if (myScore > 0 && comScore <= 0){
        isGameOver = true;
        //ゲージを0%にする   
        $("#currentComValue").css({
            "background-color" : "white"       
         });
        //メッセージの表示
        $("#result").text("かったね!おめでとう！「もう１かい」をおすと、またあそべるよ！");
        $("#message").text("You Win!");
        //音楽再生
        const music = new Audio('media/mixkit-game-bonus-reached-2065.wav');
        music.play();
        //LocalStrageに勝利数をセット
        victory ++;
        console.log(victory);
    } 
    //COMの勝利
    if (comScore > 0 && myScore <= 0){
        isGameOver = true;
         //ゲージを0%にする       
         $("#currentMyValue").css({
            "background-color" : "white"       
         });
        //メッセージの表示        
        $("#result").text("ざんねん！クラスケのしょうりです")
        $("#message").text("You Lose!");
        $("#message").css({
            "color": "#1760a0"
        });
        //音楽再生
        const music = new Audio('media/mixkit-musical-game-over-959.wav');
        music.play();
    } 
}

//マイナススコアになった時には0に補正
function minusScore (){
    if (myScore < 0){
        myScore = 0;
    }
    if (comScore < 0){
        comScore = 0;
    }
}

//スコアのリセット
function resetScore(){
    myHand = 0;
    comHand = 0;
    myScore = 15;
    comScore = 15;
    isJudged = 0;
    isGameOver = false;   
    //ゲージの色をリセット
    $("#currentMyValue").css({
        "background-color" : "#6bf"
    });
    $("#currentComValue").css({
        "background-color" : "#6bf"
    });  
    //書式のクリア
        //勝利メッセージの初期化
        $("#message").text("");
        $("#message").css({
            "color": "black"
        });
}





//// 5.デバッグ関数 ////
function debug() {
    console.log('myHand:' + myHand);
    console.log('comHand:' + comHand);
    console.log('myScore:' + myScore);
    console.log('comScore:' + comScore);
    console.log('isJudged:' + isJudged);
    console.log('isGameOver:' + isGameOver);
  }



});
