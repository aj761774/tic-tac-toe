const start = document.getElementById('start-btn');
const turn =  document.getElementById('turn');
const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const dimension = document.getElementById('dimension');
const playAgain = document.getElementById('playAgain');
const winningPossibility = [];
const audio = new Audio('green.mp3');
const wrong = new Audio('wrong.mp3');
const winned = new Audio('blue.mp3');
let n = Math.floor(Math.random()*10);
start.addEventListener('click',()=>{

     if(player1.value === '' || player2.value === '' || dimension.value === '' || dimension.value === "select dimension"){
         document.getElementById('msg').innerHTML = "All fields are mandatory!";
     }
     else{
        document.getElementById('start').style.display = 'none';
        player1.setAttribute('disabled',true);
        player2.setAttribute('disabled',true);
        dimension.setAttribute('disabled',true);
        document.getElementById('start-btn').setAttribute('disabled',true);
        for(let i=0;i<Number(dimension.value);i++){
            const row = document.createElement('div');
            row.className = "row";
       
            for(let j=0;j<Number(dimension.value);j++){
                  const col = document.createElement('div');
                  col.className = "col";
                  col.id = String(i) + String(j);
                  row.appendChild(col);
            }
            document.getElementById('grid-container').appendChild(row);
        }
        makeWinningPosibilityArr();
        handleTurn(n);
        handlePlayerClick();
     }
});


const makeWinningPosibilityArr = ()=>{
    //winCol
    for(let i=0;i<Number(dimension.value);i++){
        let winRow = [];
        let j=0;
        while(j<Number(dimension.value)){
            let val = String(i) + String(j);
          
            winRow.push(val);
            j++;
        }
        winningPossibility.push(winRow);
    }
    //winRow
    for(let i=0;i<Number(dimension.value);i++){
        let winCol = [];
        let j=0;
        while(j<Number(dimension.value)){
            let val = String(j) + String(i);
          
            winCol.push(val);
            j++;
        }
        winningPossibility.push(winCol);
    }
    //winIst diagonal
     const winIstDiag = []
     for(let i=0;i<Number(dimension.value);i++){
        winIstDiag.push(String(i)+String(i));
     }
     winningPossibility.push(winIstDiag);
     //winIInd diagonal
     const winIIndDiag = []
     let k = Number(dimension.value)-1;
     for(let i=0;i<Number(dimension.value);i++){
        winIIndDiag.push(String(i)+String(k));
        k--;
     }
     winningPossibility.push(winIIndDiag);
    
    
}
let winnerName;
const handleTurn = (n)=>{
       turn.innerHTML = n%2 == 0 ? `${player1.value}'s turn` : `${player2.value}'s turn`;
       winnerName = (n-1)%2 == 0 ? `${player1.value}` : `${player2.value}`;
}

const handlePlayerClick = ()=>{
        
        const cols = document.getElementsByClassName('col');
        for(let i=0;i<cols.length;i++) {
            cols[i].addEventListener('click',()=>{
                audio.play();
                if(cols[i].innerHTML==''){
                    cols[i].innerHTML = n%2==0? 'X' : 'o';
                    if(n%2==0){
                        cols[i].style.backgroundColor = "orange";
                    }
                    else{
                        cols[i].style.backgroundColor = "cyan";
                    }
                    n++;  
                    checkWinner();
                    
                }
              
            });
        };    
}
let win = false,count = 0;

const checkWinner = ()=>{
         count++;
         winningPossibility.forEach(possibility=>{
         
              
            for(let j=1;j<possibility.length;j++){
               
                let val1 = document.getElementById(possibility[j-1]).innerHTML;
                let val2 =document.getElementById(possibility[j]).innerHTML;
                   
                if((val1===val2)&&(val1!=='')&&(val2!=='')){
                     
                    if(j==possibility.length-1)
                      win = true;
                     
                }
              
                else{
                      break;
                  }                  
            }
         });  
         if(count<Number(dimension.value)*Number(dimension.value)){
             handleTurn(n);
         }
         if(win===true){
             document.getElementById('winMsg').innerHTML = `${winnerName} winned the game!`;
             turn.innerHTML = '';
             document.getElementById('grid-container').style.display = 'none';
             playAgain.style.display = "inline-block";
             winned.play();
         }  
         if(win===false && count === Number(dimension.value)*Number(dimension.value)){
            document.getElementById('winMsg').innerHTML = `Match Draw!`;
            turn.innerHTML = '';
            document.getElementById('grid-container').style.display = 'none';
            playAgain.style.display = "inline-block";
            wrong.play();
        } 
       
}

playAgain.addEventListener('click',()=>{
     window.location.reload();
});
