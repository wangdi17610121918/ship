export default {
  dalogName: '船舶档案',
  group: {
    basic: {
      title: '基本信息',
      context: {
        shipName: '船舶名称',
        imo: 'IMO',
        mmsi: 'MMSI',
        callsign: '呼号',
        shipType: '船舶类型',
        flag: '船籍',
        grossTonnage: '总吨',
        deadWeight: '载重吨',
        serviceStatus: '营运状态',
        serviceSpeed: '经济航速'
      }
    },
    pis: {
      title: '船级社',
      context: {
        flag: '船籍',
        portOfRegisttry: '船籍港',
        pi: '船东保护协会'
      }
    },
    dimension: {
      title: '船舶尺寸',
      context: {
        lpb: '型长',
        loa: '总长',
        breadthRxtreme: '最大船宽',
        breadthMoulded: '型宽',
        depthMoulded: '型深',
        draught: '吃水'
      }
    },
    built: {
      title: '船舶建造',
      context: {
        builder: '建造公司',
        yearOfBuilt: '建造年份'
      }
    },
    companyname: {
      title: '船舶公司',
      context: {
        own: '船舶所有公司',
        manage: '船舶管理公司',
        run: '船舶经营公司',
        rent: '船舶租家'
      }
    }
  },
  classfications: '检验记录',
  pscs: {
    title: 'PSC',
    pscOrganization: 'PSC组织',
    authority: 'PSC检查机关',
    portOfInspection: '检查港口',
    typeOfInspection: '检查类型',
    detention: '是否滞留',
    durationDays: '滞留时间',
    numberOfDeficiencies: '缺陷数目',
    dateOfReport: '报告时间'
  }
}
