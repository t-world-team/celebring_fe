import React from 'react';

import { Outlet } from 'react-router-dom';
import Menu from "../components/Menu";

const Layout = (props) => {
    return (
        <React.Fragment>
            <header>
                <div className="header-wrap">
                    <Menu/>
                </div>
            </header>
            <div className="main">
                <main>
                    <Outlet/>
                </main>
                <footer>
                <div>
                    <p>celebring</p>
                    <p>©2023</p>
                </div>
                </footer>
            </div>
        </React.Fragment>
    )
}

export default Layout;