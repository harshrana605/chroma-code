import React,{useState}from'react';
import{motion}from'framer-motion';
import{toJpeg,toBlob}from'html-to-image';
import{useStore}from'../store';

const Btn=({onClick,children,primary,loading})=>(
<motion.button onClick={onClick} whileHover={{scale:1.02}} whileTap={{scale:0.97}} disabled={!!loading}
style={{flex:1,padding:'9px 0',borderRadius:6,border:`1px solid ${primary?'#818cf822':'#1e1e1e'}`,background:primary?'rgba(129,140,248,0.08)':'#0e0e0e',color:primary?'#818cf8':'#6b7280',fontSize:11,fontFamily:'JetBrains Mono',cursor:loading?'wait':'pointer',letterSpacing:'0.05em',display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
{loading?'...':children}
</motion.button>
);

export default function ExportPanel({previewRef}){
const[scale,setScale]=useState(2);
const[loading,setLoading]=useState(null);
const{background}=useStore();
const resolvedBg=background==='transparent'?'#080808':background;

const getOptions=(s)=>({
pixelRatio:s,
cacheBust:true,
backgroundColor:resolvedBg,
quality:0.98,
});

const download=async(s,label)=>{
if(!previewRef.current)return;
setLoading(label);
try{
await toJpeg(previewRef.current,getOptions(s));
await toJpeg(previewRef.current,getOptions(s));
const url=await toJpeg(previewRef.current,getOptions(s));
const a=document.createElement('a');
a.href=url;
a.download=`chromacode-${Date.now()}.jpg`;
a.click();
}catch(e){console.error(e);}
setLoading(null);
};

const copy=async()=>{
if(!previewRef.current)return;
setLoading('copy');
try{
await toJpeg(previewRef.current,getOptions(scale));
await toJpeg(previewRef.current,getOptions(scale));
const blob=await toBlob(previewRef.current,{...getOptions(scale),type:'image/jpeg'});
await navigator.clipboard.write([new ClipboardItem({'image/jpeg':blob})]);
}catch(e){console.error(e);}
setLoading(null);
};

return(
<motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.4,delay:0.2}}
style={{borderTop:'1px solid #161616',padding:'14px 20px',background:'#080808',flexShrink:0,display:'flex',alignItems:'center',gap:16}}>
<div style={{display:'flex',alignItems:'center',gap:10}}>
<span style={{fontSize:9,color:'#2d2d2d',fontFamily:'JetBrains Mono',letterSpacing:'0.15em'}}>SCALE</span>
{[1,2,3,4].map(s=>(
<motion.button key={s} onClick={()=>setScale(s)} whileTap={{scale:0.9}}
style={{width:28,height:22,borderRadius:4,border:`1px solid ${scale===s?'#818cf8':'#1e1e1e'}`,background:scale===s?'rgba(129,140,248,0.1)':'transparent',color:scale===s?'#818cf8':'#374151',fontSize:10,cursor:'pointer',fontFamily:'JetBrains Mono'}}>
{s}x
</motion.button>
))}
</div>
<div style={{flex:1}}/>
<div style={{display:'flex',gap:8,width:420}}>
<Btn onClick={copy} loading={loading==='copy'}>⊕ Copy Image</Btn>
<Btn onClick={()=>download(scale,'jpg')} loading={loading==='jpg'} primary>↓ Export JPG</Btn>
<Btn onClick={()=>download(4,'hd')} loading={loading==='hd'} primary>↓ Ultra HD 4x</Btn>
</div>
</motion.div>
);
}