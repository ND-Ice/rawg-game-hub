import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
} from 'axios';

const client: AxiosInstance = axios.create({
	baseURL: 'https://api.rawg.io/api',
});

client.interceptors.request.use(
	(config: AxiosRequestConfig & InternalAxiosRequestConfig) => {
		const key: string | undefined = process.env.NEXT_PUBLIC_RAWG_API_KEY;

		if (key) config.params = { ...config.params, key };
		return config;
	}
);

export default client;
