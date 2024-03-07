'use client';

import { Card, Title, Text, BarList, DonutChart } from '@tremor/react';

export default function Example({ insights, title, headline }: any) {
  return (
    <Card className="mt-8">
      <Title>{title}</Title>
      <Text>{headline}</Text>
      <BarList data={insights} className="mt-2" />    
    </Card>
  );
}
