/* *
 *
 *  (c) 2009-2025 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Mateusz Bernacik
 *
 * */


'use strict';


/* *
 *
 *  Imports
 *
 * */


import {
    SecurityDetailsConverterOptions,
    SecurityDetailsMetadata
} from '../SecurityDetailsOptions';
import SecurityDetailsJSON from '../SecurityDetailsJSON';
import SecurityDetailsConverter from '../SecurityDetailsConverter';

/* *
 *
 *  Class
 *
 * */


export class MetaConverter extends SecurityDetailsConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: SecurityDetailsConverterOptions
    ) {
        super(options);

        this.metadata = {
            columns: {}
        };
    }


    /* *
     *
     *  Properties
     *
     * */


    public readonly metadata: SecurityDetailsMetadata;


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: SecurityDetailsConverterOptions
    ): void {
        const metadata = this.metadata;
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const json = userOptions.json;

        // Validate JSON

        if (!SecurityDetailsJSON.isSecurityDetailsResponse(json)) {
            throw new Error('Invalid data');
        }

        // Prepare table

        table.deleteColumns();
        table.setColumn('Meta');
        table.setColumn('Value');

        if (json.length) {
            const securityDetails = json[0];

            const rows = [
                ['Meta_Id', securityDetails.Id],
                ['Meta_InceptionDate', securityDetails.InceptionDate],
                ['Meta_PerformanceInceptionDate', securityDetails.PerformanceInceptionDate],
                ['Meta_Isin', securityDetails.Isin],
                ['Meta_LegalName', securityDetails.LegalName],
                ['Meta_Domicile', securityDetails.Domicile],
                ['Meta_OngoingCharge', securityDetails.OngoingCharge],
                ['Meta_CollectedSRRI_Date', securityDetails.CollectedSRRI?.Date],
                ['Meta_CollectedSRRI_Rank', securityDetails.CollectedSRRI?.Rank],
                ['Meta_Currency_Id', securityDetails.Currency?.Id],
                ['Meta_LastPrice_Date', securityDetails.LastPrice?.Date],
                ['Meta_LastPrice_Value', securityDetails.LastPrice?.Value],
                ['Meta_InvestmentStrategy', securityDetails.InvestmentStrategy],
                ['Meta_ProviderCompany_Name', securityDetails.ProviderCompany?.Name],
                [
                    'Meta_ProviderCompany_AddressLine1',
                    securityDetails.ProviderCompany?.AddressLine1
                ],
                ['Meta_ProviderCompany_Phone', securityDetails.ProviderCompany?.Phone],
                ['Meta_ProviderCompany_City', securityDetails.ProviderCompany?.City],
                ['Meta_ProviderCompany_Country', securityDetails.ProviderCompany?.Country],
                ['Meta_ProviderCompany_PostalCode', securityDetails.ProviderCompany?.PostalCode],
                ['Meta_ProviderCompany_Homepage', securityDetails.ProviderCompany?.Homepage]
            ];

            // Populate table
            rows.forEach(([key, value], index) => {
                if (value === undefined) return;

                table.setCell('Meta', index, key);
                table.setCell('Value', index, value);
            });

            // Update metadata
            metadata.id = securityDetails.Id;
            metadata.isin = securityDetails.Isin;
        }

    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MetaConverter;
