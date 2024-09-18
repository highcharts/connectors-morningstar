/* *
 *
 *  (c) 2009-2024 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Eskil Gjerde Sviggum
 *
 * */


'use strict';


/* *
 *
 *  Namespace
 *
 * */


export namespace RiskScoreJSON {


    /* *
     *
     *  Declarations
     *
     * */

    export type Response = {
        riskScores: RiskScore[]
    };

    export type RiskScore = {
        portfolio: RiskScorePortfolio,
        metadata: RiskScoreMetadata
    };

    export type RiskScorePortfolio = {
        externalId: string,
        name: string,
        riskScore: number,
        alignmentScore: number,
        rSquared: number,
        retainedWeightProxied: number,
        scoringMethodUsed: string,
        effectiveDate: string
    };

    export type RiskScoreMetadata = {
        requestId: string,
        messages: RiskScoreMetadataMessage[]
    };

    export type RiskScoreMetadataMessage = {
        type: string,
        message: string,
        invalidHoldings: RiskScoreInvalidHolding[]
    };

    export type RiskScoreInvalidHolding = {
        identifier: string,
        identifierType: string,
        status: string
    };


    /* *
     *
     *  Functions
     *
     * */

    export function isResponse (
        json?: unknown
    ): json is Response {
        return (
            !!json &&
            typeof json === 'object' &&
            Array.isArray((json as Response).riskScores) &&
            (
                (json as Response).riskScores.length === 0 ||
                isRiskScore((json as Response).riskScores[0])
            )
        );
    }

    function isRiskScore (
        json?: unknown
    ): json is RiskScore {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RiskScore).portfolio === 'object' &&
            typeof (json as RiskScore).metadata === 'object' &&
            isRiskScorePortfolio((json as RiskScore).portfolio) &&
            isRiskScoreMetadata((json as RiskScore).metadata)
        );
    }

    function isRiskScorePortfolio (
        json?: unknown
    ): json is RiskScorePortfolio {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RiskScorePortfolio).externalId              === 'string' &&
            typeof (json as RiskScorePortfolio).name                    === 'string' &&
            typeof (json as RiskScorePortfolio).riskScore               === 'number' &&
            typeof (json as RiskScorePortfolio).alignmentScore          === 'number' &&
            typeof (json as RiskScorePortfolio).rSquared                === 'number' &&
            typeof (json as RiskScorePortfolio).retainedWeightProxied   === 'number' &&
            typeof (json as RiskScorePortfolio).scoringMethodUsed       === 'string' &&
            typeof (json as RiskScorePortfolio).effectiveDate           === 'string'
        );
    }

    function isRiskScoreMetadata (
        json?: unknown
    ): json is RiskScoreMetadata {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RiskScoreMetadata).requestId === 'string' &&
            isRiskScoreMetadataMessages((json as RiskScoreMetadata).messages)
        );
    }

    function isRiskScoreMetadataMessages (
        json?: unknown
    ): json is RiskScoreMetadataMessage[] {
        return (
            !!json &&
            Array.isArray(json) &&
            (
                json.length === 0 ||
                isRiskScoreMetadataMessage(json[0])
            )
        );
        
    }

    function isRiskScoreMetadataMessage (
        json?: unknown
    ): json is RiskScoreMetadataMessage {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RiskScoreMetadataMessage).type === 'string' &&
            typeof (json as RiskScoreMetadataMessage).message === 'string' &&
            Array.isArray((json as RiskScoreMetadataMessage).invalidHoldings) &&
            (
                (json as RiskScoreMetadataMessage).invalidHoldings.length === 0 ||
                isRiskScoreInvalidHolding((json as RiskScoreMetadataMessage).invalidHoldings[0])
            )
        );
    }

    function isRiskScoreInvalidHolding (
        json?: unknown
    ): json is RiskScoreInvalidHolding {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RiskScoreInvalidHolding).identifier     === 'string' &&
            typeof (json as RiskScoreInvalidHolding).identifierType === 'string' &&
            typeof (json as RiskScoreInvalidHolding).status         === 'string'
        );
    }


}


/* *
 *
 *  Default Export
 *
 * */


export default RiskScoreJSON;
