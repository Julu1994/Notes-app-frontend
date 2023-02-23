import React from "react";
import Icons from "../components/common/Icons/Icons";
import styles from "./styles/AuthPageLayout.module.scss";
import LinearProgress from "@mui/material/LinearProgress";

const AuthPageLayout = ({ children, pageTitle, loading }) => {
    return (
        <section className={styles.auth_section}>
            <div className={styles.auth_section_header}>
                <h2>
                    <Icons name={"notesIcon"} />
                    Note Keeper
                </h2>
            </div>
            <div className={styles.auth_section_form_wrapper}>
                <div className={styles.form_with_title}>
                    {loading && (
                        <div className={styles.loading_line}>
                            <LinearProgress
                                sx={{ borderRadius: "4px 4px 0 0" }}
                                color="secondary"
                            />
                        </div>
                    )}
                    <div className={styles.auth_section_title}>
                        <h1>{pageTitle}</h1>
                    </div>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default AuthPageLayout;
