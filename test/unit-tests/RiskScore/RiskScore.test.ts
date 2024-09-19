import * as Assert from 'node:assert/strict';
import RiskScoreJSON from '../../../src/RiskScore/RiskScoreJSON';

export function riskScoreResponseValidation () {
    const exampleResponse = {
        'riskScores': [
            {
                'portfolio': {
                    'name': 'TestPortfolio1',
                    'riskScore': 61.1317731,
                    'alignmentScore': 0,
                    'rSquared': 0.6978923540129797,
                    'retainedWeightProxied': 0,
                    'scoringMethodUsed': 'RBSA',
                    'effectiveDate': '2024-07-31'
                }
            }
        ],
        'metadata': {
            'requestId': '307023bf-c6a0-4888-b400-bcc63379a4cd',
            'time': '2024-09-19T07:18:51.9305701Z'
        }
    };

    Assert.ok(RiskScoreJSON.isResponse(exampleResponse));
}
