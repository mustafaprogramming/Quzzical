import React from "react"
import Option from "./option.jsx"
import {decode} from 'html-entities';
export default function Questions(props){
    return (
        <div className="question">
            <h4>{decode(props.question)}</h4>
            <Option 
                key={props.id}
                id={props.id}
                checkResult={props.checkResult} 
                correctAnswer={props.correctAnswer} 
                incorrectAnswer={props.incorrectAnswer} 
                question={props.question}
                increaseScore={props.increaseScore}
                mode={props.mode}
                change={props.change}
                />
            <hr
            style={{
                borderColor: props.mode?'#DBDEF0':'#293264',}}
            ></hr>
        </div>
    )
  }