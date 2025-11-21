/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Askel Eirik Johansson
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import External from '../../../Shared/External';
import DWSConnector from '../../DWSConnector';
import FundDataOptions from '../FundDataOptions';
import AssetAllocationBreakdownJSON from './AssetAllocationBreakdownJSON';
import AssetAllocationBreakdownConverter from './AssetAllocationBreakdownConverter';
import { AssetAllocationBreakdownMetadata } from './AssetAllocationBreakdownOptions';




/* *
 *
 *  Class
 *
 * */


export class AssetAllocationBreakdownConnector extends DWSConnector {

    /**
     *
     * Static properties
     *
     */

    protected static readonly defaultOptions: FundDataOptions = {
        id: 'morningstar-asset-allocation-breakdown-connector',
        type: 'MorningstarAssetAllocationBreakdownConnector',
        security: {
            id: '',
            idType: 'performanceId'
        }
    };

    /**
     *
     *
     * Constructors
     *
     */

    public constructor (
        options: FundDataOptions
    ) {

        options = {
            ...AssetAllocationBreakdownConnector.defaultOptions,
            ...options
        };

        super(options);

        this.converter = new AssetAllocationBreakdownConverter();
        this.metadata = this.converter.metadata;
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly converter: AssetAllocationBreakdownConverter;

    public override readonly options: FundDataOptions;

    public override readonly metadata: AssetAllocationBreakdownMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<any> {
        this.url = `investments/${this.options.security.id}/asset-Allocation-Breakdown`;

        await super.load();

        const json = await this.response?.json() as
            AssetAllocationBreakdownJSON.AssetAllocationBreakdownResponse;

        this.converter.parse({ json });

        this.getTable().deleteColumns();
        this.getTable().setColumns(this.converter.getTable().getColumns());

        return this.applyTableModifiers();
    }
}

/* *
 *
 *  Registry
 *
 * */


declare module '@highcharts/dashboards/es-modules/Data/Connectors/DataConnectorType' {
    interface DataConnectorTypes {
        MorningstarAssetAllocationBreakdown: typeof AssetAllocationBreakdownConnector;
    }
}


External.DataConnector.registerType(
    'MorningstarAssetAllocationBreakdown', AssetAllocationBreakdownConnector
);


/* *
 *
 *  Default Export
 *
 * */


export default AssetAllocationBreakdownConnector;
