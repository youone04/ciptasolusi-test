import CardReview from "@/components/CardReview";
import NavbarMod from "@/components/NavbarMod";
import { useLocation } from "react-router-dom";

export default function ReviewPage() {
    const location = useLocation();
    const { state } = location;

    return (
        <>
            <NavbarMod />
            <CardReview state={state} />
        </>
    )
}