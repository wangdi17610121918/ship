export default {
  dalogName: 'Basic Informatio',
  group: {
    basic: {
      title: 'Basic Information',
      context: {
        shipName: 'Ship Name',
        imo: 'IMO',
        mmsi: 'MMSI',
        callsign: 'Callsign',
        shipType: 'Ship Type',
        flag: 'Flag',
        grossTonnage: 'Gross Tonnage',
        deadWeight: 'DWT',
        serviceStatus: 'Service Status',
        serviceSpeed: 'Service Speed'
      }
    },
    pis: {
      title: 'Classification Society',
      context: {
        flag: 'Flag',
        portOfRegisttry: 'Port of Registry',
        pi: 'P_l'
      }
    },
    dimension: {
      title: 'Dimension',
      context: {
        lpb: 'Lpb',
        loa: 'Loa',
        breadthRxtreme: 'Breadth Extreme',
        breadthMoulded: 'Breadth',
        depthMoulded: 'Depth Moulded',
        draught: 'Draught'
      }
    },
    built: {
      title: 'Built',
      context: {
        builder: 'Builder',
        yearOfBuilt: 'Year of Built'
      }
    },
    companyname: {
      title: 'Company',
      context: {
        own: 'Group Owner',
        manage: 'Shipmanager',
        run: 'Operator',
        rent: 'Charterer'
      }
    }
  },
  classfications: 'Survey Records',
  pscs: {
    title: 'PSC',
    pscOrganization: 'PSC Orgnizition',
    authority: 'Authority',
    portOfInspection: 'Port of Inspection',
    typeOfInspection: 'Type of Inspection',
    detention: 'Detention',
    durationDays: 'Detention',
    numberOfDeficiencies: 'Number of Deficiencies',
    dateOfReport: 'Date of Report'
  }
}
