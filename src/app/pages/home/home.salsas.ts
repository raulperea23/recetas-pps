export interface Salsa {
  nombre: string;
  descripcion: string;
  tipoSalsa: string;
}

export const SALSAS: Salsa[] = [
  {
    nombre: 'Salsa Agridulce',
    descripcion: `<u>Ingredientes</u>: 3 cucharadas de azúcar, 4 cucharadas de vinagre suave, 1 cucharada de concentrado de tomate, 2 cucharadas de salsa de soja sin gluten (tamari), 6 cucharadas de zumo de naranja o de piña (se puede utilizar el jugo de una lata de piña), 2 cucharaditas de maicena.
    <u>Preparación</u>: mezclar en un cacillo el azúcar, el vinagre, el tomate, la salsa tamari y el zumo de piña. Calentar a fuego bajo. Mientras, desleír en un vaso con 8 cucharadas de agua fría, las 2 cucharaditas de maicena. Agregar al cacillo, dejar que de un hervor y retirar. Dejar enfriar.`,
    tipoSalsa: 'agridulce',
  },
  {
    nombre: 'Alioli o Ajoaceite',
    descripcion: `<u>Ingredientes</u>: 1 huevo, 1 diente de ajo, 1 cucharada de vinagre, 175 ml de aceite de oliva y sal. Los ingredientes deben estar a temperatura ambiente ya que si están fríos se puede dificultar la emulsión.
    <u>Preparación</u>: Poner el ajo y el huevo en el vaso de la batidora. Añadir una pizca de sal, un chorro de aceite y un chorrito de vinagre. Introducir el brazo de la batidora hasta el fondo y empezar a batir sin mover la batidora. Cuando empiece a emulsionar mueve el brazo lentamente arriba y abajo, hasta que la mezcla quede bien homogénea.
    Para mejorar su conservación, se puede cubrir la superficie del alioli con una fina capa de aceite antes de cerrarlo y refrigerarlo. Esto ayuda a sellar la salsa y reducir la exposición al aire, lo que puede prolongar su frescura y evitar la oxidación. Se recomienda consumirlo en dos o tres días.`,
    tipoSalsa: 'alioli',
  },
  {
    nombre: 'Salsa de Arándanos',
    descripcion: `<u>Ingredientes</u>: 200 g de arándanos (si son congelados, sacar del congelador un rato antes), 100 ml de agua, 80 g de azúcar moreno, 1 cucharadita de zumo de limón, 1 cucharadita de ralladura de limón, sal, tomillo o romero (opcional) y un chorrito de vino tino o un poco de pimienta negra (opcional). 
    <u>Preparación</u>: en una cazuela poner los arándanos, el agua, el azúcar, la ralladura y el zumo de limón y una pizca de sal. Poner a cocer a fuego medio unos 5 minutos. Añadir ahora los ingredientes opcionales que se quieran echar. Dejar que vaya cociendo despacio, removiendo constantemente. Cuando empiece a hervir, bajar el fuego y dejar que los arándanos se vayan rompiendo y soltando el jugo. En unos 10-15 minutos, la mezcla se habrá reducido e irá espesando. Si se queda muy seca, se puede añadir un poquito de agua. Si está muy líquida dejarla al fuego hasta que reduzca un poco más. Hay que tener en cuenta que la salsa espesa aún más, después de retirarla del fuego.
    Si queda un poco ácida, se añadirá un poquito de azúcar. Si un poco dulce, añadir un poquito más de limón.
    La textura de esta salda es a gustos: se puede dejar con pequeños tropezones, para ello la aplastaremos con un tenedor, o se puede usar la batidora para dejarla más fina y sin trozos. Lo más adecuado es dejar una textura intermedia.
    Aguanta en la nevera 4-5 días. Es ideal para acompañar carnes.`,
    tipoSalsa: 'fruta',
  },
  {
    nombre: 'Bechamel',
    descripcion: `<u>Receta de:</u> mi amiga Carolina (la he adaptado para harina sin gluten). <br><u>Ingredientes</u>: 300 ml de leche (aproximadamente), 3 cucharadas de harina Hacendado sin gluten (40 g), 4 cucharadas de aceite de oliva, sal, pimienta negra y nuez moscada.
    <u>Preparación</u>: poner en una sartén aceite de oliva, calentar un poquito y echar la harina. A fuego medio-alto, remover con una cuchara de madera, aplastando bien la harina para integrar todo durante algunos minutos. La harina tiene que perder el color blanco y coger un color tostado claro. Echar entonces la mitad de la leche. Moviendo en círculos sin parar, hay que conseguir despegar la harina de la sartén y hacer como una pelota. Cuando esté integrado todo, echar el resto de la leche poco a poco y seguir removiendo. Añadir la sal, la pimienta negra y rallar un poquito de nuez moscada. Seguir removiendo.
    El espesor de la bechamel depende de para qué se quiera, por eso hay que ajustar la cantidad de leche hasta conseguir la textura deseada.`,
    tipoSalsa: 'crema',
  },
  {
    nombre: 'Salsa Bilbaína',
    descripcion: `<u>Ingredientes</u>: aceite de oliva virgen, 2 ajos, 1 limón, medio vaso de vinagre y ½ guindilla.
    <u>Preparación</u>: colocar en una sartén a fuego medio el aceite de oliva, los ajos fileteados y la guindilla. Dejar hasta que estén dorados los ajos. Retirar ajos y guindilla. Agregar el zumo de limón y el vinagre. Mezclar.
    Ideal para acompañar pescados blancos: merluza, lubina, bacalao, rodaballo, etc.`,
    tipoSalsa: 'bilbaina',
  },
  {
    nombre: 'Salsa Brava',
    descripcion: `<u>Receta de:</u> mi hermano Juan, que le queda de chuparse los dedos
    <u>Ingredientes</u>: 1 litro de caldo de pollo, 4 cucharadas de aceite de oliva, ½ cebolla, una cucharada y media de harina, una cucharadita de pimentón dulce y tres de pimentón picante.
    <u>Preparación</u>: poner a pochar a fuego lento en el aceite la cebolla picada pequeñita. Añadir el pimentón y remover durante unos 30 segundos a fuego medio-alto. Echar la harina y mover hasta que se haga una pasta bien integrada. Incorporar el caldo poco a poco hasta conseguir la textura deseada.`,
    tipoSalsa: 'brava',
  },
  {
    nombre: 'Salsa Eva',
    descripcion: `<u>Receta de:</u> mi nuera Eva
    <u>Ingredientes</u>: aceite de oliva virgen, 2 ajos, 2 cayenas y vino blanco.
    <u>Preparación</u>: poner un cazo al fuego con un chorro generoso de aceite de oliva, debe cubrir bien el fondo. Añadir los ajos fileteados y la cayena y freír a fuego suave sin dejar que se doren mucho. Añadir el vino blanco, que debe suponer como la mitad de la cantidad del aceite. Dejar calentar y batir un poquito con un tenedor o con las varillas.
    Salsa muy adecuada para pescados.`,
    tipoSalsa: 'vino',
  },
  {
    nombre: 'Salsa de Foie',
    descripcion: `<u>Ingredientes</u> (para unos 350 g de salsa): 100 g de foie micuit, 1 chalota o una cebolla, 200 g de caldo de pollo, 100 g de nata para cocinar, 50 g de vino de Oporto, ½ cucharadita de sal, pimienta negra molida y aceite de oliva virgen extra.
    <u>Preparación</u>: pelar la chalota o cebolla y cortarla en juliana. Poner en una sartén con un poco de aceite y pocharla bien a fuego medio-bajo. Cuando esté tierna, incorporar el caldo, la nata y el Oporto. Mezclar bien y dejar cocer a fuego lento durante unos minutos hasta que empiece a espesar.
    Trocear el foie e incorporarlo a la sartén, removiendo bien con una espátula y dejando que se funda con la salsa. Cuando esté todo bien ligado pasarlo a un vaso de batidora y triturar hasta obtener una crema fina y homogénea. Devolverlo a la sartén y reducir de nuevo al fuego hasta conseguir la textura deseada.
    Esta salsa, una vez preparada, se sirve enseguida. Se puede conservar en el frigorífico, guardada en un tarro hermético, durante un par de días.`,
    tipoSalsa: 'foie',
  },
  {
    nombre: 'Salsa de Pimientos',
    descripcion: `<u>Ingredientes</u>: aceite de oliva virgen, 2 pimientos de piquillo de bote y su jugo, tomillo, 200 ml de nata.
    <u>Preparación</u>: poner en una sartén con un par de cucharadas de aceite un par de ajos a dorar (no dejar quemar) y espolvorear con tomillo. Añadir los dos pimientos y un poco del líquido del bote. Dejar pochar a poca temperatura para que vaya ligando durante 8 a 10 minutos aproximadamente. Poner todo en el vaso de la batidora y añadirle un brik de nata. Batir con la batidora.
    Salsa para acompañar tanto carnes como pescados.`,
    tipoSalsa: 'pimientos',
  },
  {
    nombre: 'Salsa Rosa Exprés',
    descripcion: `<u>Ingredientes</u>: 4 cucharadas soperas de una buena mayonesa de bote, 2 cucharadas de kétchup, una cucharada de zumo de naranja y una cucharada de brandy y aceite oliva virgen extra.
    <u>Preparación</u>: poner la mayonesa en un bol, añadir un chorro de aceite de oliva, el kétchup, el zumo de naranja y el brandy. Mezclar bien.`,
    tipoSalsa: 'rosa',
  },
  {
    nombre: 'Salsa de Tomate o Pisto',
    descripcion: `<u>Receta de:</u> la que aprendí en casa
    <u>Ingredientes</u>: 1 kg de tomate natural triturado, 1 cebolla grande, 1 pimiento verde, 1 pimiento rojo, 1 ajo, 1 cucharadita rasa de azúcar, pimienta negra molida, aceite de oliva virgen extra y sal.
    <u>Preparación</u>: poner a rehogar la cebolla y el ajo cortaditos en el aceite, previamente templado. Cuando esté blandita la cebolla, echar los pimientos, también cortaditos pequeños. Dejar que poche todo bien, a fuego más bien medio-lento. Añadir la lata de tomate y remover bien unos minutos. Aderezar con la pimienta negra, el azúcar y la sal. Mover bien y dejar cocer a fuego lento, unas dos horas.`,
    tipoSalsa: 'tomate',
  },
  {
    nombre: 'Vinagreta de Cebollino',
    descripcion: `<u>Ingredientes</u>: 75 g de aceite de oliva virgen extra, 1 cucharada de vinagre de vino y cebollino.
    <u>Preparación</u>: emulsionar el aceite con el vinagre. Picar unos tallos de cebollino en trocitos pequeños. Mezclar con la vinagreta y servir con la ensalada.
    Aliño para mejillones, pescados, ensalada de alubias y ensaladas varias.`,
    tipoSalsa: 'vinagreta',
  },
  {
    nombre: 'Vinagreta de Fresas',
    descripcion: `<u>Ingredientes</u>: 10 fresas, 7 cucharadas de aceite de oliva virgen extra y 2 cucharadas de vinagre de vino.
    <u>Preparación</u>: poner en el vaso de la batidora las fresas con el aceite y el vinagre. Batir bien.`,
    tipoSalsa: 'fruta',
  },
  {
    nombre: 'Vinagreta de Naranja',
    descripcion: `<u>Ingredientes</u>: 1 naranja, 4 cucharadas de aceite de oliva virgen extra y 1 de vinagre de Módena.
    <u>Preparación</u>: hacer zumo con la naranja. Poner en un cuenco el zumo, añadir el aceite de oliva y el vinagre de Módena. Batir bien con varillas.`,
    tipoSalsa: 'citrico',
  },
];
