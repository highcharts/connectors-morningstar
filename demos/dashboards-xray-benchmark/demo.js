import { getPostmanFile } from '../utils/postman-localstorage.js';

getPostmanFile(displaySecurityDetails);

const loadingLabel = document.getElementById('loading-label');

const globalStockSectorMap = {
    99: 'Not Classified',
    101: 'Basic Materials',
    102: 'Consumer Staples',
    103: 'Financial Services',
    104: 'Real Estate',
    205: 'Consumer Defensive',
    206: 'Healthcare',
    207: 'Utilities',
    308: 'Communication Services',
    309: 'Energy',
    310: 'Industrials',
    311: 'Technology'
};

const assetAllocationMap = {
    1: 'Stock',
    2: 'Bond',
    3: 'Cash',
    4: 'Other',
    99: 'Not Classified'
};

const regionalExposureMap = {
    1: 'United States',
    2: 'Canada',
    3: 'Latin America',
    4: 'United Kingdom',
    5: 'Eurozone',
    6: 'Europe - ex Euro',
    7: 'Europe - Emerging',
    8: 'Africa',
    9: 'Middle East',
    10: 'Japan',
    11: 'Australasia',
    12: 'Asia - Developed',
    13: 'Asia - Emerging',
    14: 'Emerging Market',
    15: 'Developed Country',
    16: 'Not Classified',
    99: 'Other'
};

const styleBoxMap = {
    1: 'Large Value',
    2: 'Large Blend',
    3: 'Large Growth',
    4: 'Mid Value',
    5: 'Mid Blend',
    6: 'Mid Growth',
    7: 'Small Value',
    8: 'Small Blend',
    9: 'Small Growth',
    99: 'Not classified'
};

