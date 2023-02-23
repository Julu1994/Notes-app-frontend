import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NotesList from "./components/NotesList";
import styles from "./styles/HomePage.module.scss";
import AddNewNote from "./components/AddNewNote";
import NotesDetails from "./components/NotesDetails";
import { useHttpHook } from "../../hooks/useHttpHook";

const HomePage = () => {
    const [showNotesList, setShowNotesList] = useState(
        window.innerWidth > 768 ? true : false
    );
    const [updateUI, setUpdateUI] = useState(false);
    const [notes, setNotes] = useState([]);
    const [selectedNoteId, setSelectedNoteId] = useState([]);
    const [addNewNoteState, setAddNewNoteState] = useState(false);
    const [editNote, setEditNote] = useState({
        title: "",
        description: "",
        id: "",
    });

    //Toggle note list it will trigger for for small scrrens, user can hide and unhide note list .
    const toggleNoteListHandler = () => {
        setShowNotesList(!showNotesList);
    };

    //this handler will trigger if user click on add new notes and new notes section will open
    const showAddNewListHandler = () => {
        setAddNewNoteState(true);
        setShowNotesList(window.innerWidth > 768 ? true : false);
    };

    //Handele window resize
    useEffect(() => {
        const handleResize = () =>
            setShowNotesList(window.innerWidth > 768 ? true : false);
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [showNotesList]);

    //Get responce data from server
    const getAllNotes = (data) => {
        setNotes(data);
        //Get first note id so that when app load it will render first note.
        const [initialNoteId] = data.slice(0, 1);
        setSelectedNoteId(initialNoteId?._id);
    };
    const { sendRequest, loading, error } = useHttpHook();

    //Send request to server
    useEffect(() => {
        sendRequest({ url: "/notes/all" }, getAllNotes);
        setUpdateUI(false);
    }, [updateUI, sendRequest]);

    //Edit notes handler
    const editHandler = (note) => {
        setEditNote({
            title: note?.title,
            description: note?.description,
            id: note?._id,
        });
        setAddNewNoteState(true);
        setShowNotesList(window.innerWidth > 768 ? true : false);
    };

    return (
        <>
            <header className={styles.header_wrapper}>
                <Navbar
                    onShowNotesList={toggleNoteListHandler}
                    showNotesList={showNotesList}
                />
            </header>
            <main className={styles.main_section}>
                {showNotesList && (
                    <section
                        className={styles.notes_list_wrapper}
                        onClick={toggleNoteListHandler}>
                        <NotesList
                            onShowAddNewList={showAddNewListHandler}
                            setUpdateUI={setUpdateUI}
                            notes={notes}
                            editHandler={editHandler}
                            setSelectedNoteId={setSelectedNoteId}
                            setAddNewNoteState={setAddNewNoteState}
                            isLoading={loading}
                            error={error}
                            setShowNotesList={setShowNotesList}
                        />
                    </section>
                )}
                <section className={styles.notes_details_main_wrapper}>
                    {addNewNoteState ? (
                        <AddNewNote
                            setAddNewNoteState={setAddNewNoteState}
                            setUpdateUI={setUpdateUI}
                            editNote={editNote}
                            loading={loading}
                            error={error}
                        />
                    ) : (
                        <NotesDetails
                            notes={notes}
                            loading={loading}
                            selectedNoteId={selectedNoteId}
                        />
                    )}
                </section>
            </main>
        </>
    );
};

export default HomePage;
