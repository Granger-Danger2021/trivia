import React from 'react';
import { connect } from 'react-redux';
import {addToScore} from '../../store/users'

const mapDispatchToProps = {addToScore};

function Game(props) {
  console.log(props.user)

  const handleClick = () =>{
    props.addToScore()
  }

  return (
    <>
    <p>Your score is: {props.user.score}</p>
    <button onClick={handleClick}>Gimme points!</button>
    </>
  );
}

const mapStateToProps = state => ({
  user: state.users,
});

export default connect(mapStateToProps,mapDispatchToProps)(Game);