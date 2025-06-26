/* *
 *
 *  (c) 2009-2025 Highsoft AS
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

import { RiskScoreInvalidHolding, RiskScoreMetadataMessage } from './RiskScoreOptions';


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
        riskScores: RiskScoreResponse[]
    };

    export type RiskScoreResponse = {
        portfolio: RiskScorePortfolioResponse,
        metadata?: RiskScoreMetadataResponse
    };

    export type RiskScorePortfolioResponse = {
        externalId?: string,
        name: string,
        riskScore: number,
        alignmentScore: number,
        rSquared: number,
        retainedWeightProxied: number,
        scoringMethodUsed: string,
        effectiveDate: string
    };

    export type RiskScoreMetadataResponse = {
        messages: RiskScoreMetadataMessage[]
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
                isRiskScoreResponse((json as Response).riskScores[0])
            )
        );
    }

    function isRiskScoreResponse (
        json?: unknown
    ): json is RiskScoreResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RiskScoreResponse).portfolio === 'object' &&
            isRiskScorePortfolioResponse((json as RiskScoreResponse).portfolio) &&
            (
                typeof (json as RiskScoreResponse).metadata === 'undefined' ||
                isRiskScoreMetadataResponse((json as RiskScoreResponse).metadata)
            )
        );
    }

    function isRiskScorePortfolioResponse (
        json?: unknown
    ): json is RiskScorePortfolioResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            typeof (json as RiskScorePortfolioResponse).name                    === 'string' &&
            typeof (json as RiskScorePortfolioResponse).riskScore               === 'number' &&
            typeof (json as RiskScorePortfolioResponse).alignmentScore          === 'number' &&
            typeof (json as RiskScorePortfolioResponse).rSquared                === 'number' &&
            typeof (json as RiskScorePortfolioResponse).retainedWeightProxied   === 'number' &&
            typeof (json as RiskScorePortfolioResponse).scoringMethodUsed       === 'string' &&
            typeof (json as RiskScorePortfolioResponse).effectiveDate           === 'string'
        );
    }

    function isRiskScoreMetadataResponse (
        json?: unknown
    ): json is RiskScoreMetadataResponse {
        return (
            !!json &&
            typeof json === 'object' &&
            isRiskScoreMetadataMessages((json as RiskScoreMetadataResponse).messages)
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
