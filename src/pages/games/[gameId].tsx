import { useRouter } from 'next/router';

const GameDetails = () => {
	const router = useRouter();
	const { gameId } = router.query;

	return <div>{gameId}</div>;
};

export default GameDetails;
