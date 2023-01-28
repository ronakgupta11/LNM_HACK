

export default function Navbar(props){
    return(
        <div className ="navbar">
            <img></img>
            <h2>
            Navbar
            </h2>
            <button onClick={props.connectWallet}>
            {props.address?props.address:"Connect Wallet"}
            </button>
            {props.walletConnected && <button onClick={props.disconnect}>Disconect</button> }

        </div>
    )

}