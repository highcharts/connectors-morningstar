import * as Assert from 'node:assert/strict';
import * as MorningstarConnectors from '../../../code/morningstar-connectors.src';

export function dividend_load(
    access: MorningstarConnectors.Shared.MorningstarAccessOptions
) {
    const connector = new MorningstarConnectors.TimeSeriesConnector({
        api: {
            access
        },
        series: {
            type: 'Dividend'
        }
    });

    Assert.ok(
        connector instanceof MorningstarConnectors.TimeSeriesConnector,
        'TimeSeries connector should be instance of expected class.'
    );

}
