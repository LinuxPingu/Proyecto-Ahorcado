"use strict";


let gameStarted = false;
let currentWord='';
let currentHint='';

const selectNewWord = () =>{

    if(!gameStarted){
        $.getJSON( "./JSON/wordBank.json", function( data ) {
            let items = [];
            $.each( data, function( key, val ) {
              items.push(val);
            });
            let ranWord = Math.floor(Math.random() * 20);
            currentWord = items[ranWord].word;
            currentHint =  items[ranWord].hint;
            $('#h2-lngt-hint').text(genLengtHint());
            console.log(`A new game has started with the word ${currentWord} and hint ${currentHint}`);
          });
    }
}


const genLengtHint = ()=>{
    let wHint='';
    for(let i=0; i <= currentWord.length -1;i++){
       wHint += ' _ ';
    };
    return wHint;
}

$('#btn-game-start').click(function (e) { 
    selectNewWord();
    e.preventDefault();
});
