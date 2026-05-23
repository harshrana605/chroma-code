import React,{useRef,useEffect,useCallback}from'react';
import{EditorView,lineNumbers,highlightActiveLine}from'@codemirror/view';
import{EditorState,StateEffect}from'@codemirror/state';
import{indentOnInput,bracketMatching}from'@codemirror/language';
import{motion}from'framer-motion';
import{useStore}from'../store';
import{THEMES,makeTheme}from'../themes';
import{LANGUAGES}from'../utils/languages';

const WindowControls=()=>(
<div style={{display:'flex',alignItems:'center',gap:6,padding:'12px 16px',borderBottom:'1px solid #161616',background:'#0a0a0a'}}>
<div style={{width:12,height:12,borderRadius:6,background:'#ff5f57'}}/>
<div style={{width:12,height:12,borderRadius:6,background:'#febc2e'}}/>
<div style={{width:12,height:12,borderRadius:6,background:'#28c840'}}/>
<div style={{flex:1,display:'flex',justifyContent:'center'}}>
<div style={{background:'#111',border:'1px solid #1e1e1e',borderRadius:4,padding:'2px 16px',fontSize:10,color:'#2d2d2d',fontFamily:'JetBrains Mono',letterSpacing:'0.05em'}}>chromacode.studio</div>
</div>
</div>
);

export default function Preview({previewRef}){
const editorRef=useRef(null);
const viewRef=useRef(null);
const{code,language,theme,fontSize,lineNumbers:showLines,padding,showWindow,background}=useStore();
const th=THEMES[theme];

const buildExtensions=useCallback(()=>{
const langDef=LANGUAGES[language];
const exts=[
EditorView.editable.of(false),
indentOnInput(),
bracketMatching(),
highlightActiveLine(),
...makeTheme(th.colors),
EditorView.theme({'&':{fontSize:`${fontSize}px`}}),
];
if(showLines)exts.push(lineNumbers());
const langExt=langDef?.ext?.();
if(langExt)exts.push(langExt);
return exts;
},[theme,language,fontSize,showLines]);

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
if(cur!==code){view.dispatch({changes:{from:0,to:cur.length,insert:code}});}
},[code]);

const resolvedBg=background==='transparent'?'#080808':background;

return(
<div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',overflow:'auto',padding:24,background:'#030303'}}>
<div style={{minWidth:400,maxWidth:'90%'}}>
<div ref={previewRef} style={{background:resolvedBg,borderRadius:12,overflow:'hidden',boxShadow:`0 32px 80px rgba(0,0,0,0.8), 0 0 0 1px #1a1a1a, 0 0 60px ${th.glow}`}}>
{showWindow&&<WindowControls/>}
<div style={{padding:`${padding}px`,background:resolvedBg,minHeight:100}}>
<motion.div key={theme} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.3}}>
<div ref={editorRef} style={{display:'flex',flexDirection:'column'}}/>
</motion.div>
</div>
</div>
</div>
</div>
);
}