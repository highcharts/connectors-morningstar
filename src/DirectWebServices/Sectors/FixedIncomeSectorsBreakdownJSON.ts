/* *
 *
 *  (c) 2009-2025 Highsoft AS
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

import SectorsBreakdown from './SectorsBreakdownOptions';

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
    superSector: string[];
    primarySector: string[];
    secondarySector: string[];
    suffixes: string[];
    column: string;
    [key: string]: any;
};

/* *
 *
 *  Namespace
 *
 * */

namespace FixedIncomeSectorsBreakdownJSON {

    export interface FixedIncomeSectorsBreakdownResponse extends SectorsBreakdown.InvestmentResponse {
        morningstarFixedIncomeSectorsBreakdown: MorningstarFixedIncomeSectorsBreakdownItem;
    }

    export interface MorningstarFixedIncomeSectorsBreakdownItem {
        [key: string]: number | string;
    }
}

export default FixedIncomeSectorsBreakdownJSON;
