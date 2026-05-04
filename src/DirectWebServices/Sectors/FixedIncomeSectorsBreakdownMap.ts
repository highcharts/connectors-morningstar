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


// Morningstar fixed income sector hierarchy
const fixedIncome = {
    SuperSectorGovernment: {
        PrimarySectorGovernment: [
            'SecondarySectorGovernment',
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
            'SecondarySectorGovernmentRelatedOther'
        ]
    },
    SuperSectorMunicipal: {
        PrimarySectorMunicipalTaxable: [
            'SecondarySectorTaxableAdvanceRefunded',
            'SecondarySectorTaxableEducation',
            'SecondarySectorTaxableGeneralObligationStateAndLocal',
            'SecondarySectorTaxableHealth',
            'SecondarySectorTaxableHousing',
            'SecondarySectorTaxableIndustrial',
            'SecondarySectorTaxableMiscRevenueorunspecified',
            'SecondarySectorTaxableTobacco',
            'SecondarySectorTaxableTransportation',
            'SecondarySectorTaxableUtilities',
            'SecondarySectorTaxableWaterAndSewer'
        ],
        PrimarySectorMunicipalTaxExempt: [
            'SecondarySectorTaxExemptAdvanceRefunded',
            'SecondarySectorTaxExemptEducation',
            'SecondarySectorTaxExemptGeneralObligationStateAndLocal',
            'SecondarySectorTaxExemptHealth',
            'SecondarySectorTaxExemptHousing',
            'SecondarySectorTaxExemptIndustrial',
            'SecondarySectorTaxExemptMiscRevenueorunspecified',
            'SecondarySectorTaxExemptTobacco',
            'SecondarySectorTaxExemptTransportation',
            'SecondarySectorTaxExemptUtilities',
            'SecondarySectorTaxExemptWaterAndSewer'
        ]
    },
    SuperSectorCorporate: {
        PrimarySectorCorporateBond: [
            'SecondarySectorCorporate',
            'SecondarySectorCorporateBasicMaterials',
            'SecondarySectorCorporateCommunicationServices',
            'SecondarySectorCorporateConsumerCyclical',
            'SecondarySectorCorporateConsumerDefensive',
            'SecondarySectorCorporateEnergy',
            'SecondarySectorCorporateFinancialServices',
            'SecondarySectorCorporateHealthCare',
            'SecondarySectorCorporateIndustrials',
            'SecondarySectorCorporateRealEstate',
            'SecondarySectorCorporateTechnology',
            'SecondarySectorCorporateUnspecified',
            'SecondarySectorCorporateUtilities'
        ],
        PrimarySectorBankLoan: [
            'SecondarySectorBankLoanBasicMaterials',
            'SecondarySectorBankLoanCommunicationServices',
            'SecondarySectorBankLoanConsumerCyclical',
            'SecondarySectorBankLoanConsumerDefensive',
            'SecondarySectorBankLoanEnergy',
            'SecondarySectorBankLoanFinancialServices',
            'SecondarySectorBankLoanHealthCare',
            'SecondarySectorBankLoanIndustrials',
            'SecondarySectorBankLoanRealEstate',
            'SecondarySectorBankLoanTechnology',
            'SecondarySectorBankLoanUnspecified',
            'SecondarySectorBankLoanUtilities'
        ],
        PrimarySectorConvertible: [
            'SecondarySectorConvertibleBasicMaterials',
            'SecondarySectorConvertibleCommunicationServices',
            'SecondarySectorConvertibleConsumerCyclical',
            'SecondarySectorConvertibleConsumerDefensive',
            'SecondarySectorConvertibleEnergy',
            'SecondarySectorConvertibleFinancialServices',
            'SecondarySectorConvertibleHealthCare',
            'SecondarySectorConvertibleIndustrials',
            'SecondarySectorConvertibleRealEstate',
            'SecondarySectorConvertibleTechnology',
            'SecondarySectorConvertibleUnspecified',
            'SecondarySectorConvertibleUtilities'
        ],
        PrimarySectorPreferredStock: [
            'SecondarySectorPreferredBasicMaterials',
            'SecondarySectorPreferredCommunicationServices',
            'SecondarySectorPreferredConsumerCyclical',
            'SecondarySectorPreferredConsumerDefensive',
            'SecondarySectorPreferredEnergy',
            'SecondarySectorPreferredFinancialServices',
            'SecondarySectorPreferredHealthCare',
            'SecondarySectorPreferredIndustrials',
            'SecondarySectorPreferredRealEstate',
            'SecondarySectorPreferredTechnology',
            'SecondarySectorPreferredUnspecified',
            'SecondarySectorPreferredUtilities'
        ],
        PrimarySectorCoveredBond: [
            'SecondarySectorCoveredBond'
        ]
    },
    SuperSectorSecuritized: {
        PrimarySectorAgencyMortgageBacked: [
            'SecondarySectorAgencyArm',
            'SecondarySectorAgencyCmo',
            'SecondarySectorAgencyPassThru',
            'SecondarySectorMbs',
            'SecondarySectorGseoragency'
        ],
        PrimarySectorNonAgencyResidentialMortgageBacked: [
            'SecondarySectorNonAgencyResidentialMortgageBacked'
        ],
        PrimarySectorCommercialMortgageBacked: [
            'SecondarySectorCommercialMortgageBacked'
        ],
        PrimarySectorAssetBacked: [
            'SecondarySectorAbs',
            'SecondarySectorAssetBackedOther',
            'SecondarySectorAuto',
            'SecondarySectorCboorcdo',
            'SecondarySectorCreditCard',
            'SecondarySectorHomeEquity',
            'SecondarySectorStudentLoan',
            'SecondarySectorTdorcd'
        ]
    },
    SuperSectorCashAndEquivalents: {
        PrimarySectorCashAndEquivalents: [
            'SecondarySectorBondUnit',
            'SecondarySectorCurrency',
            'SecondarySectorCash',
            'SecondarySectorCashOther',
            'SecondarySectorMoneyMarket',
            'SecondarySectorCommercialPaper',
            'SecondarySectorRepurchaseAgreements',
            'SecondarySectorCollateral'
        ]
    },
    SuperSectorDerivative: {
        PrimarySectorForwardorfuture: [
            'SecondarySectorBondFuture',
            'SecondarySectorBondIndexFuture',
            'SecondarySectorTreasuryFutures',
            'SecondarySectorCurrencyForwardorfuture'
        ],
        PrimarySectorSwap: [
            'SecondarySectorCreditDefaultSwap',
            'SecondarySectorDebtSwap',
            'SecondarySectorInterestRateDerivative',
            'SecondarySectorTotalReturnSwap'
        ],
        PrimarySectorOptionorwarrant: [
            'SecondarySectorBondOption',
            'SecondarySectorBondWarrant'
        ]
    },
    UncategorizedSector: [
        'SecondarySectorDerivativeCashOffsets',
        'SecondarySectorFrn',
        'SecondarySectorMunicipal',
        'SecondarySectorUnspecified'
    ]
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
            'SecondarySectorBreakdownGovTRelatDIntRateSwap',
            'SecondarySectorBreakdownGovTRelatDOther',
            'SecondarySectorBreakdownGovTRelatDSupranatL',
            'SecondarySectorBreakdownGovTRelatDTrsryFuture'
        ]
    },
    SuperSectorBreakdownUsMuni: {
        PrimarySectorBreakdownUsMuniTaxable: [
            'SecondarySectorBreakdownUsMuniTxblEducation',
            'SecondarySectorBreakdownUsMuniTxblEscrow',
            'SecondarySectorBreakdownUsMuniTxblGeneralObligtn',
            'SecondarySectorBreakdownUsMuniTxblHealthcare',
            'SecondarySectorBreakdownUsMuniTxblHousing',
            'SecondarySectorBreakdownUsMuniTxblIndustDev',
            'SecondarySectorBreakdownUsMuniTxblTobaccoSecurtztn',
            'SecondarySectorBreakdownUsMuniTxblTransport',
            'SecondarySectorBreakdownUsMuniTxblUnspec',
            'SecondarySectorBreakdownUsMuniTxblUtility',
            'SecondarySectorBreakdownUsMuniTxblWtrorswr'
        ],
        PrimarySectorBreakdownUsMuniTaxExempt: [
            'SecondarySectorBreakdownUsMuniTaxExEducation',
            'SecondarySectorBreakdownUsMuniTaxExEscrow',
            'SecondarySectorBreakdownUsMuniTaxExGeneralObligtn',
            'SecondarySectorBreakdownUsMuniTaxExHealthcare',
            'SecondarySectorBreakdownUsMuniTaxExHousing',
            'SecondarySectorBreakdownUsMuniTaxExIndustDev',
            'SecondarySectorBreakdownUsMuniTaxExTobaccoSecurtztn',
            'SecondarySectorBreakdownUsMuniTaxExTransport',
            'SecondarySectorBreakdownUsMuniTaxExUnspec',
            'SecondarySectorBreakdownUsMuniTaxExUtility',
            'SecondarySectorBreakdownUsMuniTaxExWtrorswr'
        ]
    },
    SuperSectorBreakdownCorporate: {
        PrimarySectorBreakdownCorporateBond: [
            'SecondarySectorBreakdownCorpBondBasicMaterial',
            'SecondarySectorBreakdownCorpBondCommunServices',
            'SecondarySectorBreakdownCorpBondConsumCyclical',
            'SecondarySectorBreakdownCorpBondConsumDefense',
            'SecondarySectorBreakdownCorpBondEnergy',
            'SecondarySectorBreakdownCorpBondFinclServices',
            'SecondarySectorBreakdownCorpBondHealthcare',
            'SecondarySectorBreakdownCorpBondIndustrials',
            'SecondarySectorBreakdownCorpBondRealEstate',
            'SecondarySectorBreakdownCorpBondTechnology',
            'SecondarySectorBreakdownCorpBondUnspec',
            'SecondarySectorBreakdownCorpBondUtility'
        ],
        PrimarySectorBreakdownBankLoans: [
            'SecondarySectorBreakdownBankLnsBasicMaterial',
            'SecondarySectorBreakdownBankLnsCommunServices',
            'SecondarySectorBreakdownBankLnsConsumCyclical',
            'SecondarySectorBreakdownBankLnsConsumDefense',
            'SecondarySectorBreakdownBankLnsEnergy',
            'SecondarySectorBreakdownBankLnsFinclServices',
            'SecondarySectorBreakdownBankLnsHealthcare',
            'SecondarySectorBreakdownBankLnsIndustrials',
            'SecondarySectorBreakdownBankLnsRealEstate',
            'SecondarySectorBreakdownBankLnsTechnology',
            'SecondarySectorBreakdownBankLnsUnspec',
            'SecondarySectorBreakdownBankLnsUtility'
        ],
        PrimarySectorBreakdownConvertibles: [
            'SecondarySectorBreakdownConvertsBasicMaterial',
            'SecondarySectorBreakdownConvertsCommunServices',
            'SecondarySectorBreakdownConvertsConsumCyclical',
            'SecondarySectorBreakdownConvertsConsumDefense',
            'SecondarySectorBreakdownConvertsEnergy',
            'SecondarySectorBreakdownConvertsFinclServices',
            'SecondarySectorBreakdownConvertsHealthcare',
            'SecondarySectorBreakdownConvertsIndustrials',
            'SecondarySectorBreakdownConvertsRealEstate',
            'SecondarySectorBreakdownConvertsTechnology',
            'SecondarySectorBreakdownConvertsUnspec',
            'SecondarySectorBreakdownConvertsUtility'
        ],
        PrimarySectorBreakdownPreferreds: [
            'SecondarySectorBreakdownPreferredsBasicMaterial',
            'SecondarySectorBreakdownPreferredsCommunServices',
            'SecondarySectorBreakdownPreferredsConsumCyclical',
            'SecondarySectorBreakdownPreferredsConsumDefense',
            'SecondarySectorBreakdownPreferredsEnergy',
            'SecondarySectorBreakdownPreferredsFinclServices',
            'SecondarySectorBreakdownPreferredsHealthcare',
            'SecondarySectorBreakdownPreferredsIndustrials',
            'SecondarySectorBreakdownPreferredsRealEstate',
            'SecondarySectorBreakdownPreferredsTechnology',
            'SecondarySectorBreakdownPreferredsUnspec',
            'SecondarySectorBreakdownPreferredsUtility'
        ],
        PrimarySectorBreakdownCoveredBond: [
            'SecondarySectorBreakdownCoveredBond'
        ]
    },
    SuperSectorBreakdownSecuritized: {
        PrimarySectorBreakdownUsAgencyMortgage: [
            'SecondarySectorBreakdownUsAgcyMtgArm',
            'SecondarySectorBreakdownUsAgcyMtgCmo',
            'SecondarySectorBreakdownUsAgcyMtgPassThru',
            'SecondarySectorBreakdownUsAgcyMtgUnspec'
        ],
        PrimarySectorBreakdownNonAgencyMortgage: [
            'SecondarySectorBreakdownNonAgcyMtgResidential'
        ],
        PrimarySectorBreakdownCommercialMortgage: [
            'SecondarySectorBreakdownCommercialMortgage'
        ],
        PrimarySectorBreakdownAssetBacked: [
            'SecondarySectorBreakdownAbsAuto',
            'SecondarySectorBreakdownAbsCboorcdo',
            'SecondarySectorBreakdownAbsCreditCard',
            'SecondarySectorBreakdownAbsHomeEqty',
            'SecondarySectorBreakdownAbsOther',
            'SecondarySectorBreakdownAbsStudLoan'
        ]
    },
    SuperSectorBreakdownCashEquiv: {
        PrimarySectorBreakdownCashEquiv: [
            'SecondarySectorBreakdownCashEquivAbs',
            'SecondarySectorBreakdownCashEquivAcctgOffset',
            'SecondarySectorBreakdownCashEquivCash',
            'SecondarySectorBreakdownCashEquivCollateral',
            'SecondarySectorBreakdownCashEquivCorporate',
            'SecondarySectorBreakdownCashEquivCp',
            'SecondarySectorBreakdownCashEquivCurrency',
            'SecondarySectorBreakdownCashEquivFloater',
            'SecondarySectorBreakdownCashEquivGovt',
            'SecondarySectorBreakdownCashEquivGovtAgcy',
            'SecondarySectorBreakdownCashEquivMbs',
            'SecondarySectorBreakdownCashEquivMoneyMkt',
            'SecondarySectorBreakdownCashEquivMuni',
            'SecondarySectorBreakdownCashEquivOther',
            'SecondarySectorBreakdownCashEquivRepo',
            'SecondarySectorBreakdownCashEquivTdorcd'
        ]
    },
    SuperSectorBreakdownDerivative: {
        PrimarySectorBreakdownFuturesorforwards: [
            'SecondarySectorBreakdownForwardsCurrency',
            'SecondarySectorBreakdownForwardsUnit',
            'SecondarySectorBreakdownFutureCurrency',
            'SecondarySectorBreakdownFuturesBond',
            'SecondarySectorBreakdownFuturesBondIndex'
        ],
        PrimarySectorBreakdownSwaps: [
            'SecondarySectorBreakdownSwapAsset',
            'SecondarySectorBreakdownSwapCreditDflt',
            'SecondarySectorBreakdownSwapTotalRtrn',
            'SecondarySectorBreakdownSwapVolorvariance'
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
    UncategorizedSector: []
};

/* *
 *
 *  Functions
 *
 * */

/**
 * Recursively walks a sectors hierarchy and produces a flat lookup that maps
 * every sector identifier to the identifier of its direct parent.
 *
 * @param obj Sectors hierarchy to traverse.
 *
 * @param parent Parent identifier assigned to the keys at the current recursion
 * level.
 *
 * @param map Accumulator map that collects the child-to-parent associations.
 *
 * @return
 * The populated map of sector identifiers to their parent identifiers.
 */
function buildParentMap (
    obj: Record<string, unknown>,
    parent: string | null = null,
    map = new Map<string, string | null>()
) {
    for (const key in obj) {
        const value = obj[key];

        // Set the child-to-parent association for the current key
        map.set(key, parent);

        // If the value is an array, set the parent association for each item
        if (Array.isArray(value)) {
            for (const item of value) {
                if (typeof item === 'string') {
                    map.set(item, key);
                }
            }
        } else if (typeof value === 'object' && value !== null) {
            // If the value is a non-null object, build the parent map for it
            buildParentMap(value as Record<string, unknown>, key, map);
        }
    }

    return map;
}

/* *
 *
 *  Default Export
 *
 * */

export const fixedIncomeMap = buildParentMap(fixedIncome);
export const fixedIncomeBreakdownMap = buildParentMap(fixedIncomeBreakdown);
