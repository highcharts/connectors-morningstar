/* eslint-disable no-console */
// Wait for postman json file input 
const handleSelectEnvironment = async (evt) => {
    const target = evt.target;
    const postmanJSON = await getPostmanJSON(target);

    target.parentNode.style.display = 'none';

    displayChart(postmanJSON);
}


document.getElementById('postman-json')
    .addEventListener('change', handleSelectEnvironment);


const getPostmanJSON = async (htmlInputFile) => {
    let file,
        fileJSON;

    for (file of htmlInputFile.files) {
        try {
            fileJSON = JSON.parse(await file.text());
        } catch (error) {
            console.log(error);
        }
    }

    return fileJSON
}


// Find credentials from values array
const getValueOf = (key, values) => {
    for (const value of values) {
        if (value.enabled &&
            value.key === key) {
            return value.value;
        }
    }
    return void 0;
}


const decode = ({ username, password }) => {
    return btoa(`${username}:${password}`);
};


const getToken = async (url, payload) => {
    const response = await fetch(url, payload);
    const responseJSON = await response.json();
    if (response.status === 200) { 
        const token = responseJSON.access_token;
        return token;
    }
}


const displayChart = async (postmanJSON) => {
    // Get the relevant values
    const credentials = {
        username: getValueOf(
            'Morningstar as a Service Username',
            postmanJSON.values
        ),
        password: getValueOf(
            'Morningstar as a Service Password',
            postmanJSON.values
        ) },
        version = '0.7.0',
        authURL = 'https://www.emea-api.morningstar.com/token/oauth',
        // eslint-disable-next-line max-len
        msURL = 'https://www.emea-api.morningstar.com/ecint/v1/timeseries/price?id=US0378331005&idType=ISIN&currencyId=EUR&endDate=2020-12-31&startDate=2020-01-01&outputType=json'
    let resJson;
    try {
        // Prepare token request
        const tokenReqPayload = {
            cache: 'no-cache',
            credentials: 'omit',
            headers: new Headers({
                Authorization: `Basic ${decode({ ...credentials })}`,
                'User-Agent': `HighchartsConnectorsMorningstar/${version}`
            }),
            method: 'POST',
            redirect: 'error'
        };

        // Attempt to get the token
        const token = await getToken(authURL, tokenReqPayload);
        delete credentials.username;
        delete credentials.password;

        if (!token) {
            throw new Error('Failed to retrieve token.');
        }

        // Prepare GET request with token
        const morningstarReqPayload = {
            ...tokenReqPayload, // Copy shared props
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
            method: 'GET'
        };

        // Attempt to fetch the data
        const res = await fetch(msURL, morningstarReqPayload);

        if (!res.ok) {
            throw new Error(`Fetch failed with status: ${res.status}`);
        }

        resJson = await res.json();

    } catch (error) {
        console.log(error);
    }

    // Transform to Highcharts format
    const transformedData = resJson.TimeSeries.Security[0]
        .HistoryDetail.map(
            item => [new Date(item.EndDate).getTime(), Number(item.Value)]
        );

    // Finally display the fetched data
    Highcharts.stockChart('container', {
        title: {
            text: 'Manually fetched data'
        },
        xAxis: {
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'EUR'
            }
        },
        series: [{
            name: 'Sample Data',
            data: transformedData
        }]
    });
};
