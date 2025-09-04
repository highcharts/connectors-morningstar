/* *
 *
 *  (c) 2009-2025 Highsoft AS
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
        HistoricalPerformanceSeries?: SecurityDetailsHistoricalPerformance[];
        RiskStatistics?: RiskStatisticsItem[];
    }

    interface RiskStatisticsItem {
        CurrencyId: string;
        CurrencyOption: string;
        Date: string;
        Type: string;
        ReturnType: string;
        benchmarkType: string;
        Alphas?: GenericRiskStatisticsResponse[];
        ArithmeticMeans?: GenericRiskStatisticsResponse[];
        Betas?: GenericRiskStatisticsResponse[];
        InformationRatios?: GenericRiskStatisticsResponse[];
        MaxDrawdowns?: DrawdownRiskStatisticsResponse[];
        MaximumReturns?: ReturnRiskStatisticsResponse[];
        MinimumReturns?: ReturnRiskStatisticsResponse[];
        NumberOfNegatives?: OccurrenceRiskStatisticsResponse[];
        NumberOfPositives?: OccurrenceRiskStatisticsResponse[];
        RSquareds?: GenericRiskStatisticsResponse[];
        SharpeRatios?: GenericRiskStatisticsResponse[];
        SortinoRations?: GenericRiskStatisticsResponse[];
        StandardDeviations?: GenericRiskStatisticsResponse[];
        TrackingErrors?: GenericRiskStatisticsResponse[];
        TreynorRatios?: GenericRiskStatisticsResponse[];
    }

    export type GenericRiskStatisticsResponse = {
        Value: number;
        Frequency: string;
        TimePeriod: string;
    };

    export type OccurrenceRiskStatisticsResponse = {
        Count: number;
        Frequency: string;
        TimePeriod: string;
    };

    interface DrawdownRiskStatisticsResponse extends GenericRiskStatisticsResponse {
        StartDate: string;
        EndDate: string;
    }

    interface ReturnRiskStatisticsResponse extends GenericRiskStatisticsResponse {
        Date: string;
    }

    export type PortfoliosType = {
        BondStyleBoxBreakdown?: BondStyleBoxBreakdownType[];
        AssetAllocations?: AssetAllocationType[]
        RegionalExposure?: RegionalExposureType[]
        GlobalStockSectorBreakdown?: GlobalStockSectorBreakdownType[]
        CountryExposure?: CountryExposureType[]
        PortfolioHoldings?: PortfolioHoldingsType[]
        MarketCapitalBreakdown?: GenericBreakdownType[]
        IndustryBreakdown?: GenericBreakdownType[]
        IndustryGroupBreakdown?: GenericBreakdownType[]
        CreditQualityBreakdown?: GenericBreakdownType[]
        BondStatistics?: BondStatisticsType
        StyleBoxBreakdown?: GenericBreakdownType[]
    };

    export type BondStyleBoxBreakdownType = {
        BreakdownValues: BreakDownValues[];
        SalePosition: string;
    };

    export type BondStatisticsType = {
        AverageCoupon?: number
        AverageCreditQuality?: number
        AverageCreditQualityCode?: string
        AveragePrice?: number
        CurrentYield?: number
        YieldToMaturity?: number
        EffectiveDuration?: number
        ModifiedDuration?: number
        EffectiveMaturity?: number
        StyleBox?: number
    };

    export type AssetAllocationType = {
        BreakdownValues: BreakDownValues[]
        SalePosition: string
        Type: string
    };

    export type BreakDownValues = {
        Value: number
        Type: string
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

    export type PortfolioHoldingsType = {
        [key: string]: string | number
        Id: string
        ExternalId: string
        DetailHoldingTypeId: string
        ExternalName: string
        PerformanceId: string
        ISIN: string
        CurrencyId: string
        CountryId: string
        SecurityName: string
        Weighting: number
        IndustryId: number
        MarketValue: number
        GlobalSectorId: string
        NumberOfShare: number
        LocalCurrencyCode: string
        GICSIndustryId: string
    };

    export type GenericBreakdownType = {
        BreakdownValues: BreakDownValues[]
        SalePosition: string
        NotClassified: number
    };

    interface SecurityDetailsTrailingPerformance {
        ReturnType: string;
        Return: SecurityDetailsReturn[];
        Type: string;
    }

    interface SecurityDetailsHistoricalPerformance {
        ReturnType: string;
        Return: SecurityDetailsReturn[];
        TimePeriod: string;
        Frequency: string;
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
                (json as SecurityDetailsResponse).TrailingPerformance?.length &&
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
