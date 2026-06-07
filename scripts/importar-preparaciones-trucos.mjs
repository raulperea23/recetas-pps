import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const serviceAccount = JSON.parse(
  readFileSync("./scripts/serviceAccount.json", "utf-8"),
);

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

const preparaciones = [
  {
    nombre: "AZÚCAR AVAINILLADO",
    descripcion: `Receta de: www.velocidadcuchara.com

    Ingredientes: 200 g de azúcar (normal o azúcar glas) y 1 vaina de vainilla.

    Preparación: para hacer azúcar glas pulverizar el azúcar en el Thermomix (5-7-9) unos 20-25 segundos aproximadamente. Introducir el azúcar glas en un bote hermético. Partir en tres la vaina de vainilla y clavarlas en el azúcar. Cerrar el bote y agitar. Dejar reposar durante unos días (de 3 a 15 días, según blogs), agitando el frasco cada día o dos días para remover el azúcar.

    Si se ha perdido el aroma y aún queda azúcar se puede introducir otra vaina de vainilla.

    Truco para tener azúcar avainillado al momento: abrir la vaina de vainilla y extraer las semillas que hay dentro. Introducir el azúcar en la Thermomix, agregar las semillas y mezclar 10 segundos a velocidad 5.`,
    icono: "🍦",
  },
  {
    nombre: "CALDO DE HUESOS",
    descripcion: `Receta de: www.okdiario.com

    Ingredientes: 1 kg de huesos de ternera (alguno de rodilla), espinazo, carcasas de pollo (opcional), 1 cebolla mediana, 2 zanahorias, ½ nabo, 1 puerro con la parte verde, ½ apio, 2 hojas de laurel, pimienta negra y sal.

    Preparación: poner los huesos en una cacerola con agua fría y llevarla a ebullición. Desechar este primer agua para que quede un caldo más limpio. Volver a echar agua y añadir todas las verduras y las especias. Cocinar a fuego bajo durante unas 4-5 horas, desespumando de vez en cuando. Colar el caldo y dejar enfriar. Retirar la grasa solidificada si se quiere un caldo bajo en grasas. Ajustar de sal.

    Este caldo permite su congelación. Se puede tomar como consomé o usar como base de otros platos.`,
    icono: "🍲",
  },
  {
    nombre: "CALDO DE PESCADO O FUMET",
    descripcion: `Receta de: algún libro de cocina que consulté.

Ingredientes: cabeza y espinas de pescado (pescadilla, rape, rodaballo, congrio, etc.) y, si se tiene, unos huesos de rape, 200 g de cabezas o cáscaras de gambas o gambón, ½ cebolla, 1 zanahoria, ½ nabo, las hojas verdes del puerro, algunas hojas de apio, 2 hojas de laurel, un poco de perejil y sal. No es necesario tener toda la verdura podemos hacerlo, aunque falte alguna. Si lo vamos a hacer flambeándolo, un chorrito de brandy.

Preparación: poner todo el pescado y las verduras limpias y troceadas en la cacerola. Echar agua (un 20% más de la que se va a necesitar, ya que evaporará), el laurel, el perejil y una pizca de sal. Cuando rompa a hervir, bajar el fuego, dejar que cueza alegre durante 20-25 m. Ir desespumando. Colar.

El caldo de pescado está más sabroso si se hace un día antes de utilizarlo para alguna receta.

Preparación flambeando: freír las cabezas y las cáscaras de las gambas o gambón, chafándolas con una espátula o cuchara de madera. Agregar el brandy y flamblearlo. Cuando se haya apagado la llama del alcohol (se usa la tapa para apagarlo), se agregan las verduras limpias y troceadas en la cacerola. Rehogar unos minutos y agregar el agua, el laurel y una pizca de sal. Cuando rompa a hervir, echar las cabezas y espinas del pescado. Bajar el fuego, dejar que cueza alegre durante 20-25 m. Ir desespumando. Colar.`,
    icono: "🐟",
  },
  {
    nombre: "CALDO DE POLLO",
    descripcion: `Receta de: mezclando varias recetas de internet.

Ingredientes: 2 carcasas de pollo, huesos de pollo, 2 trozos de pollo (mejor si son alitas o contramuslos), 1 cebolla mediana, 1 zanahoria, 1 trozo de calabaza, ½ nabo, ½ apio, 1 puerro con la parte verde, hierbas aromáticas a gusto (tomillo, romero, etc.), 2 hojas de laurel y sal.

Preparación: poner todos los ingredientes en la cacerola y cubrir con agua. Poner a fuego fuerte hasta que empiece a hervir y dejar unos minutos que borbotee. Retirar las impurezas con una espumadera. Colocar la tapa y dejar cocer durante al menos dos horas. Una vez que el caldo está listo, se cuela y se deja enfriar. Cuando esté bien frío, se puede retirar la grasa que se habrá formado en la superficie.

Este caldo permite su congelación. Se puede tomar como consomé o usar como base de otros platos.`,
    icono: "🐔",
  },
  {
    nombre: "CARAMELO LIQUIDO PARA POSTRES",
    descripcion: `Receta de: preguntando, preguntando…

Ingredientes: 5 cucharadas de azúcar, 3 cucharadas de agua y unas gotas de limón.

Preparación: poner un cazo a fuego medio, cuando esté templado echar el azúcar y a continuación el agua. No remover porque se apelmazará el azúcar. Se empezarán a formar pequeñas burbujas y el azúcar cambia de color. Cuando esto suceda, remover con una cuchara de madera para conseguir que ligue todo bien. Retirar del fuego y seguir removiendo hasta que alcance el color miel tostado, propio del caramelo. Añadir unas gotas de zumo de limón para dar brillo y evitar que cristalice inmediatamente. Dejar que se temple un poco y volcar sobre el recipiente que queramos caramelizar.`,
    icono: "🍮",
  },
  {
    nombre: "CEBOLLA CARAMELIZADA",
    descripcion: `Receta de: consultar páginas de cocina en internet.

Ingredientes: 700 g de cebollas, 2 cucharadas de azúcar blanco/moreno, agua y aceite de oliva.

1ª Preparación: cortar la cebolla en tiras finas. En una sartén, calentar el aceite de oliva y echar la cebolla. Freírla a fuego lento hasta que quede transparente sin dorarse (unos 6 minutos, aproximadamente). Añadir el azúcar y un poco de agua si es necesario. Poner a fuego lento hasta que caramelice. No dejar de remover continuamente (unos 20 minutos, aproximadamente).

Variante: Añadir un poco de vinagre de Módena con el azúcar. No quedará nada de ácido y el sabor es sorprendente.

Variante: Caramelizarla con azúcar y con un buen oloroso dulce de Jerez.

2ª Preparación: en una sartén se pone el aceite y la mantequilla al fuego, se limpian las cebollas y se parten en aros finitos y se colocan también en la sartén. Se van friendo a fuego medio/bajo durante unos 35 minutos. Se añade la sal y la pimienta. Cuando la cebolla esté blandita, se añade el azúcar y se cocina durante otros 5 minutos. En los últimos 30 segundos se añade un chorrito de vinagre y se mezcla todo bien.

3ª Preparación (con Thermomix): pelar las cebollas, córtalas en cuartos y ponerlas en el vaso del robot. Trocear 2 segundos a velocidad 5. Agregar el resto de los ingredientes: aceite y azúcar moreno (o blanco). En este caso, se puede añadir un poco de brandy. Programar 35 minutos Varoma a velocidad cuchara. La cebolla caramelizada estará lista.`,
    icono: "🧅",
  },
  {
    nombre: "FUNDIR CHOCOLATE",
    descripcion: `Receta de: la que viene en el envoltorio del chocolate.

Ingredientes: una tableta de chocolate de unos 180 g y 4 cucharadas de agua.

Preparación: poner el chocolate troceado en un bol. Añadir el agua. Introducir al microondas. Calentar 1 minuto a unos 440W (programa 3 en mi microondas). Dejar reposar. Remover con un tenedor. Calentar otros 30 segundos a 440W. Dejar reposar y remover con un tenedor. Volver a calentar otros 30 segundos a 440W. En principio es suficiente, pero podría repetirse alguna vez más.

Si se quiere utilizar para añadir a tortitas, etc., es conveniente dejarlo un poco más líquido, así en vez de 4 se añadirán 7 cucharadas de agua por tableta.`,
    icono: "🍫",
  },
  {
    nombre: "MAYONESA",
    descripcion: `Receta de: la de toda la vida de casa.

Ingredientes: 200 ml de aceite de oliva (puede hacerse con aceite de oliva suave o girasol, para una salsa menos intensa), 1 huevo grande (o 2 pequeños), una pizca de sal, una cucharada de vinagre o de limón recién exprimido. La proporción de aceite y huevo será de 80%-20%.

Preparación: colocar el aceite en el vaso de la batidora y añadir los huevos, la sal y el vinagre (o limón). Poner la batidora en el fondo del vaso y encenderla. No mover la batidora hasta conseguir la textura adecuada. Como mucho, se puede mover al final muy despacio y de lado si ha quedado algo de aceite sin integrar. El movimiento excesivo es lo que puede hacer que se corte la mayonesa.`,
    icono: "🥚",
  },
  {
    nombre: "MONTAR CLARAS (con Thermomix)",
    descripcion: `Receta de: libro de Thermomix.

Ingredientes: claras de huevo, vinagre (opcional) y azúcar glasé (opcional).

Preparación: se hace igual que con la nata (ver a continuación), con la mariposa y velocidad 3 ½ - 4. Las claras deben estar libres de restos de yema y el vaso muy limpio y seco. Se pueden añadir unas gotas de vinagre para que monten mejor. Si queremos que queden más firmes debes montar a 37 ºC.

Para obtener un merengue perfecto, añade un poco de azúcar glasé al principio y deja montar más tiempo, a velocidad 3 ½, a 37 ºC de temperatura. Al tener azúcar tardará más en montar, unos 10 minutos, dependiendo de la cantidad de claras.`,
    icono: "☁️",
  },
  {
    nombre: "MONTAR NATA (con varillas)",
    descripcion: `Receta de: www.directoalpaladar.com.

Ingredientes: para 1 litro de nata para montar (porcentaje ideal de grasa 40% porque es la grasa la que permite “montar” la nata), 100 g de azúcar (mejor si es de grano fino).

Otras opciones para endulzar: azúcar glasé, azúcar avainillado.

Opciones para aromatizar: extracto de vainilla, ralladura fina de naranja o limón, licor, cacao en polvo, etc.

Preparación: escoger un cuenco preferiblemente de acero inoxidable o vidrio, que sea grande y profundo, ya que la nata multiplicará su volumen.

Para montar la nata, ésta tiene que estar muy fría. Tiene que venir de varios días en la nevera y si se puede, la introduciremos al congelador unos 10-15 minutos antes de batirla, junto con los cuencos y varillas que vayamos a usar. Si en la cocina hiciera calor, colocar el bol sobre otro recipiente más grande lleno de cubitos de hielo y alejarse de las fuentes de calor.

Poner la nata en el cuenco elegido y batir a velocidad media con la batidora de varillas, con movimientos envolventes para llegar a todo el recipiente. Poco a poco aparecerán burbujas y la nata irá adquiriendo mayor densidad. Cuando la nata empiece a tomar cuerpo subimos la velocidad de la batidora a una potencia media-alta. Seguimos moviendo las varillas por todo el recipiente hasta que la nata haga ondas en la superficie, aquí la nata estará parcialmente montada. Añadir en este momento el azúcar y los aromas, si vamos a añadirlos.

Para no pasarnos con el batido y que se corte la nata, lo mejor es bajar la velocidad de nuevo y parar cuando la nata forme picos duros y le demos la vuelta al cuenco, observando que no se cae la nata.

Se conserva en un recipiente hermético en la nevera durante uno o dos días.`,
    icono: "🥣",
  },
  {
    nombre: "MONTAR NATA (con Thermomix)",
    descripcion: `Receta de: Libro de Thermomix.

Ingredientes: para 1 litro de nata para montar (porcentaje ideal de grasa 40% porque es la grasa la que permite “montar” la nata), 100 g de azúcar (mejor si es de grano fino).

Preparación: para montar la nata usaremos el accesorio llamado mariposa. No debe olvidarse que al usar la mariposa nunca se debe sobrepasar la velocidad 3 ½.

Para montar nata lo ideal es que el vaso esté bien frío, al igual que la nata. Se puede poner en el congelador unos minutos o picar unos cubitos de hielo, secando bien a continuación. Si se quiere aromatizar o endulzar, añadir el azúcar y un poco de vainillina antes de montar. Si se monta sin azúcar tardará menos que si tiene azúcar. Programa velocidad 3-4, con la mariposa, y con el cubilete puesto en la tapa, controlando a través de este, el punto de montado. Hay que tener cuidado ya que, en pocos segundos, si es poca cantidad, se consigue montar. Si en ese punto seguimos batiendo, la grasa se separa del suero y se obtendrá mantequilla. Para evitar esto, cuando veamos que la nata empieza a espesar lo mejor es bajar la velocidad a 2 ½, hasta que tenga el punto perfecto.`,
    icono: "🍦",
  },
];

