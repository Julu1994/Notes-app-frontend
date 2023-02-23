import React from "react";
import styles from "../styles/NotesDetails.module.scss";
import { formatDate } from "../../../utils/dateFormetar";
import CircularProgress from "@mui/material/CircularProgress";

const NotesDetails = ({ selectedNoteId, notes, loading }) => {
    const selected = notes.filter((item) => item?._id === selectedNoteId);
    return (
        <div className={styles.notes_container}>
            {selected.map((note) => (
                <div className={styles.notes_details_wrapper} key={note?._id}>
                    <div className={styles.notes_title}>
                        <h2>{note?.title}</h2>
                        <p>{formatDate(note?.createdAt)}</p>
                    </div>
                    <p>{note?.description}</p>
                </div>
            ))}
            {selected.length === 0 && (
                <div className={styles.empty_message}>
                    <p>No notes found!</p>
                </div>
            )}
            {loading && (
                <div className={styles.loading_state}>
                    <CircularProgress />
                </div>
            )}
        </div>
    );
};

export default NotesDetails;
