import { PRODUCTS } from './products'

// Contenido de /distribuidores. Solo datos confirmados: PDF de diseño, catálogo y respuestas
// del cliente (oct 2026): pedido mínimo, transporte tercerizado, exclusividad, habilitaciones,
// cartera de clientes y material POP. PENDIENTE: el catálogo en PDF para ofrecer como descarga.

// Pedido mínimo mayorista, usado en beneficios y FAQ.
export const PEDIDO_MINIMO = '1 pallet (150 cajas, unos 900 kg)'

const packSizes = [...new Set(PRODUCTS.flatMap(p => p.packs))]
  .sort((a, b) => parseFloat(a) - parseFloat(b))
const lines = new Set(PRODUCTS.map(p => p.cat)).size

export const PACK_SIZES_TEXT = packSizes.join(', ').replace(/, ([^,]*)$/, ' y $1')

export const BENEFICIOS = [
  {
    title: 'Fábrica propia y habilitada',
    text: 'Hacemos todo en nuestra planta de Mar del Plata desde 2014, con habilitación de SENASA, RNE y RNPA. Vendés un producto con respaldo.',
  },
  {
    title: `${PRODUCTS.length} productos, ${lines} líneas`,
    text: `Pollo, pescado, mariscos, vegetales y quesos, en bolsas de ${PACK_SIZES_TEXT}. Con un solo proveedor cubrís toda la góndola de rebozados.`,
  },
  {
    title: 'Una marca que se recuerda',
    text: 'Rebozaditos Pop tiene personalidad y novedades como Rebodinos, nuestra línea para chicos. Eso hace que tus clientes vuelvan a pedir.',
  },
  {
    title: 'Llegamos a todo el país',
    text: 'Te enviamos el pedido a donde estés. ¿No tenés transporte? No hay problema: lo conseguimos por vos.',
  },
  {
    title: 'Exclusividad en tu zona',
    text: 'Si acompañás con volumen y buena rotación, la zona es tuya. Ya son más de 100 clientes mayoristas los que venden la marca.',
  },
  {
    title: 'No vendés solo',
    text: 'Te damos folletos, gorras y remeras para tu punto de venta, asesoramiento comercial y acciones para vender más.',
  },
]

export const PASOS = [
  { title: 'Completás el formulario', text: 'Nos contás dónde estás, qué tipo de negocio tenés y cuánto vendés por mes.' },
  { title: 'Te contactamos', text: 'Te pasamos precios, condiciones y cómo te llega el pedido a tu zona.' },
  { title: 'Arrancás a vender', text: 'Armamos juntos tu primer pedido y te acompañamos en el lanzamiento.' },
]

export const FAQ = [
  {
    q: '¿Quiénes pueden vender Rebozaditos Pop?',
    a: 'Distribuidores mayoristas, supermercados, comercios y gastronomía de todo el país. Completá el formulario contándonos qué tipo de negocio tenés y dónde estás.',
  },
  {
    q: '¿Cuál es el pedido mínimo?',
    a: `${PEDIDO_MINIMO[0].toUpperCase()}${PEDIDO_MINIMO.slice(1)}. ¿Manejás otro volumen? Consultanos igual: contanos qué necesitás y buscamos juntos la mejor forma de que tengas Rebozaditos Pop en tu negocio.`,
  },
  {
    q: '¿Llegan a mi provincia?',
    a: 'Sí, enviamos pedidos mayoristas a todo el país. Trabajamos con transportes de confianza y, si no tenés cómo recibir la mercadería, nosotros te conseguimos el transporte.',
  },
  {
    q: '¿Cada cuánto puedo recibir mercadería?',
    a: 'Cuando lo necesites: no hay un calendario fijo, cada pedido sale cuando lo hacés. Los tiempos de entrega dependen de tu zona y te los confirmamos al contactarte.',
  },
  {
    q: '¿Puedo tener exclusividad en mi zona?',
    a: 'Sí. Damos exclusividad a los distribuidores que mantienen un buen volumen de compra y rotación del producto.',
  },
  {
    q: '¿Qué me dan para ayudarme a vender?',
    a: 'Material para tu punto de venta (folletos, gorras y remeras), asesoramiento comercial y acciones en conjunto para mover más producto.',
  },
  {
    q: '¿Los productos están habilitados?',
    a: 'Sí. Nuestra planta de Mar del Plata está habilitada por SENASA y cuenta con RNE y RNPA, los registros nacionales que exige la ley para elaborar y vender alimentos.',
  },
  {
    q: '¿Qué productos fabrican?',
    a: `${PRODUCTS.length} rebozados congelados en ${lines} líneas: pollo (medallones, formitas y nuggets), pescado (filets y medallones de merluza), mariscos (rabas y langostinos) y vegetales y quesos (barritas de mozzarella y bocaditos de espinaca).`,
  },
  {
    q: '¿En qué presentaciones vienen?',
    a: `En bolsas de ${PACK_SIZES_TEXT}, según el producto. En la ficha de cada uno vas a ver qué tamaños tiene.`,
  },
  {
    q: '¿Cómo se conservan y se cocinan?',
    a: 'Vienen prefritos y ultracongelados: se guardan en el freezer hasta el momento de cocinarlos. Cada ficha te dice cómo y cuánto tiempo cocinarlo.',
  },
  {
    q: '¿Cómo empiezo?',
    a: 'Completá el formulario o escribinos por WhatsApp: ahí te respondemos en el momento.',
  },
]
