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
                ['Id', securityDetails.Id],
                ['InceptionDate', securityDetails.InceptionDate],
                ['PerformanceInceptionDate', securityDetails.PerformanceInceptionDate],
                ['Isin', securityDetails.Isin],
                ['LegalName', securityDetails.LegalName],
                ['Domicile', securityDetails.Domicile],
                ['OngoingCharge', securityDetails.OngoingCharge],
                ['CollectedSRRI_Date', securityDetails.CollectedSRRI?.Date],
                ['CollectedSRRI_Rank', securityDetails.CollectedSRRI?.Rank],
                ['Currency_Id', securityDetails.Currency?.Id],
                ['LastPrice_Date', securityDetails.LastPrice?.Date],
                ['LastPrice_Value', securityDetails.LastPrice?.Value],
                ['LastPrice_Currency_Id', securityDetails.LastPrice?.Currency?.Id],
                ['InvestmentStrategy', securityDetails.InvestmentStrategy],
                ['ProviderCompany_Name', securityDetails.ProviderCompany?.Name],
                ['ProviderCompany_AddressLine1', securityDetails.ProviderCompany?.AddressLine1],
                ['ProviderCompany_Phone', securityDetails.ProviderCompany?.Phone],
                ['ProviderCompany_City', securityDetails.ProviderCompany?.City],
                ['ProviderCompany_Country', securityDetails.ProviderCompany?.Country],
                ['ProviderCompany_PostalCode', securityDetails.ProviderCompany?.PostalCode],
                ['ProviderCompany_Homepage', securityDetails.ProviderCompany?.Homepage],
                ['CategoryBroadAssetClass_Id', securityDetails.CategoryBroadAssetClass?.Id],
                ['CategoryBroadAssetClass_Name', securityDetails.CategoryBroadAssetClass?.Name],
                ['ActualManagementFee', securityDetails.ActualManagementFee],
                ['FundAttributes_DerivativeBased', securityDetails.FundAttributes?.DerivativeBased],
                ['FundAttributes_HedgeFund', securityDetails.FundAttributes?.HedgeFund],
                ['FundAttributes_MasterFeeder', securityDetails.FundAttributes?.MasterFeeder],
                ['FundAttributes_PhysicalFull', securityDetails.FundAttributes?.PhysicalFull],
                ['FundAttributes_PhysicalSample', securityDetails.FundAttributes?.PhysicalSample],
                [
                    'FundAttributes_SyntheticReplication',
                    securityDetails.FundAttributes?.SyntheticReplication
                ],
                ['FundAttributes_UCITS', securityDetails.FundAttributes?.UCITS]
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
