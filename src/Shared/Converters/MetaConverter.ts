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
    SecurityDetailsConverterOptions
} from '../../SecurityDetails/SecurityDetailsOptions';
import SecurityDetailsJSON from '../../SecurityDetails/SecurityDetailsJSON';
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
        const table = this.table;
        const userOptions = {
            ...this.options,
            ...options
        };
        const securityDetails = userOptions.json as SecurityDetailsJSON.SecurityDetailsResponse;
        const hasMultiple = options.hasMultiple;

        // Prepare table
        const id = securityDetails.Id;
        const metaTypeStr = 'Meta' + (hasMultiple ? `_${id}` : '');
        const valueTypeStr = 'Value' + (hasMultiple ? `_${id}` : '');

        table.setColumn(metaTypeStr);
        table.setColumn(valueTypeStr);

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
        table.setRows(rows);
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default MetaConverter;
