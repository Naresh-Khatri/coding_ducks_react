import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { atomone } from "@uiw/codemirror-theme-atomone";
import { eclipse } from "@uiw/codemirror-theme-eclipse";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";

import "./CodeEditor.css";
import { useEffect } from "react";

export default function CodeEditor({ output, theme }) {
  const outputText = output.stdout || output.error
  const hasError = output.hasOwnProperty('error')
  const supportedThemes = {
    dracula: dracula,
    atomone: atomone,
    eclipse: eclipse,
    okaidia: okaidia,
    githubDark: githubDark,
    githubLight: githubLight,
    duotoneDark: duotoneDark,
    duotoneLight: duotoneLight,
    xcodeDark: xcodeDark,
    xcodeLight: xcodeLight,
  };
  // TODO: Turn text color red if error 
  // useEffect(()=>{
  //   const container = document.querySelectorAll('.cm-editor')
  //     console.log(container.length)
  //   if(container.length == 2 && hasError){
  //     container[1].style.color = 'red' 
  //     console.log(container)
  //   } 
  //   // container.style.color = 'red'
  // }, [output])
  return (
    <>
    {/* {hasError? 'yess error':'no error'} */}
      <CodeMirror
        basicSetup={{
          lineNumbers: false,
          highlightActiveLine: false,
          highlightActiveLineGutter: false,
          highlightSelectionMatches: false,
          highlightSpecialChars: false,
          styleActiveLine: false,
        }}
        readOnly={true}
        editable={false}
        value={outputText}
        height="90vh"
        theme={supportedThemes[theme]}
        // style={{color:'red', colorScheme:'red'}}
        className='okay'
      />
    </>
  );
}
