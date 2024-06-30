import './Video.css';
import React, { useRef, useState, useEffect } from "react";
import { BsArrowDownCircleFill, BsArrowUpCircleFill, BsPlayCircleFill, BsPauseCircleFill, BsBookmarkFill, BsFillDiscFill } from 'react-icons/bs';
import {AiFillMessage, AiFillHeart} from 'react-icons/ai';
import {PiShareFatFill} from 'react-icons/pi';
import MoreInfoWindow from './MoreInfoWindow';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "**************************************",
  authDomain: "**************************************",
  databaseURL: "**************************************",
  projectId: "**************************************",
  storageBucket: "**************************************",
  messagingSenderId: "************",
  appId: "****************************************",
  measurementId: "************"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const USER_ID = "User0";

// Video element with url as param
function Video({videos, baseline, taskType}) {
  const num_videos = videos.length;

  //useState saves and changes the state of playing to keep track of playing/pausing
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const [index, setIndex] = useState(0);

  function logEvent(userId, interaction, element, video_id, video_time, task_type) {
    const db = getDatabase();
    const reference = ref(db, "users/" + userId + "/" + task_type + "/");
    const newRef = push(reference);

    set(newRef, {
      interaction: interaction,
      buttonType: element,
      videoId: video_id,
      videoTime: video_time,
      timestamp: Date.now()
    });
  }

  function onPlayPause () {
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };
  
  function onNext() {
    videoRef.current.pause();
    setPlaying(false);

    setIndex(function (prevIndex) {
      if (prevIndex < num_videos - 1) {
        return (prevIndex += 1); 
      } else {
        return (prevIndex = num_videos - 1);
      }
    });
  }

  function onPrevious() {
    videoRef.current.pause();
    setPlaying(false);
    
    setIndex(function (prevIndex) {
      if (prevIndex > 0) {
        return (prevIndex -= 1); 
      } else {
        return (prevIndex = 0);
      }
    });
  }

  useEffect(() => {
    videoRef.current.volume = 0;     
    videoRef.current.play();
    setPlaying(true);
    videoRef.current.volume = 1;
  }, []);

  useEffect(() => {
    videoRef.current.volume = 0;     
    videoRef.current.play();
    setPlaying(true);
    videoRef.current.volume = 1;
  }, [index]);

  return (
    <div class='container'>
      {/* video */}
      <video className='video' 
        src={videos[index].url+'#t=0.001'}
        ref={videoRef}
        loop
        playsInline
        aria-label='Short video'
      ></video>

      {/* video navigation buttons */}
      <div className='button_container'>
        <div className='scroll'>
          <button style={{outline: 'none', border: 'none', backgroundColor: 'transparent'}} onClick={ () => {
              onPrevious();
              logEvent(USER_ID, "click", "previous video", videos[index].url, videoRef.current.currentTime, taskType);
            }
          }> 
            <BsArrowUpCircleFill size={42} style={{color: 'white'}} aria-label={"Previous video"}/>
          </button>
        </div>

        <div className='scroll'>
          <button style={{outline: 'none', border: 'none', backgroundColor: 'transparent'}} onClick={ () => {
              onPlayPause();
              logEvent(USER_ID, "click", playing ? "pause" : "play", videos[index].url, videoRef.current.currentTime, taskType);
            }
          }> 
            {
            playing ? 
            <BsPauseCircleFill size={42} style={{color: 'white'}} aria-label={"Pause button"} 
            /> 
            : 
            <BsPlayCircleFill size={42} style={{color: 'white'}} aria-label={"Play button"} />
            }
          </button>
        </div>

        <div className='scroll'>
          <button style={{outline: 'none', border: 'none', backgroundColor: 'transparent'}} onClick={() => {
              onNext();
              logEvent(USER_ID, "click", "next video", videos[index].url, videoRef.current.currentTime, taskType);
            }
          }> 
            <BsArrowDownCircleFill size={42} style={{color: 'white'}} aria-label={"Next video"}/>
          </button>
        </div>
      </div>
      
      {/* text info */}
      <div className='text_container'>
        {!baseline && (<p className='caption'> 
        {videos[index].summary_10}
        </p>)}
        <h3 aria-label={`@ ${videos[index].user}`} className='user'>{`@ ${videos[index].user}`}</h3>
        <p className='caption'>{videos[index].caption}</p>
        <BsFillDiscFill size={42} style={{color: "white"}} /><h5 aria-label={"source audio - " + videos[index].originalSound}>{videos[index].originalSound}</h5>
      </div>

      {/* video info sidebar */}
      <div className='sidebar'>
        {!baseline && (
          <MoreInfoWindow video={videos[index]} videoRef={videoRef} taskType={taskType}/>
       )}
        
        
        <div className='scroll'>
          <AiFillHeart size={42} style={{color: "white"}}/>
          <div>
            <h4 aria-label={`${videos[index].likes} likes`}>{videos[index].likes}</h4>
          </div>          
        </div>

        <div className='scroll' aria-label="Comments Icon">
          <AiFillMessage size={42} style={{color: "white"}}/>
          <h4 aria-label={`${videos[index].comments} comments`}>{videos[index].comments}</h4>
        </div>

        <div className='scroll' aria-label="Bookmarks Icon">
          <BsBookmarkFill size={42} style={{color: 'white'}} />
          <h4 aria-label={`${videos[index].bookmarks} saves`}>{videos[index].bookmarks}</h4>
        </div>

        <div className='scroll' aria-label="Share Icon">
          <PiShareFatFill size={42} style={{color: 'white'}}/>
          <h4 aria-label={`${videos[index].shares} shares`}>{videos[index].shares}</h4>
        </div>
      </div>


    </div>


  );
}

export default Video;