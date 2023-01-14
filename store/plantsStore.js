import create from 'zustand';

const usePlantsStore = create(set => ({
  plantsCategories: [
    {
      name: 'Polypodiaceae',
      image: require('../assets/plants/Polypodiaceae.jpg'),
    },
    {
      name: 'Amaryllidaceae',
      image: require('../assets/plants/Amaryllidaceae.jpg'),
    },
    { name: 'Marantaceae', image: require('../assets/plants/Marantaceae.jpg') },
    { name: 'Cycas', image: require('../assets/plants/Cycadaceae.jpg') },
    {
      name: 'Dryopteridaceae',
      image: require('../assets/plants/Dryopteridaceae.jpg'),
    },
    {
      name: 'Davallia',
      image: require('../assets/plants/Davalliaceae.jpg'),
    },
    { name: 'Araceae', image: require('../assets/plants/Araceae.jpg') },
    { name: 'Liliaceae', image: require('../assets/plants/Liliaceae.jpg') },
    { name: 'Arecaceae', image: require('../assets/plants/Arecaceae.jpg') },
    { name: 'Cactus', image: require('../assets/plants/Cactaceae.jpg') },
    {
      name: 'Euphorbiaceae',
      image: require('../assets/plants/Euphorbiaceae.jpg'),
    },
    { name: 'Araliaceae', image: require('../assets/plants/Araliaceae.jpg') },
    { name: 'Moraceae', image: require('../assets/plants/Moraceae.jpg') },
    {
      name: 'Bromeliaceae',
      image: require('../assets/plants/Bromeliaceae.jpg'),
    },
    {
      name: 'Zingiberaceae',
      image: require('../assets/plants/Zingiberaceae.jpg'),
    },
    { name: 'Malvaceae', image: require('../assets/plants/Malvaceae.jpg') },
    {
      name: 'Asclepiadoideae',
      image: require('../assets/plants/Asclepiadaceae.jpg'),
    },
    {
      name: 'Melastomataceae',
      image: require('../assets/plants/Melastomataceae.jpg'),
    },
    {
      name: 'Nephrolepis',
      image: require('../assets/plants/Nephrolepidaceae.jpg'),
    },
    { name: 'Apocynaceae', image: require('../assets/plants/Apocynaceae.jpg') },
    { name: 'Agavoideae', image: require('../assets/plants/Agavaceae.jpg') },
    {
      name: 'Bignoniaceae',
      image: require('../assets/plants/Bignoniaceae.jpg'),
    },
    { name: 'Piperaceae', image: require('../assets/plants/Piperaceae.jpg') },
    { name: 'Arecaceae', image: require('../assets/plants/Palmae.jpg') },
    {
      name: 'Podocarpaceae',
      image: require('../assets/plants/Podocarpaceae.jpg'),
    },
    { name: 'Pteridaceae', image: require('../assets/plants/Pteridaceae.jpg') },
    {
      name: 'Crassulaceae',
      image: require('../assets/plants/Crasssulaceae.jpg'),
    },
    {
      name: 'Strelitziaceae',
      image: require('../assets/plants/Strelitziaceae.jpg'),
    },
    { name: 'Meliaceae', image: require('../assets/plants/Miliaceae.jpg') },
    {
      name: 'Gesneriaceae',
      image: require('../assets/plants/Gesneriaceae.jpg'),
    },
    {
      name: 'Aspleniaceae',
      image: require('../assets/plants/Aspleniaceae.jpg'),
    },
    {
      name: 'Nyctaginaceae',
      image: require('../assets/plants/Nyctaginaceae.jpg'),
    },
    { name: 'Vitaceae', image: require('../assets/plants/Vitaceae.jpg') },
  ],
}));

export default usePlantsStore;
