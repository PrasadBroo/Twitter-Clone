import  {
    useEffect,
    useState,
    useRef
} from 'react'

export default function useComponentVisible(initialIsVisible) {
    const [isVisible, setIsVisible] = useState(initialIsVisible)
    const ref = useRef(null);

    // below is the same as componentDidMount and componentDidUnmount
    useEffect(() => {
        document.addEventListener("click", handleClickOutside, false);
        return () => {
            document.removeEventListener("click", handleClickOutside, false);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setIsVisible(false);
        }
    };

    return {
        ref,
        setIsVisible,
        isVisible
    }
}