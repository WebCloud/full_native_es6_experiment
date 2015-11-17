import core from './core';

const table = function(){
  core.getPositions().then((markets)=> {
    let target = document.querySelector('.target');

    markets = markets.map(({name, marketPositions: positions})=> {
      return positions.reduce((previous, {size, openLevel, level, profit})=> {
        return `
          ${previous}
          <tr>
            <td>${name}</td>
            <td>${size}</td>
            <td>${openLevel}</td>
            <td>${level}</td>
            <td>${profit}</td>
          </tr>
        `;
      }, '');
    });

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
        ${markets.join('')}
      </tbody>
    `;
  });
};

export default {
  table
}
