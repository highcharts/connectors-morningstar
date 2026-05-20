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
 *  Constants
 *
 * */

// Country variants registered alongside super sectors
export const sectorCountryVariants = [
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
].map(country => `SuperSectorGovernment${country}`);

// Morningstar fixed income sector hierarchy
const fixedIncome = {
    SuperSectorGovernment: {
        PrimarySectorGovernment: [
            'SecondarySectorTreasury',
            'SecondarySectorTreasuryAmericaUnitedStatesOf',
            'SecondarySectorTreasuryArgentina',
            'SecondarySectorTreasuryAustralia',
            'SecondarySectorTreasuryAustria',
            'SecondarySectorTreasuryBahamas',
            'SecondarySectorTreasuryBelgium',
            'SecondarySectorTreasuryBelize',
            'SecondarySectorTreasuryBermuda',
            'SecondarySectorTreasuryBolivia',
            'SecondarySectorTreasuryBrazil',
            'SecondarySectorTreasuryCanada',
            'SecondarySectorTreasuryCaymanIslands',
            'SecondarySectorTreasuryChannelIslands',
            'SecondarySectorTreasuryChile',
            'SecondarySectorTreasuryChina',
            'SecondarySectorTreasuryColombia',
            'SecondarySectorTreasuryCzechRepublic',
            'SecondarySectorTreasuryDenmark',
            'SecondarySectorTreasuryEgypt',
            'SecondarySectorTreasuryFinland',
            'SecondarySectorTreasuryFrance',
            'SecondarySectorTreasuryFranceMetropolitan',
            'SecondarySectorTreasuryFrontierCountry',
            'SecondarySectorTreasuryGermany',
            'SecondarySectorTreasuryGreece',
            'SecondarySectorTreasuryGreenland',
            'SecondarySectorTreasuryGuernsey',
            'SecondarySectorTreasuryHolySeeVaticanCityState',
            'SecondarySectorTreasuryHongKong',
            'SecondarySectorTreasuryHungary',
            'SecondarySectorTreasuryIceland',
            'SecondarySectorTreasuryIndia',
            'SecondarySectorTreasuryIndonesia',
            'SecondarySectorTreasuryIreland',
            'SecondarySectorTreasuryIsleOfMan',
            'SecondarySectorTreasuryIsrael',
            'SecondarySectorTreasuryItaly',
            'SecondarySectorTreasuryJapan',
            'SecondarySectorTreasuryJersey',
            'SecondarySectorTreasuryKoreaRepublicOf',
            'SecondarySectorTreasuryLiechtenstein',
            'SecondarySectorTreasuryLuxembourg',
            'SecondarySectorTreasuryMalaysia',
            'SecondarySectorTreasuryMexico',
            'SecondarySectorTreasuryMonaco',
            'SecondarySectorTreasuryMorocco',
            'SecondarySectorTreasuryNetherlands',
            'SecondarySectorTreasuryNewZealand',
            'SecondarySectorTreasuryNorway',
            'SecondarySectorTreasuryPeru',
            'SecondarySectorTreasuryPhilippines',
            'SecondarySectorTreasuryPoland',
            'SecondarySectorTreasuryPortugal',
            'SecondarySectorTreasuryPuertoRico',
            'SecondarySectorTreasuryRussianFederation',
            'SecondarySectorTreasurySingapore',
            'SecondarySectorTreasurySouthAfrica',
            'SecondarySectorTreasurySpain',
            'SecondarySectorTreasurySweden',
            'SecondarySectorTreasurySwitzerland',
            'SecondarySectorTreasuryTaiwan',
            'SecondarySectorTreasuryThailand',
            'SecondarySectorTreasuryTurkey',
            'SecondarySectorTreasuryUnitedKingdom',
            'SecondarySectorTreasuryUruguay',
            'SecondarySectorTreasuryVenezuela',
            'SecondarySectorTreasuryVirginIslandsBritish',
            'SecondarySectorTreasuryVirginIslandsUS',
            'SecondarySectorInflationProtected',
            'SecondarySectorInflationProtectedAmericaUnitedStatesOf',
            'SecondarySectorInflationProtectedArgentina',
            'SecondarySectorInflationProtectedAustralia',
            'SecondarySectorInflationProtectedAustria',
            'SecondarySectorInflationProtectedBahamas',
            'SecondarySectorInflationProtectedBelgium',
            'SecondarySectorInflationProtectedBelize',
            'SecondarySectorInflationProtectedBermuda',
            'SecondarySectorInflationProtectedBolivia',
            'SecondarySectorInflationProtectedBrazil',
            'SecondarySectorInflationProtectedCanada',
            'SecondarySectorInflationProtectedCaymanIslands',
            'SecondarySectorInflationProtectedChannelIslands',
            'SecondarySectorInflationProtectedChile',
            'SecondarySectorInflationProtectedChina',
            'SecondarySectorInflationProtectedColombia',
            'SecondarySectorInflationProtectedCzechRepublic',
            'SecondarySectorInflationProtectedDenmark',
            'SecondarySectorInflationProtectedEgypt',
            'SecondarySectorInflationProtectedFinland',
            'SecondarySectorInflationProtectedFrance',
            'SecondarySectorInflationProtectedFranceMetropolitan',
            'SecondarySectorInflationProtectedFrontierCountry',
            'SecondarySectorInflationProtectedGermany',
            'SecondarySectorInflationProtectedGreece',
            'SecondarySectorInflationProtectedGreenland',
            'SecondarySectorInflationProtectedGuernsey',
            'SecondarySectorInflationProtectedHolySeeVaticanCityState',
            'SecondarySectorInflationProtectedHongKong',
            'SecondarySectorInflationProtectedHungary',
            'SecondarySectorInflationProtectedIceland',
            'SecondarySectorInflationProtectedIndia',
            'SecondarySectorInflationProtectedIndonesia',
            'SecondarySectorInflationProtectedIreland',
            'SecondarySectorInflationProtectedIsleOfMan',
            'SecondarySectorInflationProtectedIsrael',
            'SecondarySectorInflationProtectedItaly',
            'SecondarySectorInflationProtectedJapan',
            'SecondarySectorInflationProtectedJersey',
            'SecondarySectorInflationProtectedKoreaRepublicOf',
            'SecondarySectorInflationProtectedLiechtenstein',
            'SecondarySectorInflationProtectedLuxembourg',
            'SecondarySectorInflationProtectedMalaysia',
            'SecondarySectorInflationProtectedMexico',
            'SecondarySectorInflationProtectedMonaco',
            'SecondarySectorInflationProtectedMorocco',
            'SecondarySectorInflationProtectedNetherlands',
            'SecondarySectorInflationProtectedNewZealand',
            'SecondarySectorInflationProtectedNorway',
            'SecondarySectorInflationProtectedPeru',
            'SecondarySectorInflationProtectedPhilippines',
            'SecondarySectorInflationProtectedPoland',
            'SecondarySectorInflationProtectedPortugal',
            'SecondarySectorInflationProtectedPuertoRico',
            'SecondarySectorInflationProtectedRussianFederation',
            'SecondarySectorInflationProtectedSingapore',
            'SecondarySectorInflationProtectedSouthAfrica',
            'SecondarySectorInflationProtectedSpain',
            'SecondarySectorInflationProtectedSweden',
            'SecondarySectorInflationProtectedSwitzerland',
            'SecondarySectorInflationProtectedTaiwan',
            'SecondarySectorInflationProtectedThailand',
            'SecondarySectorInflationProtectedTurkey',
            'SecondarySectorInflationProtectedUnitedKingdom',
            'SecondarySectorInflationProtectedUruguay',
            'SecondarySectorInflationProtectedVenezuela',
            'SecondarySectorInflationProtectedVirginIslandsBritish',
            'SecondarySectorInflationProtectedVirginIslandsUS'
        ],
        PrimarySectorGovernmentRelated: [
            'SecondarySectorAgencyorquasiAgency',
            'SecondarySectorAgencyorquasiAgencyAmericaUnitedStatesOf',
            'SecondarySectorAgencyorquasiAgencyArgentina',
            'SecondarySectorAgencyorquasiAgencyAustralia',
            'SecondarySectorAgencyorquasiAgencyAustria',
            'SecondarySectorAgencyorquasiAgencyBahamas',
            'SecondarySectorAgencyorquasiAgencyBelgium',
            'SecondarySectorAgencyorquasiAgencyBelize',
            'SecondarySectorAgencyorquasiAgencyBermuda',
            'SecondarySectorAgencyorquasiAgencyBolivia',
            'SecondarySectorAgencyorquasiAgencyBrazil',
            'SecondarySectorAgencyorquasiAgencyCanada',
            'SecondarySectorAgencyorquasiAgencyCaymanIslands',
            'SecondarySectorAgencyorquasiAgencyChannelIslands',
            'SecondarySectorAgencyorquasiAgencyChile',
            'SecondarySectorAgencyorquasiAgencyChina',
            'SecondarySectorAgencyorquasiAgencyColombia',
            'SecondarySectorAgencyorquasiAgencyCzechRepublic',
            'SecondarySectorAgencyorquasiAgencyDenmark',
            'SecondarySectorAgencyorquasiAgencyEgypt',
            'SecondarySectorAgencyorquasiAgencyFinland',
            'SecondarySectorAgencyorquasiAgencyFrance',
            'SecondarySectorAgencyorquasiAgencyFranceMetropolitan',
            'SecondarySectorAgencyorquasiAgencyFrontierCountry',
            'SecondarySectorAgencyorquasiAgencyGermany',
            'SecondarySectorAgencyorquasiAgencyGreece',
            'SecondarySectorAgencyorquasiAgencyGreenland',
            'SecondarySectorAgencyorquasiAgencyGuernsey',
            'SecondarySectorAgencyorquasiAgencyHolySeeVaticanCityState',
            'SecondarySectorAgencyorquasiAgencyHongKong',
            'SecondarySectorAgencyorquasiAgencyHungary',
            'SecondarySectorAgencyorquasiAgencyIceland',
            'SecondarySectorAgencyorquasiAgencyIndia',
            'SecondarySectorAgencyorquasiAgencyIndonesia',
            'SecondarySectorAgencyorquasiAgencyIreland',
            'SecondarySectorAgencyorquasiAgencyIsleOfMan',
            'SecondarySectorAgencyorquasiAgencyIsrael',
            'SecondarySectorAgencyorquasiAgencyItaly',
            'SecondarySectorAgencyorquasiAgencyJapan',
            'SecondarySectorAgencyorquasiAgencyJersey',
            'SecondarySectorAgencyorquasiAgencyKoreaRepublicOf',
            'SecondarySectorAgencyorquasiAgencyLiechtenstein',
            'SecondarySectorAgencyorquasiAgencyLuxembourg',
            'SecondarySectorAgencyorquasiAgencyMalaysia',
            'SecondarySectorAgencyorquasiAgencyMexico',
            'SecondarySectorAgencyorquasiAgencyMonaco',
            'SecondarySectorAgencyorquasiAgencyMorocco',
            'SecondarySectorAgencyorquasiAgencyNetherlands',
            'SecondarySectorAgencyorquasiAgencyNewZealand',
            'SecondarySectorAgencyorquasiAgencyNorway',
            'SecondarySectorAgencyorquasiAgencyPeru',
            'SecondarySectorAgencyorquasiAgencyPhilippines',
            'SecondarySectorAgencyorquasiAgencyPoland',
            'SecondarySectorAgencyorquasiAgencyPortugal',
            'SecondarySectorAgencyorquasiAgencyPuertoRico',
            'SecondarySectorAgencyorquasiAgencyRussianFederation',
            'SecondarySectorAgencyorquasiAgencySingapore',
            'SecondarySectorAgencyorquasiAgencySouthAfrica',
            'SecondarySectorAgencyorquasiAgencySpain',
            'SecondarySectorAgencyorquasiAgencySweden',
            'SecondarySectorAgencyorquasiAgencySwitzerland',
            'SecondarySectorAgencyorquasiAgencyTaiwan',
            'SecondarySectorAgencyorquasiAgencyThailand',
            'SecondarySectorAgencyorquasiAgencyTurkey',
            'SecondarySectorAgencyorquasiAgencyUnitedKingdom',
            'SecondarySectorAgencyorquasiAgencyUruguay',
            'SecondarySectorAgencyorquasiAgencyVenezuela',
            'SecondarySectorAgencyorquasiAgencyVirginIslandsBritish',
            'SecondarySectorAgencyorquasiAgencyVirginIslandsUS',
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
    },
    SuperSectorUncategorized: []
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
    },
    SuperSectorUncategorized: []
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

/* *
 *
 *  Functions
 *
 * */

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

/**
 * Recursively walks a sectors hierarchy and produces a flat lookup that maps
 * every sector identifier to its full root-to-leaf path, joined by `/` and
 * with structural prefixes stripped from each segment.
 *
 * @param obj Sectors hierarchy to traverse.
 *
 * @param parentPath Path segments accumulated from ancestors at the current
 * recursion level.
 *
 * @param map Accumulator map that collects the identifier-to-path associations.
 *
 * @return The populated map of sector identifiers to their full paths.
 */
function buildPathMap (
    obj: Record<string, unknown>,
    parentPath: string[] = [],
    map = new Map<string, string>()
) {
    for (const key in obj) {
        const value = obj[key],
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

/* *
 *
 *  Default Export
 *
 * */

export const fixedIncomePathMap = buildPathMap(fixedIncome);
export const fixedIncomeBreakdownPathMap = buildPathMap(fixedIncomeBreakdown);
