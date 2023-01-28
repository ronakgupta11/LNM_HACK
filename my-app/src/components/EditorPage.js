import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import FileSaver from 'file-saver';
import { useRef, useState } from 'react';

export default function EditorPage(){
        const editorRef = useRef(null);
        const [content,setContent] = useState("");
        const [name,setName] = useState("");


        const saveFile = () => {
        // const content = "hey this is new file";
        const blob = new Blob([content], { type: 'text/plain' });
        const fileName = name;
        console.log(blob)
    
      const file = FileSaver.saveAs(blob, fileName);
      console.log(file)
    };
    function handleEditorChange(value, event) {
      console.log( value);
      setContent(value)
    }
    function handleName(e){
      setName(e.target.value);
      
    }

    return(
        <div className="editor">
    <Editor
     height="50vh"
     width="50vw"

     defaultLanguage="javascript"
     defaultValue="// write some javascript code here"
     theme='vs-dark'
     onMount={(editor) => (editorRef.current = editor)}
     onChange={handleEditorChange}

     
   />
   <input onChange={handleName} type="text" placeholder='Enter File Name' className='input-area upload-area'></input>
   <button className="nav-btn" onClick={saveFile}>save file</button>


        </div>
    );
}