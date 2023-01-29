import { providers, Contract,ethers } from "ethers";
import { useEffect, useState } from "react";
import { contractAddress,abi } from '../constants';
import FileCard from "./FileCard";

export default function AllFiles(props){
    const [fileNames,setFileNames] = useState([])
    const [userLatestFiles,setUserLatestFiles] = useState([]);
    const [renderAllFiles,setRenderAllFiles] = useState([]);
    const [renderPreviousFiles,setRenderPreviousFiles] = useState([]);
    const [name,setName] = useState("") 

function handleName(e){
    setName(e.target.value)
}

    async function handlePrevious(){
        console.log("in previous")
    const signer = await props.getSigner(true);
    const contract = new Contract(contractAddress,abi,signer);
    const add = await signer.getAddress();
    console.log(name)
    const versions = await contract.getVersionOfFile(add,name);
    console.log(versions)
    const rendered = versions.map((file,i) => {
        return(
            <FileCard key = {i} name = {file.name} ipfs = {file.ipfsUrl}/>
        )
    })
    setRenderPreviousFiles(rendered)
        


    }
    






    const renderFiles = fileNames.map( (file,i) => {
        // const signer = await props.getSigner(true);
        // const contract = new Contract(contractAddress,abi,signer);
        
        // const allVersionFiles = await contract.getVersionOfFile(props.address,fileName);
        // const latestFile = allVersionFiles[allVersionFiles.length - 1];
        // setUserLatestFiles([...AllFiles,latestFile]);



        
        return(
            <FileCard key = {i} name = {file} ipfs = ""/>
        )
    })
useEffect( ()=>{
    async function call(){
    const signer = await props.getSigner(true);
    const contract = new Contract(contractAddress,abi,signer);
    const add = await signer.getAddress();
    const fileNamesh = await contract.getFilesOfAddress(add);
    console.log("filenames",fileNamesh)
    setFileNames(fileNamesh)
//     for(let i = 0; i<fileNamesh.length -1; i++){
//         console.log("in for")
//     const allVersionFiles = await contract.getVersionOfFile(add,fileNamesh[i]);
//     console.log("allversion file:",allVersionFiles)
//     const latestFile = allVersionFiles[allVersionFiles.length-1];
//     console.log("latest-file",latestFile)
//     setUserLatestFiles(...userLatestFiles,latestFile)
// }
}
call();


},[]);


    return(
        <div>
            <div className="previous-version">

            <input className="input-area upload-area" onChange={handleName} placeholder="enter file name"></input>
            <button onClick = {handlePrevious}className="nav-btn">get previous versions</button>
            <div className="prev-files">

            {renderPreviousFiles}
            </div>
            
            </div >
            <p className = "file-head">
                All Files
            </p>
            <div className="all-files">

            {renderFiles}
            </div>
        </div>
    )
}