import core from './core';

export default class Base {
  constructor(itemTemplate = '', viewTemplate = '') {
    this.itemTemplate = itemTemplate;
    this.viewTemplate = viewTemplate;
    this.viewData = [];
  }

  getParsedViewData() {
    let regex = /<(name|size|openLevel|level|profit)>/gi;

    return new Promise((resolve, reject)=> {
      this.getViewData().then((markets)=> {
        resolve(
          markets.map(({name, marketPositions: positions})=> {
            return positions.reduce((previous, current)=> {
              current.name = name;

              return `
                ${previous}
                ${this.itemTemplate.replace(regex, (match)=> {
                  match = match.replace(/<|>/g, '');
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
  }

  getViewData() {
    return new Promise((resolve, reject)=> {
      if(this.viewData.length == 0){
        core.getPositions().then((markets)=> {
          this.viewData = markets;

          resolve(markets);
        }, reject);
      } else {
        resolve(this.viewData);
      };
    });
  }

  getTotalProfit() {
    let totalProfit = 0;

    totalProfit = this.viewData.reduce((previous, {marketPositions: positions})=> {
      return previous + positions.reduce((prev, {profit})=> {
        return prev + profit;
      }, 0);
    }, 0);

    return totalProfit;
  }
}
