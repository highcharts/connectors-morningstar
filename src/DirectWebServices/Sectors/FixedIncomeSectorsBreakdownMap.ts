/* *
 *
 *  (c) 2009-2026 Highsoft AS
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 *  Authors:
 *  - Pawel Dalek
 *
 * */

'use strict';

/* *
 *
 *  Imports
 *
 * */

import FixedIncomeSectorsBreakdown from './FixedIncomeSectorsBreakdownOptions';
import SectorsBreakdown from './SectorsBreakdownOptions';

import type { FieldsMapping } from './FixedIncomeSectorsBreakdownJSON';

/* *
 *
 *  Constants
 *
 * */

// Region variants registered alongside sectors
const regionVariants = [
    'AmericaUnitedStatesOf',
    'Argentina',
    'Australia',
    'Austria',
    'Bahamas',
    'Belgium',
    'Belize',
    'Bermuda',
    'Bolivia',
    'Brazil',
    'Canada',
    'CaymanIslands',
    'ChannelIslands',
    'Chile',
    'China',
    'Colombia',
    'CzechRepublic',
    'Denmark',
    'Egypt',
    'Finland',
    'France',
    'FranceMetropolitan',
    'FrontierCountry',
    'Germany',
    'Greece',
    'Greenland',
    'Guernsey',
    'HolySeeVaticanCityState',
    'HongKong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Ireland',
    'IsleOfMan',
    'Israel',
    'Italy',
    'Japan',
    'Jersey',
    'KoreaRepublicOf',
    'Liechtenstein',
    'Luxembourg',
    'Malaysia',
    'Mexico',
    'Monaco',
    'Morocco',
    'Netherlands',
    'NewZealand',
    'Norway',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'PuertoRico',
    'RussianFederation',
    'Singapore',
    'SouthAfrica',
    'Spain',
    'Sweden',
    'Switzerland',
    'Taiwan',
    'Thailand',
    'Turkey',
    'UnitedKingdom',
    'Uruguay',
    'Venezuela',
    'VirginIslandsBritish',
    'VirginIslandsUS'
];

// Possible region sector variants
const sectorVariants = [
    'SuperSectorGovernment',
    'SecondarySectorTreasury',
    'SecondarySectorInflationProtected',
    'SecondarySectorAgencyorquasiAgency'
];

