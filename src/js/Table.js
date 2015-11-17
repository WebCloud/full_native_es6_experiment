import Base from './Base';

export default class Table extends Base {
  constructor(itemTemplate, viewTemplate) {
    super(itemTemplate, viewTemplate);
  }

  render(targetElement = '.target') {
    return ()=> {
      let target = document.querySelector(targetElement);

      this.getParsedViewData().then((formattedMarkets)=> {
        target.innerHTML = this.viewTemplate
                               .replace('<formattedItems>', formattedMarkets);
      });
    };
  }
}
