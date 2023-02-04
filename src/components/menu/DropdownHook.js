/**
 * ./src/components/menu/DropdownHook.js
 * 
 * 드롭다운 메뉴 hook
 */

// import
import { useEffect, useState, useRef } from 'react';

const DropdownHook = (initialState) => {
    const [isOpen, setIsOpen] = useState(initialState);
    const ref = useRef(null);
    const removeHandler = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const onClick = (e) => {
          if(ref.current !== null && !ref.current.contains(e.target)) {
            // 드롭다운 메뉴 외의 공간 클릭
            setIsOpen(!isOpen)
          }
        };
    
        if(isOpen) {
          window.addEventListener('click', onClick);
        }
    
        return () => {
          window.removeEventListener('click', onClick);
        };
    }, [isOpen]);

    return [isOpen, ref, removeHandler];
};

export default DropdownHook;