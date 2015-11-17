import core from './core';

const getParsedViewData = function(format = '') {
  let regex = /name|size|openLevel|level|profit/gi;

  return new Promise((resolve, reject)=> {
    core.getPositions().then((markets)=> {
      resolve(
        markets.map(({name, marketPositions: positions})=> {
        return positions.reduce((previous, current)=> {
          current.name = name;

          return `
            ${previous}
            ${format.replace(regex, (match)=> {
              return current[match];
            })}
          `;
        }, '');
        })
        .join('')
      );
    }, (reason)=> {
      reject(reason);
    });
  });
};

const table = function() {
  let target = document.querySelector('.target');

  getParsedViewData(`
    <tr>
      <td>name</td>
      <td>size</td>
      <td>openLevel</td>
      <td>level</td>
      <td>profit</td>
    </tr>
  `).then((formattedMarkets)=> {
    target.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Open Level</th>
          <th>Level</th>
          <th>Profit/Loss</th>
        <tr>
      </thead>
      <tbody>
        ${formattedMarkets}
      </tbody>
    `;
  });
};

export default {
  table
}
