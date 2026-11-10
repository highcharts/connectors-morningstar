import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function investmentsConnectorLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api,
        security: {
            id: '0P00000FIA'
        },
        converters: {
            AssetAllocationBreakdown: {},
            CountryAndRegionExposure: {},
            EquityAggregatesResidualRisk: {},
            EquityResidualRisk: {},
            EquitySectorsBreakdown: {},
            EquityStyleBox: {},
            FixedIncomeSectorsBreakdown: {},
            ProspectusFees: {}
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    );

    await connector.load();
}

export async function investmentsConnectorQueryParams (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.InvestmentsConnector({
        id: '',
        type: '',
        api: { ...api, access: { ...api.access } },
        security: { id: 'AU000000AMP6' },
        queryParams: { idType: 'isin' },
        converters: { EquityAggregatesResidualRisk: {} }
    });

    await connector.load();

    // Without the param the ISIN is not found and the table stays empty
    Assert.ok(
        connector.getTable('EquityAggregatesResidualRisk').getRowCount() > 0,
        'Query params should be applied to the request.'
    );
}
