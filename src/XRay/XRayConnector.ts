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
import { DATA_TABLES, initConverter } from '../Shared/SharedXRay';
import XRayJSON from './XRayJSON';
import XRayOptions, { XRayMetadata } from './XRayOptions';


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
 *  Constants
 *
 * */


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
        super(options, DATA_TABLES);

        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: XRayOptions;

    public override metadata!: XRayMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override async load (): Promise<this> {

        await super.load();

        const options = this.options;
        const dataPoints = !options.dataPoints ? [] :
            // Backward compat: if `dataPoints` is an object, make it an array:
            Array.isArray(options.dataPoints) ?
                options.dataPoints : [options.dataPoints];
        const holdings = options.holdings || [];

        if (!dataPoints[0] || !holdings.length) {
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

        const api = this.api = this.api || new MorningstarAPI(options.api);
        const url = new MorningstarURL('ecint/v1/xray/json', api.baseURL);

        dataPoints.forEach(dataPoint => {
            url.searchParams.set(
                dataPoint.type + 'DataPoints',
                escapeDataPoints(dataPoint.dataPoints)
            );
        });

        const response = await api.fetch(url, {
            body: JSON.stringify(JSON.stringify(bodyJSON)),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const json = await response.json() as XRayJSON.XRayResponse;
        const xrays: Array<XRayJSON.XRayResponse> = [];

        if (XRayJSON.isResponse(json)) {
            xrays.push(...json.XRay);
        } else if (XRayJSON.isXRayResponse(json)) {
            xrays.push(json);
        } else {
            throw new Error('Invalid data');
        }

        for (const { key } of DATA_TABLES) {
            const converter = initConverter(key);

            for (const xray of xrays) {
                // First parse the portfolio
                converter.parse({
                    json: {
                        ...xray,
                        benchmark: void 0
                    }
                });

                // Then parse the benchmark
                if (xray.benchmark) {
                    converter.parse({ json: xray });
                }

            }

            this.dataTables[key].setColumns(converter.getTable().getColumns());
        }

        this.metadata = {
            columns: {},
            json
        };

        return this.setModifierOptions(options.dataModifier);
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
