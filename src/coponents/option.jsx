import React from "react"
import { decode } from "html-entities"
import { nanoid } from 'nanoid'

export default function options(props){
    function shuffle() {
        function makeobj(correct,...incorrect){
            const array=[
                {answer:true,value:correct}
            ]
            for(let i=0;i<incorrect.length;i++){
                array.push({answer:false,value:incorrect[i]})
            }
            return array
        }
        const array=makeobj(props.correctAnswer,...props.incorrectAnswer)
        let currentIndex = array.length;

        while (currentIndex != 0) {

          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
    let shuffledArray =[];
    const [radio,setRadio]=React.useState([])    
    React.useEffect(()=>{
        const timeoutId =setTimeout(()=>{
            localStorage.setItem(props.question,JSON.stringify(radio))
        },200)
        return () => clearTimeout(timeoutId)
    },[radio])

    React.useEffect(()=>{
        shuffledArray =shuffle();
        setRadio(()=>JSON.parse(localStorage.getItem(props.question))||shuffledArray.map((element)=>{
            return{
            id:nanoid(),
            value:element.value,
            correct:element.answer,
            checked:false
                }
            }))
            
    },[])
    function toggleCheck(event){
        const {id}=event.target
        setRadio(prevArray=>prevArray.map((el)=>{
            return el.id===id ?
            {
                ...el,
                checked:true,
            }
            :
            {
                ...el,
                checked:false,
            }
        }
    ))
    }
    const newArray=radio.map(element=>{
        function getstyle(){
            if(props.checkResult && element.correct && element.checked){
                return {background:props.mode? '#2400a850':"#8b98f0",
                    border : props.mode? '3px solid':'',
                        borderColor:props.mode?"#2400a8":"",
                }
            }else if(props.checkResult && element.correct){
                return {background:props.mode? '#94D7A250':"#94D7A2",
                        border : props.mode? '2px solid':'',
                        borderColor:props.mode?"#94D7A2":"",
                }
            }else if(props.checkResult && element.checked){
                return {background:props.mode? '#ad2a4b50':'#F8BCBC',
                        border : props.mode? '3px dotted':'',
                        borderColor:props.mode?"#ad2a4b":"",
                }
            }else if(element.checked){
                return {background:'#D6DBF5',color: '#1F2F4E'}
            }else{
                return {
                    background: 'transparent',
                    border : '1px solid',
                    borderColor: props.mode?'#ffffff':'#293264',
                }
            }
        }
        const style=getstyle()
        return (
                <label key={`${props.id}-${element.id}`}  style={style}>
                    <input 
                        type="radio" 
                        name={props.question}
                        id={element.id}
                        onChange={toggleCheck}
                    >
                    </input>
                    {decode(element.value)}
                </label>
        )
    })

    if(props.checkResult){
        radio.forEach(el=>{
            if(el.correct && el.checked){
                props.increaseScore();
            }
        })
    }
    return (
            <div className="options">
                {newArray}
            </div>
    )
  }