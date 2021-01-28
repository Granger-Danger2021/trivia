import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './game.scss'
import { get } from '../../store/trivia';
import { addToScore, incrementIndex } from '../../store/users'
import { Input } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const mapDispatchToProps = { get, addToScore, incrementIndex };

function Game(props) {

  const [answer, setAnswer] = useState('');

  const getQuestions = () => {
    props.get();
    console.log('after await', { props });
  }

  useEffect(() => {
    console.log('before use effect', props);
    getQuestions();
    console.log('after use effect', props);
  }, []);

  const checkAnswer = (e, question) => {
    //todo: check the user's answer here
    console.log(question);
    //check whether the answer is correct, increment score if yes.
    if (question.answer.toLowerCase() === answer.toLowerCase()) {
      console.log('CORRECT!!');
      props.addToScore();
      console.log('incrementing score to: ', props.user.score);
    }

    //increment the index so we show the next question
    if (props.user.index <= 9) {
      props.incrementIndex();
      console.log('incrementing index to', props.user.index);
    }
    e.preventDefault();
    e.target.reset();
  }

  const handleChange = (e) => {
    setAnswer(e.target.value);
    console.log(answer);
  }

  return (
    <div id="game">
      {props.user.index <= 9 ?
        <Grid container spacing={4} direction="row" id="grid">
          <Grid item id={props.user.index + 'GridItem'} xs={12}>
            <Card id={props.user.index + 'Card'} data-testid={props.user.index + 'Card'} className="root" variant="outlined">
              <CardContent id={props.user.index + 'CardContent'}>
                <Typography className="question" color="textSecondary" gutterBottom>
                  {props.questions.length ? props.questions[props.user.index].question : <p></p>}
                </Typography>
              </CardContent>
              <form onSubmit={(e) => checkAnswer(e, props.questions[props.user.index])}>
                <Input placeholder="Type your answer here" onChange={handleChange} />
                <CardActions id={props.user.index + 'CardAction'}>
                  <Button type="submit" id={props.user.index + 'CheckMyAnswer'} data-testid={props.user.index + 'Button'} size="small">Next Question</Button>
                </CardActions>
              </form>
            </Card>
          </Grid>

        </Grid>
        : <p>Congratulations! You scored: {props.user.score}/10.</p>}
    </div >
  )
}

const mapStateToProps = state => ({
  questions: state.trivia.questions,
  user: state.users
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);