// Morningstar fixed income sector hierarchy
const fixedIncome = {
    SuperSectorGovernment: {
        PrimarySectorGovernment: [
            'SecondarySectorTreasury',
            'SecondarySectorInflationProtected'
        ],
        PrimarySectorGovernmentRelated: [
            'SecondarySectorAgencyorquasiAgency',
            'SecondarySectorSupranational',
            'SecondarySectorInterestRateDerivative',
            'SecondarySectorTreasuryFutures',
            'SecondarySectorGovernmentRelatedOther'
        ]
    },
    SuperSectorMunicipal: {
        PrimarySectorMunicipalTaxable: [
            'SecondarySectorTaxableGeneralObligationStateAndLocal',
            'SecondarySectorTaxableAdvanceRefunded',
            'SecondarySectorTaxableTobacco',
            'SecondarySectorTaxableEducation',
            'SecondarySectorTaxableHealth',
            'SecondarySectorTaxableHousing',
            'SecondarySectorTaxableIndustrial',
            'SecondarySectorTaxableTransportation',
            'SecondarySectorTaxableUtilities',
            'SecondarySectorTaxableWaterAndSewer',
            'SecondarySectorTaxableMiscRevenueorunspecified'
        ],
        PrimarySectorMunicipalTaxExempt: [
            'SecondarySectorTaxExemptGeneralObligationStateAndLocal',
            'SecondarySectorTaxExemptAdvanceRefunded',
            'SecondarySectorTaxExemptTobacco',
            'SecondarySectorTaxExemptEducation',
            'SecondarySectorTaxExemptHealth',
            'SecondarySectorTaxExemptHousing',
            'SecondarySectorTaxExemptIndustrial',
            'SecondarySectorTaxExemptTransportation',
            'SecondarySectorTaxExemptUtilities',
            'SecondarySectorTaxExemptWaterAndSewer',
            'SecondarySectorTaxExemptMiscRevenueorunspecified'
        ]
    },
    SuperSectorCorporate: {
        PrimarySectorBankLoan: [
            'SecondarySectorBankLoanBasicMaterials',
            'SecondarySectorBankLoanConsumerCyclical',
            'SecondarySectorBankLoanFinancialServices',
            'SecondarySectorBankLoanRealEstate',
            'SecondarySectorBankLoanConsumerDefensive',
            'SecondarySectorBankLoanHealthCare',
            'SecondarySectorBankLoanUtilities',
            'SecondarySectorBankLoanCommunicationServices',
            'SecondarySectorBankLoanEnergy',
            'SecondarySectorBankLoanIndustrials',
            'SecondarySectorBankLoanTechnology',
            'SecondarySectorBankLoanUnspecified'
        ],
        PrimarySectorConvertible: [
            'SecondarySectorConvertibleBasicMaterials',
            'SecondarySectorConvertibleConsumerCyclical',
            'SecondarySectorConvertibleFinancialServices',
            'SecondarySectorConvertibleRealEstate',
            'SecondarySectorConvertibleConsumerDefensive',
            'SecondarySectorConvertibleHealthCare',
            'SecondarySectorConvertibleUtilities',
            'SecondarySectorConvertibleCommunicationServices',
            'SecondarySectorConvertibleEnergy',
            'SecondarySectorConvertibleIndustrials',
            'SecondarySectorConvertibleTechnology',
            'SecondarySectorConvertibleUnspecified'
        ],
        PrimarySectorCorporateBond: [
            'SecondarySectorCorporateBasicMaterials',
            'SecondarySectorCorporateConsumerCyclical',
            'SecondarySectorCorporateFinancialServices',
            'SecondarySectorCorporateRealEstate',
            'SecondarySectorCorporateConsumerDefensive',
            'SecondarySectorCorporateHealthCare',
            'SecondarySectorCorporateUtilities',
            'SecondarySectorCorporateCommunicationServices',
            'SecondarySectorCorporateEnergy',
            'SecondarySectorCorporateIndustrials',
            'SecondarySectorCorporateTechnology',
            'SecondarySectorCorporateUnspecified'
        ],
        PrimarySectorPreferredStock: [
            'SecondarySectorPreferredBasicMaterials',
            'SecondarySectorPreferredConsumerCyclical',
            'SecondarySectorPreferredFinancialServices',
            'SecondarySectorPreferredRealEstate',
            'SecondarySectorPreferredConsumerDefensive',
            'SecondarySectorPreferredHealthCare',
            'SecondarySectorPreferredUtilities',
            'SecondarySectorPreferredCommunicationServices',
            'SecondarySectorPreferredEnergy',
            'SecondarySectorPreferredIndustrials',
            'SecondarySectorPreferredTechnology',
            'SecondarySectorPreferredUnspecified'
        ]
    },
    SuperSectorSecuritized: {
        PrimarySectorAgencyMortgageBacked: [
            'SecondarySectorAgencyPassThru',
            'SecondarySectorAgencyArm',
            'SecondarySectorAgencyCmo',
            'SecondarySectorUnspecified'
        ],
        PrimarySectorNonAgencyResidentialMortgageBacked: [
            'SecondarySectorNonAgencyResidentialMortgageBacked'
        ],
        PrimarySectorCommercialMortgageBacked: [
            'SecondarySectorCommercialMortgageBacked'
        ],
        PrimarySectorCoveredBond: [
            'SecondarySectorCoveredBond'
        ],
        PrimarySectorAssetBacked: [
            'SecondarySectorHomeEquity',
            'SecondarySectorCreditCard',
            'SecondarySectorCboorcdo',
            'SecondarySectorAuto',
            'SecondarySectorStudentLoan',
            'SecondarySectorAssetBackedOther'
        ]
    },
    SuperSectorCashAndEquivalents: {
        PrimarySectorCashAndEquivalents: [
            'SecondarySectorAbs',
            'SecondarySectorCash',
            'SecondarySectorCorporate',
            'SecondarySectorCurrency',
            'SecondarySectorDerivativeCashOffsets',
            'SecondarySectorFrn',
            'SecondarySectorGovernment',
            'SecondarySectorGseoragency',
            'SecondarySectorMbs',
            'SecondarySectorMoneyMarket',
            'SecondarySectorMunicipal',
            'SecondarySectorCommercialPaper',
            'SecondarySectorRepurchaseAgreements',
            'SecondarySectorTdorcd',
            'SecondarySectorCollateral',
            'SecondarySectorCashOther'
        ]
    },
    SuperSectorDerivative: {
        PrimarySectorSwap: [
            'SecondarySectorCreditDefaultSwap',
            'SecondarySectorTotalReturnSwap',
            'SecondarySectorDebtSwap'
        ],
        PrimarySectorForwardorfuture: [
            'SecondarySectorBondFuture',
            'SecondarySectorBondIndexFuture',
            'SecondarySectorCurrencyForwardorfuture',
            'SecondarySectorBondUnit'
        ],
        PrimarySectorOptionorwarrant: [
            'SecondarySectorBondOption',
            'SecondarySectorBondWarrant'
        ]
    }
};

