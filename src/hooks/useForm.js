import { useEffect, useMemo, useState } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {
	const [formState, setFormState] = useState(initialForm);
	const [formValidation, setFormValidation] = useState({});

	useEffect(() => {
		createValidators();
	}, [formState]);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	const createValidators = () => {
		const formCheckValues = {};

		for (const formField of Object.keys(formValidations)) {
			const [fn, message] = formValidations[formField];

			formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : message;
		}

		setFormValidation(formCheckValues);
	};

	const isFormValid = useMemo(
		() => Object.values(formValidation).every((value) => value === null),
		[formValidation]
	);

	return {
		...formState,
		formState,
		onInputChange,
		onResetForm,

		...formValidation,
		isFormValid,
	};
};
