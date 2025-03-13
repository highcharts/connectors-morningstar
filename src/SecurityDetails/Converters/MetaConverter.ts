/* *
 *
 *  (c) 2009-2024 Highsoft AS
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

        // Add asset allocations to table

        if (json.length) {
            const securityDetails = json[0];

            table.setColumn('Meta_Id');
            table.setCell('Meta_Id', 0, securityDetails.Id);

            table.setColumn('Meta_InceptionDate');
            table.setCell('Meta_InceptionDate', 0, securityDetails.InceptionDate);

            table.setColumn('Meta_PerformanceInceptionDate');
            table.setCell(
                'Meta_PerformanceInceptionDate',
                0,
                securityDetails.PerformanceInceptionDate
            );

            table.setColumn('Meta_Isin');
            table.setCell('Meta_Isin', 0, securityDetails.Isin);

            table.setColumn('Meta_LegalName');
            table.setCell('Meta_LegalName', 0, securityDetails.LegalName);

            table.setColumn('Meta_Domicile');
            table.setCell('Meta_Domicile', 0, securityDetails.Domicile);

            table.setColumn('Meta_OngoingCharge');
            table.setCell('Meta_OngoingCharge', 0, securityDetails.OngoingCharge);

            table.setColumn('Meta_CollectedSRRI_Date');
            table.setCell('Meta_CollectedSRRI', 0, securityDetails.CollectedSRRI.Date);

            table.setColumn('Meta_CollectedSRRI_Rank');
            table.setCell('Meta_CollectedSRRI', 0, securityDetails.CollectedSRRI.Rank);

            table.setColumn('Meta_Currency_Id');
            table.setCell('Meta_Currency_Id', 0, securityDetails.Currency.Id);

            table.setColumn('Meta_LastPrice_Date');
            table.setCell('Meta_LastPrice', 0, securityDetails.LastPrice.Date);

            table.setColumn('Meta_LastPrice_Value');
            table.setCell('Meta_LastPrice', 0, securityDetails.LastPrice.Value);

            table.setColumn('Meta_InvestmentStrategy');
            table.setCell('Meta_InvestmentStrategy', 0, securityDetails.InvestmentStrategy);

            table.setColumn('Meta_ProviderCompany_Name');
            table.setCell('Meta_ProviderCompany', 0, securityDetails.ProviderCompany.Name);

            table.setColumn('Meta_ProviderCompany_AddressLine1');
            table.setCell('Meta_ProviderCompany', 0, securityDetails.ProviderCompany.AddressLine1);

            table.setColumn('Meta_ProviderCompany_Phone');
            table.setCell('Meta_ProviderCompany', 0, securityDetails.ProviderCompany.Phone);

            table.setColumn('Meta_ProviderCompany_City');
            table.setCell('Meta_ProviderCompany', 0, securityDetails.ProviderCompany.City);

            table.setColumn('Meta_ProviderCompany_Country');
            table.setCell('Meta_ProviderCompany', 0, securityDetails.ProviderCompany.Country);

            table.setColumn('Meta_ProviderCompany_PostalCode');
            table.setCell('Meta_ProviderCompany', 0, securityDetails.ProviderCompany.PostalCode);

            table.setColumn('Meta_ProviderCompany_Homepage');
            table.setCell('Meta_ProviderCompany', 0, securityDetails.ProviderCompany.Homepage);

            // Update meta data

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
