import React from "react";
import { Button } from "@mui/material";
import Icons from "../../../components/common/Icons/Icons";
import styles from "../styles/NotesList.module.scss";
import { formatDate } from "../../../utils/dateFormetar";
import { useHttpHook } from "../../../hooks/useHttpHook";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const NotesList = ({
    onShowAddNewList,
    setShowNotesList,
    notes,
    isLoading,
    setUpdateUI,
    editHandler,
    setAddNewNoteState,
    setSelectedNoteId,
}) => {
    const getResponseData = (data) => {
        if (data) {
            toast.success("Note Deleted");
        }
    };
    const { sendRequest, loading, error } = useHttpHook();

    const deleteNoteHandler = (id) => {
        sendRequest(
            { url: `/note/delete/${id}`, method: "DELETE" },
            getResponseData
        );
        setUpdateUI(true);
        setAddNewNoteState(false);
    };

    return (
        <div
            className={
                loading
                    ? `${styles.notes_list_wrapper} ${styles.add_opacity}`
                    : `${styles.notes_list_wrapper}`
            }
            onClick={(e) => {
                e.stopPropagation();
            }}>
            <div>
                <Button
                    variant="contained"
                    sx={{ width: "100%" }}
                    onClick={onShowAddNewList}>
                    Add New Notes
                </Button>
            </div>
            {error && (
                <div className={styles.error_text}>Something went Wrong!</div>
            )}
            {notes && notes.length
                ? notes.map((note) => (
                      <div
                          className={styles.note}
                          onClick={() => {
                              setSelectedNoteId(note?._id);
                              setShowNotesList(
                                  window.innerWidth > 768 ? true : false
                              );
                          }}
                          key={note?._id}>
                          <div className={styles.note_actions}>
                              <button
                                  className={styles.btn_delete}
                                  onClick={(e) => {
                                      deleteNoteHandler(note?._id);
                                  }}>
                                  <Icons
                                      name={"delete"}
                                      size={"1.2rem"}
                                      color={"#cc2121"}
                                  />
                              </button>
                              <button
                                  className={styles.btn_edit}
                                  onClick={() => {
                                      editHandler(note);
                                  }}>
                                  <Icons
                                      name={"edit"}
                                      size={"1.2rem"}
                                      color={"#4527a0"}
                                  />
                              </button>
                          </div>
                          <div className={styles.note_details}>
                              <h2>{note?.title}</h2>
                              <p>{note?.description}</p>
                          </div>
                          <p>{formatDate(note?.createdAt)}</p>
                      </div>
                  ))
                : null}
            {loading || isLoading ? (
                <div className={styles.loading_state}>
                    <CircularProgress />
                </div>
            ) : null}
        </div>
    );
};

export default NotesList;
