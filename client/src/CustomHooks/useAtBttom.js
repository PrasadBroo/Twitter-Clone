import {
  useEffect,
  useState
} from 'react';

export default function useAtBttom() {
  const [atBottom, setAtBotoom] = useState(false);

  
  useEffect(() => {
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         console.log("you're at the bottom of the page");
         setAtBotoom(true)
         // Show loading spinner and make fetch request to api
      }
   });
  }, [])
  return atBottom;
}
// useless hook :( but i will keep it anyway :)