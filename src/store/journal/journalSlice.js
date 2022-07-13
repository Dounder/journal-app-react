import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		savedMessage: '',
		notes: [],
		active: null,
	},
	reducers: {
		savingNewNote: (state) => {
			state.isSaving = true;
		},
		addNewEmptynote: (state, { payload }) => {
			state.notes.push(payload);
			state.isSaving = false;
		},
		setActiveNote: (state, { payload }) => {
			state.active = payload;
			state.savedMessage = '';
		},
		setNotes: (state, { payload }) => {
			state.notes = payload;
		},
		setSaving: (state) => {
			state.isSaving = true;
			state.savedMessage = '';
		},
		updateNote: (state, { payload }) => {
			state.notes = state.notes.map((note) => (note.id === payload.id ? payload : note));
			state.isSaving = false;
			state.savedMessage = `Saved ${payload.title}`;
		},
		deleteNote: (state, { payload }) => {
			state.active = null;
			state.notes = state.notes.filter((note) => note.id !== payload);
		},
		setPhotosToActiveNote: (state, { payload }) => {
			state.active.imageUrls = [...state.active.imageUrls, ...payload];
			state.isSaving = false;
		},
		clearNotes: (state) => {
			state.isSaving = false;
			state.savedMessage = '';
			state.notes = [];
			state.active = null;
		},
	},
});

export const {
	addNewEmptynote,
	clearNotes,
	deleteNote,
	savingNewNote,
	setActiveNote,
	setNotes,
	setPhotosToActiveNote,
	setSaving,
	updateNote,
} = journalSlice.actions;
