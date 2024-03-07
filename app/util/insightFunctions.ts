interface CompanyData {
  Empresa: string;
  Segmentos: string[];
  Tipo_de_empresa: string;
  Nível_de_participação_na_Vertical: number;
  O_que_espera_da_Vertical_em_2024: string;
  Pautas_de_conhecimento_desejadas: string;
}
interface Insights {
  [key: string]: number;
}

interface Data {
  companies: CompanyData[];
}

export const getSegmentosInsights = (data: Data): any[] => {
  const segmentosCount: { [key: string]: number } = {};
  
  // Count occurrences of each segment
  data.companies.forEach((entry) => {
    entry.Segmentos.forEach((segmento) => {
      if (segmentosCount.hasOwnProperty(segmento)) {
        segmentosCount[segmento]++;
      } else {
        segmentosCount[segmento] = 1;
      }
    });
  });
  
  // Filter out entries where the count is equal to 0
  const filteredCount = Object.entries(segmentosCount)
    .filter(([_, count]) => count !== 0)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as { [key: string]: number });

  // Transform the count object into an array of objects with the desired format
  const chartdata = Object.entries(filteredCount).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  chartdata.sort((a, b) => b.value - a.value);

  return chartdata;
};

export const getTipoEmpresaInsights = (data: Data): any[] => {
  const tipoEmpresaCount: { [key: string]: number } = {};
  
  // Count occurrences of each type of company
  data.companies.forEach((entry) => {
    const tipoEmpresa = entry.Tipo_de_empresa;
    if (tipoEmpresaCount.hasOwnProperty(tipoEmpresa)) {
      tipoEmpresaCount[tipoEmpresa]++;
    } else {
      tipoEmpresaCount[tipoEmpresa] = 1;
    }
  });
  
  // Filter out entries where the count is equal to 0
  const filteredCount = Object.entries(tipoEmpresaCount)
    .filter(([_, count]) => count !== 0)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {} as { [key: string]: number });

  // Transform the count object into an array of objects with the desired format
  const chartdata = Object.entries(filteredCount).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  chartdata.sort((a, b) => b.value - a.value);

  return chartdata;
};

export const getParticipacaoVerticalInsights = (data: Data): any[] => {
  const participacaoVerticalCount: { [key: string]: number } = {};
  
  // Count occurrences of each participation level
  data.companies.forEach((entry) => {
    const empresa = entry.Empresa;
    const participacao = entry.Nível_de_participação_na_Vertical;
    if (participacao !== 0) {
      participacaoVerticalCount[empresa] = participacao;
    }
  });
  
  // Transform the count object into an array of objects with the desired format
  const chartdata = Object.entries(participacaoVerticalCount).map(([key, value]) => ({
    name: key,
    value: value,
  }));

  // Sort the chartdata array by the 'value' property in descending order
  chartdata.sort((a, b) => b.value - a.value);

  return chartdata;
};


export const getEsperaVerticalInsights = (data: Data): any[] => {
  const esperaVerticalCount: Insights = {};
  data.companies.forEach((entry) => {
    const espera = entry.O_que_espera_da_Vertical_em_2024;
    if (esperaVerticalCount.hasOwnProperty(espera)) {
      esperaVerticalCount[espera]++;
    } else {
      esperaVerticalCount[espera] = 1;
    }
  });
  const chartdata = Object.entries(esperaVerticalCount).map(([key, value]) => ({
    name: key,
    value: value,
  }));
  chartdata.sort((a, b) => b.value - a.value);

  return chartdata;
};

export const getPautasConhecimentoInsights = (
  data: Data
): Insights => {
  const pautasConhecimentoCount: Insights = {};
  data.companies.forEach((entry) => {
    const pautas = entry.Pautas_de_conhecimento_desejadas;
    if (pautasConhecimentoCount.hasOwnProperty(pautas)) {
      pautasConhecimentoCount[pautas]++;
    } else {
      pautasConhecimentoCount[pautas] = 1;
    }
  });
  return pautasConhecimentoCount;
};
