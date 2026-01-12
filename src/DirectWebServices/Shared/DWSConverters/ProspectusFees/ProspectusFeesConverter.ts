/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Kamil Musialowski
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import type {
    ProspectusFeesConverterMetadata,
    ProspectusFeesConverterOptions
} from './ProspectusFeesOptions';
import MorningstarConverter from '../../../../Shared/MorningstarConverter';


/* *
 *
 *  Class
 *
 * */


export class ProspectusFeesConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: ProspectusFeesConverterOptions
    ) {
        super(options);

        this.metadata = {
            columns: {}
        };
    }

    /**
     *
     *  Properties
     *
     */

    public readonly metadata: ProspectusFeesConverterMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (options: ProspectusFeesConverterOptions): void {
        const table = this.table,
            metadata = this.metadata,
            json = options.json,
            id = json.identifiers.performanceId,
            prospectusFees = json.prospectusFees;

        if (prospectusFees) {
            for (const key in prospectusFees) {
                const value = prospectusFees[key];
                const columnName = key[0].toUpperCase() + key.slice(1);

                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    // If value is an object, loop over its properties and
                    // set the keys as columns in the table.
                    const nestedObject = value;

                    for (const nestedKey in nestedObject) {
                        const nestedColumnName =
                            nestedKey[0].toUpperCase() + nestedKey.slice(1);

                        table.setCell(
                            `${columnName}_${nestedColumnName}`,
                            0,
                            nestedObject[nestedKey]
                        );
                    }
                } else if (typeof value === 'number' || typeof value === 'string') {
                    table.setCell(
                        columnName,
                        0,
                        value
                    );
                }
            }
        }

        // Converter metadata
        metadata.performanceId = id;

        if (json.metadata.messages?.length) {
            metadata.messages = json.metadata.messages;
        }
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default ProspectusFeesConverter;
