import { useEffect } from "react";

function ScrollDetector(props) {

  const { handleScrollUp, handleScrollDown } = props;

  useEffect(() => {
    let timerId;
    const handleScroll = (event) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (event.deltaY > 0) {
          handleScrollDown();
        } else {
          handleScrollUp();
        }
      }, 100);
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return <></>;
}

export default ScrollDetector;