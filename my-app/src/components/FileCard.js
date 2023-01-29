import { prependOnceListener } from "process";

export default function FileCard(props){
    return(
        <div  className="file-card">
            <a href={props.ipfs} target ="_blank"><img src="./images/file.png" className="file-img"></img></a>
            <p>
                {props.name}
                {/* hello.txt */}
            </p>

        </div>
    );

}