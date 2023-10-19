"use client"

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {python} from '@codemirror/lang-python';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import Split from 'react-split';
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { set } from "zod";
import { Input } from "./ui/input";

type Props = {}
const code = `
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};
`;

const CodeEditor = (props: Props) => {

  const [value, setValue] = useState(code);

  const setCode = (e:any) =>{

    console.log(value)

  }

  return (
    <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
        <div className='w-full overflow-auto bg-vscodedarktheme'>
            <CodeMirror
                value = {value}
                theme={vscodeDark}
                extensions={[ javascript({ jsx: true }), python()]}
                style={{ fontSize: 16 }}
                onChange={(value) => {setValue(value)}}
            />
        </div>
         <div className='flex flex-col w-full overflow-auto mt-5'>
            
            <Input className='w-full mr-3 ml-3 h-screen' placeholder='Write Test Cases'/>
            <Button className='flex w-fit m-5' onClick={(e)=>setCode(e)}>Run</Button>
         </div>
    </Split>
  )
}

export default CodeEditor