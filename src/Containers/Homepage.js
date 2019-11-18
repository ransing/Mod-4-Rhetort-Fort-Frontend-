import React, { Component } from 'react';
import MainTiles from '../Components/MainTiles';
import AnswerContainer from './AnswerContainer';
import QuestionContainer from './QuestionContainer'


export default class Homepage extends Component {

    state = {
        answers: [],
        questions: [],
        searchTerm: "",
        selectedQuestion: ""
    }

    handleChange = (e) => {
        this.setState({ 
            searchTerm: e.target.value
        })
    }

componentDidMount(){
    fetch('http://localhost:3000/api/v1/questions')
    .then(res => res.json())
    .then(questionsData => {
        this.setState({
            questions: questionsData.question
        })
    })
}    

backButton = () => {
    // this.props.backButton
    // this.state.selectedQuestion === "";
    this.setState({
        selectedQuestion: ""
    })
    console.log("backbutton homepage");
}

seeAnswers = (e) => {
    this.setState({
        selectedQuestion: e
    })
}

renderAnswer =() => {
    if (this.state.selectedQuestion === ""){
        return <QuestionContainer search={this.handleChange} questions={this.state.questions} seeAnswers={this.seeAnswers} backButton={this.backButton}/>
    } 
    else {
        return <AnswerContainer selectedQuestion={this.state.selectedQuestion} backButton={this.backButton}/>
    }
}



    render() {
        return (
            <div>
                <h1>Hello</h1>
                <MainTiles />
                {this.renderAnswer()}
            </div>
        )
    }
}
