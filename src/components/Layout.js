/**
 * ./src/components/Layout.js
 */

// import components
import Header from "./Header";
import Hierarchy from "./menu/Hierarchy";

// 레이아웃 정의
const Layout = () => {
    return(
        <div>
            <Header />
            <Hierarchy />
        </div>
    )
}

// export this component
export default Layout;