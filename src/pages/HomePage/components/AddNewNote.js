import { TextField } from "@mui/material";
import React, { useState } from "react";
import Icons from "../../../components/common/Icons/Icons";
import styles from "../styles/AddnewNote.module.scss";
import { useHttpHook } from "../../../hooks/useHttpHook";
import toast from "react-hot-toast";
import Button from "../../../components/common/Button/Button";
import CircularProgress from "@mui/material/CircularProgress";

//Default input value
const defaultNotesValue = {
    title: "",
    description: "",
};
const AddNewNote = ({ setAddNewNoteState, setUpdateUI, editNote }) => {
    const [notes, setNotes] = useState(
        editNote
            ? {
                  title: editNote?.title,
                  description: editNote?.description,
              }
            : defaultNotesValue
    );

    const { title, description } = notes;
    //Hide add notes section
    const hideNotesHandler = () => {
        setAddNewNoteState(false);
    };

    // Get response data from server
    const getResponseData = (data) => {
        if (data) {
            toast.success(`New Note Added`);
            setNotes({ title: "", description: "" });
        }
    };

    const { sendRequest, loading, error, setError } = useHttpHook();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setNotes({ ...notes, [name]: value });
        if (e.target.value !== "") {
            setError(null);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (description === "") {
            return setError("Description are Required");
        }
        sendRequest(
            {
                method: editNote?.id ? "PUT" : "POST",
                url: editNote?.id
                    ? `/note/edit/${editNote?.id}`
                    : "/create/new/notes",
                postData: {
                    title,
                    description,
                },
            },
            getResponseData
        );
        setUpdateUI(true);
        setAddNewNoteState(false);
        setNotes({
            title: "",
            description: "",
        });
    };

    return (
        <div className={styles.add_new_notes_wrapper}>
            {loading && (
                <div className={styles.loading_state}>
                    <CircularProgress />
                </div>
            )}
            <div className={styles.calcel_btn}>
                <button onClick={hideNotesHandler}>
                    <Icons name={"cancel"} color={"#cc2121"} />
                </button>
            </div>
            <div className={styles.form_wrapper}>
                <h2>Create New Note</h2>
                <form
                    className={
                        loading
                            ? `${styles.opacity_blur} ${styles.notes_form}`
                            : `${styles.notes_form}`
                    }
                    onSubmit={submitHandler}>
                    <TextField
                        required={true}
                        error={error ? true : false}
                        name={"title"}
                        label={"Note Title"}
                        onChange={onChangeHandler}
                        value={title}
                    />
                    <textarea
                        className={error && `${styles.errorTextarea}`}
                        onChange={onChangeHandler}
                        name={"description"}
                        value={description}
                        cols="120"
                        rows="6"
                        placeholder="Note Descrpition"
                    />
                    {error && <p className={styles.error_message}>{error}</p>}
                    <Button type={"submit"}>Save</Button>
                </form>
            </div>
        </div>
    );
};

export default AddNewNote;
