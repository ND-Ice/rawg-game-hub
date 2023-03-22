const getDeveloperDescription = (description: string | undefined) => {
	const dummyString =
		'<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur ad ab commodi modi quisquam ullam magni quasi animi provident. Eos magni molestiae debitis repellat tempore consectetur, amet ex quod accusamus ea autem cupiditate laudantium repellendus provident quasi dolorum illum rem! Consectetur tenetur dolorem blanditiis odio perspiciatis eaque fugit officiis fuga amet, quam, atque, iste rerum voluptate? Esse, accusantium tempore neque aspernatur non ut doloremque cupiditate dolore tempora ex hic inventore.</p> <p>Natus, atque alias. Tempora minima eius delectus cumque rerum iusto corporis sed! Facere explicabo tempore id voluptatum at! Architecto fugit, nobis tenetur dolore quas voluptates quaerat pariatur itaque facere ipsa, accusamus expedita odit perspiciatis labore doloremque quisquam voluptate eum quos alias modi veritatis. Cum veritatis beatae molestiae culpa expedita.</p>';

	return description || dummyString;
};

export default getDeveloperDescription;
