import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './game.scss'
import { get } from '../../store/trivia';
import { addToScore } from '../../store/users'

const mapDispatchToProps = { get, addToScore };

function Game(props) {
  const getQuestions = () => {
    props.get();
    console.log('after await', { props });
  }

  useEffect(() => {
    console.log('before use effect', props);
    getQuestions();
    console.log('after use effect', props);
  }, []);


  const handleClick = () => {
    props.addToScore()
  }

  return (
    <div id="game">
      {props.questions.map(question => (
        <div>{question.question}</div>
      ))}
      <p>Your score is: {props.user.score}</p>
      <button onClick={handleClick}>Gimme points!</button>

    </div>
  )
}

const mapStateToProps = state => ({
  questions: state.trivia.questions,
  user: state.users
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);