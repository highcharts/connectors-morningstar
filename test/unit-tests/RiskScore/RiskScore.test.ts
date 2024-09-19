import * as Assert from 'node:assert/strict';
import * as MC from '../../../code/connectors-morningstar.src';
import RiskScoreJSON from '../../../src/RiskScore/RiskScoreJSON';

export async function riskScoreLoad (
    api: MC.Shared.MorningstarAPIOptions
) {
    const connector = new MC.RiskScoreConnector({
        api,
        portfolios: [
            {
                name: 'TestPortfolio1',
                currency: 'USD',
                totalValue: 100,
                holdings: [
                    {
                        id: 'F00000VCTT',
                        idType: 'SecurityID',
                        weight: 50
                    },
                    {
                        id: 'AAPL',
                        idType: 'TradingSymbol',
                        weight: 50
                    }
                ]
            }
        ]
      });
  
      Assert.ok(
          connector instanceof MC.RiskScoreConnector,
          'Connector should be instance of RiskScoreConnector class.'
      );
  
      Assert.ok(
          connector.converter instanceof
          MC.RiskScoreConverter,
          'Converter should be instance of RiskScoreConverter.'
      );
  
      await connector.load();
  
      Assert.deepStrictEqual(
          connector.table.getColumnNames(),
          ['TestPortfolio1_EffectiveDate',
            'TestPortfolio1_RiskScore',
            'TestPortfolio1_AlignmentScore',
            'TestPortfolio1_RSquared',
            'TestPortfolio1_RetainedWeightProxied',
            'TestPortfolio1_ScoringMethodUsed'],
          'Connector table should exist of expected columns.'
      );
  
      Assert.strictEqual(
          connector.table.getRowCount(),
          1,
          'Connector table should have one row.'
      );
}

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
