import axios from 'axios';

const baseURL = `https://pokeapi.co/api/v2/`;

const fetchPokemonData = async () => {
  try {
    const res = await axios.get(`${baseURL}/pokemon?offset=0&limit=40`);
    const pokemonList = res.data.results;

    const allPokemonData = [];
    for (const pokemon of pokemonList) {
      const speciesRes = await axios.get(pokemon.url);
      const speciesData = await axios.get(speciesRes.data.species.url);
      const koreanName = speciesData.data.names.find(
        (name) => name.language.name === 'ko'
      );
      const types = speciesRes.data.types.map(async (typeInfo) => {
        const typeRes = await axios.get(typeInfo.type.url);
        const koreanTypeName = typeRes.data.names.find(
          (name) => name.language.name === 'ko'
        );
        return koreanTypeName ? koreanTypeName.name : typeInfo.type.name;
      });

      const resolvedTypes = await Promise.all(types);

      allPokemonData.push({
        title: koreanName ? koreanName.name : pokemon.name, // 한국어 이름 없을 시 기본 이름
        sprite: speciesRes.data.sprites.front_default,
        type: resolvedTypes.join(' & '), // 타입을 문자열로 변환
      });
    }
    return allPokemonData;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const dummy = await fetchPokemonData(); // 데이터를 가져와 dummy에 저장

export default dummy; //데이터를 비동기적으로 로드하고 default로 내보내는 방식임.
