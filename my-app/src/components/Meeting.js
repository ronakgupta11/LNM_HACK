import MeVideoElem from './MeVideoElem';
import PeerVideoAudioElem from './PeerVideoAudioElem';
import { useHuddleStore } from "@huddle01/huddle01-client/store";
import { useState } from 'react';


export default function Meeting(props){
    const [room,setRoom] = useState("");
  const peersKeys = useHuddleStore((state) => Object.keys(state.peers));
  const isJoined = useHuddleStore((state) => state.roomState.joined);

    const handleRoom = (e) => {
        setRoom(e.target.value)
    }
  const handleJoin = async () => {
    try {
      await props.huddleClient.join(room, {
        address: props.address,
        wallet: "",
        ens: "",
      });


      console.log("joined");
      setTimeout(()=>props.huddleClient.toggleRoomLock(),10000);
      console.log("unlocked room")
    } catch (error) {
      console.log({ error });
    }
  };
  function exit(){
    // setIncall(false)
    props.huddleClient.closeRoomForEverybody()
    props.huddleClient.close();}

    return(
        <div className="meeting">
        <button className='back-btn' onClick={props.goback}>{" <- back "}</button>

            {!isJoined && <div className = "meeting-input">
                <input className='input-area meet' onChange={handleRoom} placeholder='Create room'></input>
                <input className='input-area meet' onChange={handleRoom} placeholder='join room'></input>
                <button className='nav-btn' onClick={handleJoin}> Join Meet</button>
            </div> }
            <div className="me">
              <div className="me-video">
                {isJoined?<MeVideoElem />:<svg className = "svg-image"stroke="#0F1819" fill="#0F1819" stroke-width="0" viewBox="0 0 16 12" height="10rem" width="10rem" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12 14.002a.998.998 0 0 1-.998.998H1.001A1 1 0 0 1 0 13.999V13c0-2.633 4-4 4-4s.229-.409 0-1c-.841-.62-.944-1.59-1-4 .173-2.413 1.867-3 3-3s2.827.586 3 3c-.056 2.41-.159 3.38-1 4-.229.59 0 1 0 1s4 1.367 4 4v1.002z"></path></svg>}
              </div>
              <div className="vid-btn">
              
              <button  className=" btn-sm-mod" onClick={() => props.huddleClient.enableWebcam()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9340FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-video"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              </button>
              <button className="btn-sm-mod" onClick={() => props.huddleClient.disableWebcam()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9340FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-video-off"><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </button>
              <button  className=" btn-sm-mod"onClick={() => props.huddleClient.unmuteMic()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9340FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-mic"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              </button>
              <button className=" btn-sm-mod" onClick={() => props.huddleClient.muteMic()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9340FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-mic-off"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              </button>
              <button className=" btn-sm-mod" onClick={() => exit()} >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9340FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="feather feather-phone-off"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="23" y1="1" x2="1" y2="23"></line></svg>
              </button>
            </div>
            </div>
            <div className="peer">
                {/* {!peersKeys[0] && <h3 style={{margin:"1rem"}}>{peerMessage}</h3>} */}
                {peersKeys[0] && <div className="me-video">
                  {peersKeys.map((key) => (
                    <PeerVideoAudioElem key={`peerId-${key}`} peerIdAtIndex={key} />
                  ))}
                </div>}
              </div>

        </div>
    );

}