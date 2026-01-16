/* *
 *
 *  (c) 2009-2026 Highsoft AS
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


import type {
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import type SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
import MorningstarConverter from '../MorningstarConverter';

/* *
 *
 *  Class
 *
 * */


export class MetaConverter extends MorningstarConverter {


    /* *
     *
     *  Constructor
     *
     * */


    public constructor (
        options?: SecurityDetailsConverterOptions
    ) {
        super(options);
    }


    /* *
     *
     *  Functions
     *
     * */


    public override parse (
        options: SecurityDetailsConverterOptions
    ): void {
        const table = this.table,
            userOptions = {
                ...this.options,
                ...options
            },
            security = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse,
            hasMultiple = options.hasMultiple,
            id = security.Id,
            columnStrPostfix = hasMultiple ? `_${id}` : '',
            metaTypeStr = 'Meta' + columnStrPostfix,
            valueTypeStr = 'Value' + columnStrPostfix;

        const rows = [
            ['Id', security.Id],
            ['InceptionDate', security.InceptionDate],
            ['PerformanceInceptionDate', security.PerformanceInceptionDate],
            ['Isin', security.Isin],
            ['LegalName', security.LegalName],
            ['Domicile', security.Domicile],
            ['OngoingCharge', security.OngoingCharge],
            ['CollectedSRRI_Date', security.CollectedSRRI?.Date],
            ['CollectedSRRI_Rank', security.CollectedSRRI?.Rank],
            ['Currency_Id', security.Currency?.Id],
            ['LastPrice_Date', security.LastPrice?.Date],
            ['LastPrice_Value', security.LastPrice?.Value],
            ['LastPrice_Currency_Id', security.LastPrice?.Currency?.Id],
            ['InvestmentStrategy', security.InvestmentStrategy],
            ['ProviderCompany_Name', security.ProviderCompany?.Name],
            ['ProviderCompany_AddressLine1', security.ProviderCompany?.AddressLine1],
            ['ProviderCompany_Phone', security.ProviderCompany?.Phone],
            ['ProviderCompany_City', security.ProviderCompany?.City],
            ['ProviderCompany_Country', security.ProviderCompany?.Country],
            ['ProviderCompany_PostalCode', security.ProviderCompany?.PostalCode],
            ['ProviderCompany_Homepage', security.ProviderCompany?.Homepage],
            ['CategoryBroadAssetClass_Id', security.CategoryBroadAssetClass?.Id],
            ['CategoryBroadAssetClass_Name', security.CategoryBroadAssetClass?.Name],
            ['ActualManagementFee', security.ActualManagementFee],
            ['FundAttributes_DerivativeBased', security.FundAttributes?.DerivativeBased],
            ['FundAttributes_HedgeFund', security.FundAttributes?.HedgeFund],
            ['FundAttributes_MasterFeeder', security.FundAttributes?.MasterFeeder],
            ['FundAttributes_PhysicalFull', security.FundAttributes?.PhysicalFull],
            ['FundAttributes_PhysicalSample', security.FundAttributes?.PhysicalSample],
            ['FundAttributes_SyntheticReplication',security.FundAttributes?.SyntheticReplication],
            ['FundAttributes_UCITS', security.FundAttributes?.UCITS]
        ];

        const metaTypes: string[] = [],
            metaValues: ( string | number | undefined | boolean )[] = [];

        // Split metaTypes and values into arrays
        rows.forEach((row) => {
            metaTypes.push(String(row[0]));
            metaValues.push(row[1]);
        });

        // Populate table
        table.setColumn(metaTypeStr, metaTypes);
        table.setColumn(valueTypeStr, metaValues);
    }
}


/* *
 *
 *  Default Export
 *
 * */


export default MetaConverter;
