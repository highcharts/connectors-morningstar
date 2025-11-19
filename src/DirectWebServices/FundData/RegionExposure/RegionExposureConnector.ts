/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Jedrzej Ruta
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
import RegionExposureJSON from './RegionExposureJSON';
import RegionExposureConverter from './RegionExposureConverter';
import { RegionExposureMetadata } from './RegionExposureOptions';


/* *
 *
 *  Class
 *
 * */


export class RegionExposureConnector extends DWSConnector {

    /**
     *
     * Static properties
     *
     */

    protected static readonly defaultOptions: FundDataOptions = {
        id: 'morningstar-region-exposure-connector',
        type: 'MorningstarRegionExposureConnector',
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
            ...RegionExposureConnector.defaultOptions,
            ...options
        };

        super(options);

        this.converter = new RegionExposureConverter();
        this.metadata = this.converter.metadata;
        this.options = options;
    }


    /* *
     *
     *  Properties
     *
     * */

    public override readonly converter: RegionExposureConverter;

    public override readonly options: FundDataOptions;

    public override readonly metadata: RegionExposureMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<any> {
        this.url = `investments/${this.options.security.id}/country-and-regional-exposure-breakdown`;

        await super.load();

        const json = await this.response?.json() as RegionExposureJSON.RegionExposureResponse;

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
        MorningstarRegionExposure: typeof RegionExposureConnector;
    }
}


External.DataConnector.registerType('MorningstarRegionExposure', RegionExposureConnector);


/* *
 *
 *  Default Export
 *
 * */


export default RegionExposureConnector;
