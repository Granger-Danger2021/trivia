import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './game.scss'
import { get } from '../../store/trivia';

const mapDispatchToProps = { get };

function Game(props) {
  const getQuestions = async () => {
    await props.get();
    console.log('after await', { props });
  }

  useEffect(() => {
    console.log('before use effect', props);
    getQuestions();
    console.log('after use effect', props);
  }, []);

  return (
    <div id="game">
      {props.questions.map(question => (
        <div>{question.question}</div>
      ))}
    </div>
  )
}

const mapStateToProps = state => ({
  questions: state.trivia.questions
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);