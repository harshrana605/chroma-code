import React from'react';
import{motion,AnimatePresence}from'framer-motion';
import{useStore}from'../store';
import{THEMES}from'../themes';
import{LANGUAGES}from'../utils/languages';

const Label=({children})=>(
<div style={{fontSize:9,color:'#2d2d2d',letterSpacing:'0.15em',fontWeight:600,marginBottom:8,fontFamily:'JetBrains Mono',textTransform:'uppercase'}}>{children}</div>
);

const Select=({value,onChange,options})=>(
<select value={value} onChange={e=>onChange(e.target.value)}
style={{width:'100%',background:'#0e0e0e',border:'1px solid #1e1e1e',color:'#9ca3af',borderRadius:6,padding:'7px 10px',fontSize:11,fontFamily:'JetBrains Mono',cursor:'pointer',outline:'none',appearance:'none',backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23374151' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`,backgroundRepeat:'no-repeat',backgroundPosition:'calc(100% - 10px) center'}}>
{options.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}
</select>
);

const Slider=({value,onChange,min,max,step=1})=>(
<div style={{display:'flex',alignItems:'center',gap:10}}>
<input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}
style={{flex:1,accentColor:'#818cf8',height:3,cursor:'pointer'}}/>
<span style={{fontSize:10,color:'#4b5563',fontFamily:'JetBrains Mono',minWidth:24,textAlign:'right'}}>{value}</span>
</div>
);

const Toggle=({value,onChange,label})=>(
<div style={{display:'flex',alignItems:'center',justifyContent:'space-between',cursor:'pointer'}} onClick={()=>onChange(!value)}>
<span style={{fontSize:11,color:'#6b7280',fontFamily:'JetBrains Mono'}}>{label}</span>
<div style={{width:32,height:18,borderRadius:9,background:value?'#818cf8':'#1e1e1e',position:'relative',transition:'background 0.2s',border:'1px solid #2a2a2a'}}>
<motion.div animate={{x:value?14:2}} transition={{type:'spring',stiffness:500,damping:30}}
style={{width:14,height:14,borderRadius:7,background:value?'#fff':'#374151',position:'absolute',top:1}}/>
</div>
</div>
);

const Section=({title,children})=>(
<div style={{marginBottom:24}}>
<Label>{title}</Label>
{children}
</div>
);

export default function Sidebar(){
const{language,setLanguage,theme,setTheme,fontSize,setFontSize,lineNumbers,setLineNumbers,padding,setPadding,showWindow,setShowWindow,background,setBackground}=useStore();

const langOptions=Object.entries(LANGUAGES).map(([k,v])=>({value:k,label:v.label}));
const themeOptions=Object.keys(THEMES).map(k=>({value:k,label:k}));
const bgOptions=[{value:'transparent',label:'Transparent'},{value:'#080808',label:'Black'},{value:'#0d1117',label:'GitHub Dark'},{value:'#111827',label:'Slate Dark'}];

return(
<motion.aside initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:0.4,delay:0.1}}
style={{width:220,background:'#080808',borderRight:'1px solid #161616',display:'flex',flexDirection:'column',flexShrink:0,overflowY:'auto',padding:'20px 16px'}}>

<Section title="Language">
<Select value={language} onChange={setLanguage} options={langOptions}/>
</Section>

<Section title="Theme">
<div style={{display:'flex',flexDirection:'column',gap:4}}>
{Object.keys(THEMES).map(k=>{
const th=THEMES[k];
const active=theme===k;
return(
<motion.button key={k} onClick={()=>setTheme(k)} whileHover={{x:2}} whileTap={{scale:0.97}}
style={{padding:'8px 10px',borderRadius:6,border:`1px solid ${active?'#2a2a2a':'transparent'}`,background:active?'#111111':'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:8,textAlign:'left'}}>
<div style={{display:'flex',gap:3}}>
{[th.colors.kw,th.colors.str,th.colors.fn].map((c,i)=>(
<div key={i} style={{width:6,height:6,borderRadius:3,background:c,boxShadow:`0 0 4px ${c}88`}}/>
))}
</div>
<span style={{fontSize:10,color:active?'#e2e8f0':'#4b5563',fontFamily:'JetBrains Mono',letterSpacing:'0.05em'}}>{k}</span>
</motion.button>
);
})}
</div>
</Section>

<Section title="Font Size">
<Slider value={fontSize} onChange={setFontSize} min={10} max={20}/>
</Section>

<Section title="Padding">
<Slider value={padding} onChange={setPadding} min={0} max={80} step={4}/>
</Section>

<Section title="Background">
<Select value={background} onChange={setBackground} options={bgOptions}/>
</Section>

<Section title="Options">
<div style={{display:'flex',flexDirection:'column',gap:10}}>
<Toggle value={lineNumbers} onChange={setLineNumbers} label="Line numbers"/>
<Toggle value={showWindow} onChange={setShowWindow} label="Window frame"/>
</div>
</Section>
</motion.aside>
);
}
