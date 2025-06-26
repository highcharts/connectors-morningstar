/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import External from '../Shared/External';
import MorningstarAPI from '../Shared/MorningstarAPI';
import MorningstarConnector from '../Shared/MorningstarConnector';
import {
    isMorningstarHoldingAmountOptions,
    isMorningstarHoldingWeightOptions,
    MorningstarHoldingAmountOptions,
    MorningstarHoldingWeightOptions
} from '../Shared/MorningstarOptions';
import MorningstarURL from '../Shared/MorningstarURL';
import XRayConverter from './XRayConverter';
import XRayOptions from './XRayOptions';


/* *
 *
 *  Declarations
 *
 * */


interface XRayHoldingObject {
    amount?: string;
    identifier: string;
    identifierType: string;
    holdingType: string|number;
    name?: string;
    securityType?: string;
    weight?: string;
}


interface XRayPortfolioObject {
    benchmarkId?: string;
    currencyId?: string;
    holdings?: Array<XRayHoldingObject>;
    /** 1: Value / 2: Weight / 3: Amount */
    type?: (2|3);
}


/* *
 *
 *  Functions
 *
 * */


function convertHoldings (
    holdings: (Array<MorningstarHoldingAmountOptions>|Array<MorningstarHoldingWeightOptions>),
    holdingType: number
): Array<XRayHoldingObject> {
    return holdings.map(security => {
        const holding: XRayHoldingObject = {
            identifier: security.id,
            identifierType: security.idType,
            holdingType: security.holdingType || holdingType
        };

        if (security.name) {
            holding.name = security.name;
        }

        if (security.type) {
            holding.securityType = security.type;
        }

        if (security.weight) {
            holding.weight = security.weight.toString();
        }

        return holding;
    });
}

function escapeDataPoints (
    dataPoints: Array<(string|Array<string>)>
): string {

    dataPoints = dataPoints.map(dataPoint => (
        dataPoint instanceof Array ?
            dataPoint.join('|') :
            dataPoint
    ));

    if (!dataPoints.length) {
        return '';
    }

    return `UseMongoSecurities,RunInThread,${dataPoints.join(',')}`;
}


/* *
 *
 *  Class
 *
 * */


export class XRayConnector extends MorningstarConnector {


    /* *
     *
     *  Constructors
     *
     * */


    public constructor (
        options: XRayOptions = {}
    ) {
        super(options);

        this.converter = new XRayConverter(options?.converter);
        this.metadata = { columns: {} };
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: XRayConverter;


    public override readonly metadata: XRayConnector.MetaData;


    public override readonly options: XRayOptions;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {

        await super.load();

        const options = this.options;
        const dataPoints = options.dataPoints;
        const holdings = options.holdings || [];

        if (!dataPoints || !holdings.length) {
            return this;
        }

        const amountHoldings: Array<MorningstarHoldingAmountOptions> = [];
        const weightHoldings: Array<MorningstarHoldingWeightOptions> = [];

        for (const holding of holdings) {
            if (isMorningstarHoldingAmountOptions(holding)) {
                amountHoldings.push(holding);
            }
            if (isMorningstarHoldingWeightOptions(holding)) {
                weightHoldings.push(holding);
            }
        }

        const bodyJSON: XRayPortfolioObject = {
            benchmarkId: (options.benchmarkId || 'XIUSA0010V'),
            currencyId: options.currencyId
        };

        if (amountHoldings.length > weightHoldings.length) {
            bodyJSON.type = 3;
            bodyJSON.holdings = convertHoldings(amountHoldings, bodyJSON.type);
        } else {
            bodyJSON.type = 2;
            bodyJSON.holdings = convertHoldings(weightHoldings, bodyJSON.type);
        }

        this.metadata.benchmarkId = bodyJSON.benchmarkId;

        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL('ecint/v1/xray/json', api.baseURL);

        switch (dataPoints.type) {
            case 'benchmark':
                url.searchParams.set(
                    'benchmarkDataPoints',
                    escapeDataPoints(dataPoints.dataPoints)
                );
                break;
            case 'holding':
                url.searchParams.set(
                    'holdingDataPoints',
                    escapeDataPoints(dataPoints.dataPoints)
                );
                break;
            case 'portfolio':
                url.searchParams.set(
                    'portfolioDataPoints',
                    escapeDataPoints(dataPoints.dataPoints)
                );
                break;
        }

        const response = await api.fetch(url, {
            body: JSON.stringify(JSON.stringify(bodyJSON)),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const json = await response.json() as unknown;

        this.converter.parse({ json });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

        return this.setModifierOptions(options.dataModifier);
    }


}


/* *
 *
 *  Class Namespace
 *
 * */


export namespace XRayConnector {


    /* *
     *
     *  Declarations
     *
     * */


    export interface MetaData {
        benchmarkId?: string;
        /** @internal */
        columns: Record<string, object>;
    }


}


/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarXRay: typeof XRayConnector
    }
}


External.DataConnector.registerType('MorningstarXRay', XRayConnector);


/* *
 *
 *  Default Export
 *
 * */


export default XRayConnector;
