"use client"

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import {python} from '@codemirror/lang-python';
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import Split from 'react-split';
import { Button } from "./ui/button";
import { useState, useEffect, use } from "react";
import { set } from "zod";
import { Input } from "./ui/input";
import { useSession } from 'next-auth/react';
import axios, { AxiosResponse } from "axios";
import Toast from "./ui/Toast";

type Props = {
  code: string,
  problemId: number
}
let code = "";

const CodeEditor = (props: Props) => {

  const [value, setValue] = useState(code);
  const [runButtonDisabled, setRunButtonDisabled] = useState(false);

  const [codeStatus, setCodeStatus] = useState({
    status: '',
    color: 'black'
  });
  const [showToast, setShowToast] = useState(false);

  code = props.code;
  const {data: session} = useSession();

  useEffect(() => {
    setValue(code);
  }, [props.code])

  const checkCodeSubmisstion = async (tryNumber: number, id:unknown) => {

    if(tryNumber > 10){
      setCodeStatus({
        status: 'It is taking some time. Please check after some time',
        color: 'red'
      });
      setRunButtonDisabled(false);
      return;
    }
    else{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      };

      const res:AxiosResponse = await axios.get(`/api/run?id=${id}`, {headers});

      if(res?.data?.submission?.status === 'queued'){
        console.log("it's still pending");
        setCodeStatus({
          status: 'Pending...',
          color: 'yellow'
        });
        setTimeout(() => {
          checkCodeSubmisstion(tryNumber+1, id);
        }, 5000);
      }
      else if(res?.data?.submission?.status === 'SUCCESS'){
        setCodeStatus({
          status: 'Success',
          color: 'green'
        });
        setShowToast(true);
        setRunButtonDisabled(false);
      }
      else{
        setCodeStatus({
          status: 'Failed',
          color: 'red'
        });
        setRunButtonDisabled(false);
      }

    }

  }

  const runCode = async (code: string) => {

    setRunButtonDisabled(true);
    setCodeStatus({
      status: 'Pending...',
      color: 'black'
    });

    //axios request to run the code
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.token}`
    },
    body = {
      code,
      problemId: props.problemId,
      language: 'javascript'
    },
    method = 'post',
    options = {
      headers,
      body,
      method
    };

    try {
      const res:AxiosResponse = await axios.post('/api/run', body, {headers});
  
      if(res?.data?.status){
        //console.log("success");
        setCodeStatus({
          status: 'Queued...',
          color: 'yellow'
        });
        checkCodeSubmisstion(0, res?.data?.id);
      }
      else{
        setRunButtonDisabled(false);
      }
    } 
    
    catch (error) {
      console.log(error);
      setRunButtonDisabled(false);
    }


  }

  return (
    <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
        {
          showToast && <Toast message='Code Submitted' time={5000} type='success' onClose={()=>setShowToast(false)}/>

        }
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

            <div className="flex flex-row items-center"> 
              <Button disabled = {runButtonDisabled} className='flex w-fit m-5' onClick={()=> {runCode(value)}}>Run</Button>
              <p color={codeStatus?.color}>{codeStatus?.status}</p>
            </div>
         </div>
    </Split>
  )
}

export default CodeEditor
