import { create } from 'ipfs-http-client'
import { useState } from 'react';
export default function UploadFile(props){

    const projectId = "2KwaoOl1zY6POCINIGnPji27rdB";
    const projectSecret = "783ec42e795c6f8b6dccdacc00a5b0bb";
    const authorization = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString('base64');

    const client = create({url:'https://ipfs.infura.io:5001/api/v0',
    headers:{authorization},
  });
  const [file, setFile] = useState(``);
  const [hash,setHash] = useState("");
  const [ipfsLink,setIpfsLink] = useState("");
  const [name,setName] = useState("");

    function onChange(e) {
       setFile(e.target.files[0])
      }
      async function upload(){
        try {
            props.setLoading(true)
            const added = await client.add(file)

            //add contract upload integeration here
            setHash(added.path)
            const url = `https://ipfs.io/ipfs/${added.path}`
            setIpfsLink(url)
            props.setLoading(false)
          } catch (error) {
            console.log('Error uploading file: ', error)
          }  

      }
      function handleName(e){
        setName(e.target.value);
        
      }
      
    return(
        <div className="upload-file">
                  {/* <div className="input-file"> */}
      
      <input onChange={handleName} type="text" placeholder='Enter File Name' className='input-area upload-area'></input>
      <input className='file-upload'
        type="file"
        onChange={onChange}
      />
      <button className='nav-btn ' onClick={upload}>{props.loading?"loading...":"Upload File"}</button>
      {
        hash && (
        //   <img src={fileUrl} width="600px" />
        <p>{`file successfully uploaded with hash :${hash}`}</p>
        
        )
      }
      
      
    {/* </div> */}

        </div>
    );

}