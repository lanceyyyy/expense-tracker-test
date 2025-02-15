import { useLayoutEffect, useState } from "react";

export default function useWidthSize() {
  // State to store the current window width
  const [width, setWidth] = useState(0);

  // Function to update the width state
  function handleWidthChange() {
    setWidth(window.innerWidth);
  }

  useLayoutEffect(() => {
    handleWidthChange(); // Set initial width on mount

    // Listen for window resize and update width
    window.addEventListener("resize", handleWidthChange);

    // Cleanup function to remove event listener when the component unmounts
    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

  return width; // Return the current window width
}
