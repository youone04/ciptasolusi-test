import { useRef, useEffect } from "react";

export default function Menu({ children }) {
    const menuRef = useRef(null);
    // const menuBannerRef = useRef(null);
    let lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            console.log(scrollTop);

            if (scrollTop <= 0) {
                // User scrolls up
                if (menuRef.current) {
                    menuRef.current.style.display = 'none';
                }
                // if (menuBannerRef.current) {
                //     menuBannerRef.current.style.display = 'block';
                // }
            } else {
                // User scrolls down
                if (menuRef.current) {
                    menuRef.current.style.display = 'block';
                }
                // if (menuBannerRef.current) {
                //     menuBannerRef.current.style.display = 'none';
                // }
            }

            lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <div className="menu" id="menu" ref={menuRef}>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </div>
            {children}
        </>
    )
}