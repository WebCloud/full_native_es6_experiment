const fetchData = function(resolve, reject) {
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');

  fetch('/positions.json', {headers}).then((response)=> {
    return response.json();
  }, (reason)=> {
    reject(reason);
  }).then(({markets, positions})=> {
    markets = markets.map((market)=> {
      let marketPositions = positions.filter((position) => {
        return position.marketId == market.id;
      }).map(({size, openLevel, level})=> {
        return {
          size,
          openLevel,
          level,
          profit: ((level - openLevel) * size)
        };
      });

      return {
        name: market.name,
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