const trucos = [
  {
    nombre: "Consejos a la hora de hacer pan",
    descripcion: `<u>PARA SABER EL TIEMPO DE FERMENTACIÓN:</u>
    Presionar la masa con la yema del dedo:
    <ul>
    <li>Si el hueco se rellena enseguida, le falta fermentación.</li>
    <li>Si el hueco queda hundido y no se rellena, nos hemos pasado de tiempo.</li>
    <li>Si el hueco se hunde, pero se rellena lentamente, es el momento de meterlo al horno.</li>
    </ul>
    <u>PARA CONSEGUIR UNA BUENA CORTEZA DEL PAN:</u>
    <ul>
    <li>Corteza suave (tipo pan de molde o bollería): la masa debe tener algo de aceite u otro tipo de grasa y hay que mantener el horno vaporizado (poner un vaso de agua dentro del horno durante la cocción).</li>
    <li>Corteza dura y crujiente (tipo pan de pueblo): pulverizar con agua el pan en el momento de meterlo al horno (le aportará humedad al principio para crecer y sequedad al final para endurecer la corteza). El pan no llevará aceite ni grasa y la temperatura será alta.</li>
    </ul>
    <u>PARA DORAR EL PAN:</u>
    Pincelar antes de meter al horno. Según el ingrediente utilizado se obtendrá un tipo u otro de corteza y de dorado:
    <ul>
    <li>Pincelar con una yema de huevo mezclada con una cucharada de agua o leche. El clásico.</li>
    <li>Con clara de huevo: para panes con carácter y no dulces, da un aspecto dorado.</li>
    <li>Con leche: se obtiene una corteza blanda y dorada. Ideal para panecillos y panes tiernos.</li>
    <li>Con leche tibia y azúcar: queda una corteza dorada y le da un toque dulce.</li>
    <li>Con aceite: le da un sabor y acabado brillante. Ideal para focaccias, etc.</li>
    <li>Con mantequilla: se obtienen cortezas tiernas y de color dorado.</li>
    <li>Con agua salada (una cucharadita de sal y una de agua): resulta una corteza brillante, crujiente y un poco salada.</li>
    <li>Espolvorear con harina antes y después de sacar del horno produce un aspecto de pan rústico.</li>
    </ul>
    <u>DESPUÉS DE COCER EN EL HORNO:</u>
    Una vez cocido, el pan debe dejarse enfriar encima de una rejilla y no cortarlo hasta que transcurran, por lo menos, 30 minutos. Para cortarlo, utilizar un cuchillo de sierra. Si vamos a congelarlo, hacerlo en cuanto esté frío, no esperar mucho más.
`,
    icono: "🍞",
  },
  {
    nombre: "Lavar bien las fresas",
    descripcion:
      "Llenar un recipiente grande con agua limpia. Añadir unas cucharaditas de bicarbonato de sodio y mezclar bien. Sumergir las fresas en el agua durante unos minutos. Enjuagar con agua limpia para eliminar cualquier residuo. Secar las fresas con un paño suave o papel absorbente antes de consumirlas.",
    icono: "🍓",
  },
  {
    nombre: "El agua de cocción de la pasta",
    descripcion:
      "Guarda siempre un vaso del agua de cocción de la pasta antes de escurrirla. Es rica en almidón y es el secreto para ligar perfectamente cualquier salsa, dándole cremosidad sin necesidad de añadir nata.",
    icono: "🍝",
  },
  {
    nombre: "Sal en el agua de la pasta",
    descripcion:
      "El agua de cocción de la pasta debe saber a mar. Añade sal abundante cuando rompa a hervir, no antes. Esto no solo sazona la pasta por dentro sino que también sube el punto de ebullición.",
    icono: "🧂",
  },
  {
    nombre: "Limpiar almejas, berberechos, navajas, etc",
    descripcion:
      "Preparar una mezcla de 35 g de sal por litro de agua fría. Esta proporción es esencial para que el molusco actúe como lo haría en su hábitat. Meter los moluscos en la mezcla durante 30 minutos. Desechar los que floten, estén rotos o se abran antes de cocinarse. Vaciar el recipiente y preparar de nuevo agua fría con la misma proporción de sal. Introducir de nuevo los moluscos durante 2 horas. Esta segunda fase eliminará la arena más incrustada",
    icono: "🦪",
  },
  {
    nombre: "Reposar la carne",
    descripcion:
      "Después de cocinar cualquier pieza de carne, déjala reposar tapada con papel de aluminio durante al menos 5 minutos. Los jugos se redistribuyen y la carne queda mucho más jugosa al cortarla.",
    icono: "🥩",
  },
  {
    nombre: "El truco del ajo",
    descripcion:
      "Para pelar ajos fácilmente, aplasta el diente con el lateral del cuchillo con un golpe seco. La piel se separa sola. Si necesitas pelar muchos, mételos 30 segundos en el microondas.",
    icono: "🧄",
  },
  {
    nombre: "Cocer marisco, procedimiento y tiempos de cocción",
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
    icono: "🦀",
  },
  {
    nombre: "Rallar mantequilla",
    descripcion:
      "Pasar la coladera por la base de la mantequilla y se formarán filamentos dentro del colador.",
    icono: "🧈",
  },
  {
    nombre: "Huevos a temperatura ambiente",
    descripcion:
      "Para repostería, saca siempre los huevos de la nevera 30 minutos antes de usarlos. A temperatura ambiente se integran mejor en las masas y las claras montan mucho más fácilmente.",
    icono: "🥚",
  },
  {
    nombre: "El truco de la cebolla",
    descripcion:
      "Para no llorar al cortar cebolla, métela en el congelador 15 minutos antes. También puedes mojar el cuchillo en agua fría antes de cortar. El frío reduce la evaporación de los compuestos que irritan los ojos.",
    icono: "🧅",
  },
  {
    nombre: "Decorar cremas con nata líquida",
    descripcion: `Se necesita un brik de nata líquida espesa y un biberón o jeringa. Sirve para decorar cremas que no sean blancas, ya que se hará con nata y no contrastaría.
    Introducir la nata en el biberón o jeringa. Sobre la crema, ya en el plato, se dibujará con la nata una espiral de dentro hacia fuera hasta acabar en el borde del plato. A continuación, con un palillo ir trazando líneas con la siguiente mecánica:
    1.	Desde dentro de la espiral hacia fuera, hasta el borde del plato
    2.	Tras limpiar el palillo, trazar otra línea, pero esta vez de fuera hacia adentro.
    3.	Volver a limpiar y así sucesivamente.
    `,
    icono: "🍦",
  },
  {
    nombre: "Desalar bacalao",
    descripcion:
      "Lavar el bacalao bajo el chorro del grifo de agua fresca. Sumergirlo en agua fría dentro de un recipiente grande, durante 36 horas. Este tiempo aumentará a 48 horas si los trozos son muy gruesos. El toque definitivo para trabajar con un bacalao blanco y jugoso, aunque es opcional, es ponerlo un par de horas a remojo en leche. La leche no le aporta nada de sabor, solo blancura y jugosidad. Luego hay que escurrir bien el bacalao y secarlo con un paño de cocina limpio y trabajar normalmente. El tema de tenerlo en leche es muy útil para rebozar el bacalao, o para confitarlo y que al servirlo y partirlo se vea blanco y jugoso. Si necesitamos cocer el bacalao para utilizarlo, entonces pondremos en el cazo mitad agua, mitad leche, e introduciremos el bacalao, y le daremos un hervor si las piezas no son muy grandes y un par de minutos si son buenos lomos.",
    icono: "🐟",
  },
  {
    nombre: "Evitar la oxidación de fruta o verdura",
    descripcion:
      "Una vez pelada la fruta o la verdura, guardarla en un túper. Poner encima un par de trozos de papel absorbente de cocina, previamente humedecidos. Para ello, se puede rociar agua con un spray sobre el papel de cocina o hacerlo con las manos. No utilizar servilletas porque se rompen.",
    icono: "🍇",
  },
  {
    nombre: "El secreto del sofrito",
    descripcion:
      "Un buen sofrito necesita tiempo y paciencia. Cocina la cebolla a fuego muy bajo durante al menos 20 minutos, removiendo de vez en cuando. La diferencia con un sofrito rápido es abismal en sabor.",
    icono: "🍳",
  },
];

async function importar() {
  console.log("Importando preparaciones...");
  for (const prep of preparaciones) {
    await db.collection("preparaciones").add(prep);
    console.log(`✅ Preparación: ${prep.nombre}`);
  }

  console.log("Importando trucos...");
  for (const truco of trucos) {
    await db.collection("trucos").add(truco);
    console.log(`✅ Truco: ${truco.nombre}`);
  }

  console.log("🎉 Importación completada");
  process.exit(0);
}

importar().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
