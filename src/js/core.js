const fetchData = function(resolve, reject) {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');

  fetch('/positions.json', {headers}).then((response)=> {
    return response.json();
  }, (reason)=> {
    reject(reason);
  }).then(({markets, positions})=> {
    markets = markets.map(({name, id: marketId})=> {
      let marketPositions = positions.filter((position) => {
        return position.marketId == marketId;
      }).map(({size, openLevel, level})=> {
        return {
          size,
          openLevel,
          level,
          profit: ((level - openLevel) * size)
        };
      });

      return {
        name: name,
        marketPositions
      };
    });

    resolve(markets);
  }, (reason)=> {
    reject(reason);
  });
};

const getPositions = function(){
  return new Promise(fetchData);
};

export default {
  getPositions
};
