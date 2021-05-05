import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { STORAGE_KEY } from './utils/localStorageInfo';
import votePink from './assets/votepink.png';
import voteBlue from './assets/voteblue.png';
import Button from './Button';
import { toast, ToastContainer } from 'react-toastify';
import orderBy from 'lodash/orderBy'

export default function Candidates({ poll, candidates, onUpVote, simulateUpvotes, pollView = false }) {
  const isImage = poll.type === 'image';
  let totalUpvotes;
  let candidate1;
  let candidate2;
  let candidate3;
  let candidate4;
  let candidate5;
  
  if (pollView) {
    /* If this is poll view, create percentages for chart */
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    if (candidates <= 0){
      throw console.error('this is an error');
    } else {
      candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
      candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
      candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
      candidate4 = candidates[3].upvotes ? (candidates[3].upvotes / totalUpvotes) * 100 : 0;
      candidate5 = candidates[4].upvotes ? (candidates[4].upvotes / totalUpvotes) * 100 : 0;     
    }
  }
  if (totalUpvotes === 0) {
    /* If poll is new, set 50% width for each side of chart */
    candidate1 = 50;
    candidate2 = 50;
    candidate3 = 50;
    candidate4 = 50;
    candidate5 = 50;
  }

  const voteDataFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (voteDataFromStorage && voteDataFromStorage[poll.id]) {
    /* If user has voted 50 times for a candidate, disable voting */
    const c1 = voteDataFromStorage[poll.id][candidates[0]];
    const c2 = voteDataFromStorage[poll.id][candidates[1]];
    const c3 = voteDataFromStorage[poll.id][candidates[2]];
    const c4 = voteDataFromStorage[poll.id][candidates[3]];
    const c5 = voteDataFromStorage[poll.id][candidates[4]];
    if (c1 && (c1.upvotes >= 1)) candidates[0].isDisabled = true;
    if (c2 && (c2.upvotes >= 1)) candidates[1].isDisabled = true;
    if (c3 && (c3.upvotes >= 1)) candidates[2].isDisabled = true;
    if (c4 && (c4.upvotes >= 1)) candidates[3].isDisabled = true; 
    if (c5 && (c5.upvotes >= 1)) candidates[4].isDisabled = true;
  }

/* console.log(poll.id)
  const sortedCandidates = candidates.sort(function(a,b){
    console.log(candidates)
    return parseInt(a.name)  - parseInt(b.name);
  })
  console.log(sortedCandidates) */

  const alphabetized = candidates.sort(function(a, b) {
    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
   })
   
  return (
    <div className="pollContainer">
      {
        /* This is the data vizualization. Essentially a rectangle filled with the percentage width of each candidate. */
        pollView && (
          <div style={dataVizStyle} className="pollView">
            <div style={candidate1Style(candidate1)} />
            <div style={candidate2Style(candidate2)} />
            <div style={candidate3Style(candidate3)} />
            <div style={candidate4Style(candidate4)} />
            <div style={candidate5Style(candidate5)} />
          </div>
        )
      }

      <div className="candidate-container">
        {
          
          candidates.map((candidate, index) => {  
              return (
                <div className="mt-4 flex items-center" key={candidate.name}>
                  
                  <div className="flex mr-4">
                    <button onClick={candidate.isDisabled ? null : () => onUpVote(candidate, poll)} className="vote-button w-12 md:w-18 capitalize text-2xl sm:text-4xl font-bold" style={voteImageContainerStyle(index, candidate.isDisabled)}>{candidate.name}</button>
                  </div>
                  <div className="flex items-center">
                    <p className="
                    w-20
                    text-4xl font-bold ml-3" style={voteNameStyle(index)}>{candidate.upvotes}</p>
                  </div>
                </div>
              )   
          })
        }
        
      </div> 
      <div className="totalVotes">
        <h1>
          {totalUpvotes}
        </h1>
      </div>
    </div>
  )
}

const dataVizStyle = {
  width: '100%',
  height: 60,
  display: 'flex',
  marginTop: 10,
  borderRadius: 10
}

function linkStyle(pollView) {
  return {
    pointerEvents: pollView ? 'none' : 'auto',
  }
}

function candidate1Style(width) {
  return {
    backgroundColor: '#ff6600',
    width: `${width}%`,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    transition: 'all 0.5s ease'
  }
}

function candidate2Style(width) {
  return {
    backgroundColor: '#666666',
    width: `${width}%`,
    transition: 'all 0.5s ease'
  }
}

function candidate3Style(width) {
  return {
    backgroundColor: '#6699CC',
    width: `${width}%`,
    transition: 'all 0.5s ease'
  }
}

function candidate4Style(width) {
  return {
    backgroundColor: '#333333',
    width: `${width}%`,
    transition: 'all 0.5s ease'
  }
}

function candidate5Style(width) {
  return {
    backgroundColor: '#2E8BC9',
    width: `${width}%`,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    transition: 'all 0.5s ease'
  }
}

const voteImageContainerStyle = (index, isDisabled) => ({
  backgroundColor: index === Number(0) ? "#ff6600" : index === Number(1) ? "#666666" : index === Number(2) ? "#6699CC" : index === Number(3) ? "#333333" : "#2E8BC9",
  boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.125rem 0.25rem',
  borderRadius: 9999,
  opacity: isDisabled ? .5 : 1,
  cursor: isDisabled ? 'auto': 'pointer',
  bottom: 4
});

function candidateImageStyle(index) {
  const indexzero = index === Number(0)
  return {
    border: `1px solid ${indexzero ? "#ff6600" : "#666666"}`,
    objectFit: 'contain',
  }
}

function voteNameStyle(index) {
  const indexzero = index === Number(0)
  return {
    color: index === Number(0) ? "#ff6600" : index === Number(1) ? "#666666" : index === Number(2) ? "#6699CC" : index === Number(3) ? "#333333" : "#2E8BC9",
  }
}
