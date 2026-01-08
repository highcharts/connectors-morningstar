/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Sophie Bremer
 *
 * */


'use strict';


/* *
 *
 *  Namespace
 *
 * */


namespace XRayJSON {


    /* *
     *
     *  Declarations
     *
     * */


    export interface AssetAllocation {
        type: string;
        salePosition: string;
        values: Record<number, number>;
    }


    export interface Benchmark {
        breakdowns?: Breakdowns;
        historicalPerformanceSeries?: Array<HistoricalPerformance>;
        trailingPerformance?: Array<TrailingPerformance>;
        underlyHoldings?: Array<UnderlyHolding>
        riskStatistics?: RiskStatistics;
    }


    export interface Breakdowns {
        assetAllocation: Array<AssetAllocation>;
        regionalExposure?: Array<RegionalExposure>;
        globalStockSector?: Array<GlobalStockSector>;
        styleBox?: Array<StyleBox>;
        creditQuality?: Array<CreditQuality>;
    }


    export interface HistoricalPerformance {
        frequency: string;
        returns: Array<HistoricalReturn>;
        returnType: string;
        startDate: string;
        timePeriod: string;
    }

    export interface RiskStatistics {
        currencyId: string;
        endDate: string;
        sharpeRatio?: Array<RiskStatisticsReturn>;
        standardDeviation?: Array<RiskStatisticsReturn>;
        type: string;
    }

    export interface RiskStatisticsReturn {
        frequency: string;
        timePeriod: string;
        value: number;
    }

    export interface UnderlyHolding {
        [key: string]: string | number;
        country: string;
        countryId: string;
        currencyId: string;
        currencyName: string;
        globalIndustryId: string;
        globalSectorId: string;
        holdingId: string;
        iSIN: string;
        marketValue: number;
        name: string;
        performanceId: string;
        sector: string;
        sectorId: string;
        securityId: string;
        securityType: string;
        weight: number;
    }

    export type HistoricalReturn = [
        date: string,
        value: number
    ];


    export interface RegionalExposure {
        salePosition: string;
        values: Record<number, number>;
    }

    export interface GlobalStockSector {
        salePosition: string;
        values: Record<number, number>;
    }


    export interface Response {
        XRay: Array<XRayResponse>;
    }


    export interface Status {
        detailedStatusMessage: string;
        statusCode: number;
        statusDescription: string;
    }

    export interface StyleBox {
        salePosition: string;
        values: Record<number, number>;
    }


    export interface CreditQuality {
        salePosition: string;
        values: Record<number, number>;
    }


    export interface TrailingPerformance {
        currencyId: string;
        endDate: string;
        returns: Array<TrailingReturn>;
        returnType: string;
        type: string;
    }


    export interface TrailingReturn {
        timePeriod: string;
        value: number;
    }


    export interface XRayResponse extends Benchmark {
        benchmark?: Array<Benchmark>;
        benchmarkId?: string;
        currencyId?: string;
        status?: Status;
    }


    /* *
     *
     *  Functions
     *
     * */


    function isAssetAllocation (
        json?: unknown
    ): json is AssetAllocation {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as AssetAllocation).salePosition === 'string' &&
            typeof (json as AssetAllocation).type === 'string' &&
            typeof (json as AssetAllocation).values === 'object'
        );
    }

    function isRegionalExposure (
        json?: unknown
    ): json is RegionalExposure {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RegionalExposure).salePosition === 'string' &&
            typeof (json as RegionalExposure).values === 'object'
        );
    }

    function isGlobalStockSector (
        json?: unknown
    ): json is GlobalStockSector {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as GlobalStockSector).salePosition === 'string' &&
            typeof (json as GlobalStockSector).values === 'object'
        );
    }


    function isBenchmark (
        json?: unknown
    ): json is Benchmark {
        return (
            !!json &&
            typeof json === 'object' &&
            (
                typeof (json as Benchmark).breakdowns === 'undefined' ||
                isBreakdowns((json as Benchmark).breakdowns)
            ) &&
            (
                typeof (json as Benchmark).historicalPerformanceSeries === 'undefined' ||
                isHistoricalPerformanceSeries((json as Benchmark).historicalPerformanceSeries)
            ) &&
            (
                typeof (json as Benchmark).trailingPerformance === 'object' ||
                typeof (json as Benchmark).trailingPerformance === 'undefined'
            )
        );
    }

    function isStyleBox (
        json?: unknown
    ): json is StyleBox {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as StyleBox).salePosition === 'string' &&
            typeof (json as StyleBox).values === 'object'
        );
    }


    function isBreakdowns (
        json?: unknown
    ): json is Breakdowns {
        return (
            !!json &&
            typeof json === 'object' &&

            (json as Breakdowns).assetAllocation instanceof Array &&
            (
                (json as Breakdowns).assetAllocation.length === 0 ||
                isAssetAllocation((json as Breakdowns).assetAllocation[0])
            ) || (
                !(json as Breakdowns).globalStockSector ||
                isGlobalStockSector((json as Breakdowns).globalStockSector?.[0])
            ) || (
                !(json as Breakdowns).regionalExposure ||
                isRegionalExposure((json as Breakdowns).regionalExposure?.[0])
            ) || (
                !(json as Breakdowns).styleBox ||
                isStyleBox((json as Breakdowns).styleBox?.[0])
            )
        );
    }


    function isHistoricalPerformance (
        json?: unknown
    ): json is HistoricalPerformance {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as HistoricalPerformance).frequency === 'string' &&
            typeof (json as HistoricalPerformance).returnType === 'string' &&
            typeof (json as HistoricalPerformance).startDate === 'string' &&
            typeof (json as HistoricalPerformance).timePeriod === 'string' &&
            (json as HistoricalPerformance).returns instanceof Array &&
            (
                (json as HistoricalPerformance).returns.length === 0 ||
                isHistoricalReturn((json as HistoricalPerformance).returns[0])
            )
        );
    }


    function isHistoricalPerformanceSeries (
        json?: unknown
    ): json is Array<HistoricalPerformance> {
        return (
            json instanceof Array &&
            (
                json.length === 0 ||
                isHistoricalPerformance(json[0])
            )
        );
    }


    function isHistoricalReturn (
        json?: unknown
    ): json is HistoricalReturn {
        return (
            json instanceof Array &&
            typeof json[0] === 'string' &&
            typeof json[1] === 'number'
        );
    }

    export function isResponse (
        json?: unknown
    ): json is Response {
        return (
            !!json &&
            typeof json === 'object' &&
            isXRayResponse((json as Response).XRay)
        );
    }

    function isStatus (
        json?: unknown
    ): json is Status {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as Status).detailedStatusMessage === 'string' &&
            typeof (json as Status).statusCode === 'number' &&
            typeof (json as Status).statusDescription === 'string'
        );
    }


    export function isXRayResponse (
        json?: unknown
    ): json is XRayResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            isBenchmark(json as XRayResponse) &&
            (
                typeof (json as XRayResponse).benchmark === 'undefined' ||
                isBenchmark((json as XRayResponse).benchmark)
            ) &&
            (
                typeof (json as XRayResponse).breakdowns === 'undefined' ||
                isBreakdowns((json as XRayResponse).breakdowns)
            ) &&
            (
                typeof (json as XRayResponse).status === 'undefined' ||
                isStatus((json as XRayResponse).status)
            )
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default XRayJSON;
