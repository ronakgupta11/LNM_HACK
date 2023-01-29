

export default function Navbar(props){
    const add = props.address.slice(0,4)+"...."+props.address.slice(-4);
    console.log(add)
    return(
        <div className ="navbar">
            {/* <div className="brand"> */}

            <img alt="brand logo" className="brand-name" src="./images/logo.png"></img>
            {/* <img alt="brand logo" className="brand-logo" src="./images/log.png"></img> */}
            {/* </div> */}
            {/* <h2>
            FileSync
            </h2> */}
            <div className="avatar">

            <svg  style = {{margin:"10px"}}xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="#f0536c" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>

            <button className="nav-btn" onClick={props.walletConnected?props.disconnect:props.connectWallet}>
            {props.walletConnected?add:"Connect Wallet"}
            </button>
            </div>
            

        </div>
    )

}