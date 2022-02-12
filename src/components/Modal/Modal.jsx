import React, { useEffect, useRef } from "react";
// aby skorzystać z portali, żeby wyrenderować komponent w innym miejscu. Tworzymy drugi komponent poza App i tam ładujemy modale
import ReactDOM from "react-dom";
import bemCssModules from "bem-css-modules";

import { default as ModalStyles } from "./Modal.module.scss";

const block = bemCssModules(ModalStyles);

const Modal = ({
  children,
  handleOnClose,
  isOpen,
  shouldBeClosedOnOutsideClick,
}) => {
  const modalRef = useRef(null);
  const previusActiveElement = useRef(null);

  useEffect(()=>{
    if(!modalRef.current){
      return;
    }
    const {current: modal} = modalRef;
    if(isOpen){
      previusActiveElement.current = document.activeElement;
      modal.showModal();
    } else if (previusActiveElement.current) {
      modal.close();
      previusActiveElement.current.focus();
    }
  },[isOpen])

  useEffect(()=>{
    const {current: modal} = modalRef;
    const handleCancel = e=>{
      e.preventDefault();
      handleOnClose();
    }
    modal.addEventListener('cancel', handleCancel);
    return ()=> {
      modal.removeEventListener('cancel', handleCancel)
    }
  },[handleOnClose])

  const handleOutsideClick = ({target}) =>{
    const {current} = modalRef;
    if(shouldBeClosedOnOutsideClick && target===current){
      handleOnClose();
    }

  }

  return ReactDOM.createPortal((
      <dialog ref={modalRef} className={block()} onClick={handleOutsideClick}>
        {children}
      </dialog>
    ), document.body);
};
export default Modal;
