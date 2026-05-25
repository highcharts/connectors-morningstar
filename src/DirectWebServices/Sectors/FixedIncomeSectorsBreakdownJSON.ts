/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Dalek
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import { InvestmentResponse } from '../InvestmentsConnector/InvestmentsJSON';

/* *
 *
 *  Interfaces
 *
 * */

export type FieldsMapping = {
    fixdInc: FieldMappingEntry;
    fixedInc: FieldMappingEntry;
    surveyedFixedInc: FieldMappingEntry;
};

export type FieldMappingEntry = {
    pattern: RegExp;
    column: string;
    allSector: string[];
    superSector: string[];
    primarySector: string[];
    secondarySector: string[];
    governmentPerRegionSuperSector?: string[];
    treasuryPerRegionSecondarySector?: string[];
    inflationPerRegionSecondarySector?: string[];
    agencyPerRegionSecondarySector?: string[];
};

export type SectorAccumulatorKey =
    | 'allSector'
    | 'superSector'
    | 'primarySector'
    | 'secondarySector'
    | 'governmentPerRegionSuperSector'
    | 'treasuryPerRegionSecondarySector'
    | 'inflationPerRegionSecondarySector'
    | 'agencyPerRegionSecondarySector';

/* *
 *
 *  Namespace
 *
 * */

namespace FixedIncomeSectorsBreakdownJSON {

    export interface FixedIncomeSectorsBreakdownResponse extends InvestmentResponse {
        morningstarFixedIncomeSectorsBreakdown: MorningstarFixedIncomeSectorsBreakdownItem;
    }

    export interface MorningstarFixedIncomeSectorsBreakdownItem {
        [key: string]: number | string;
    }

}

/* *
 *
 *  Default Export
 *
 * */

export default FixedIncomeSectorsBreakdownJSON;
