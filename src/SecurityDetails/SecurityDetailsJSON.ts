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
 *  - Pawel Lysy
 *
 * */


'use strict';


/* *
 *
 *  Namespace
 *
 * */


namespace SecurityDetailsJSON {


    /* *
     *
     *  Declarations
     *
     * */

    interface CurrencyType {
        Id: string;
    }

    export interface SecurityDetailsResponse {
        Id: string;
        Isin: string;
        Domicile: string;
        Currency: CurrencyType;
        TrailingPerformance: SecurityDetailsTrailingPerformance[];
        Portfolios: PortfoliosType[];
        Type: string;
        CurrencyId: string;
        Date: string;
        InceptionDate: string;
        PerformanceInceptionDate: string;
        LegalName: string;
        OngoingCharge: string;
        CollectedSRRI: CollectedSRRIType;
        LastPrice: LastPriceType;
        InvestmentStrategy: string;
        ProviderCompany: ProviderCompanyType;
        CategoryBroadAssetClass: CategoryBroadAssetClassType;
        ActualManagementFee: number;
        FundAttributes?: FundAttributesType;
    }

    export type PortfoliosType = {
        AssetAllocations: AssetAllocationType[]
        RegionalExposure: RegionalExposureType[]
        GlobalStockSectorBreakdown: GlobalStockSectorBreakdownType[]
        CountryExposure: CountryExposureType[]
    };

    export type AssetAllocationType = {
        BreakdownValues: BreakDownValues[]
        SalePosition: string
        Type: string
    };

    export type BreakDownValues = {
        Value: number;
        Type: string;
    };

    export type RegionalExposureType = {
        BreakdownValues: BreakDownValues[]
        SalePosition: string
        NotClassified: number
    };

    export type GlobalStockSectorBreakdownType = {
        BreakdownValues: BreakDownValues[]
        SalePosition: string
        NotClassified: number
    };

    export type CountryExposureType = {
        BreakdownValues: BreakDownValues[]
        SalePosition: string
        NotClassified: number
        Type: string
    };

    interface SecurityDetailsTrailingPerformance {
        ReturnType: string;
        Return: SecurityDetailsReturn[];
    }

    interface SecurityDetailsReturn {
        Date: string;
        Value: number;
        TimePeriod: string;
        Annualized?: boolean;
    }
    export interface CollectedSRRIType {
        Date: string;
        Rank: number;
    }

    export interface LastPriceType {
        Date: string;
        Value: number;
        Currency: CurrencyType;
    }

    export interface ProviderCompanyType {
        Name: string;
        AddressLine1: string;
        Phone: string;
        City: string;
        Country: string;
        PostalCode: string;
        Homepage: string;
    }

    export interface CategoryBroadAssetClassType {
        Id: string;
        Name: string;
    }

    export interface FundAttributesType {
        DerivativeBased?: boolean;
        HedgeFund?: boolean;
        MasterFeeder?: boolean;
        PhysicalFull?: boolean;
        PhysicalSample?: boolean;
        SyntheticReplication?: boolean;
        UCITS?: boolean;
    }

    /* *
     *
     *  Functions
     *
     * */

    export function isSecurityDetails (
        json: unknown
    ) {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as SecurityDetailsResponse).Id === 'string' &&
            typeof (json as SecurityDetailsResponse).Currency === 'object' &&
            (
                (json as SecurityDetailsResponse).TrailingPerformance.length === 0 ||
                isTrailingPerformance((json as SecurityDetailsResponse).TrailingPerformance[0])
            )
        );
    }


    export function isSecurityDetailsResponse (
        json?: unknown
    ): json is Array<SecurityDetailsResponse> {
        return (
            Array.isArray(json) &&
            json.every(isSecurityDetails)
        );
    }


    function isTrailingPerformance (
        json?: unknown
    ): json is SecurityDetailsTrailingPerformance {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as SecurityDetailsTrailingPerformance).ReturnType === 'string' &&
            (
                Array.isArray((json as SecurityDetailsTrailingPerformance).Return) &&
                isReturn((json as SecurityDetailsTrailingPerformance).Return[0])
            )
        );
    }


    function isReturn (
        json?: unknown
    ): json is SecurityDetailsReturn {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as SecurityDetailsReturn).Value === 'number' &&
            typeof (json as SecurityDetailsReturn).TimePeriod === 'string' &&
            typeof (json as SecurityDetailsReturn).Date === 'string' &&
            (
                typeof (json as SecurityDetailsReturn).Annualized === 'undefined' ||
                typeof (json as SecurityDetailsReturn).Annualized === 'boolean'
            )
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default SecurityDetailsJSON;
