export default function ChangeTab(props){
    return(
        <div className="change-tab">
        <button className='back-btn' onClick={props.goback}>{" <- back "}</button>

            <div className="tab-btn-div">

            <button className="tab-btn" onClick={props.meeting}>
                Meeting
            </button>
            {/* <img src="./images/meet.png"></img> */}
            </div>
            <div className="tab-btn-div">

            <button className="tab-btn" onClick={props.addfile}>
                Add File
            </button>
            {/* <img src="./images/add-file.png"></img> */}
            </div>
            <div className="tab-btn-div">

            <button className="tab-btn" onClick={props.editor}>
                Create File
            </button>
            {/* <img src="./images/add-file.png"></img> */}
            </div>


        </div>
    )
}