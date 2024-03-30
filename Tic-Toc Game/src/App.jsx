
/* To “remember” things, components use state.As a next step, you want the Square component to “remember” that it got clicked, and fill it with an “X” mark.
  React provides a special function called useState that you can call from your component to let it “remember” things. Let’s store the current value of the Square in state, and change it when the Square is clicked.
  */


//here we will put every 3 in a <div>,then we'll grid or flex them next to each other,or by margin-right: -1px; or margin-left....
/*Oh no! when u made a component(square) and u nested it in component(Board) ,u lost the numbered squares you had before and all will have same value declared in square component. Now each square says “1”. 
To fix this, you will use props to pass the value each square should have from the parent component (Board) to its child (Square).
Update the Square component to read a prop named {value} that you’ll pass from the Board:*/
      //value="1"/*add the {value} prop to each Square component rendered by the Board component: */ 
    

      
        
        /* To check for a winner in a tic-tac-toe game, the Board would need to somehow know the state of each of the 9 Square components,
        the best approach is to store the game’s state in the parent Board component instead of in each Square. The Board component can
         tell each Square what to display by passing a prop, like you did when you passed a number to each Square
         V.veryimp:Lifting state into a parent component is common when React components are refactored.{lifting  state up}is a react concept you can review it on react learn website*/
      
         import { useState } from 'react';

         function Square({ value,onSquareClick }) {//Next, you’ll add the onSquareClick function to the Square component’s props:
           return(
             <button className="square" onClick={onSquareClick}>{value}</button>);
         }
         
         export default function Board() {                         //Keeping the state of all squares in the Board component will allow it to determine the winner in the future.
           const [squares, setSquares] = useState(Array(9).fill(null));// The Board component now maintains which squares are filled. 
                                                            // You’ll need to create a way for the Square to update the Board’s state. Since state is private to a component that defines it, you cannot update the Board’s state directly from Square.
            const [nextMove, setnextMove] = useState(true);//Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.    
            
            function handleClick(i) {// we made a parameter (i) for it ,so when its called down it requires  anum ,thiswill let us know which square we are dealing with
                              //handleClick uses the argument (i) to update the  elementof(i) of the squares array from null to X
             if (squares[i] || calculateWinner(squares))  {//If the square is already filled or there is a winner
                 return; //  you will return in the handleClick function early—before it tries to update the board state,so it will return nothing since fun will be returned from here before the code under this if is executed
                              }
            const nextSquares = squares.slice();//imp: you call .slice() to create a copy of the squares array instead of modifying the existing array,To explain why, we need to discuss immutability and why immutability is important to learn-->
            if (nextMove) {// means:if xIsNext is true(since it is set by deault to true in the usestate)
              nextSquares[i] = "X"; //since xIsNext is ture by default ,the first move to be “X” by default,here the code will execute normally to reach setXIsNext(!xIsNext); as it will be flipped to false
            } else {
              nextSquares[i] = "O";//incase true is flipped to false by setXIsNext(!xIsNext);,this code will execute
            }
                                        //-->There are generally two approaches to changing data. The first approach is to mutate the data by directly changing the data’s values. The second approach is to replace the data with a new copy which has the desired changes.
                                            //->The result is the same but by not mutating (changing the underlying data) directly, you gain several benefits,Immutability makes complex features much easier to implement,an ability to undo and redo certain actions is a common requirement for apps. Avoiding direct data mutation lets you keep previous versions of the data intact, and reuse them later.
                                        //->also,By default, all child components re-render automatically when the state of a parent component changes. This includes even the child components that weren’t affected by the change,you might want to skip re-rendering a part of the tree that clearly wasn’t affected by it for performance reasons. Immutability makes it very cheap for components to compare whether their data has changed or not,so that they want rereder.
            setSquares(nextSquares);//The squares state of the Board component was updated, so the Board and all of its children re-render. This causes the value prop of the Square component with index i to change from null to X
            setnextMove(!nextMove);//v.imp,this flipps the xIsNext,every time handleClick is called,so one time it gives x then o then x then o ...
          }
          const winner = calculateWinner(squares);
         let status;
         if (winner) {
         status = 'Winner: ' + winner;
         } else {
          status = 'Next player: ' + (nextMove ? 'X' : 'O');
                }
          function calculateWinner(squares) {//Don’t worry too much about the calculateWinner function; it’s not specific to React:)
            const lines = [
              [0, 1, 2],
              [3, 4, 5],
              [6, 7, 8],
              [0, 3, 6],
              [1, 4, 7],
              [2, 5, 8],
              [0, 4, 8],
              [2, 4, 6]
            ];
            for (let i = 0; i < lines.length; i++) {
              const [a, b, c] = lines[i];
              if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
              }
            }
            return null;
          }
          
           return (
             <><div className="status">{status}</div>
               <div className="board-row">
                 <Square value={squares[0]} onSquareClick={() => handleClick(0)} /*Now you’ll connect the onSquareClick prop to a function in the Board component that you’ll name handleClick. To connect onSquareClick to handleClick you’ll pass a function to the onSquareClick prop of the first Square component*/ />
                 <Square value={squares[1]} onSquareClick={() => handleClick(1)}/*() => handleClick(),or {handleClick()} are passed as props to mother component  */ /> 
                 <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
               </div>
               <div className="board-row">
                 <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                 <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                 <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
               </div>
               <div className="board-row">
                 <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                 <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                 <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
               </div>
             </>
           );
         }
         
