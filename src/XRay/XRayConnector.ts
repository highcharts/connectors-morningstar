/* *
 *
 *  (c) 2009-2024 Highsoft AS
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
import MorningstarURL from '../Shared/MorningstarURL';
import XRayConverter from './XRayConverter';
import {
    XRayHoldingAmountOptions,
    XRayHoldingWeightOptions,
    XRayOptions
} from './XRayOptions';


/* *
 *
 *  Declarations
 *
 * */


interface XRayPortfolioObject {
    benchmarkId?: string;
    currencyId?: string;
    holdings?: (Array<XRayHoldingAmountOptions>|Array<XRayHoldingWeightOptions>);
    type?: (2|3);
}


/* *
 *
 *  Functions
 *
 * */


function isXRayHoldingAmountOptions (
    options?: unknown
): options is XRayHoldingAmountOptions {
    return (
        !!options &&
        typeof options === 'object' &&
        typeof (options as XRayHoldingAmountOptions).amount === 'string' &&
        typeof (options as XRayHoldingWeightOptions).weight === 'undefined'
    );
}


function isXRayHoldingWeightOptions (
    options?: unknown
): options is XRayHoldingAmountOptions {
    return (
        !!options &&
        typeof options === 'object' &&
        typeof (options as XRayHoldingAmountOptions).amount === 'undefined' &&
        typeof (options as XRayHoldingWeightOptions).weight === 'string'
    );
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
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */


    public override readonly converter: XRayConverter;


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

        const amountHoldings: Array<XRayHoldingAmountOptions> = [];
        const weightHoldings: Array<XRayHoldingWeightOptions> = [];

        for (const holding of holdings) {
            if (isXRayHoldingAmountOptions(holding)) {
                amountHoldings.push(holding);
            } else if (isXRayHoldingWeightOptions(holding)) {
                weightHoldings.push(holding);
            }
        }

        const bodyJSON: XRayPortfolioObject = {
            benchmarkId: 'XIUSA0010V',
            currencyId: options.currencyId
        };

        if (amountHoldings.length > weightHoldings.length) {
            bodyJSON.type = 2;
            bodyJSON.holdings = amountHoldings;
        } else {
            bodyJSON.type = 3;
            bodyJSON.holdings = weightHoldings;
        }

        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL('/ecint/v1/xray', api.baseURL);

        switch (dataPoints.type) {
            case 'benchmark':
                url.searchParams.set('benchmarkDataPoints', dataPoints.dataPoints.join(','));
                break;
            case 'holding':
                url.searchParams.set('holdingDataPoints', dataPoints.dataPoints.join(','));
                break;
            case 'portfolio':
                url.searchParams.set('portfolioDataPoints', dataPoints.dataPoints.join(','));
                break;
        }

        const response = await api.fetch(url, {
            body: JSON.stringify(bodyJSON),
            method: 'POST'
        });
        const json = await response.json() as unknown;

        this.converter.parse({ json });

        this.table.deleteColumns();
        this.table.setColumns(this.converter.getTable().getColumns());

        return this;
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
