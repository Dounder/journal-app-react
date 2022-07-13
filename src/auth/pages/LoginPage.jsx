import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from '../../hooks/';
import {
	checkingAuthentication,
	startGoogleLogin,
	startLoginUserWithEmailAndPassword,
} from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
	email: 'test@test.com',
	password: '123456',
};

export const LoginPage = () => {
	const { status, errorMessage } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const { email, password, onInputChange } = useForm(formData);

	const isAuthenticated = useMemo(() => status === 'checking', [status]);

	const onSubmit = (e) => {
		e.preventDefault();

		dispatch(startLoginUserWithEmailAndPassword({ email, password }));
	};

	const onGoogleLogin = () => {
		console.log('Google login');
		dispatch(startGoogleLogin());
	};

	return (
		<AuthLayout title='Login'>
			<form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
				<Grid container spacing={2}>
					<Grid item xs={12} sx={{ mt: 2 }}>
						<TextField
							type='email'
							placeholder='example@email.com'
							label='Email'
							fullWidth
							name='email'
							value={email}
							onChange={onInputChange}
							disabled={isAuthenticated}
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
							disabled={isAuthenticated}
						/>
					</Grid>
					<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
						<Alert severity='error'>{errorMessage}</Alert>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant='contained'
							fullWidth
							type='submit'
							disabled={isAuthenticated}
						>
							Login
						</Button>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Button
							variant='contained'
							fullWidth
							onClick={onGoogleLogin}
							disabled={isAuthenticated}
						>
							<Google />
							<Typography sx={{ ml: 1 }}>Google</Typography>
						</Button>
					</Grid>
					<Grid container direction='row' justifyContent='end' sx={{ mt: 1 }}>
						<Link color='inherit' to='/auth/register' component={RouterLink}>
							Create account
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
