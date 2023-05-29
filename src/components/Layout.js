/**
 * ./src/components/Layout.js
 */

// import components
import Header from "./Header";
import Hierarchy from "./menu/Hierarchy";
import Footer from "./footer.js";

// 레이아웃 정의
const Layout = () => {
    return(
        <div>
            <Header />
            <Hierarchy />
            <Footer/>
        </div>
    )
}

// export this component
export default Layout;