/**
 * The original field codes from the dataset linked to more user-friendly names
 */
const FIELD_MAP = {
    D953: 'dateReceived',
    D952: 'timeReceived',
    D502: 'tradeTime',
    D3: 'volume',
    D2: 'price',
    D4: 'bid',
    D6: 'ask'
};

/**
 * Parses a date and time string into a timestamp.
 *
 * @param dateStr - A date string in the format 'DD-MM-YYYY'.
 * @param timeStr - A time string in the format 'HH:MM:SS.sss'.
 *
 * @returns A timestamp in milliseconds.
 */
function parseTimestamp (dateStr, timeStr) {
    const [day, month, year] = dateStr.split('-').map(Number),
        [hms, msPart] = timeStr.split('.'),
        [hours, minutes, seconds] = hms.split(':').map(Number),
        ms = msPart ? Number(msPart.padEnd(3, '0').slice(0, 3)) : 0;

    return Date.UTC(year, month - 1, day, hours, minutes, seconds, ms);
}

/**
 * Loads and normalizes the dataset from the provided JSON file.
 *
 * @returns Resolves to an array of normalized trade rows sorted by timestamp
 * ascending.
 */
async function loadDataset () {
    const response = await fetch('demo.json'),
        json = await response.json(),
        rows = json.ts.results[0].data.map((record) => {
            const row = {};
            // Get the user-friendly field names from the FIELD_MAP
            for (const [code, key] of Object.entries(FIELD_MAP)) {
                row[key] = record[code];
            }

            // Parse and normalize the data types
            row.timestamp = parseTimestamp(row.dateReceived, row.timeReceived);
            row.price = Number(row.price);
            row.bid = Number(row.bid);
            row.ask = Number(row.ask);
            row.volume = Number(row.volume);
            row.spread = +(row.ask - row.bid).toFixed(4);

            return row;
        });

    return rows.sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Builds a price series from the given rows.
 *
 * @param rows - An array of normalized trade rows.
 *
 * @returns An object containing arrays for price, bid, ask and volume series.
 */
function buildPriceSeries (rows) {
    return {
        price: rows.map(r => [r.timestamp, r.price]),
        bid: rows.map(r => [r.timestamp, r.bid]),
        ask: rows.map(r => [r.timestamp, r.ask]),
        volume: rows.map(r => [r.timestamp, r.volume])
    };
}

/**
 * Builds a trades table from the given rows.
 *
 * @param rows - An array of normalized trade rows.
 *
 * @returns An object containing the column IDs and data for the trades table.
 */
function buildTradesTable (rows) {
    const descending = [...rows].sort((a, b) => b.timestamp - a.timestamp);
    return {
        columnIds: ['Date', 'Time', 'Price', 'Volume', 'Bid', 'Ask', 'Spread'],
        data: [
            descending.map(r => r.dateReceived),
            descending.map(r => r.tradeTime),
            descending.map(r => r.price),
            descending.map(r => r.volume),
            descending.map(r => r.bid),
            descending.map(r => r.ask),
            descending.map(r => r.spread)
        ]
    };
}

/**
 * Initializes the dashboard by loading the dataset, building the price series
 * and trades table and configuring the dashboard components.
 *
 * @returns A promise that resolves when the dashboard is fully initialized.
 */
async function init () {
    const rows = await loadDataset(),
        series = buildPriceSeries(rows),
        tradesTable = buildTradesTable(rows);

    Dashboards.board('container', {
        dataPool: {
            connectors: [{
                id: 'trades',
                type: 'JSON',
                columnIds: tradesTable.columnIds,
                data: tradesTable.data,
                orientation: 'columns',
                firstRowAsNames: false
            }]
        },
        components: [{
            renderTo: 'dashboard-col-price',
            type: 'Highcharts',
            chartConstructor: 'stockChart',
            title: 'Intraday Price & Quote (Bid/Ask)',
            chartOptions: {
                credits: {
                    enabled: false
                },
                tooltip: {
                    xDateFormat: '%H:%M:%S'
                },
                legend: {
                    enabled: true
                },
                xAxis: {
                    type: 'datetime',
                    ordinal: false
                },
                yAxis: {
                    opposite: false,
                    title: {
                        text: 'Price (USD)'
                    },
                    labels: {
                        format: '${value:.2f}'
                    }
                },
                series: [{
                    name: 'Ask',
                    data: series.ask,
                    color: '#D14C4C'
                }, {
                    type: 'line',
                    name: 'Bid',
                    data: series.bid,
                    color: '#2BB673'
                }, {
                    type: 'line',
                    name: 'Price',
                    data: series.price,
                    color: '#1F4FD6'
                }]
            }
        }, {
            renderTo: 'dashboard-col-volume',
            type: 'Highcharts',
            chartConstructor: 'chart',
            title: 'Trade Volume',
            chartOptions: {
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    xDateFormat: '%H:%M:%S',
                    pointFormat: '<b>{point.y:,.0f}</b> shares'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Shares'
                    }
                },
                series: [{
                    name: 'Volume',
                    type: 'column',
                    data: series.volume,
                    color: '#2BB673'
                }]
            }
        }, {
            renderTo: 'dashboard-col-trades',
            type: 'Grid',
            connector: {
                id: 'trades'
            },
            title: 'Recent Trades',
            gridOptions: {
                columnDefaults: {
                    cells: {
                        format: '${value:,.2f}'
                    }
                },
                columns: [{
                    id: 'Date',
                    cells: {
                        format: '{value:,.2f}'
                    }
                }, {
                    id: 'Time',
                    cells: {
                        format: '{value:,.2f}'
                    }
                }, {
                    id: 'Volume',
                    cells: {
                        format: '{value}'
                    }
                }]
            }
        }]
    });
}

init();
