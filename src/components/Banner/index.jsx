import { useRef, useEffect } from "react";

export default function Banner() {
    // const menuRef = useRef(null);
    const menuBannerRef = useRef(null);
    let lastScrollTop = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop <= 0) {
                // User scrolls up
                // if (menuRef.current) {
                //     menuRef.current.style.display = 'none';
                // }
                if (menuBannerRef.current) {
                    menuBannerRef.current.style.display = 'block';
                }
            } else {
                // User scrolls down
                // if (menuRef.current) {
                //     menuRef.current.style.display = 'block';
                // }
                if (menuBannerRef.current) {
                    menuBannerRef.current.style.display = 'none';
                }
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
        <div class="banner">
            <div class="overlay"></div>

            <div class="menu-banner" id="menu-banner" ref={menuBannerRef}>
                <nav>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
            </div>

            <div class="text">
                <h1>Welcome to Our Website</h1>
                <p>Enjoy your stay!</p>
            </div>
            <div id="video-background">
                <iframe
                    src="https://www.youtube.com/embed/9sNQFJAb3Ss?autoplay=1&mute=1&controls=0&loop=1&playlist=9sNQFJAb3Ss"
                    frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
        </div>
    )
}