// Morningstar fixed income sector breakdown hierarchy
const fixedIncomeBreakdown = {
    SuperSectorBreakdownGovernment: {
        PrimarySectorBreakdownGovernment: [
            'SecondarySectorBreakdownGovTTreasury',
            'SecondarySectorBreakdownGovTTrsryInflation'
        ],
        PrimarySectorBreakdownGovTRelatd: [
            'SecondarySectorBreakdownGovTRelatDAgency',
            'SecondarySectorBreakdownGovTRelatDSupranatL',
            'SecondarySectorBreakdownGovTRelatDIntRateSwap',
            'SecondarySectorBreakdownGovTRelatDTrsryFuture',
            'SecondarySectorBreakdownGovTRelatDOther'
        ]
    },
    SuperSectorBreakdownUsMuni: {
        PrimarySectorBreakdownUsMuniTaxable: [
            'SecondarySectorBreakdownUsMuniTxblGeneralObligtn',
            'SecondarySectorBreakdownUsMuniTxblEscrow',
            'SecondarySectorBreakdownUsMuniTxblTobaccoSecurtztn',
            'SecondarySectorBreakdownUsMuniTxblEducation',
            'SecondarySectorBreakdownUsMuniTxblHealthcare',
            'SecondarySectorBreakdownUsMuniTxblHousing',
            'SecondarySectorBreakdownUsMuniTxblIndustDev',
            'SecondarySectorBreakdownUsMuniTxblTransport',
            'SecondarySectorBreakdownUsMuniTxblUtility',
            'SecondarySectorBreakdownUsMuniTxblWtrorswr',
            'SecondarySectorBreakdownUsMuniTxblUnspec'
        ],
        PrimarySectorBreakdownUsMuniTaxExempt: [
            'SecondarySectorBreakdownUsMuniTaxExGeneralObligtn',
            'SecondarySectorBreakdownUsMuniTaxExEscrow',
            'SecondarySectorBreakdownUsMuniTaxExTobaccoSecurtztn',
            'SecondarySectorBreakdownUsMuniTaxExEducation',
            'SecondarySectorBreakdownUsMuniTaxExHealthcare',
            'SecondarySectorBreakdownUsMuniTaxExHousing',
            'SecondarySectorBreakdownUsMuniTaxExIndustDev',
            'SecondarySectorBreakdownUsMuniTaxExTransport',
            'SecondarySectorBreakdownUsMuniTaxExUtility',
            'SecondarySectorBreakdownUsMuniTaxExWtrorswr',
            'SecondarySectorBreakdownUsMuniTaxExUnspec'
        ]
    },
    SuperSectorBreakdownCorporate: {
        PrimarySectorBreakdownBankLoans: [
            'SecondarySectorBreakdownBankLnsBasicMaterial',
            'SecondarySectorBreakdownBankLnsConsumCyclical',
            'SecondarySectorBreakdownBankLnsFinclServices',
            'SecondarySectorBreakdownBankLnsRealEstate',
            'SecondarySectorBreakdownBankLnsConsumDefense',
            'SecondarySectorBreakdownBankLnsHealthcare',
            'SecondarySectorBreakdownBankLnsUtility',
            'SecondarySectorBreakdownBankLnsCommunServices',
            'SecondarySectorBreakdownBankLnsEnergy',
            'SecondarySectorBreakdownBankLnsIndustrials',
            'SecondarySectorBreakdownBankLnsTechnology',
            'SecondarySectorBreakdownBankLnsUnspec'
        ],
        PrimarySectorBreakdownConvertibles: [
            'SecondarySectorBreakdownConvertsBasicMaterial',
            'SecondarySectorBreakdownConvertsConsumCyclical',
            'SecondarySectorBreakdownConvertsFinclServices',
            'SecondarySectorBreakdownConvertsRealEstate',
            'SecondarySectorBreakdownConvertsConsumDefense',
            'SecondarySectorBreakdownConvertsHealthcare',
            'SecondarySectorBreakdownConvertsUtility',
            'SecondarySectorBreakdownConvertsCommunServices',
            'SecondarySectorBreakdownConvertsEnergy',
            'SecondarySectorBreakdownConvertsIndustrials',
            'SecondarySectorBreakdownConvertsTechnology',
            'SecondarySectorBreakdownConvertsUnspec'
        ],
        PrimarySectorBreakdownCorporateBond: [
            'SecondarySectorBreakdownCorpBondBasicMaterial',
            'SecondarySectorBreakdownCorpBondConsumCyclical',
            'SecondarySectorBreakdownCorpBondFinclServices',
            'SecondarySectorBreakdownCorpBondRealEstate',
            'SecondarySectorBreakdownCorpBondConsumDefense',
            'SecondarySectorBreakdownCorpBondHealthcare',
            'SecondarySectorBreakdownCorpBondUtility',
            'SecondarySectorBreakdownCorpBondCommunServices',
            'SecondarySectorBreakdownCorpBondEnergy',
            'SecondarySectorBreakdownCorpBondIndustrials',
            'SecondarySectorBreakdownCorpBondTechnology',
            'SecondarySectorBreakdownCorpBondUnspec'
        ],
        PrimarySectorBreakdownPreferreds: [
            'SecondarySectorBreakdownPreferredsBasicMaterial',
            'SecondarySectorBreakdownPreferredsConsumCyclical',
            'SecondarySectorBreakdownPreferredsFinclServices',
            'SecondarySectorBreakdownPreferredsRealEstate',
            'SecondarySectorBreakdownPreferredsConsumDefense',
            'SecondarySectorBreakdownPreferredsHealthcare',
            'SecondarySectorBreakdownPreferredsUtility',
            'SecondarySectorBreakdownPreferredsCommunServices',
            'SecondarySectorBreakdownPreferredsEnergy',
            'SecondarySectorBreakdownPreferredsIndustrials',
            'SecondarySectorBreakdownPreferredsTechnology',
            'SecondarySectorBreakdownPreferredsUnspec'
        ]
    },
    SuperSectorBreakdownSecuritized: {
        PrimarySectorBreakdownUsAgencyMortgage: [
            'SecondarySectorBreakdownUsAgcyMtgPassThru',
            'SecondarySectorBreakdownUsAgcyMtgArm',
            'SecondarySectorBreakdownUsAgcyMtgCmo',
            'SecondarySectorBreakdownUsAgcyMtgUnspec'
        ],
        PrimarySectorBreakdownNonAgencyMortgage: [
            'SecondarySectorBreakdownNonAgcyMtgResidential'
        ],
        PrimarySectorBreakdownCommercialMortgage: [
            'SecondarySectorBreakdownCommercialMortgage'
        ],
        PrimarySectorBreakdownCoveredBond: [
            'SecondarySectorBreakdownCoveredBond'
        ],
        PrimarySectorBreakdownAssetBacked: [
            'SecondarySectorBreakdownAbsHomeEqty',
            'SecondarySectorBreakdownAbsCreditCard',
            'SecondarySectorBreakdownAbsCboorcdo',
            'SecondarySectorBreakdownAbsAuto',
            'SecondarySectorBreakdownAbsStudLoan',
            'SecondarySectorBreakdownAbsOther'
        ]
    },
    SuperSectorBreakdownCashEquiv: {
        PrimarySectorBreakdownCashEquiv: [
            'SecondarySectorBreakdownCashEquivAbs',
            'SecondarySectorBreakdownCashEquivCash',
            'SecondarySectorBreakdownCashEquivCorporate',
            'SecondarySectorBreakdownCashEquivCurrency',
            'SecondarySectorBreakdownCashEquivAcctgOffset',
            'SecondarySectorBreakdownCashEquivFloater',
            'SecondarySectorBreakdownCashEquivGovt',
            'SecondarySectorBreakdownCashEquivGovtAgcy',
            'SecondarySectorBreakdownCashEquivMbs',
            'SecondarySectorBreakdownCashEquivMoneyMkt',
            'SecondarySectorBreakdownCashEquivMuni',
            'SecondarySectorBreakdownCashEquivCp',
            'SecondarySectorBreakdownCashEquivRepo',
            'SecondarySectorBreakdownCashEquivTdorcd',
            'SecondarySectorBreakdownCashEquivCollateral',
            'SecondarySectorBreakdownCashEquivOther'
        ]
    },
    SuperSectorBreakdownDerivative: {
        PrimarySectorBreakdownSwaps: [
            'SecondarySectorBreakdownSwapCreditDflt',
            'SecondarySectorBreakdownSwapTotalRtrn',
            'SecondarySectorBreakdownSwapAsset',
            'SecondarySectorBreakdownSwapVolorvariance'
        ],
        PrimarySectorBreakdownFuturesorforwards: [
            'SecondarySectorBreakdownFuturesBond',
            'SecondarySectorBreakdownFuturesBondIndex',
            'SecondarySectorBreakdownFutureCurrency',
            'SecondarySectorBreakdownForwardsCurrency',
            'SecondarySectorBreakdownForwardsUnit'
        ],
        PrimarySectorBreakdownOptions: [
            'SecondarySectorBreakdownOptionBond',
            'SecondarySectorBreakdownOptionBondIndex',
            'SecondarySectorBreakdownOptionCash',
            'SecondarySectorBreakdownOptionCurrency'
        ]
    },
    SuperSectorBreakdownUnknown: {
        PrimarySectorBreakdownUnknown: [
            'SecondarySectorBreakdownUnknown'
        ]
    }
};

