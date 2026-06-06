export interface Truco {
  nombre: string;
  descripcion: string;
  icono: string;
}

export const TRUCOS: Truco[] = [
  {
    nombre: 'Lavar bien las fresas',
    descripcion:
      'Llenar un recipiente grande con agua limpia. Añadir unas cucharaditas de bicarbonato de sodio y mezclar bien. Sumergir las fresas en el agua durante unos minutos. Enjuagar con agua limpia para eliminar cualquier residuo. Secar las fresas con un paño suave o papel absorbente antes de consumirlas.',
    icono: '🍓',
  },
  {
    nombre: 'El agua de cocción de la pasta',
    descripcion:
      'Guarda siempre un vaso del agua de cocción de la pasta antes de escurrirla. Es rica en almidón y es el secreto para ligar perfectamente cualquier salsa, dándole cremosidad sin necesidad de añadir nata.',
    icono: '🍝',
  },
  {
    nombre: 'Sal en el agua de la pasta',
    descripcion:
      'El agua de cocción de la pasta debe saber a mar. Añade sal abundante cuando rompa a hervir, no antes. Esto no solo sazona la pasta por dentro sino que también sube el punto de ebullición.',
    icono: '🧂',
  },
  {
    nombre: 'Limpiar almejas, berberechos, navajas, etc',
    descripcion:
      'Preparar una mezcla de 35 g de sal por litro de agua fría. Esta proporción es esencial para que el molusco actúe como lo haría en su hábitat. Meter los moluscos en la mezcla durante 30 minutos. Desechar los que floten, estén rotos o se abran antes de cocinarse. Vaciar el recipiente y preparar de nuevo agua fría con la misma proporción de sal. Introducir de nuevo los moluscos durante 2 horas. Esta segunda fase eliminará la arena más incrustada',
    icono: '🦪',
  },
  {
    nombre: 'Reposar la carne',
    descripcion:
      'Después de cocinar cualquier pieza de carne, déjala reposar tapada con papel de aluminio durante al menos 5 minutos. Los jugos se redistribuyen y la carne queda mucho más jugosa al cortarla.',
    icono: '🥩',
  },
  {
    nombre: 'El truco del ajo',
    descripcion:
      'Para pelar ajos fácilmente, aplasta el diente con el lateral del cuchillo con un golpe seco. La piel se separa sola. Si necesitas pelar muchos, mételos 30 segundos en el microondas.',
    icono: '🧄',
  },
  {
    nombre: 'Cocer marisco, procedimiento y tiempos de cocción',
    descripcion: `La cocción de cada especie de marisco es diferente. Si el marisco es fresco, conviene cocerlo recién comprado. Si el marisco es congelado, hay que descongelarlo en la nevera dentro de un recipiente que recoja el agua de la descongelación sin que esté en contacto con la pieza.
  Se debe cocinar en cuanto esté bien descongelado. En todos los casos, antes de cocer marisco hay que lavarlo y escurrirlo bien.
  El agua: llenar una cacerola de agua del grifo y echar 60 g de sal por cada litro de agua. Se pueden añadir una o dos hojas de laurel, según la cantidad. Llevarla a ebullición. Para cocer marisco el agua tiene que estar hirviendo, ya que se busca el contraste de temperatura entre el marisco y el agua. Calcular bien la cantidad de agua. Si es demasiada, al echar el marisco el agua podría dejar de hervir, lo que haría que se quede crudo el interior. Respecto a la temperatura, el agua tiene que estar hirviendo a borbotones.
  Como hay que evitar que el agua se enfríe demasiado, bien por poca cantidad de agua o por mucha cantidad de marisco, se recomienda hacer la cocción en tandas. Ejemplo: se cuecen 12 langostinos en tres litros de agua salada y cuando se retiran, se espera a que el agua hierva de nuevo antes de agregar los 12 siguientes.
  Tiempos de cocción: el tiempo de cocción empieza a contar desde que, echado el marisco, el agua vuelve a hervir. Así, de forma general:
  •	El marisco pequeño: gambas, camarones, quisquillas, langostinos y cigalas pequeñas, etc. se retira de la olla cuando el agua, una vez introducido el marisco, arranca a hervir de nuevo.
  •	El marisco mediano: langostinos, cigalas, nécoras, cangrejos, carabineros, gambones, etc. se dejan cocerán entre 1 y 5 minutos, una vez reiniciado el hervor, dependiendo del tamaño.
  •	Para el marisco de gran tamaño:  buey de mar, bogavante, langosta y centollo, el tiempo se calcula según el peso, tal y como indica la siguiente tabla.

  Peso de cada pieza	Tiempo aproximado
  (depende del marisco)
  500 g	10 minutos
  600 g	11 minutos
  700 g	12 minutos
  800 g	13 minutos
  900 g	14 minutos
  1000 g	15 minutos
  La regla es aumentar un minuto de tiempo de cocción por cada 100 g de peso que aumente la pieza de marisco a cocer. Ejemplo: para un bogavante de 1.500 g, el tiempo de cocción sería de unos 20 minutos.

  <table>
  <thead>
    <tr>
      <th><u>Tipo de marisco (peso)</u></th>
      <th><u>Gramos de sal por litro de agua</u></th>
      <th><u>Minutos de cocción</u></th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Bogavante pequeño (400 a 600 g)</td><td>40</td><td>17 minutos</td></tr>
    <tr><td>Bogavante medio (650 a 1.000 g)</td><td>40</td><td>20 minutos</td></tr>
    <tr><td>Bogavante grande (1.000 a 1.500 g)</td><td>40</td><td>22-23 minutos</td></tr>
    <tr><td>Buey de mar mediano (700 g)</td><td>40</td><td>18 minutos</td></tr>
    <tr><td>Buey de mar grande (2 kg)</td><td>40</td><td>22 minutos</td></tr>
    <tr><td>Camarón</td><td>40</td><td>90 segundos</td></tr>
    <tr><td>Cangrejos</td><td>40</td><td>6 minutos</td></tr>
    <tr><td>Centolla mediana (700 g)</td><td>40</td><td>15 minutos</td></tr>
    <tr><td>Centolla grande (2 kg)</td><td>40</td><td>18 minutos</td></tr>
    <tr><td>Cigala mediana (20 piezas/1 kg)</td><td>40</td><td>90 segundos</td></tr>
    <tr><td>Cigala grande (10 piezas/kg.)</td><td>40</td><td>3 minutos</td></tr>
    <tr><td>Gamba</td><td>40</td><td>90 segundos</td></tr>
    <tr><td>Langosta mediana (700 g)</td><td>40</td><td>22 minutos</td></tr>
    <tr><td>Langosta grande (2 kg)</td><td>40</td><td>30 minutos</td></tr>
    <tr><td>Langostino mediano</td><td>40</td><td>90 segundos</td></tr>
    <tr><td>Langostino grande</td><td>40</td><td>2 minutos</td></tr>
    <tr><td>Nécora pequeña (15 piezas/kg)</td><td>40</td><td>5 minutos</td></tr>
    <tr><td>Nécora grande (10 piezas/kg)</td><td>40</td><td>7 minutos</td></tr>
    <tr><td>Percebe (calibre medio)</td><td>40</td><td>50 segundos</td></tr>
    <tr><td>Pulpo (2 kg aproximadamente)</td><td>No echar sal (salar al servir)</td><td>21-22 minutos</td></tr>
  </tbody>
</table>

  Enfriado del marisco, una vez cocido: cortar la cocción del marisco según se retira del agua es esencial para obtener un buen resultado. Por ello, antes de sumergir el marisco en el agua hirviendo, hay que preparar un recipiente profundo con agua salada y mucho hielo, para introducir el marisco directamente de la olla. La proporción de sal por litro de agua será la misma que para la cocción, 60 g por litro de agua. Si vamos a cocer mucho marisco, utilizaremos muchos cubitos de hielo. Después de sumergir el marisco en el agua helada durante un minuto, se retira y se deja escurrir sobre una bandeja cubierta con papel absorbente.
  El marisco debe quedar terso y crujiente. Hay que servirlo inmediatamente y, si no es posible, hay que conservarlo en la nevera cubierto con un trapo humedecido en agua salada, procurando consumirlo en no más de una hora. Se recomienda sacar del frigorífico unos minutos antes de servirlo para que se atempere ligeramente.
  `,
    icono: '🦀',
  },
  {
    nombre: 'Rallar mantequilla',
    descripcion:
      'Pasar la coladera por la base de la mantequilla y se formarán filamentos dentro del colador.',
    icono: '🧈',
  },
  {
    nombre: 'Huevos a temperatura ambiente',
    descripcion:
      'Para repostería, saca siempre los huevos de la nevera 30 minutos antes de usarlos. A temperatura ambiente se integran mejor en las masas y las claras montan mucho más fácilmente.',
    icono: '🥚',
  },
  {
    nombre: 'El truco de la cebolla',
    descripcion:
      'Para no llorar al cortar cebolla, métela en el congelador 15 minutos antes. También puedes mojar el cuchillo en agua fría antes de cortar. El frío reduce la evaporación de los compuestos que irritan los ojos.',
    icono: '🧅',
  },
  {
    nombre: 'Desalar bacalao',
    descripcion:
      'Lavar el bacalao bajo el chorro del grifo de agua fresca. Sumergirlo en agua fría dentro de un recipiente grande, durante 36 horas. Este tiempo aumentará a 48 horas si los trozos son muy gruesos. El toque definitivo para trabajar con un bacalao blanco y jugoso, aunque es opcional, es ponerlo un par de horas a remojo en leche. La leche no le aporta nada de sabor, solo blancura y jugosidad. Luego hay que escurrir bien el bacalao y secarlo con un paño de cocina limpio y trabajar normalmente. El tema de tenerlo en leche es muy útil para rebozar el bacalao, o para confitarlo y que al servirlo y partirlo se vea blanco y jugoso. Si necesitamos cocer el bacalao para utilizarlo, entonces pondremos en el cazo mitad agua, mitad leche, e introduciremos el bacalao, y le daremos un hervor si las piezas no son muy grandes y un par de minutos si son buenos lomos.',
    icono: '🐟',
  },
  {
    nombre: 'Evitar la oxidación de fruta o verdura',
    descripcion:
      'Una vez pelada la fruta o la verdura, guardarla en un túper. Poner encima un par de trozos de papel absorbente de cocina, previamente humedecidos. Para ello, se puede rociar agua con un spray sobre el papel de cocina o hacerlo con las manos. No utilizar servilletas porque se rompen.',
    icono: '🍇',
  },
  {
    nombre: 'El secreto del sofrito',
    descripcion:
      'Un buen sofrito necesita tiempo y paciencia. Cocina la cebolla a fuego muy bajo durante al menos 20 minutos, removiendo de vez en cuando. La diferencia con un sofrito rápido es abismal en sabor.',
    icono: '🍳',
  },
];
