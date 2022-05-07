import {
  useEffect,
  useState
} from 'react';

export default function useAtBttom() {
  const [atBottom, setAtBotoom] = useState(false);
  function isContentScrolledToBottom(element) {
    const rest = element.scrollHeight - element.scrollTop;
    return Math.abs(element.clientHeight - rest) < 1;
}
  const handelScroll = () => {
    if (isContentScrolledToBottom(window)) {
      setAtBotoom(true)
  } else {
      setAtBotoom(false)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handelScroll);

    return ()=>window.removeEventListener('scroll',handelScroll)
  }, [])
  return atBottom;
}