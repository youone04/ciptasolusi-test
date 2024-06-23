const apiKey = import.meta.env.VITE_API_KEY;
export const fetchAPi = async (payload) => {
    try {
        payload.setData(prevState => ({
            ...prevState,
            loading: true
        }));

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${apiKey}`
            }
        };
        const response = await fetch(payload.url, options)
        const data = response.json();
        payload.setData({
            data: await data,
            loading: false
        });
    } catch (error) {
        payload.setData({
            data: {},
            loading: false,
            error: error
        });

    }
}