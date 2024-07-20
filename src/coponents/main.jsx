import React from "react"
export default function main(props){
    const [count,setcount]=React.useState(0)
    function increasecount(){
        setcount(count=>count=count+1)
    }
    React.useEffect(()=>{
        if(count!==0){
            const timeoutId=setTimeout(()=>{
                props.handleClick()
            },5000)
        return ()=>clearTimeout(timeoutId)
        }
    },[count])
    return (
        <div style={{color: props.mode?'#ffffff':'#293264'}} className="main--page">
            <h1>Quizzical</h1>
            <h5>Wait 5 Seconds for the quiz to load After Clicking</h5>
            <button onClick={increasecount} 
                style={{
                    color: props.mode?'#293264':'#ffffff',
                    background:props.mode &&  '#ffffff',
                }}
            >Start quiz</button>
        </div>
    )
  }