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
 *
 * */


/* *
 *
 *  Imports
 *
 * */


import GoalAnalysisOptions from './GoalAnalysis/GoalAnalysisOptions';
import RiskScoreOptions from './RiskScore/RiskScoreOptions';
import RNANewsOptions from './RNANews/RNANewsOptions';
import TimeSeriesOptions from './TimeSeries/TimeSeriesOptions';
import XRayOptions from './XRay/XRayOptions';
import InvestmentScreenerOptions from './Screeners/InvestmentScreener/InvestmentScreenerOptions';
import InvestorPreferencesOptions from './Screeners/InvestorPreferences/InvestorPreferencesOptions';

/* *
 *
 *  API Options
 *
 * */


/**
 * Available types of the Highcharts Morningstar Connectors.
 */
interface Options {
    GoalAnalysis: GoalAnalysisOptions;
    RiskScore: RiskScoreOptions;
    RNANews: RNANewsOptions;
    TimeSeries: TimeSeriesOptions;
    XRay: XRayOptions;
    InvestmentScreener: InvestmentScreenerOptions;
    InvestorPreferences: InvestorPreferencesOptions;
}
