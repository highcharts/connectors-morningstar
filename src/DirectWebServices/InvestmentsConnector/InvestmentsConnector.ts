/* *
 *
 *  (c) 2009-2026 Highsoft AS
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

import External from '../../Shared/External';
import DWSConnector from '../DWSConnector';
import {
    createRequests,
    dataTablesFromConverters,
    initConverter,
    pickConverters
} from '../Shared/SharedDWSInvestments';

import type {
    Converters,
    InvestmentsConnectorMetadata,
    InvestmentsConverterType,
    InvestmentsOptions
} from './InvestmentsOptions';

/* *
 *
 *  Class
 *
 * */

export class InvestmentsConnector extends DWSConnector {

    /* *
     *
     * Static Properties
     *
     */

    protected static readonly defaultOptions: InvestmentsOptions = {
        id: 'morningstar-investments-connector',
        type: 'MorningstarInvestmentsConnector'
    };

    /* *
     *
     *  Constructor
     *
     * */

    public constructor (
        options: InvestmentsOptions
    ) {
        const convertersToUse = pickConverters(options.converters);

        options = {
            ...InvestmentsConnector.defaultOptions,
            ...options,
            dataTables: dataTablesFromConverters(convertersToUse)
        };

        super(options);
        this.options = options;

        this.metadata = {
            columns: {},
            rawResponses: []
        };

        this.convertersToUse = convertersToUse;
    }

    /* *
     *
     *  Properties
     *
     * */

    public override readonly options: InvestmentsOptions;

    public convertersToUse: Converters;

    public override metadata!: InvestmentsConnectorMetadata;

    /* *
     *
     *  Functions
     *
     * */

    public override async load (): Promise<this> {
        const { converters, security } = this.options;

        if (!converters) {
            throw new Error('No converters object found.');
        }

        if (!security?.id) {
            throw new Error('No security ID found.');
        }

        this.requests = createRequests(this.convertersToUse, converters, security);

        await super.load();

        for (const responseObject of this.responses) {
            const [type, response] =
                Object.entries(responseObject)[0] as [InvestmentsConverterType, Response];

            const json: unknown = await response?.json();
            const converter = initConverter(type);

            converter.parse({ json });

            if (this.convertersToUse.find(c => c.key === type)?.children) {
                for (const table of converter.getTables()) {
                    this.dataTables[table.id].setColumns(table.getColumns());
                    this.dataTables[table.id].metadata = table.metadata;
                }
            } else {
                this.dataTables[type].setColumns(converter.getTable().getColumns());
                this.dataTables[type].metadata = converter.getTable().metadata;
            }

            // Connector metadata
            this.metadata.rawResponses.push({ type, json });
            this.metadata[type] = {
                ...converter.metadata
            };
        }

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
        MorningstarDWSInvestments: typeof InvestmentsConnector;
    }
}


External.DataConnector.registerType('MorningstarDWSInvestments', InvestmentsConnector);

/* *
 *
 *  Default Export
 *
 * */

export default InvestmentsConnector;