// Prefixes stripped from sector identifiers when building paths
const sectorPrefixes = [
    'SuperSector',
    'PrimarySector',
    'SecondarySector',
    'SuperSectorBreakdown',
    'PrimarySectorBreakdown',
    'SecondarySectorBreakdown'
];

// All possible combinations of region variants and sector variants
export const sectorsPerRegion = sectorVariants.flatMap(sector =>
    regionVariants.map(region => `${sector}${region}`)
);

// Build the path maps for fixed income sectors and their breakdowns
export const fixedIncomePathMap = buildPathMap(fixedIncome);
export const fixedIncomeBreakdownPathMap = buildPathMap(fixedIncomeBreakdown);

/* *
 *
 *  Functions
 *
 * */

/**
 * Recursively walks a sectors hierarchy and produces a flat lookup that maps
 * every sector identifier to its full root-to-leaf path, joined by `/` and
 * with structural prefixes stripped from each segment.
 *
 * @param sectorMap Sectors hierarchy to traverse.
 *
 * @param parentPath Path segments accumulated from ancestors at the current
 * recursion level.
 *
 * @param map Accumulator map that collects the identifier-to-path associations.
 *
 * @return The populated map of sector identifiers to their full paths.
 */
function buildPathMap (
    sectorMap: Record<string, unknown>,
    parentPath: string[] = [],
    map = new Map<string, string>()
) {
    for (const key in sectorMap) {
        const value = sectorMap[key],
            currentPath = [...parentPath, stripPrefix(key)];

        // Set the path association for the current key
        map.set(key, currentPath.join('/'));

        // If the value is an array, set the path association for each item
        if (Array.isArray(value)) {
            for (const item of value) {
                if (typeof item === 'string') {
                    map.set(
                        item,
                        [...currentPath, stripPrefix(item)].join('/')
                    );
                }
            }
        } else if (typeof value === 'object' && value !== null) {
            // If the value is a non-null object, build the path map for it
            buildPathMap(value as Record<string, unknown>, currentPath, map);
        }
    }

    return map;
}

