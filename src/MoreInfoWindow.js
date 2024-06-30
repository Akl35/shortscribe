import React, {useState} from 'react';
import Modal from 'react-modal';
import { AiFillInfoCircle, AiFillCloseCircle } from 'react-icons/ai';
import { getDatabase, ref, set, push } from "firebase/database";





function MoreInfoWindow({ video, videoRef, taskType }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => { setIsOpen(true) };
    const closeModal = () => { setIsOpen(false) };

    const USER_ID = "Lewis";

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

    function tooLong() {
        if(video.video_description.length > 50) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <button style={{outline: 'none', border: 'none', backgroundColor: 'transparent'}} onClick={() => {
                    openModal();
                    logEvent(USER_ID, "click", "Open Detailed Information", video.url, videoRef.current.currentTime, taskType);
                }
            }> 
                <AiFillInfoCircle size={42} style={{color: 'white'}} aria-label={"Detailed Information"}/>
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <h3>Video Description</h3>
                {tooLong() ?
                <div>{video.summary_50}</div>
                : <div>{video.video_description}</div> }
                <h3>Engrained Text</h3>
                <div style={{whiteSpace: 'pre-line'}}>
                    {video.ocr}
                </div>
                
                <h3>Per Shot Descriptions</h3>
                <div style={{whiteSpace: 'pre-line'}}>
                    {video.shot_descriptions}
                </div>


                <button style={{outline: 'none', border: 'none', backgroundColor: 'transparent', position: 'absolute', top: '8px', right: '4px'}} onClick={() => {
                    closeModal();
                    logEvent(USER_ID, "click", "Close Detailed Information", video.url, videoRef.current.currentTime, taskType);
                }
            }> 
                    <AiFillCloseCircle size={42} style={{color: 'black'}} aria-label={"Close window"}/>
                </button>
            </Modal>
        </div>
    )
}

export default MoreInfoWindow;