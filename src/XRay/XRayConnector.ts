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


interface XRayPortfolioObject {
    benchmarkId?: string;
    currencyId?: string;
    holdings?: (Array<MorningstarHoldingAmountOptions>|Array<MorningstarHoldingWeightOptions>);
    type?: (2|3);
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
