import React from "react"
import Questions from "./question.jsx"
import { nanoid } from "nanoid";
export default function Quiz(prop){

    const [checkResult,setcheckResult]=React.useState(false);
    let score=0;
    const [result,setResult]=React.useState('')
    function increaseScore(){
        score+=0.5
    }
    React.useEffect(()=>{
        setTimeout(()=>{
            setResult(`${score}/${prop.data.length}`)
        },500)
    },[checkResult])
    const questionsArray=prop.data.map(info=>{
            let id=nanoid()
            return <Questions 
                key={id}
                id={id}
                question={info.question}
                correctAnswer={info.correct_answer}
                incorrectAnswer={info.incorrect_answers}
                checkResult={checkResult}
                increaseScore={increaseScore}
                mode={prop.mode}
                change={prop.newQuestions}
            />
    })



    const [count,setcount]=React.useState(0)
    function increasecount(){
        setcount(count=>count=count+1)
    }
    React.useEffect(()=>{
        if(count!==0){
            const timeoutId=setTimeout(()=>{
                setcheckResult(false)
                prop.handleClick()
            },5000)
        return ()=>clearTimeout(timeoutId)
        }
    },[count])



    return (
        <div className="quiz--main"
        style={{
            color: prop.mode?'#ffffff':'#293264',
            borderColor: prop.mode?'#ffffff':'#293264',
        }}
        >
            {questionsArray}
            <div className="quiz--checking">
                {checkResult && <p className="score">You scored <span>{result}</span> correct answers</p>}
                <button
                style={{
                    color: prop.mode?'#293264':'#ffffff',
                    background: prop.mode&&'#ffffff',
                }}
                 className="quiz--button"
                 onClick={
                    checkResult?
                    ()=>{
                        increasecount()
                    }
                    :
                    ()=>{
                        setTimeout(setcheckResult(true),300)
                    }
                    }>{checkResult?"Play Again": "Check answers"}</button>
            </div>   
        </div>
    )
  }