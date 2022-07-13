export const fileUpload = async (file) => {
	if (!file) throw new Error('No file provided');

	const cloudUrl = ' https://api.cloudinary.com/v1_1/dj6nxwrae/upload';

	const formData = new FormData();
	formData.append('upload_preset', 'react-journal');
	formData.append('file', file);

	try {
		const resp = await fetch(cloudUrl, { method: 'POST', body: formData });

		if (!resp.ok) throw new Error('Something went wrong');

		const cluodResp = await resp.json();

		return cluodResp.secure_url;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
