const getRatingColor = (rating?: number) => {
	switch (rating) {
		case 3:
			return 'yellow';
		case 4:
		case 5:
			return 'green';
		default:
			return 'red';
	}
};

export default getRatingColor;
