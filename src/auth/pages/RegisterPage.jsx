import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from '../../hooks';
import { startCreatingUserWithEmailAndPassword } from '../../store/auth/thunks';
import { AuthLayout } from '../layout/AuthLayout';

const formData = { email: 'test@test.com', password: '123456', displayName: 'Test User' };

const formValidations = {
	email: [(val) => val.includes('@'), 'Email is invalid'],
	password: [(val) => val.length >= 6, 'Password must be at least 6 characters'],
	displayName: [(val) => val.length >= 1, 'Display name must be at least 1 characters'],
};

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const [formSubmited, setFormSubmitted] = useState(false);
	const { status, errorMessage } = useSelector((state) => state.auth);
	const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

	const {
		formState,
		displayName,
		email,
		password,
		onInputChange,
		isFormValid,
		displayNameValid,
		emailValid,
		passwordValid,
	} = useForm(formData, formValidations);

	const onSubmit = (e) => {
		e.preventDefault();

		setFormSubmitted(true);

		if (!isFormValid) return;

		dispatch(startCreatingUserWithEmailAndPassword(formState));
	};

	return (
		<AuthLayout title='Register'>
			<form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							type='text'
							placeholder='John Doe'
							label='Name'
							fullWidth
							name='displayName'
							value={displayName}
							onChange={onInputChange}
							error={!!displayNameValid && formSubmited}
							helperText={displayNameValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							type='email'
							placeholder='example@email.com'
							label='Email'
							fullWidth
							name='email'
							value={email}
							onChange={onInputChange}
							error={!!emailValid && formSubmited}
							helperText={emailValid}
						/>
					</Grid>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							type='password'
							placeholder='********'
							label='Password'
							fullWidth
							name='password'
							value={password}
							onChange={onInputChange}
							error={!!passwordValid && formSubmited}
							helperText={passwordValid}
						/>
					</Grid>
					<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
						<Alert severity='error'>{errorMessage}</Alert>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant='contained'
							fullWidth
							type='submit'
							disabled={isCheckingAuthentication}
						>
							Register
						</Button>
					</Grid>
					<Grid container direction='row' justifyContent='end' sx={{ mt: 2 }}>
						<Typography sx={{ mr: 1 }}>Already have an account?</Typography>
						<Link color='inherit' to='/auth/login' component={RouterLink}>
							Sign in
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
