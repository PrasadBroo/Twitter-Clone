
import { useEffect,useState } from 'react';

export default function useAtBttom(ele) {
  const [atBottom,setAtBotoom] = useState(false);
  function onScroll() {    
    if (window.pageYOffset + window.innerHeight >= document.documentElement.scrollHeight - 50) {
        setAtBotoom(true)
    }
    else{
        setAtBotoom(false)
    }
}
  useEffect(()=>{
    
    window.addEventListener("scroll", onScroll)
    return ()=>window.removeEventListener("scroll", onScroll)
  },[])
  return atBottom;
}
