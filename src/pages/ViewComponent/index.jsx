import Banner from "@/components/Banner";
import Content from "@/components/Content";
import Menu from "@/components/Menu";

export default function ViewComponent() {
    return (
       <>
        <Menu>
            <Banner />
        </Menu>
        <Content/>
       </>
    )
}