/**
 * Removes the prefix from a sector identifier so only the meaningful segment
 * remains.
 *
 * @param key Sector identifier to strip.
 *
 * @return The identifier without its prefix, or unchanged if none matches.
 */
function stripPrefix (key: string): string {
    for (const prefix of sectorPrefixes) {
        if (key.startsWith(prefix)) {
            return key.slice(prefix.length);
        }
    }
    return key;
}

// Static configuration for fields mapping for the createFieldsMapping function
const staticFieldsConfig = {
    fixdInc: {
        pattern: new RegExp(
            `^fixdInc(${FixedIncomeSectorsBreakdown.sectorTypes.map(s => `${s}Brkdwn`).join('|')})([^_]+)(${SectorsBreakdown.suffixesFiperc.join('|')})$`,
            'u'
        ),
        column: 'Fixed_Income_Breakdown'
    },
    fixedInc: {
        pattern: new RegExp(
            `^fixedInc(${FixedIncomeSectorsBreakdown.sectorTypes.join('|')})([^_]+)(${SectorsBreakdown.suffixes.join('|')})$`,
            'u'
        ),
        column: 'Fixed_Income'
    },
    surveyedFixedInc: {
        pattern: new RegExp(
            `^surveyedFixedInc(${FixedIncomeSectorsBreakdown.sectorTypes.join('|')})([^_]+)(PercLong)$`,
            'u'
        ),
        column: 'Surveyed_Fixed_Income'
    }
} as const;

