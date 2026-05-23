import React,{useEffect,useRef,useCallback}from'react';
import{EditorView,lineNumbers,highlightActiveLine,highlightActiveLineGutter,keymap}from'@codemirror/view';
import{EditorState,StateEffect}from'@codemirror/state';
import{defaultKeymap,historyKeymap,history}from'@codemirror/commands';
import{indentOnInput,bracketMatching}from'@codemirror/language';
import{useStore}from'../store';
import{THEMES,makeTheme}from'../themes';
import{LANGUAGES}from'../utils/languages';
export default function CodeEditor(){
const editorRef=useRef(null);
const viewRef=useRef(null);
const{code,setCode,language,theme,fontSize,lineNumbers:showLines}=useStore();
const buildExtensions=useCallback(()=>{
const th=THEMES[theme];
const langDef=LANGUAGES[language];
const exts=[
history(),
indentOnInput(),
bracketMatching(),
highlightActiveLine(),
highlightActiveLineGutter(),
keymap.of([...defaultKeymap,...historyKeymap]),
...makeTheme(th.colors),
EditorView.updateListener.of(update=>{if(update.docChanged)setCode(update.state.doc.toString());}),
EditorView.theme({'&':{fontSize:`${fontSize}px`}}),
];
if(showLines)exts.push(lineNumbers());
const langDef2=langDef?.ext?.();
if(langDef2)exts.push(langDef2);
return exts;
},[theme,language,fontSize,showLines,setCode]);
useEffect(()=>{
if(!editorRef.current)return;
const state=EditorState.create({doc:code,extensions:buildExtensions()});
const view=new EditorView({state,parent:editorRef.current});
viewRef.current=view;
return()=>{view.destroy();viewRef.current=null;};
},[]);
useEffect(()=>{
const view=viewRef.current;
if(!view)return;
view.dispatch({effects:StateEffect.reconfigure.of(buildExtensions())});
},[theme,language,fontSize,showLines,buildExtensions]);
useEffect(()=>{
const view=viewRef.current;
if(!view)return;
const cur=view.state.doc.toString();
if(cur!==code){
view.dispatch({changes:{from:0,to:cur.length,insert:code}});
}
},[code]);
return <div ref={editorRef} style={{flex:1,overflow:'hidden',display:'flex',flexDirection:'column'}}/>;
}