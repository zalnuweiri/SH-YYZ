// src/components/MenuCarousel.jsx
import { useState, useRef } from "react";
import { menuData } from "../data/MenuData"; // adjust if needed
import { createPortal } from "react-dom";

function MenuCarousel() {
    const itemsPerPage = 3;
    const menuItems = menuData.carousel.slice(0, 15);

    const totalPages = Math.ceil(menuItems.length / itemsPerPage);
    const [page, setPage] = useState(0);

    const startIndex = page * itemsPerPage;
    const currentItems = menuItems.slice(startIndex, startIndex + itemsPerPage);

    const mobileCarouselRef = useRef(null);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleDotClick = (i) => {
        setPage(i);
        if (mobileCarouselRef.current) {
            const cardWidth = mobileCarouselRef.current.querySelector(".card")?.offsetWidth || 0;
            const scrollPosition = i * cardWidth * 2;
            mobileCarouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
        }
    };

    const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
    const prevPage = () => setPage((prev) => (prev - 1 + totalPages) % totalPages);

    return (
        <>
            {/* ---------- MOBILE: horizontal scroll ---------- */}
            <div className="md:hidden mt-8">
                <div
                    ref={mobileCarouselRef}
                    className="carousel flex overflow-x-auto gap-3 snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                    {menuItems.map((item, idx) => (
                        <div key={item.id ?? idx} className="card snap-start">
                            <div className="imgbox overflow-hidden">
                                <img
                                    src={item.image || "/placeholder.jpg"}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedImage(item);
                                    }}
                                />
                            </div>
                            <h3 className="font-body mt-2 text-sm uppercase tracking-[0.22em] text-sh-cream">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="dots mt-6 flex justify-center space-x-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={`w-3 h-3 rounded-full ${i === page ? "bg-sh-pink" : "bg-sh-grey-700"}`}
                        />
                    ))}
                </div>
            </div>

            {/* ---------- DESKTOP/TABLET ---------- */}
            <div className="hidden md:block">
                <div className="mt-12 flex flex-col md:flex-row md:items-start gap-6 justify-center">
                    {currentItems.map((item, idx) => {
                        const widths = [
                            "md:flex-[0_0_26.9%] md:max-w-[26.9%]",
                            "md:flex-[0_0_46.3%] md:max-w-[46.3%]",
                            "md:flex-[0_0_26.9%] md:max-w-[26.9%]",
                        ];
                        const objectPos = ["object-[50%_50%]", "object-[50%_40%]", "object-[50%_50%]"];

                        const isLeftmost = idx === 0;
                        const isMiddle = idx === 1;
                        const isRightmost = idx === currentItems.length - 1;

                        const handleClick = () => {
                            if (isLeftmost) prevPage();
                            if (isRightmost || isMiddle) nextPage();
                        };

                        return (
                            <div
                                key={item.id ?? idx}
                                className={`${widths[idx]} w-full cursor-pointer`}
                                onClick={handleClick}
                            >
                                <div className="h-[371px] overflow-hidden">
                                    <img
                                        src={item.image || "/placeholder.jpg"}
                                        alt={item.name}
                                        className={`w-full h-full object-cover ${objectPos[idx]} 
                                            ${(isLeftmost || isRightmost || isMiddle) ? "hover:opacity-90 transition-opacity" : ""}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedImage(item);
                                        }}
                                    />
                                </div>
                                <p className="font-body mt-2 text-sm uppercase tracking-[0.22em] text-sh-cream">
                                    {item.name}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Pagination dots */}
                <div className="dots mt-6 flex justify-left space-x-2 -translate-x-[2.2%]">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`w-3 h-3 rounded-full ${i === page ? "bg-sh-pink" : "bg-sh-grey-700"}`}
                        />
                    ))}
                </div>
            </div>
            {selectedImage &&
                createPortal(
                    <div
                        className="fixed inset-0 bg-black/80 flex items-start justify-center z-[9999] pt-[3.5%]"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-5 right-6 text-white text-3xl z-[10000]"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>

                        <div
                            className="relative flex items-center justify-center bg-black/90 p-4 rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.name}
                                className="max-w-[90vw] max-h-[85vh] object-contain rounded-md"
                            />
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
}

export default MenuCarousel;
