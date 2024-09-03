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
import MorningstarConnector from '../Shared/MorningstarConnector';
import XRayConverter from './XRayConverter';
import XRayOptions from './XRayOptions';


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
