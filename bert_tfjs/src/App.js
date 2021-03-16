import React, {useRef, useEffect,useState} from 'react'
import logo from './logo.svg'
import './App.css'

import * as tf from "@tensorflow/tfjs"
import * as qna from "@tensorflow-models/qna"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from "react-loader-spinner"
import {Fragment} from "react"

function App() {
  console.log("inside app.")
  const passageRef = useRef(null)
  const questionRef = useRef(null)

  //  set up references and state hooks
  const [answer, setAnswers] = useState()
  const [model, setModel] = useState(null)

  //load the tensorflow model
  const loadModel = async ()=> {
    const loadedModel = await qna.load()
    setModel(loadedModel)
    console.log('Model loaded')
  }

  useEffect(() => {loadModel()}, [])

  //handle questions
  const answerQuestion = async (e) => {
    if(e.which === 13 && model !== null ){
      console.log('Questions submitted.')
      const passage = passageRef.current.value
      const question = questionRef.current.value
      
      const answers = await model.findAnswers(question, passage)
      setAnswers(answers)
      console.log(answers)

    }
  }
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {model ==null?
          <div>
            <div>Model Loading</div>
            <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}/>
          </div>
          :
          <Fragment>
            Passage
            <textarea ref={passageRef} rows="30" cols="100"></textarea>
            Ask a question
            <input ref={questionRef} onKeyPress={answerQuestion} size="80"></input>
            answers
            {answer ? answer.map((ans, idx)=><div><b>Answer {idx+1} - </b> {ans.text} {ans.score}</div>): ""}
            
          </Fragment>
        }
      </header>
    </div>
    
    
  );
}

export default App;
