import React, { useContext } from "react";
import styles from "./styles/Navbar.module.scss";
import Button from "../common/Button/Button";
import Icons from "../common/Icons/Icons";
import { Context } from "../../store/Context";
import { logout } from "../../store/Action";

const Navbar = ({ onShowNotesList, showNotesList }) => {
    const { dispatch } = useContext(Context);
    return (
        <nav className={styles.nav}>
            <div className={styles.arrow_btn}>
                <button onClick={onShowNotesList}>
                    <Icons
                        name={showNotesList ? "arrowBack" : "forwardArrow"}
                        color={"#FFF"}
                    />
                </button>
            </div>
            <div className={styles.nav_title}>
                <Icons name={"notesIcon"} color={"#FFF"} />
                <h2>Notes Keeper</h2>
            </div>
            <div className={styles.nav_avatar_wrapper}>
                <Button
                    onClick={() => {
                        dispatch(logout());
                    }}>
                    Logout
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
