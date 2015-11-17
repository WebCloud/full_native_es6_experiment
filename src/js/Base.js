import core from './core';

export default class Base {
  constructor(itemTemplate = '', viewTemplate = '') {
    this.itemTemplate = itemTemplate;
    this.viewTemplate = viewTemplate;
  }

  getParsedViewData() {
    let regex = /<(name|size|openLevel|level|profit)>/gi;

    return new Promise((resolve, reject)=> {
      core.getPositions().then((markets)=> {
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
}
