'use client';

import {
  Card,
  Metric,
  Text,
  Title,
  BarList,
  Flex,
  Grid,
  DonutChart
} from '@tremor/react';
import Chart from './chart';
import companyData from './data/data.json';
import {
  getEsperaVerticalInsights,
  getParticipacaoVerticalInsights,
  getPautasConhecimentoInsights,
  getSegmentosInsights,
  getTipoEmpresaInsights
} from './util/insightFunctions';

const empresas = getTipoEmpresaInsights(companyData);
const segmento = getSegmentosInsights(companyData);

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Tipo de Empresa',
    data: empresas,
    withPie: true
  },
  {
    category: 'Segmento',
    data: segmento
  }
];

export default function PlaygroundPage() {
  const ParticipacaoVerticalInsights =
    getParticipacaoVerticalInsights(companyData);
  const EsperaVerticalInsights = getEsperaVerticalInsights(companyData);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={2} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
           
            <Flex className="mt-6">
              <Text>Categoria</Text>
              <Text className="text-right">Quantidade</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
            <div className="mt-5">
              {item.withPie ? (
                <DonutChart data={item.data} variant="pie" />
              ) : null}
            </div>
          </Card>
        ))}
      </Grid>
      <Chart
        title={'Insights sobre participação na Vertical'}
        headline={
          'Nível de participação da empresa na vertical (excluindo empresas com 0 de participação)'
        }
        insights={ParticipacaoVerticalInsights}
      />
      <Chart
        title={'Expectativas para Vertical'}
        headline={'O que as empresas esperam da Vertical em 2024'}
        insights={EsperaVerticalInsights}
      />
    </main>
  );
}
