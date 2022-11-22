import {React, useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Board = () => {
    const [turn , setTurn] = useState("X")
    const [squares, setSquares] = useState(Array(9).fill(''))
    const [winner, setWinner] = useState(null)
    const [draw, setDraw] = useState(false)

    const checkWinner = (cells) => {
        let patterns = {
            // Horizontal
            0: [0, 1, 2],
            1: [3, 4, 5],
            2: [6, 7, 8],
            // Vertical
            3: [0, 3, 6],
            4: [1, 4, 7],
            5: [2, 5, 8],
            // Diagonal
            6: [0, 4, 8],  
            7: [2, 4, 6]
        }
        
        for (let i = 0; i < 8; i++) {
            const [a, b, c] = patterns[i];
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c] && cells[b] === cells[c]) {
                toast(`Player ${cells[a]} won!`,{
                    icon: '🎉',
                })
                setWinner(cells[a]) 
                return
            }
        }

        if (cells.every((cell) => cell !== '')) {
            toast("It's a draw!",{
            icon: '✋',
            })
            setDraw(true)
            return
        }
        
    }

    const restartGame = () => {
        toast('Restarting Game', {
            duration: 1000,
            icon: '⌛',
        });
        setTurn("X")
        setSquares(Array(9).fill(''))
        setWinner(null)
        setDraw(false) 
    }

    const handleClick = (num) => {
        if (winner!==null){
            return
        }
        else if ( draw===true){
            return
        }

        let cells = [...squares];

        if (cells[num] !== '') {
            toast("Try another square",{
                duration: 2000,
                icon: '🚫',
            })
            return;
        }
        else if (turn === "X"){
            cells[num] = "X";
            setTurn("O")
        }
        else if (turn === "O"){
            cells[num] = "O";
            setTurn("X")
        }
        setSquares(cells)
        checkWinner(cells)

    }

    const Cell = ({num}) => {
        return (
            <td onClick={()=> handleClick(num)}>{squares[num]}</td>
        )
    }

  return (
    <div className='container'>
    <h1>❌ Tic Tac Toe ⭕️</h1>
    {/* display winner or draw  */}
    {winner ? <h3>{winner} wins!</h3>: null}
    {draw ? <h3>It's a draw!</h3>: null}
    {/* display turn if winner or draw not*/}
    {winner ? null: draw ? null : <h3>Turn: {turn}</h3>}
        <table>
            <tr>
                <Cell num={0} />
                <Cell num={1} />
                <Cell num={2} />
            </tr>
            <tr>
                <Cell num={3} />
                <Cell num={4} />
                <Cell num={5} />
            </tr>
            <tr>
                <Cell num={6} />
                <Cell num={7} />
                <Cell num={8} />
            </tr>
        </table>
        <button className='restart-btn' onClick={()=> restartGame()}>Restart Game</button>
        <Toaster/>
    </div>
  )
}

export default Board