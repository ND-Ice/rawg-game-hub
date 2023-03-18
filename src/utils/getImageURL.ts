import imagePlaceholder from '@/assets/images/image-placeholder.webp';

const getImageURL = (imageURL: string | undefined) => {
	if (!imageURL) return imagePlaceholder;
	return imageURL;
};

export default getImageURL;
