import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { STORAGE_KEY } from './utils/localStorageInfo';
import votePink from './assets/votepink.png';
import voteBlue from './assets/voteblue.png';
import Button from './Button';
import { toast, ToastContainer } from 'react-toastify';
import orderBy from 'lodash/orderBy'

export default function Candidates({ poll, candidates, onUpVote, simulateUpvotes, pollView = false }) {
  const history = useHistory();
  
  const isImage = poll.type === 'image';
  let totalUpvotes;
  let candidate1;
  let candidate2;
  let candidate3;
  let candidate4;
  let candidate5;
  let candidate6;
  let candidate7;
  let candidate8;
  let candidate9;

  if (pollView) {
    console.log(candidates)
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    
    /* If this is poll view, create percentages for chart */
  if (candidates.length === 4) {
      candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
      candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
      candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
      candidate4 = candidates[3].upvotes ? (candidates[3].upvotes / totalUpvotes) * 100 : 0;  
  } else if (candidates.length === 5) {
      totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
      candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
      candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
      candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
      candidate4 = candidates[3].upvotes ? (candidates[3].upvotes / totalUpvotes) * 100 : 0;
      candidate5 = candidates[4].upvotes ? (candidates[4].upvotes / totalUpvotes) * 100 : 0;  
  } else if (candidates.length === 6) {
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
    candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
    candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
    candidate4 = candidates[3].upvotes ? (candidates[3].upvotes / totalUpvotes) * 100 : 0;
    candidate5 = candidates[4].upvotes ? (candidates[4].upvotes / totalUpvotes) * 100 : 0;
    candidate6 = candidates[5].upvotes ? (candidates[5].upvotes / totalUpvotes) * 100 : 0;    
  } else if (candidates.length === 7) {
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
    candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
    candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
    candidate4 = candidates[3].upvotes ? (candidates[3].upvotes / totalUpvotes) * 100 : 0;
    candidate5 = candidates[4].upvotes ? (candidates[4].upvotes / totalUpvotes) * 100 : 0;
    candidate6 = candidates[5].upvotes ? (candidates[5].upvotes / totalUpvotes) * 100 : 0; 
    candidate7 = candidates[6].upvotes ? (candidates[6].upvotes / totalUpvotes) * 100 : 0;    
  } else if (candidates.length === 8) {
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
    candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
    candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
    candidate4 = candidates[3].upvotes ? (candidates[3].upvotes / totalUpvotes) * 100 : 0;
    candidate5 = candidates[4].upvotes ? (candidates[4].upvotes / totalUpvotes) * 100 : 0;
    candidate6 = candidates[5].upvotes ? (candidates[5].upvotes / totalUpvotes) * 100 : 0; 
    candidate7 = candidates[6].upvotes ? (candidates[6].upvotes / totalUpvotes) * 100 : 0;
    candidate8 = candidates[7].upvotes ? (candidates[6].upvotes / totalUpvotes) * 100 : 0;    
  } else if (candidates.length === 9) {
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
    candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
    candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
    candidate4 = candidates[3].upvotes ? (candidates[3].upvotes / totalUpvotes) * 100 : 0;
    candidate5 = candidates[4].upvotes ? (candidates[4].upvotes / totalUpvotes) * 100 : 0;
    candidate6 = candidates[5].upvotes ? (candidates[5].upvotes / totalUpvotes) * 100 : 0; 
    candidate7 = candidates[6].upvotes ? (candidates[6].upvotes / totalUpvotes) * 100 : 0;
    candidate8 = candidates[7].upvotes ? (candidates[6].upvotes / totalUpvotes) * 100 : 0;
    candidate9 = candidates[8].upvotes ? (candidates[8].upvotes / totalUpvotes) * 100 : 0;    
  } else {
    totalUpvotes = candidates.reduce((acc, next) => acc + next.upvotes, 0);
    candidate1 = candidates[0].upvotes ? (candidates[0].upvotes / totalUpvotes) * 100 : 0;
    candidate2 = candidates[1].upvotes ? (candidates[1].upvotes / totalUpvotes) * 100 : 0;
    candidate3 = candidates[2].upvotes ? (candidates[2].upvotes / totalUpvotes) * 100 : 0;
  }
   
  }
  if (totalUpvotes === 0) {
    /* If poll is new, set 50% width for each side of chart */
    candidate1 = 50;
    candidate2 = 50;
    candidate3 = 50;
    candidate4 = 50;
    candidate5 = 50;
    candidate6 = 50;
    candidate7 = 50;
    candidate8 = 50;
    candidate9 = 50;
  }

  const voteDataFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (voteDataFromStorage && voteDataFromStorage[poll.id]) {
    /* If user has voted 50 times for a candidate, disable voting */
    const c1 = voteDataFromStorage[poll.id][candidates[0].id];
    const c2 = voteDataFromStorage[poll.id][candidates[1].id];
    const c3 = voteDataFromStorage[poll.id][candidates[2].id];
    if (c1 && (c1.upvotes >= 50)) candidates[0].isDisabled = true;
    if (c2 && (c2.upvotes >= 50)) candidates[1].isDisabled = true;
    if (c3 && (c3.upvotes >= 50)) candidates[2].isDisabled = true;

    if (candidates == 4) {
      const c1 = voteDataFromStorage[poll.id][candidates[0].id];
      const c2 = voteDataFromStorage[poll.id][candidates[1].id];
      const c3 = voteDataFromStorage[poll.id][candidates[2].id];
      const c4 = voteDataFromStorage[poll.id][candidates[3].id];
      if (c1 && (c1.upvotes >= 50)) candidates[0].isDisabled = true;
      if (c2 && (c2.upvotes >= 50)) candidates[1].isDisabled = true;
      if (c3 && (c3.upvotes >= 50)) candidates[2].isDisabled = true;
      if (c4 && (c4.upvotes >= 50)) candidates[3].isDisabled = true;
    }
    if (candidates == 5) {
      const c1 = voteDataFromStorage[poll.id][candidates[0].id];
      const c2 = voteDataFromStorage[poll.id][candidates[1].id];
      const c3 = voteDataFromStorage[poll.id][candidates[2].id];
      const c4 = voteDataFromStorage[poll.id][candidates[3].id];
      const c5 = voteDataFromStorage[poll.id][candidates[4].id];
      if (c1 && (c1.upvotes >= 50)) candidates[0].isDisabled = true;
      if (c2 && (c2.upvotes >= 50)) candidates[1].isDisabled = true;
      if (c3 && (c3.upvotes >= 50)) candidates[2].isDisabled = true;
      if (c4 && (c4.upvotes >= 50)) candidates[3].isDisabled = true;
      if (c5 && (c5.upvotes >= 50)) candidates[4].isDisabled = true;
    }

    if (candidates == 6) {
      const c1 = voteDataFromStorage[poll.id][candidates[0].id];
      const c2 = voteDataFromStorage[poll.id][candidates[1].id];
      const c3 = voteDataFromStorage[poll.id][candidates[2].id];
      const c4 = voteDataFromStorage[poll.id][candidates[3].id];
      const c5 = voteDataFromStorage[poll.id][candidates[4].id];
      const c6 = voteDataFromStorage[poll.id][candidates[5].id];
      if (c1 && (c1.upvotes >= 50)) candidates[0].isDisabled = true;
      if (c2 && (c2.upvotes >= 50)) candidates[1].isDisabled = true;
      if (c3 && (c3.upvotes >= 50)) candidates[2].isDisabled = true;
      if (c4 && (c4.upvotes >= 50)) candidates[3].isDisabled = true;
      if (c5 && (c5.upvotes >= 50)) candidates[4].isDisabled = true;
      if (c6 && (c6.upvotes >= 50)) candidates[5].isDisabled = true;
    }
    if (candidates == 7) {
      const c1 = voteDataFromStorage[poll.id][candidates[0].id];
      const c2 = voteDataFromStorage[poll.id][candidates[1].id];
      const c3 = voteDataFromStorage[poll.id][candidates[2].id];
      const c4 = voteDataFromStorage[poll.id][candidates[3].id];
      const c5 = voteDataFromStorage[poll.id][candidates[4].id];
      const c6 = voteDataFromStorage[poll.id][candidates[5].id];
      const c7 = voteDataFromStorage[poll.id][candidates[6].id];
      if (c1 && (c1.upvotes >= 50)) candidates[0].isDisabled = true;
      if (c2 && (c2.upvotes >= 50)) candidates[1].isDisabled = true;
      if (c3 && (c3.upvotes >= 50)) candidates[2].isDisabled = true;
      if (c4 && (c4.upvotes >= 50)) candidates[3].isDisabled = true;
      if (c5 && (c5.upvotes >= 50)) candidates[4].isDisabled = true;
      if (c6 && (c6.upvotes >= 50)) candidates[5].isDisabled = true;
      if (c7 && (c7.upvotes >= 50)) candidates[6].isDisabled = true;
    }
    if (candidates == 8) {
      const c1 = voteDataFromStorage[poll.id][candidates[0].id];
      const c2 = voteDataFromStorage[poll.id][candidates[1].id];
      const c3 = voteDataFromStorage[poll.id][candidates[2].id];
      const c4 = voteDataFromStorage[poll.id][candidates[3].id];
      const c5 = voteDataFromStorage[poll.id][candidates[4].id];
      const c6 = voteDataFromStorage[poll.id][candidates[5].id];
      const c7 = voteDataFromStorage[poll.id][candidates[6].id];
      const c8 = voteDataFromStorage[poll.id][candidates[7].id];
      if (c1 && (c1.upvotes >= 50)) candidates[0].isDisabled = true;
      if (c2 && (c2.upvotes >= 50)) candidates[1].isDisabled = true;
      if (c3 && (c3.upvotes >= 50)) candidates[2].isDisabled = true;
      if (c4 && (c4.upvotes >= 50)) candidates[3].isDisabled = true;
      if (c5 && (c5.upvotes >= 50)) candidates[4].isDisabled = true;
      if (c6 && (c6.upvotes >= 50)) candidates[5].isDisabled = true;
      if (c7 && (c7.upvotes >= 50)) candidates[6].isDisabled = true;
      if (c8 && (c8.upvotes >= 50)) candidates[7].isDisabled = true;
    }
    if (candidates == 9) {
      const c1 = voteDataFromStorage[poll.id][candidates[0].id];
      const c2 = voteDataFromStorage[poll.id][candidates[1].id];
      const c3 = voteDataFromStorage[poll.id][candidates[2].id];
      const c4 = voteDataFromStorage[poll.id][candidates[3].id];
      const c5 = voteDataFromStorage[poll.id][candidates[4].id];
      const c6 = voteDataFromStorage[poll.id][candidates[5].id];
      const c7 = voteDataFromStorage[poll.id][candidates[6].id];
      const c8 = voteDataFromStorage[poll.id][candidates[7].id];
      const c9 = voteDataFromStorage[poll.id][candidates[8].id];
      if (c1 && (c1.upvotes >= 50)) candidates[0].isDisabled = true;
      if (c2 && (c2.upvotes >= 50)) candidates[1].isDisabled = true;
      if (c3 && (c3.upvotes >= 50)) candidates[2].isDisabled = true;
      if (c4 && (c4.upvotes >= 50)) candidates[3].isDisabled = true;
      if (c5 && (c5.upvotes >= 50)) candidates[4].isDisabled = true;
      if (c6 && (c6.upvotes >= 50)) candidates[5].isDisabled = true;
      if (c7 && (c7.upvotes >= 50)) candidates[6].isDisabled = true;
      if (c8 && (c8.upvotes >= 50)) candidates[7].isDisabled = true;
      if (c9 && (c9.upvotes >= 50)) candidates[8].isDisabled = true;
    }
  }
  const alphabetized = candidates.sort(function(a, b) {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
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
            <div style={candidate6Style(candidate6)} />
            <div style={candidate7Style(candidate7)} />
            <div style={candidate8Style(candidate8)} />
            <div style={candidate9Style(candidate9)} />
          </div>
        )
      }

      <div className="candidate-container">
        {
          
          candidates.map((candidate, index) => {  
              return (
                <div className="mt-4 flex items-center" key={candidate.name}>
                  
                  <div className="flex mr-4">
                    {candidate.name === null ? 
                      <button style={{ display: 'none'}}>{candidate.name}</button> 
                    :
                      <button onClick={candidate.isDisabled ? null : () => onUpVote(candidate, poll)} className="vote-button w-12 md:w-18 capitalize text-2xl sm:text-4xl font-bold" style={voteImageContainerStyle(index, candidate.isDisabled)}>{candidate.name}</button>
                    }
                  </div>
                  <div className="flex items-center">
                  {candidate.name === null ?
                    <p style={{ display: 'none' }}>{candidate.upvotes}</p>
                  :  
                    <p className="
                    w-20
                    text-4xl font-bold ml-3" style={voteNameStyle(index)}>{candidate.upvotes}</p>
                    }
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
      <button className='backButton' onClick={() => history.goBack()}>Back</button>
      <button className='reloadButton'onClick={() => window.location.reload(false)}>Reload</button>
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

function candidate6Style(width) {
  return {
    backgroundColor: '#75717d',
    width: `${width}%`,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    transition: 'all 0.5s ease'
  }
}

function candidate7Style(width) {
  return {
    backgroundColor: '#6d3e3a',
    width: `${width}%`,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    transition: 'all 0.5s ease'
  }
}

function candidate8Style(width) {
  return {
    backgroundColor: '#82735b',
    width: `${width}%`,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    transition: 'all 0.5s ease'
  }
}

function candidate9Style(width) {
  return {
    backgroundColor: '#3e332e',
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
    color: index === Number(0) ? "#ff6600" 
    : index === Number(1) ? "#666666" 
    : index === Number(2) ? "#6699CC" 
    : index === Number(3) ? "#333333"
    : index === Number(4) ? "#2E8BC9" 
    : index === Number(5) ? "#75717d" 
    : index === Number(6) ? "#6d3e3a" 
    : index === Number(7) ? "#82735b" 
    : "#3e332e",
  }
}
