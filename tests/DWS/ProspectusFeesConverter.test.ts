import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar-dws.src';

export async function prospectusFees (
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
            ProspectusFees: {}
        }
    });

    await connector.load();

    Assert.ok(
        connector instanceof MC.InvestmentsConnector,
        'Connector should be instance of InvestmentsConnector class.'
    )

    const expectedProspectusFeesCols = [
        'ProspectusDistributionFee',
        'ProspectusDistributionFeeUnit_Value',
        'ProspectusDistributionFeeUnit_Code',
        'FeesAndExpenseDateCn',
        'PerformanceFeeCharged_Value',
        'PerformanceFeeCharged_Code',
        'ManagementFee',
        'MaxManagementFee',
        'PerformanceFee',
        'ProspectusDate',
        'FeeEffectiveDate',
        'FrontLoadFeeBreakpointUnit',
        'FrontLoadFeeUnit',
        'FrontLoadFeeStarting',
        'ManagementFeeBreakpointUnit',
        'ManagementFeeUnit',
        'ManagementFeeStarting',
        '1stManagementFeeorcacBreakpointM',
        '1stManagementFeeorcacPerc',
        'HighestManagementFeePerc',
        'ProspectusCustodianFeeBreakpointUnit',
        'ProspectusCustodianFeeUnit',
        'ProspectusCustodianFeeStarting',
        'ActualFrontLoadPerc'
    ];


    Assert.deepStrictEqual(
        connector.dataTables.ProspectusFees.getColumnIds(),
        expectedProspectusFeesCols,
        'ProspectusFees table should exist of expected columns.'
    );

    Assert.ok(
        connector.dataTables.ProspectusFees.getRowCount() > 0,
        'ProspectusFees should not return empty rows.'
    );
}
