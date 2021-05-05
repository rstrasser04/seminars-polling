import React, { useReducer, useEffect } from 'react';
import { useParams, useHistory } from "react-router-dom";
import API from '@aws-amplify/api';
import Storage from '@aws-amplify/storage';
import { CLIENT_ID, setVoteForPoll } from './utils/localStorageInfo';
import { onUpdateByID } from './gql/subscriptions';
import { getPoll } from './gql/queries';
import { upVote } from './gql/mutations';
import Candidates from './Candidates';
import actionTypes from './actionTypes';

const initialState = {
  loading: true,
  poll: {}
}

function reducer(state, action) {
  switch(action.type) {
    case actionTypes.SET_POLL:
      return {
        ...state, poll: action.poll, loading: false
      }
    case actionTypes.SET_LOADING:
      return {
        ...state, loading: action.loading
      }
    case actionTypes.UPVOTE:
      const poll = { ...state.poll }
      const identifiedCandidate = poll.candidates.items.find(c => c.id === action.id)
      const candidateIndex = poll.candidates.items.findIndex(c => c.id === action.id)
      identifiedCandidate.upvotes = identifiedCandidate.upvotes + 1
      poll.candidates.items[candidateIndex] = identifiedCandidate
      return {
        ...state, poll
      }
    default:
      return state
  }
}

export default function Poll() {
  const [state, dispatch] = useReducer(reducer, initialState);

  let params = useParams();
  let history = useHistory();
  let subscription1;
  let subscription2;
  let subscription3;
  let subscription4;
  let subscription5;

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPoll();
    return () => {
      subscription1 && subscription1.unsubscribe();
      subscription2 && subscription2.unsubscribe();
      subscription3 && subscription3.unsubscribe();
      subscription4 && subscription4.unsubscribe();
      subscription5 && subscription5.unsubscribe();
    }
  }, []);

  async function fetchPoll() {
    try {
      const { id } = params;
      const { sortDirection } = params;
      let { data: { getPoll: pollData }} = await API.graphql({
        query: getPoll,
        variables: { 
          id,
          sortDirection: "DESC", 
        }
      });
      dispatch({ type: actionTypes.SET_POLL, poll: pollData });
      subscribe(pollData);
    } catch(err) {
      console.log('error fetching poll: ', err);
      history.go('/');
    }
  }

  function simulateUpvotes(candidate) {
    let i = 0;
    setInterval(() => {
      i = i + 1;
      if (i > 10000) return;
      onUpVote(candidate);
    }, 1);
  }

  function subscribe(pollData) {
    const { items } = pollData.candidates
    const { id: pollId } = pollData.id || {}
    const id1 = items[0];
    const id2 = items[1];
    const id3 = items[2];
    const id4 = items[3];
    const id5 = items[4];

    items.sort();
    
    subscription1 = API.graphql({
      query: onUpdateByID,
      variables: { id: id1 }
    })
    .subscribe({
      next: apiData => {
        const { value: { data: { onUpdateByID: { id, clientId }}} } = apiData;
        if (clientId === CLIENT_ID) return;
        dispatch({ type: actionTypes.UPVOTE, id });
      }
    })

    subscription2 = API.graphql({
      query: onUpdateByID,
      variables: { id: id2 }
    })
    .subscribe({
      next: apiData => {
        const { value: { data: { onUpdateByID: { id, clientId }}} } = apiData;
        if (clientId === CLIENT_ID) return;
        dispatch({ type: actionTypes.UPVOTE, id });
      }
    })

  subscription3 = API.graphql({
    query: onUpdateByID,
    variables: { id: id3 }
  })
  .subscribe({
    next: apiData => {
      const { value: { data: { onUpdateByID: { id, clientId }}} } = apiData;
      if (clientId === CLIENT_ID) return;
      dispatch({ type: actionTypes.UPVOTE, id });
    }
  })

  subscription4 = API.graphql({
    query: onUpdateByID,
    variables: { id: id4 }
  })
  .subscribe({
    next: apiData => {
      const { value: { data: { onUpdateByID: { id, clientId }}} } = apiData;
      if (clientId === CLIENT_ID) return;
      dispatch({ type: actionTypes.UPVOTE, id });
    }
  })

  subscription5 = API.graphql({
    query: onUpdateByID,
    variables: { id: id5 }
  })
  .subscribe({
    next: apiData => {
      const { value: { data: { onUpdateByID: { id, clientId }}} } = apiData;
      if (clientId === CLIENT_ID) return;
      dispatch({ type: actionTypes.UPVOTE, id });
    }
  })
  }

  async function onUpVote(candidate) {
    const limitReached = setVoteForPoll(state.poll.id, candidate.id);
    if (limitReached) return;
    dispatch({ type: actionTypes.UPVOTE, id: candidate.id });
    const voteData = { id: candidate.id, clientId: CLIENT_ID };
    try {
      await API.graphql({
        query: upVote,
        variables: voteData
      });
    } catch (err) {
      console.log('error upvoting: ', err);
    }
  }
  
  if (state.loading) return <h2>Loading...</h2>

  return (
    <div>
      <h1 className="mb-4 mt-8 leading-tight sm:leading-normal font-light">{state.poll.name}</h1>
      <Candidates
        sortDirection='ASC'
        candidates={state.poll.candidates.items}
        poll={state.poll}
        onUpVote={onUpVote}
        simulateUpvotes={simulateUpvotes}
        pollView
      />
    </div>
  )
}
