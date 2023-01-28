

export default function Navbar(props){
    return(
        <div className ="navbar">
            <img alt="brand logo"></img>
            <h2>
            Navbar
            </h2>
            <button className="nav-btn" onClick={props.connectWallet}>
            {props.address?props.address:"Connect Wallet"}
            </button>
            {props.walletConnected && <button className="nav-btn" onClick={props.disconnect}>Disconect</button> }

        </div>
    )

}