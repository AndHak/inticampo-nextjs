import React from 'react';
import Portafolio from '@/modules/portafolio/Portafolio';
import { db } from '@/shared/lib/db';

export const revalidate = 3600; // Revalidate every hour

const PortafolioPage = async () => {
  const categoriesWithProducts = await db.category.findMany({
    include: {
      products: {
        where: { active: true },
        orderBy: { name: 'asc' }
      }
    },
    orderBy: { name: 'asc' }
  });

  return (
    <main>
      <Portafolio categoriesWithProducts={categoriesWithProducts} />
    </main>
  );
};

export default PortafolioPage;
