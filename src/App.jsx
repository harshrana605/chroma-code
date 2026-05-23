import React,{useRef,useState}from'react';
import{motion}from'framer-motion';
import Header from'./components/Header';
import Sidebar from'./components/Sidebar';
import CodeEditor from'./components/CodeEditor';
import Preview from'./components/Preview';
import ExportPanel from'./components/ExportPanel';
import{useStore}from'./store';
export default function App(){
const previewRef=useRef(null);
const[view,setView]=useState('edit');
const{theme}=useStore();
return(
<div style={{display:'flex',flexDirection:'column',height:'100vh',overflow:'hidden',background:'#080808'}}>
<Header/>
<div style={{display:'flex',flex:1,overflow:'hidden'}}>
<Sidebar/>
<div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
<div style={{display:'flex',borderBottom:'1px solid #161616',background:'#080808',flexShrink:0}}>
{['edit','preview'].map(v=>(
<motion.button key={v} onClick={()=>setView(v)} whileHover={{backgroundColor:'rgba(255,255,255,0.02)'}}
style={{padding:'10px 20px',border:'none',borderBottom:`2px solid ${view===v?'#818cf8':'transparent'}`,background:'transparent',color:view===v?'#9ca3af':'#374151',fontSize:11,fontFamily:'JetBrains Mono',cursor:'pointer',letterSpacing:'0.1em',textTransform:'uppercase',transition:'color 0.2s'}}>
{v}
</motion.button>
))}
</div>
<div style={{flex:1,overflow:'hidden',position:'relative'}}>
<div style={{position:'absolute',inset:0,display:view==='edit'?'flex':'none',flexDirection:'column'}}>
<CodeEditor/>
</div>
<div style={{position:'absolute',inset:0,display:view==='preview'?'flex':'none',flexDirection:'column',overflow:'hidden'}}>
<Preview previewRef={previewRef}/>
</div>
</div>
</div>
</div>
<ExportPanel previewRef={previewRef}/>
</div>
);
}