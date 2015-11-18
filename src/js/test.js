import Base from './Base';
import Table from './Table';

let itemTemplate,
    viewTemplate,
    base,
    table;

itemTemplate = `
  <tr>
    <td><name></td>
    <td><size></td>
    <td><openLevel></td>
    <td><level></td>
    <td><profit></td>
  </tr>
`;
viewTemplate = `
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
    <formattedItems>
  </tbody>
  <tfoot>
    <tr>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>Total Profit/Loss <span><totalProfit></span></td>
    </tr>
  </tfoot>
`;

base = new Base(itemTemplate, viewTemplate);
table = new Table(itemTemplate, viewTemplate);

QUnit.test('base.getParsedViewData() returns data parsed against the itemTemplate', function(assert) {
  assert.expect(1);
  let done = assert.async();

  base.getParsedViewData().then((data)=>{
    assert.ok(data.match(`<td>${base.viewData[0].name}</td>`).length > 0);
    done();
  });
});

QUnit.test('table.render parses the viewData into the viewTemplate', function(assert) {
  assert.expect(2);
  let done = assert.async();

  let hiddenTarget = document.createElement('table');
  hiddenTarget.className = 'hidden-target';
  hiddenTarget.style.display = 'none';
  hiddenTarget.addEventListener('DOMSubtreeModified', ()=>{
    assert.ok(document.querySelectorAll('.hidden-target th').length > 0);
    assert.ok(document.querySelectorAll('.hidden-target tfoot td span').length > 0);
    done();
  });
  document.body.appendChild(hiddenTarget);

  table.render('.hidden-target')();
});
