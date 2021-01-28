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
    console.log({ question });
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
      <Grid container spacing={4} direction="row" id="grid">
        {props.user.index <= 9 ?
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front">
                {props.questions.length ?
                  <img src={props.questions[props.user.index].img} alt={props.questions[props.user.index].question} />
                  : ''}
              </div>
              <div class="flip-card-back">
                <Grid item id={props.user.index + 'GridItem'} xs={12}>
                  <Card id={props.user.index + 'Card'} data-testid={props.user.index + 'Card'} className="root" variant="outlined">
                    <CardContent id={props.user.index + 'CardContent'}>
                      <Typography className="question" color="textSecondary" gutterBottom>
                        {props.questions.length ? props.questions[props.user.index].question : <p></p>}
                      </Typography>

                      <form onSubmit={(e) => checkAnswer(e, props.questions[props.user.index])}>
                        <Input placeholder="Type your answer here" onChange={handleChange} />
                        <CardActions id={props.user.index + 'CardAction'}>
                          <Button type="submit" id={props.user.index + 'CheckMyAnswer'} data-testid={props.user.index + 'Button'} size="small">Next Question</Button>
                        </CardActions>
                      </form>
                    </CardContent>
                  </Card>
                </Grid>
              </div>
            </div>
          </div>
          :

          <Grid item id="score" xs={12}>
            <div class="flip-card">
              <div class="flip-card-inner">
                <div class="flip-card-front">
                  <Card className="root">
                    <CardContent id="results">
                      {props.user.score <= 3 ? <p>You're a muggle! Did you even watch the movies?</p>
                        : props.user.score <= 5 ? <p>Hey there, Filch. You're a total squib!</p>
                          : props.user.score <= 7 ? <p>Hmmm... you just barely passed, Ron Weasley!</p>
                            : props.user.score <= 9 ? <p>Wow! you really know your stuff. You passed your O.W.Ls with flying colors!</p> :
                              <p>OMG! Hermione Granger has graced us with her presence! Thanks for playing, Hermione.</p>
                      }
                      <h3>You scored: {props.user.score}/10</h3>
                    </CardContent>
                  </Card>
                  </div>
                  <div class="flip-card-back" id="thankYou">
                      <h4>Thank you for playing!! Move your cursor away to see your score!</h4>
                  </div>

              </div>
            </div>
          </Grid>
        }

      </Grid>
    </div >
  )
}

const mapStateToProps = state => ({
  questions: state.trivia.questions,
  user: state.users
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);