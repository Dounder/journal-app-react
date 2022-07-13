import 'sweetalert2/dist/sweetalert2.css';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import { useForm } from '../../hooks/useForm';
import {
	setActiveNote,
	startDeletingNote,
	startSaveNote,
	startUploadingFiles,
} from '../../store/journal';
import { ImageGallery } from '../components';

export const NoteView = () => {
	const dispatch = useDispatch();
	const { active: note, savedMessage, isSaving } = useSelector((state) => state.journal);
	const { title, body, date, onInputChange, formState } = useForm(note);

	const dateString = useMemo(() => new Date(date).toUTCString(), [date]);

	const fileInputRef = useRef();

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	useEffect(() => {
		if (savedMessage.length > 0) Swal.fire('Entry saved', savedMessage, 'success');
	}, [savedMessage]);

	const onSaveNote = () => dispatch(startSaveNote());

	const onFileInputChange = ({ target }) => {
		if (target.files.length === 0) return;

		dispatch(startUploadingFiles(target.files));
	};

	const onDelete = () => dispatch(startDeletingNote());

	return (
		<Grid
			container
			direction='row'
			justifyContent='space-between'
			alignItems='center'
			sx={{ mb: 1 }}
			className='animate__animated animate__fadeIn animate__faster'
		>
			<Grid item>
				<Typography fontSize={39} fontWeight='light'>
					{dateString}
				</Typography>
			</Grid>

			<Grid item>
				<input
					type='file'
					multiple
					onChange={onFileInputChange}
					style={{ display: 'none' }}
					ref={fileInputRef}
				/>

				<IconButton
					color='primary'
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadOutlined />
				</IconButton>

				<Button
					color='primary'
					sx={{ padding: 2 }}
					onClick={onSaveNote}
					disabled={isSaving}
				>
					<SaveOutlined sx={{ mr: 1, fontSize: 39 }} />
					Guardar
				</Button>
			</Grid>

			<Grid container>
				<TextField
					type='text'
					variant='filled'
					fullWidth
					placeholder='Title of journal...'
					label='Title'
					sx={{ border: 'none', mb: 1 }}
					name='title'
					value={title}
					onChange={onInputChange}
				/>
				<TextField
					type='text'
					variant='filled'
					fullWidth
					multiline
					placeholder='What happened today...'
					minRows={5}
					sx={{ border: 'none', mb: 1 }}
					name='body'
					value={body}
					onChange={onInputChange}
				/>
			</Grid>

			<Grid container justifyContent='end'>
				<Button onClick={onDelete} color='error' sx={{ mt: 2 }}>
					<DeleteOutline />
				</Button>
			</Grid>

			<ImageGallery images={note.imageUrls} />
		</Grid>
	);
};
