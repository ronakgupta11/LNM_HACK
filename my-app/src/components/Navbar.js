

export default function Navbar(props){
    return(
        <div className ="navbar">
            <img alt="brand logo"></img>
            <h2>
            FileSync
            </h2>
            {props.address?<p>{props.address}</p>:<button className="nav-btn" onClick={props.connectWallet}>
            Connect Wallet
            </button>}
            {props.walletConnected && <button className="nav-btn" onClick={props.disconnect}>Disconect</button> }

        </div>
    )

}