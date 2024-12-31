import React, {useState} from 'react';
import {NavLink, Outlet} from "react-router-dom";
import axios from "axios";
import styles from '../assets/Layout.module.scss';
import Header from "../components/Header";


const Layout: React.FC = () => {


    return (
        <div className={styles.Layout}>
            <Header />
            <main className={styles.main}>
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;
