import axios from 'axios';
import { Http, HttpPostOptions } from '../core/http';

export class HttpAxiosImpl implements Http {
    async post<T>(options: HttpPostOptions): Promise<T> {
        let axiosOptions = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (options.username && options.pat) {
            axiosOptions = Object.assign({}, axiosOptions, {
                auth: {
                    username: options.username,
                    password: options.pat
                }
            });
        }

        const response = await axios.post<T>(options.url, options.data, axiosOptions);
        return Promise.resolve(response.data);
    }
}
