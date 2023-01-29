

export default function Navbar(props){
    const add = props.address.slice(0,4)+"...."+props.address.slice(-4);
    console.log(add)
    return(
        <div className ="navbar">
            {/* <div className="brand"> */}

            <img alt="brand logo" className="brand-name" src="./images/logo.png"></img>
            <img alt="brand logo" className="brand-logo" src="./images/log.png"></img>
            {/* </div> */}
            {/* <h2>
            FileSync
            </h2> */}
            <button className="nav-btn" onClick={props.walletConnected?props.disconnect:props.connectWallet}>
            {props.walletConnected?add:"Connect Wallet"}
            </button>
            

        </div>
    )

}