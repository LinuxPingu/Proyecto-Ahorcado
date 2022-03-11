"use strict";


let gameStarted = false;
let currentWord='';
let currentHint='';
let wordArray=[];

const selectNewWord = () =>{
    /* Check if the game has started*/
    if(!gameStarted){
        /* Read the JSON file with all the words for the game and create an array with the values.*/
        $.getJSON( "./JSON/wordBank.json", function( data ) {
            let items = [];
            $.each( data, function( key, val ) {
              items.push(val);
            });
            /* Select and set the values for the game */
            let ranWord = Math.floor(Math.random() * 20);
            currentWord = items[ranWord].word;
            currentHint =  items[ranWord].hint;
            wordArray = Array.from(currentWord);
            gameStarted = true;
            /* Print the lgnt hint for the html */ 
            $('#h2-lngt-hint').text(genLengtHint());
            console.log(`A new game has started with the word ${currentWord} and hint ${currentHint}`);
            console.log(`Array generated: ${wordArray}`);
            /*Adding hearts*/
            addHearts();     
          });
    }
}

const genLengtHint = ()=>{
    /* Creates a lenght hint for a word */
    let wHint='';
    for(let i=0; i <= currentWord.length -1;i++){
       wHint += ' _ ';
    };
    return wHint;
}

const guessWord = ()=>{
    
    if(!gameStarted){
        alert(' El juego no ha inciado, presiona play! ');
    }else{
        console.log('1');
        let userGuess = document.getElementById('userGuess').value;
        document.getElementById('pastAttempt').textContent = userGuess;
        console.log('2');
    }
}

const addHearts = ()=>{
    
    for(let i = 1; i<=10;i++){
        let pTag = document.getElementById('fullHearts');
        let heart = document.createElement('i');
        heart.classList.add('fa-solid','fa-heart','counterIcons');
        pTag.appendChild(heart);
    }
}

$('#btn-game-start').click(function (e) { 
    selectNewWord();
    e.preventDefault();
});

