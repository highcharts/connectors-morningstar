import * as Assert from 'node:assert/strict';
import '@highcharts/dashboards/es-modules/masters/dashboards.src';
import * as MC from '../../code/connectors-morningstar.src';
import InvestmentScreenerJSON from
'../../code/es-modules/Screeners/InvestmentScreener/InvestmentScreenerJSON';

export async function investmentScreenerLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const secIds = [
        'secId',
        'name',
        'investmentType',
        'holdingTypeId',
        'universe',
        'tenforeId',
        'closePrice',
        'ongoingCharge',
        'initialPurchase',
        'maxFrontEndLoad'
    ];
    const connector = new MC.InvestmentScreenerConnector({
        id: '',
        type: '',
        api,
        page: 1,
        pageSize: 20,
        currencyId: 'USD',
        securityDataPoints: secIds,
        universeIds: ['FOALL$$ALL'],
        dataModifier: {
            type: 'Invert'
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentScreenerConnector,
        'Connector should be instance of InvestmentScreenerConnector class.'
    );

    Assert.ok(
        connector.converter instanceof MC.InvestmentScreenerConverter,
        'Converter should be instance of InvestmentScreenerConverter.'
    );

    await connector.load();

    Assert.deepStrictEqual(
        connector.getTable().getColumnIds().sort(),
        secIds.map(id => `InvestmentScreener_${id}`).sort(),
        'Connector table should exist of expected columns.'
    );

    Assert.ok(
        connector.getTable().getRowCount() > 0,
        'Connector table should not contain empty rows.'
    );

    Assert.deepStrictEqual(
        connector.getTable().getModified().getColumn('columnIds'),
        connector.getTable().getColumnIds(),
        'Connector inverted table should exist of expected columns.'
    );

    Assert.strictEqual(
        connector.getTable().getColumnIds().length,
        connector.getTable().getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}

function median (values: Array<number>): number {
    const sorted = [...values].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
}

export async function investmentScreenerEquityLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const universeId = 'E0WWE$$ALL';
    const pageSize = 50;
    const secIds = [
        'SecId',
        'Name',
        'investmentType',
        'universe',
        'OperatingMargin',
        'DividendYield'
    ];
    const connector = new MC.InvestmentScreenerConnector({
        id: '',
        type: '',
        api,
        page: 1,
        pageSize,
        sortOrder: 'Name asc',
        securityDataPoints: secIds,
        universeIds: [universeId],
        filters: [
            {
                dataPointId: 'DividendYield',
                comparatorCode: 'GT',
                value: 1
            },
            {
                dataPointId: 'OperatingMargin',
                comparatorCode: 'GT',
                value: 0
            }
        ],
        dataModifier: {
            type: 'Invert'
        }
    });

    Assert.ok(
        connector instanceof MC.InvestmentScreenerConnector,
        'Connector should be instance of InvestmentScreenerConnector class.'
    );

    Assert.ok(
        connector.converter instanceof MC.InvestmentScreenerConverter,
        'Converter should be instance of InvestmentScreenerConverter.'
    );

    await connector.load();

    const table = connector.getTable();

    Assert.deepStrictEqual(
        table.getColumnIds().sort(),
        secIds.map(id => `InvestmentScreener_${id}`).sort(),
        'Connector table should exist of expected columns.'
    );

    Assert.strictEqual(
        table.getRowCount(),
        pageSize,
        `Connector table should have ${pageSize} rows.`
    );

    Assert.strictEqual(
        connector.metadata.page,
        1,
        'Metadata should contain the requested page.'
    );

    Assert.strictEqual(
        connector.metadata.pageSize,
        pageSize,
        'Metadata should contain the requested page size.'
    );

    Assert.ok(
        (connector.metadata.total ?? 0) >= pageSize,
        'Metadata total should not be lower than the page size.'
    );

    const investmentTypes = table.getColumn('InvestmentScreener_investmentType') ?? [];
    const universes = table.getColumn('InvestmentScreener_universe') ?? [];
    const operatingMargins = table.getColumn('InvestmentScreener_OperatingMargin') ?? [];
    const dividendYields = table.getColumn('InvestmentScreener_DividendYield') ?? [];

    Assert.ok(
        investmentTypes.every(type => type === 'E0'),
        'All rows should be equities (investment type E0).'
    );

    Assert.ok(
        universes.every(universe => universe === universeId),
        `All rows should belong to the ${universeId} universe.`
    );

    Assert.ok(
        operatingMargins.every(value => typeof value === 'number' && value > 0),
        'All rows should have a numeric operating margin above 0 (filter).'
    );

    Assert.ok(
        dividendYields.every(value => typeof value === 'number' && value > 1),
        'All rows should have a numeric dividend yield above 1 (filter).'
    );

    // Operating margin is delivered as a decimal fraction (0.2 = 20%),
    // for profitable companies the median stays clearly below 1.
    Assert.ok(
        median(operatingMargins as Array<number>) < 1,
        'Operating margin should be delivered as a decimal fraction.'
    );

    // Dividend yield is delivered as a percentage (5 = 5%). The filter keeps
    // every value above 1, so only the upper bound detects a scale change,
    // e.g. a percentage multiplied by 100 again (5 = 500%).
    Assert.ok(
        median(dividendYields as Array<number>) < 20,
        'Dividend yield should be delivered as a percentage.'
    );

    Assert.deepStrictEqual(
        table.getModified().getColumn('columnIds'),
        table.getColumnIds(),
        'Connector inverted table should exist of expected columns.'
    );

    Assert.strictEqual(
        table.getColumnIds().length,
        table.getModified().getRowCount(),
        'Original and inverted table should have an inverted amount of columns and rows.'
    );
}

export function InvestmentScreenerResponseValidation () {
    const exampleResponse = {
        total: 18238,
        page: 1,
        pageSize: 20,
        rows: [
            {
                SecId: 'F000002PLH',
                Name: '(LF)-Flexi Allocation Greece Eurobank',
                riskrating: 4,
                rating: 4
            }
        ]
    };

    Assert.ok(
        InvestmentScreenerJSON.isInvestmentScreenerResponse(exampleResponse),
        'InvestmentScreenerJSON should validate correct response.'
    );
}