/**
 * Builds the fields mapping object that defines how to interpret the fixed
 * income sector fields in the API response, including the regex patterns to
 * match field names and the corresponding sector categorizations.
 *
 * @return The constructed fields mapping object.
 */
export function createFieldsMapping (): FieldsMapping {
    return {
        fixdInc: {
            ...staticFieldsConfig.fixdInc,
            allSector: [],
            superSector: [],
            primarySector: [],
            secondarySector: []
        },
        fixedInc: {
            ...staticFieldsConfig.fixedInc,
            allSector: [],
            superSector: [],
            primarySector: [],
            secondarySector: [],
            governmentPerRegionSuperSector: [],
            treasuryPerRegionSecondarySector: [],
            inflationPerRegionSecondarySector: [],
            agencyPerRegionSecondarySector: []
        },
        surveyedFixedInc: {
            ...staticFieldsConfig.surveyedFixedInc,
            allSector: [],
            superSector: [],
            primarySector: [],
            secondarySector: []
        }
    };
}

/**
 * Given a sector, checks if it belongs to the region-specific variants and
 * returns the corresponding variant type.
 *
 * @param sector Sector identifier to check for region-specific variants.
 *
 * @return The corresponding region-specific variant type if the sector
 * belongs to it, or the original sector identifier otherwise.
 */
export function getRegionSectorType (sector?: string): string | void {
    switch (true) {
        case sector?.includes(sectorVariants[0]):
            return 'GovernmentPerRegionSuperSector';
        case sector?.includes(sectorVariants[1]):
            return 'TreasuryPerRegionSecondarySector';
        case sector?.includes(sectorVariants[2]):
            return 'InflationPerRegionSecondarySector';
        case sector?.includes(sectorVariants[3]):
            return 'AgencyPerRegionSecondarySector';
    }
}
