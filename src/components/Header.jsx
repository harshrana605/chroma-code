import React from'react';
import{motion}from'framer-motion';

export default function Header(){
return(
<motion.header initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}
style={{height:52,borderBottom:'1px solid #161616',display:'flex',alignItems:'center',padding:'0 24px',background:'#080808',flexShrink:0,gap:12,zIndex:10}}>
<div style={{display:'flex',alignItems:'center',gap:8}}>
<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
<path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#818cf8" strokeWidth="1.5" strokeLinejoin="round"/>
<path d="M2 17l10 5 10-5" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round"/>
<path d="M2 12l10 5 10-5" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round"/>
</svg>
<span style={{fontFamily:'JetBrains Mono',fontWeight:700,fontSize:15,letterSpacing:'0.08em',color:'#f8fafc'}}>Chromacode</span>
<span style={{fontSize:10,color:'#374151',fontFamily:'JetBrains Mono',marginLeft:2,letterSpacing:'0.05em'}}>STUDIO</span>
</div>
<div style={{flex:1}}/>
<span style={{fontSize:11,color:'#2d2d2d',fontFamily:'JetBrains Mono',letterSpacing:'0.1em'}}>BEAUTIFY · EXPORT · SHOWCASE</span>
</motion.header>
);
}