async function displaySecurityDetails (postmanJSON) {
   const board = Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'xray',
            type: 'MorningstarXRay',
            options: {
                postman: {
                    environmentJSON: postmanJSON
                },
                benchmarkId: 'EUCA000812',
                currencyId: 'GBP',
                dataPoints: [{
                    type: 'portfolio',
                    dataPoints: [
                        'AssetAllocationMorningstarEUR3',
                        'GlobalStockSector',
                        'RegionalExposure',
                        'HistoricalPerformanceSeries',
                        ['PerformanceReturn', 'M0', 'M1', 'M2', 'M3', 'M6', 'M12'],
                        'StyleBox',
                        ['StandardDeviation', 'M', 'M36'],
                        ['SharpeRatio', 'M', 'M36'],
                        'UnderlyingHolding'
                    ]
                }, {
                    type: 'benchmark',
                    dataPoints: [
                        'HistoricalPerformanceSeries',
                        ['PerformanceReturn', 'M0', 'M1', 'M2', 'M3', 'M6', 'M12'],
                        'ShowBreakdown'
                    ]
                }],
                holdings: [
                    {
                        id: 'F0GBR052QA',
                        idType: 'MSID',
                        type: HighchartsConnectors.Morningstar.Shared
                            .MorningstarSecurityType.OpenEndFund,
                        weight: 50,
                        holdingType: 'weight'
                    }, {
                        id: 'GB00BWDBJF10',
                        idType: 'ISIN',
                        type: HighchartsConnectors.Morningstar.Shared
                            .MorningstarSecurityType.OpenEndFund,
                        weight: 50
                    }
                ]
            }
        }]
    },
    components: [
        {
            renderTo: 'dashboard-col-0',
            connector: {
                id: 'xray',
                dataTableKey: 'AssetAllocation'
            },
            type: 'DataGrid',
            title: 'Morningstar EUR3',
            dataGridOptions: {
                header: [{
                    format: 'Type',
                    columnId: 'MorningstarEUR3_L_Categories'
                }, {
                    format: 'Long',
                    columnId: 'MorningstarEUR3_L_Values'
                }, {
                    format: 'Long (Benchmark)',
                    columnId: 'MorningstarEUR3_L_Values_Benchmark'
                }, { 
                    format: 'Net',
                    columnId: 'MorningstarEUR3_N_Values'
                },  {
                    format: 'Net (Benchmark)',
                    columnId: 'MorningstarEUR3_N_Values_Benchmark'
                }, {
                    format: 'Short',
                    columnId: 'MorningstarEUR3_S_Values'
                }, {
                    format: 'Short (Benchmark)',
                    columnId: 'MorningstarEUR3_S_Values_Benchmark'
                }],
                columns: [{
                    id: 'MorningstarEUR3_L_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                assetAllocationMap[this.value] : '';
                        }
                    }
                }, {
                    id: 'MorningstarEUR3_L_Values',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }, {
                    id: 'MorningstarEUR3_L_Values_Benchmark',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }, {
                    id: 'MorningstarEUR3_N_Values',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }, {
                    id: 'MorningstarEUR3_N_Values_Benchmark',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }, {
                    id: 'MorningstarEUR3_S_Values',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }, {
                    id: 'MorningstarEUR3_S_Values_Benchmark',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-1',
            connector: {
                id: 'xray',
                dataTableKey: 'GlobalStockSector'
            },
            type: 'DataGrid',
            title: 'Global Stock Sector',
            dataGridOptions: {
                header: [{
                    format: 'Net',
                    columnId: 'N_Categories'
                }, {
                    format: 'Values',
                    columnId: 'N_Values'
                }],
                columns: [{
                    id: 'N_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                globalStockSectorMap[this.value] : '';
                        }
                    }
                }, {
                    id: 'N_Values',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-2',
            connector: {
                id: 'xray',
                dataTableKey: 'RegionalExposure'
            },
            type: 'DataGrid',
            title: 'Regional Exposure',
            dataGridOptions: {
                header: [{
                    format: 'Net',
                    columnId: 'N_Categories'
                }, {
                    format: 'Values',
                    columnId: 'N_Values'
                }, {
                    format: 'Values (Benchmark)',
                    columnId: 'N_Values_Benchmark'
                }],
                columns: [{
                    id: 'N_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                regionalExposureMap[this.value] : '';
                        }
                    }
                }, {
                    id: 'N_Values',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }, {
                    id: 'N_Values_Benchmark',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-3',
            connector: {
                id: 'xray',
                dataTableKey: 'RiskStatistics'
            },
            type: 'DataGrid',
            title: 'Risk Statistics',
            dataGridOptions: {
                header: [{
                    format: 'Sharpe Ratio M36',
                    columnId: 'SharpeRatio_M_M36'
                }, {
                    format: 'Standard Deviation M36',
                    columnId: 'StandardDeviation_M_M36'
                }]
            }
        }, {
            renderTo: 'dashboard-col-4',
            connector: {
                id: 'xray',
                dataTableKey: 'StyleBox'
            },
            type: 'DataGrid',
            title: 'Style Box',
            dataGridOptions: {
                header: [{
                    format: 'Category',
                    columnId: 'N_Categories'
                }, {
                    format: 'Value',
                    columnId: 'N_Values'
                }, {
                    format: 'Value (Benchmark)',
                    columnId: 'N_Values_Benchmark'
                }],
                columns: [{
                    id: 'N_Categories',
                    cells: {
                        formatter: function () {
                            return this.value !== void 0 ?
                                styleBoxMap[this.value] : '';
                        }
                    }
                }, {
                    id: 'N_Values',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }, {
                    id: 'N_Values_Benchmark',
                    cells: {
                        format: '{value:.2f}%'
                    }
                }]
            }
        }, {
            renderTo: 'dashboard-col-5',
            connector: {
                id: 'xray',
                dataTableKey: 'TrailingPerformance'
            },
            type: 'DataGrid',
            title: 'Trailing Performance',
            dataGridOptions: {
                header: [{
                    format: 'Time Period',
                    columnId: 'MonthEnd_TimePeriod'
                }, {
                    format: 'Value (£)',
                    columnId: 'MonthEnd_Value'
                }, {
                    format: 'Value (Benchmark, £)',
                    columnId: 'MonthEnd_Value_Benchmark'
                }]
            }
        }, {
            renderTo: 'dashboard-col-6',
            connector: {
                id: 'xray',
                dataTableKey: 'HistoricalPerformanceSeries'
            },
            type: 'DataGrid',
            title: 'Total Return (Benchmark)',
            dataGridOptions: {
                header: [{
                    format: 'M1 (Date)',
                    columnId: 'TotalReturn_M1_Benchmark'
                }, {
                    format: 'Value (£)',
                    columnId: 'TotalReturn_M1_Value_Benchmark'
                }, {
                    format: 'M3 (Date)',
                    columnId: 'TotalReturn_M3_Benchmark'
                }, {
                    format: 'Value (£)',
                    columnId: 'TotalReturn_M3_Value_Benchmark'
                }, {
                    format: 'M12 (Date)',
                    columnId: 'TotalReturn_M12_Benchmark'
                }, {
                    format: 'Value (£)',
                    columnId: 'TotalReturn_M12_Value_Benchmark'
                }]
            }
        }, {
            renderTo: 'dashboard-col-7',
            connector: {
                id: 'xray',
                dataTableKey: 'UnderlyHoldings'
            },
            type: 'DataGrid',
            title: 'Underlying Holdings',
            dataGridOptions: {
                header: [{
                    format: 'Holding ID',
                    columnId: 'holdingId'
                }, {
                    format: 'Name',
                    columnId: 'name'
                }, {
                    format: 'Security Type',
                    columnId: 'securityType'
                }, {
                    format: 'Weight',
                    columnId: 'weight'
                }, {
                    format: 'Market Value',
                    columnId: 'marketValue'
                }, {
                    format: 'Currency',
                    columnId: 'currencyId'
                }, {
                    format: 'Country',
                    columnId: 'country'
                }]
            }
        }
    ]
});

    board.dataPool
        .getConnectorTable('xray')
        .then(() => {
            loadingLabel.style.display = 'none';
    });

}