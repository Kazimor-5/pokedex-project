// ! FILES
import { FaChevronUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ButtonUp = () => {
  const [showButton, setShowButton] = useState(false);

  const isShowed = () => {
    if (
      document.body.scrollTop > 1000 ||
      document.documentElement.scrollTop > 1000
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', isShowed);
    return () => {
      window.removeEventListener('scroll', isShowed);
    };
  });

  const scrollToUp = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  return (
    <>
      {showButton ? (
        <button className='btn-up' onClick={() => scrollToUp()}>
          <FaChevronUp />
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default ButtonUp;
