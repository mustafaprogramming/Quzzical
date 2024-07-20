import React, { useState , useEffect} from "react"
import Quiz from "./coponents/quiz.jsx"
import Main from "./coponents/main.jsx"
import './App.css'

export default function App(){
  const [showQuiz,setShowQuiz]=React.useState(false)
  const [data, setData] = useState([]);
  const [nightMode, setnightMode] = useState(false);
  const [newQuestions,setNewQuestions]=useState(false)
  const [count,setcount]=useState(0)
  useEffect(() => {
    if(count!==0){
      fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
    }
  }, [showQuiz, newQuestions]);

  const Button= ()=>{
    return (
        <button className="circle--button"
        style={{borderColor:nightMode ? '#1F2F4E': '#ffffff'}}
        >
            <div className="circle" 
            style={{
              translate: nightMode? '0.95rem':'0px',
              animationName: nightMode? 'left':'right',
              backgroundColor: nightMode ? '#1F2F4E': '#ffffff'}}></div>
        </button>
      )
  }
  return (
      <div className="app" style={{
        background: nightMode? "#1f2f4e" : '#ffffff'
      }}>

        {/* <button className="changeMode"
        style={{
          background: nightMode? "#1f2f4e" : '#ffffff',
          borderColor: nightMode? "#1f2f4e" : '#ffffff',
        }}
           onClick={()=>setnightMode(prev=>!prev)}>
            <span className={nightMode? ' ':'light'} 
            style={{backgroundColor: nightMode ? 'transparent': '#1F2F4E',
              color: nightMode? '#1F2F4E' : "#ffffff"
            }}>Light{!nightMode&&<Button />}</span>
            <span className={nightMode? 'light':''}
            style={{backgroundColor: nightMode ? '#ffffff': 'transparent',
              color: nightMode? '#1F2F4E' : "#ffffff"
            }}>{nightMode&&<Button />}Dark</span>
        </button> */}

        <button className="changeMode"
           onClick={()=>setnightMode(prev=>!prev)}
           style={{borderColor:nightMode?'#ffffff':"#293264"}}
           >
            <span>Light</span>
            <div className="selector" style={{animationName: nightMode? 'on' : "off",left: nightMode? '1.75rem' : "-1.75rem",backgroundColor:nightMode?'#ffffff':'#293264'}}></div>
            <span style={{color: "#1F2F4E"}} >Dark</span>
        </button>

        {showQuiz && data.results ? 
          <Quiz 
            data={data.results} 
            handleClick={()=>{
            setNewQuestions(prev=>!prev)
          }}
            mode={nightMode}
            newQuestions={newQuestions}
          /> 
          :
          <Main 
            handleClick={
              ()=>{setShowQuiz(prev=>!prev);setcount(count=>count=count+1)}
              }
            mode={nightMode}
            />}
      </div>
  )
} 
